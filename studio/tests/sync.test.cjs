const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'../security-sync.js'),'utf8');
const clone=x=>JSON.parse(JSON.stringify(x));
const seed=()=>({version:3,updatedAt:10,updatedAtISO:'old',posts:[{id:'p1',title:'Original',date:'2026-11-09'}],stories:[{id:'s1',name:'Historia',format:'Foto'}],highlights:[{id:'h1',name:'DAILY'}],chatHistory:[{sender:'user',plainText:'hola'}],importedCustomContextNotes:''});
function fixture(local=seed(),remote=seed()){
 const storage=new Map([['po_last_updated_at',String(local.updatedAt)],['po_sync_dirty','1']]),fields=new Map();let sequence=0;
 const element=id=>{if(!fields.has(id))fields.set(id,{value:'',hidden:true,style:{},classList:{add(){},remove(){}}});return fields.get(id);};
 const state={data:clone(remote),sha:'remote-original',writes:[],applied:0,getHook:null,failPut:false};
 const ctx={Date,JSON,Object,Array,Set,Map,Error,Number,String,TextEncoder,TextDecoder,Uint8Array,
  atob:x=>Buffer.from(x,'base64').toString('binary'),btoa:x=>Buffer.from(x,'binary').toString('base64'),
  localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},
  posts:clone(local.posts),stories:clone(local.stories),highlights:clone(local.highlights),chatHistory:clone(local.chatHistory),importedCustomContextNotes:local.importedCustomContextNotes||'',
  normalizeStoryEntry:s=>Object.assign({time:'',context:'',formatDetail:''},s),sanitizeApiKey:x=>x,
  secretStorage:{getItem:()=> 'disposable-token'},document:{getElementById:element},
  renderCurrentView(){state.applied++;},updateApiKeyStatus(){},updateQuickAiSwitchers(){},renderSavedChatHistory(){},buildContextMarkdown:()=> '# test context',
  console:{warn(){},error(){}},setTimeout(){return 1;},clearTimeout(){},
  fetch:async(url,options={})=>{
    const isState=url.includes('studio-cloud-state.json');
    if(options.method==='PUT'){
      if(state.failPut)return {ok:false,status:409,text:async()=> 'conflict'};
      const body=JSON.parse(options.body);if(isState&&body.sha!==state.sha)return {ok:false,status:409,text:async()=> 'conflict'};
      state.writes.push({isState,body});
      if(isState){state.data=JSON.parse(Buffer.from(body.content,'base64').toString('utf8'));state.sha='saved-'+(++sequence);}
      return {ok:true,json:async()=>({content:{sha:state.sha}})};
    }
    if(state.getHook){const hook=state.getHook;state.getHook=null;hook();}
    const meta=isState?{sha:state.sha,content:Buffer.from(JSON.stringify(state.data)).toString('base64')}:{sha:'md-sha',content:''};
    return {ok:true,json:async()=>meta};
  }
 };
 vm.createContext(ctx);vm.runInContext(source.slice(0,source.indexOf('    // Inicializar')),ctx);
 return {ctx,state,storage,fields,element};
}
(async()=>{
 // Migration with no stored SHA: metadata and old story default fields do not create a conflict.
 let f=fixture();f.ctx.stories=f.ctx.stories.map(f.ctx.normalizeStoryEntry);f.ctx.posts[0]={date:'2026-11-09',title:'Original',id:'p1'};
 await f.ctx.pullStateFromGitHubRepoNow(false);assert.equal(f.storage.get('po_sync_base_sha'),'remote-original');assert.equal(f.state.applied,0);assert.equal(f.storage.has('po_sync_dirty'),false);assert.equal(f.state.writes.length,0);
 f=fixture();await f.ctx.putFileToGitHubRepo('token','studio/studio-cloud-state.json',JSON.stringify({...seed(),updatedAt:999,updatedAtISO:'new'}),'test');assert.equal(f.state.writes.length,0);assert.equal(f.storage.get('po_sync_base_sha'),'remote-original');
 // Real differences cannot be silently approved just because the browser has no baseline.
 let local=seed();local.posts[0].title='Trabajo local';f=fixture(local);const before=clone(f.ctx.posts);
 await assert.rejects(f.ctx.putFileToGitHubRepo('token','studio/studio-cloud-state.json',JSON.stringify(local),'test'),e=>e.stateConflict===true);
 assert.deepEqual(f.ctx.posts,before);assert.equal(f.state.writes.length,0);assert.equal(f.element('stateSyncConflictPanel').hidden,false);
 let backup=JSON.parse(f.storage.get('po_sync_conflict_backup'));assert.equal(backup.local.posts[0].title,'Trabajo local');assert.equal(backup.remote.posts[0].title,'Original');
 await f.ctx.resolveStateSyncConflict('local');assert.equal(f.state.data.posts[0].title,'Trabajo local');assert.equal(f.state.writes.filter(x=>x.isState).length,1);assert.equal(f.storage.get('po_sync_base_sha'),f.state.sha);assert.equal(f.element('stateSyncConflictPanel').hidden,true);
 // Choosing GitHub keeps a recoverable local snapshot and does not upload anything.
 f=fixture(local);await f.ctx.pullStateFromGitHubRepoNow(false);assert.equal(f.state.applied,0);await f.ctx.resolveStateSyncConflict('remote');assert.equal(f.ctx.posts[0].title,'Original');assert.equal(f.state.writes.length,0);assert.equal(JSON.parse(f.storage.get('po_sync_recovery')).posts[0].title,'Trabajo local');
 // A remote update during the choice requires a new choice, not a force overwrite.
 f=fixture(local);await f.ctx.pullStateFromGitHubRepoNow(false);f.state.sha='remote-newer';f.state.data.posts[0].title='Otro dispositivo';await f.ctx.resolveStateSyncConflict('local');assert.equal(f.state.writes.length,0);assert.equal(f.ctx.posts[0].title,'Trabajo local');assert.equal(f.element('stateSyncConflictPanel').hidden,false);
 // Editing during download preserves the newly entered local content.
 f=fixture(local);await f.ctx.pullStateFromGitHubRepoNow(false);f.state.getHook=()=>{f.ctx.posts[0].title='Edición durante descarga';f.storage.set('po_last_updated_at','20');};await f.ctx.resolveStateSyncConflict('remote');assert.equal(f.ctx.posts[0].title,'Edición durante descarga');assert.equal(f.state.applied,0);
 // An unchanged upload snapshot cannot clear edits made while its GET was in flight.
 f=fixture();f.state.getHook=()=>{f.ctx.posts.push({id:'p2',title:'Nueva'});f.storage.set('po_last_updated_at','20');};await f.ctx.putFileToGitHubRepo('token','studio/studio-cloud-state.json',JSON.stringify(seed()),'test');assert.equal(f.storage.get('po_sync_dirty'),'1');assert.equal(f.ctx.posts.length,2);assert.equal(f.state.writes.length,0);
 // API rejection never marks an unconfirmed write as saved.
 f=fixture(local);f.storage.set('po_sync_base_sha',f.state.sha);f.state.failPut=true;await assert.rejects(f.ctx.putFileToGitHubRepo('token','studio/studio-cloud-state.json',JSON.stringify(local),'test'));assert.equal(f.storage.get('po_sync_base_sha'),'remote-original');assert.equal(f.storage.get('po_sync_dirty'),'1');
 console.log('PASS: legacy baseline migration, semantic equality, conflict backups, explicit local/remote resolution, changed remote lease, edits during requests and rejected writes.');
})().catch(e=>{console.error(e);process.exitCode=1;});
