const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),nodeCrypto=require('node:crypto');
const M=require('../sync-merge.js'),source=fs.readFileSync(path.join(__dirname,'../security-sync.js'),'utf8');
const clone=x=>JSON.parse(JSON.stringify(x));
const seed=()=>({version:3,updatedAt:10,posts:[{id:'p1',title:'Original',caption:'Copy',status:'Idea'},{id:'p2',title:'Otra'}],stories:[],highlights:[],chatHistory:[],importedCustomContextNotes:''});
const blob=state=>{const s=JSON.stringify(state,null,2);return nodeCrypto.createHash('sha1').update('blob '+Buffer.byteLength(s)+'\0').update(s).digest('hex');};
function fixture({local=seed(),remote=seed(),base=null,legacyBase=false}={}){
 const storage=new Map([['po_last_updated_at',String(local.updatedAt||0)],['po_sync_dirty','1']]);
 const fields=new Map(),timers=new Map(),events=new Map(),history=new Map(),commits=new Map(),trees=new Map();let sequence=0,timerId=0;
 const element=id=>{if(!fields.has(id))fields.set(id,{value:'',hidden:true,style:{},classList:{add(){},remove(){}}});return fields.get(id);};
 const state={data:clone(remote),sha:blob(remote),head:'head-original',tree:'tree-original',writes:[],reads:0,applied:0,offline:false,denied:false,token:'disposable-token',onRead:null,onCommit:null,onPatch:null};
 history.set(state.sha,clone(remote));commits.set(state.head,{state:clone(remote),tree:state.tree});
 if(base){history.set(blob(base),clone(base));storage.set('po_sync_base_sha',blob(base));if(!legacyBase)storage.set('po_sync_base_record',JSON.stringify({sha:blob(base),state:base}));}
 const changeRemote=fn=>{const data=clone(state.data);fn(data);state.data=data;state.sha=blob(data);state.head='external-'+(++sequence);state.tree='external-tree-'+sequence;history.set(state.sha,clone(data));commits.set(state.head,{state:clone(data),tree:state.tree});};
 const response=(value,status=200)=>({ok:status>=200&&status<300,status,headers:{get:()=>null},json:async()=>clone(value)});
 const ctx={Date,JSON,Object,Array,Set,Map,Error,Number,String,TextEncoder,TextDecoder,Uint8Array,Promise,AbortController,crypto:nodeCrypto.webcrypto,StudioSyncMerge:M,
  atob:x=>Buffer.from(x,'base64').toString('binary'),btoa:x=>Buffer.from(x,'binary').toString('base64'),
  localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},
  networks:clone(M.normalize(local).networks),posts:clone(local.posts),stories:clone(local.stories),highlights:clone(local.highlights),chatHistory:clone(local.chatHistory),importedCustomContextNotes:local.importedCustomContextNotes||'',
  normalizeStoryEntry:s=>Object.assign({time:'',context:'',formatDetail:''},s),sanitizeApiKey:x=>x,secretStorage:{getItem:()=>state.token},
  document:{getElementById:element,visibilityState:'visible',addEventListener:(n,fn)=>events.set(n,fn)},window:{addEventListener:(n,fn)=>events.set(n,fn)},navigator:{onLine:true},
  renderCurrentView(){state.applied++;},renderSavedChatHistory(){},buildContextMarkdown:s=>JSON.stringify({posts:s.posts,stories:s.stories,chatHistory:s.chatHistory}),
  console:{warn(){},error(){}},setTimeout(fn,delay){const id=++timerId;timers.set(id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id),setInterval(){return 1;},
  fetch:async(url,options={})=>{
    if(state.offline)throw TypeError('offline');if(state.denied)return response({},401);
    const route=new URL(url).pathname.split('/soyorostegui.github.io')[1];
    if(route==='/branches/main'){state.reads++;return response({commit:{sha:state.head,commit:{tree:{sha:state.tree}}}});}
    if(route.startsWith('/contents/')){
      const commit=commits.get(new URL(url).searchParams.get('ref'));if(state.onRead){const fn=state.onRead;state.onRead=null;fn();}
      return response({sha:blob(commit.state),content:Buffer.from(JSON.stringify(commit.state)).toString('base64')});
    }
    if(route.startsWith('/git/blobs/')){const sha=route.split('/').at(-1),data=history.get(sha);return data?response({sha,content:Buffer.from(JSON.stringify(data)).toString('base64')}):response({},404);}
    const body=JSON.parse(options.body||'{}');
    if(route==='/git/trees'){
      const sha='new-tree-'+(++sequence);trees.set(sha,body);assert.equal(body.tree.length,2);return response({sha});
    }
    if(route==='/git/commits'){
      const sha='new-commit-'+(++sequence),tree=trees.get(body.tree),raw=tree.tree.find(f=>f.path.endsWith('studio-cloud-state.json')).content;
      commits.set(sha,{state:JSON.parse(raw),tree:body.tree,parent:body.parents[0],entries:tree.tree});
      if(state.onCommit){const fn=state.onCommit;state.onCommit=null;fn();}return response({sha});
    }
    if(route==='/git/refs/heads/main'){
      if(state.onPatch){const fn=state.onPatch;state.onPatch=null;fn();}
      assert.equal(body.force,false);const commit=commits.get(body.sha);if(commit.parent!==state.head)return response({},422);
      state.head=body.sha;state.data=clone(commit.state);state.sha=blob(commit.state);state.tree=commit.tree;history.set(state.sha,clone(commit.state));state.writes.push(commit.entries);
      const md=JSON.parse(commit.entries.find(f=>f.path.endsWith('.md')).content);assert.deepEqual(md.posts,state.data.posts);assert.deepEqual(md.chatHistory,state.data.chatHistory);
      return response({object:{sha:state.head}});
    }
    throw Error('Unexpected API route '+route);
  }
 };
 vm.createContext(ctx);vm.runInContext(source.slice(0,source.indexOf('// Inicializar')),ctx);
 const edit=fn=>{fn(ctx);storage.set('po_sync_dirty','1');storage.set('po_last_updated_at',String(Number(storage.get('po_last_updated_at'))+1));};
 const fire=async()=>{const item=[...timers.entries()].at(-1);assert(item,'Expected retry');timers.delete(item[0]);await item[1].fn();};
 return {ctx,state,storage,element,timers,events,edit,fire,changeRemote};
}
(async()=>{
 let f=fixture();await f.ctx.pullStateFromGitHubRepoNow(false);assert.equal(f.state.writes.length,0);assert.equal(f.storage.has('po_sync_dirty'),false);assert.equal(f.storage.get('po_sync_base_sha'),f.state.sha);assert(f.storage.has('po_sync_base_record'));
 let base=seed(),local=clone(base),remote=clone(base);local.posts[0].caption='Local';remote.posts[0].status='Listo';
 f=fixture({base,local,remote});await f.ctx.pullStateFromGitHubRepoNow(false);assert.equal(f.state.writes.length,1);assert.equal(f.state.data.posts[0].caption,'Local');assert.equal(f.state.data.posts[0].status,'Listo');assert.equal(f.ctx.posts[0].status,'Listo');assert.equal(f.storage.has('po_sync_dirty'),false);
 // Old browsers that only stored the common blob SHA recover it without manual choices.
 f=fixture({base,local,remote,legacyBase:true});await f.ctx.pushStateToGitHubRepoNow(false);assert.equal(f.state.data.posts[0].caption,'Local');assert.equal(f.state.data.posts[0].status,'Listo');assert.equal(f.state.writes.length,1);
 // Choosing one conflicting field keeps the other side's independent changes.
 remote.posts[0].caption='GitHub';f=fixture({base,local,remote});await f.ctx.pullStateFromGitHubRepoNow(false);assert.equal(f.state.writes.length,0);assert.equal(f.element('stateSyncConflictPanel').hidden,false);assert(f.storage.has('po_sync_conflict_backup'));
 await f.ctx.resolveStateSyncConflict('local');assert.equal(f.state.data.posts[0].caption,'Local');assert.equal(f.state.data.posts[0].status,'Listo');assert.equal(f.element('stateSyncConflictPanel').hidden,true);
 // A moved branch, including unrelated commits, is rebased and retried without force.
 f=fixture({base,local});f.state.onPatch=()=>f.changeRemote(data=>{data.posts[1].title='Desde otro dispositivo';});await f.ctx.pushStateToGitHubRepoNow(false);assert.equal(f.state.writes.length,1);assert.equal(f.state.data.posts[0].caption,'Local');assert.equal(f.state.data.posts[1].title,'Desde otro dispositivo');
 // Edits made during the confirmed save remain pending and are flushed automatically.
 f=fixture({base,local});f.state.onCommit=()=>f.edit(ctx=>{ctx.posts[1].title='Durante el envío';});await f.ctx.pushStateToGitHubRepoNow(false);assert.equal(f.state.writes.length,2);assert.equal(f.state.data.posts[1].title,'Durante el envío');assert.equal(f.state.data.posts[0].caption,'Local');assert.equal(f.storage.has('po_sync_dirty'),false);
 // Lost connection leaves a durable outbox; reconnect sends it without clicking Connect Repo.
 f=fixture({base,local});f.ctx.startAutomaticSync();f.state.offline=true;await f.ctx.pushStateToGitHubRepoNow(false);assert.equal(f.state.writes.length,0);assert.equal(f.storage.get('po_sync_dirty'),'1');assert(f.timers.size);
 f.state.offline=false;f.events.get('online')();await f.fire();assert.equal(f.state.writes.length,1);assert.equal(f.storage.has('po_sync_dirty'),false);
 // Polling a clean state does not create empty commits or refresh-only context commits.
 f=fixture();await f.ctx.pullStateFromGitHubRepoNow(false);await f.ctx.pullStateFromGitHubRepoNow(false);assert.equal(f.state.writes.length,0);
 // Unsaved modal inputs are never overwritten by background refresh.
 f=fixture({base,local});f.state.onRead=()=>{f.element('storyOverlay').style.display='flex';};await f.ctx.pushStateToGitHubRepoNow(false);assert.equal(f.state.writes.length,0);assert.equal(f.state.applied,0);f.element('storyOverlay').style.display='none';await f.fire();assert.equal(f.state.writes.length,1);
 // Token rejection stops automatic requests until the credential changes or a manual retry.
 f=fixture({base,local});f.state.denied=true;await f.ctx.pushStateToGitHubRepoNow(false);const reads=f.state.reads;await f.ctx.pushStateToGitHubRepoNow(false);assert.equal(f.state.reads,reads);assert.equal(f.storage.get('po_sync_dirty'),'1');f.state.denied=false;f.state.token='replacement-token';await f.ctx.pushStateToGitHubRepoNow(false);assert.equal(f.state.writes.length,1);
 // No baseline: genuinely ambiguous legacy fields are backed up, not guessed from clocks.
 local=seed();local.posts[0].title='Trabajo anterior';f=fixture({local});await f.ctx.pullStateFromGitHubRepoNow(false);assert.equal(f.state.writes.length,0);assert.equal(f.element('stateSyncConflictPanel').hidden,false);
 // Catalog additions and typed agenda metadata survive the actual sync controller.
 const agendaBase=seed(),agendaLocal=clone(agendaBase);agendaLocal.networks=M.normalize(agendaBase).networks.concat({id:'network-tiktok',name:'TikTok'});
 agendaLocal.posts.push({id:'meeting-1',type:'meeting',title:'Revisión',date:'2026-11-13',time:'10:00',endTime:'11:00',location:'Sala 1',participants:'Peter',description:'Marca',status:'Idea',phase:'',channel:'',format:''});
 f=fixture({base:agendaBase,local:agendaLocal});await f.ctx.pushStateToGitHubRepoNow(false);assert.equal(f.state.writes.length,1);assert(f.state.data.networks.some(n=>n.name==='TikTok'));assert.equal(f.state.data.posts.find(p=>p.id==='meeting-1').endTime,'11:00');
 assert(JSON.parse(f.storage.get('po_networks_v1')||'[]').some(n=>n.name==='TikTok')||f.ctx.networks.some(n=>n.name==='TikTok'));
 console.log('PASS: automatic field merge, historical baseline recovery, explicit real-conflict resolution, atomic state/context commit, concurrent branch retry, edits during save, offline reconnect, no-op polling, unsaved editor protection and credential error handling.');
})().catch(error=>{console.error(error);process.exitCode=1;});
