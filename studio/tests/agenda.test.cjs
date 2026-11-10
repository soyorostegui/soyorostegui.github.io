const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const code=fs.readFileSync(path.join(__dirname,'../agenda.js'),'utf8'),editorial=fs.readFileSync(path.join(__dirname,'../editorial.js'),'utf8'),M=require('../sync-merge.js');
const clone=x=>JSON.parse(JSON.stringify(x));
class Element {
 constructor(){this.value='';this.children=[];this.style={};this.hidden=false;this.textContent='';this.handlers={};this.classList={add(){},remove(){}};}
 get options(){return this.children;}
 replaceChildren(){this.children=[];this.value='';}
 appendChild(e){this.children.push(e);if(this.children.length===1)this.value=e.value;}
 append(...els){els.forEach(e=>this.appendChild(e));}addEventListener(name,fn){this.handlers[name]=fn;}
}
const nodes=new Map();const element=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);};
for(const m of html.matchAll(/<select[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g))for(const o of m[2].matchAll(/<option value="([^"]*)"[^>]*>([^<]*)<\/option>/g)){const option=new Element();option.value=o[1];option.textContent=o[2];element(m[1]).appendChild(option);}
const groups=Object.fromEntries(['post','event','meeting','class','task'].map(k=>[k,[new Element()]]));
const stored=new Map();let fail=false,scheduled=0,renders=0;
const ctx={Date,Intl,JSON,Object,Array,Set,Math,Number,String,encodeURIComponent,
 posts:[{id:'old',title:'Legado',channel:'Instagram',date:'2026-11-09',status:'Idea',phase:'Fase 2: Archivo',format:'Carrusel',caption:'Copy antiguo',structure:'Estructura antigua'}],stories:[],highlights:[],
 localStorage:{getItem:k=>stored.get(k)??null,setItem(k,v){if(fail&&k==='po_posts_v6')throw Error('quota');stored.set(k,String(v));},removeItem:k=>stored.delete(k)},
 document:{getElementById:element,createElement:()=>new Element(),querySelectorAll:q=>groups[q.match(/data-agenda-([^\]]+)/)[1]]},
 buildEditorialContext:()=>({today:'2026-11-10'}),scheduleGitHubCloudSync:()=>scheduled++,closeModal(){element('modalOverlay').style.display='none';},renderCurrentView(){renders++;}
};vm.createContext(ctx);vm.runInContext(code,ctx);vm.runInContext(fs.readFileSync(path.join(__dirname,'../publication-options.js'),'utf8'),ctx);vm.runInContext(fs.readFileSync(path.join(__dirname,'../projects.js'),'utf8'),ctx);
vm.runInContext(editorial.slice(editorial.indexOf('    function saveToStorage()'),editorial.indexOf('    function switchView(')),ctx);
vm.runInContext(editorial.slice(editorial.indexOf('    function getFilteredPosts('),editorial.indexOf('    /* RENDER KANBAN */')),ctx);
assert.equal(ctx.entryType(ctx.posts[0]),'post');ctx.openAgendaEntry('old');assert.equal(element('edit-caption').value,'Copy antiguo');assert.equal(element('edit-type').value,'post');
ctx.saveAgendaEntry();assert.equal(ctx.posts[0].id,'old');assert.equal(ctx.posts[0].caption,'Copy antiguo');assert.equal(ctx.posts[0].structure,'Estructura antigua');
function create(type,changes={}){ctx.openAgendaEntry();element('edit-type').value=type;ctx.onAgendaTypeChange();for(const [key,value]of Object.entries({title:'Actividad '+type,date:'2026-11-12',...changes}))element('edit-'+key).value=value;ctx.saveAgendaEntry();}
create('meeting',{time:'10:00',endTime:'11:00',participants:'Ana y Peter',location:'Sala 1',description:'Revisar marca'});
assert.equal(ctx.posts.length,2);const meeting=ctx.posts[1];assert.equal(meeting.type,'meeting');assert.equal(meeting.channel,'');assert.equal(meeting.format,'');assert.equal(meeting.participants,'Ana y Peter');assert.equal(meeting.phase,'');assert.equal(groups.post[0].hidden,true);assert.equal(groups.event[0].hidden,false);
create('class',{time:'14:00',endTime:'15:30',subject:'Diseño',location:'Aula 2'});assert.equal(ctx.posts[2].subject,'Diseño');
create('task',{priority:'Alta',description:'Entregar bocetos'});assert.equal(ctx.posts[3].priority,'Alta');assert.equal(element('agendaDateLabel').textContent,'Fecha límite');assert.equal(groups.task[0].hidden,false);
assert.equal(JSON.parse(stored.get('po_posts_v6')).length,4);assert.equal(stored.get('po_sync_dirty'),'1');assert.ok(scheduled>=4);
const before=JSON.stringify(ctx.posts);create('meeting',{time:'12:00',endTime:'11:00'});assert.equal(JSON.stringify(ctx.posts),before);assert.match(element('agendaFormError').textContent,/posterior/);
create('class',{time:'',endTime:''});assert.equal(JSON.stringify(ctx.posts),before);assert.match(element('agendaFormError').textContent,/hora/);
create('task',{date:'2026-02-30'});assert.equal(JSON.stringify(ctx.posts),before);
fail=true;create('task');fail=false;assert.equal(JSON.stringify(ctx.posts),before);assert.equal(JSON.parse(stored.get('po_posts_v6')).length,4);
element('newNetworkName').value='MiRedSocial';ctx.addAgendaNetwork();assert.ok(ctx.networkNames().includes('MiRedSocial'));assert.ok(JSON.parse(stored.get('po_networks_v1')).some(n=>n.name==='MiRedSocial'));
element('newNetworkName').value='miredsocial';ctx.addAgendaNetwork();assert.equal(JSON.parse(stored.get('po_networks_v1')).filter(n=>n.name.toLowerCase()==='miredsocial').length,1);
create('post',{channel:'MiRedSocial',format:'Video'});assert.equal(ctx.posts.at(-1).channel,'MiRedSocial');ctx.removeAgendaNetwork('network-miredsocial');assert.ok(ctx.networkNames().includes('MiRedSocial'),'Networks in use cannot be deleted');
element('newNetworkName').value='OtraRed';ctx.addAgendaNetwork();ctx.removeAgendaNetwork('network-otrared');assert.ok(!ctx.networkNames().includes('OtraRed'));
element('filterType').value='meeting';element('filterChannel').value='ALL';element('filterProject').value='ALL';assert.equal(ctx.getFilteredPosts().length,1);assert.equal(ctx.getFilteredPosts()[0].id,meeting.id);
element('filterType').value='ALL';element('filterChannel').value='MiRedSocial';assert.equal(ctx.getFilteredPosts().length,1);assert.equal(ctx.getFilteredPosts()[0].channel,'MiRedSocial');
const base={posts:clone(ctx.posts),stories:[],highlights:[],chatHistory:[]},local=clone(base),remote=clone(base);local.networks=M.normalize(base).networks.concat({id:'network-miredsocial',name:'MiRedSocial'});remote.networks=M.normalize(base).networks.concat({id:'network-otrared',name:'OtraRed'});remote.posts[1].location='Nueva sala';local.posts[1].date='2026-11-13';
const merged=M.merge(base,local,remote);assert.ok(merged.ok);assert.equal(merged.state.posts.find(p=>p.id===meeting.id).location,'Nueva sala');assert.equal(merged.state.posts.find(p=>p.id===meeting.id).date,'2026-11-13');assert.equal(merged.state.networks.length,5);
assert.ok(M.equal(merged.state,M.merge(base,remote,local).state));
assert.ok(renders>=5);
console.log('PASS: legacy entries, all four agenda types, real persisted fields, type-dependent forms, optional campaigns, time/date validation, storage rollback, custom network CRUD, filters and cross-device network/entry merge.');
