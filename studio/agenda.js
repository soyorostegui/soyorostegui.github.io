// Agenda entries reuse the existing collection so IDs, history and sync remain compatible.
const AGENDA_TYPES = {post:'Publicación',meeting:'Reunión',class:'Clase',task:'Tarea'};
const AGENDA_STATUS = {Idea:'Planificado','En Diseño':'En curso',Listo:'Listo',Publicado:'Completado'};
const DEFAULT_NETWORKS = ['Instagram','LinkedIn','Behance'].map(name=>({id:'network-'+name.toLowerCase(),name}));
let networks;
try { networks=JSON.parse(localStorage.getItem('po_networks_v1')); } catch (_) {}
if (!Array.isArray(networks)) networks=DEFAULT_NETWORKS.map(n=>({...n}));
function entryType(entry) { return Object.hasOwn(AGENDA_TYPES,entry.type)?entry.type:'post'; }
function entryLabel(entry) { return entryType(entry)==='post'?(entry.channel||'Publicación'):AGENDA_TYPES[entryType(entry)]; }
function entryDetail(entry) {
  if(entryType(entry)==='post')return entry.format||'Sin formato';
  const time=[entry.time,entry.endTime].filter(Boolean).join('–');
  return [entryType(entry)==='task'?'Prioridad: '+(entry.priority||'Normal'):entry.subject,time].filter(Boolean).join(' · ')||'Sin hora';
}
function entryStatusLabel(entry) { return entryType(entry)==='post'?entry.status:(AGENDA_STATUS[entry.status]||entry.status); }
function entrySummary(entry) { return entryType(entry)==='post'?(entry.caption||'Sin copy'):(entry.description||entry.subject||entry.location||'Sin descripción'); }
function agendaToday() {
  if(typeof buildEditorialContext==='function')return buildEditorialContext().today;
  const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function networkNames() { return [...new Set([...networks.map(n=>n.name),...posts.filter(p=>entryType(p)==='post').map(p=>p.channel).filter(Boolean)])].sort((a,b)=>a.localeCompare(b)); }
function agendaOptions(id,values,first=null,selected) {
  const select=document.getElementById(id);if(!select)return;
  const old=selected===undefined?select.value:selected;
  select.replaceChildren();
  for(const [value,label] of [...(first?[first]:[]),...values]) {
    const option=document.createElement('option');option.value=value;option.textContent=label;select.appendChild(option);
  }
  if(Array.from(select.options).some(o=>o.value===old))select.value=old;
}
function refreshAgendaControls() {
  for(const [type,id] of Object.entries({post:'agendaCountPosts',meeting:'agendaCountMeetings',class:'agendaCountClasses',task:'agendaCountTasks'})){const count=document.getElementById(id);if(count)count.textContent=String(posts.filter(p=>entryType(p)===type).length);}
  agendaOptions('filterChannel',networkNames().map(n=>[n,n]),['ALL','Todas las redes']);
  const phases=[...new Set(posts.map(p=>p.phase).filter(Boolean))];
  agendaOptions('filterPhase',phases.map(p=>[p,p]),['ALL','Todas las campañas']);
  const tableLabel=document.getElementById('btn-table');if(tableLabel)tableLabel.textContent=`Tabla (${posts.length} entradas)`;
  renderNetworkSettings();
}
function renderNetworkSettings() {
  const list=document.getElementById('networkSettingsList');if(!list)return;list.replaceChildren();
  for(const network of networks) {
    const row=document.createElement('div');row.className='agenda-network-row';
    const label=document.createElement('span');label.textContent=network.name;
    const button=document.createElement('button');button.type='button';button.className='ai-inline-btn';button.textContent='Eliminar';
    const used=posts.some(p=>entryType(p)==='post'&&p.channel===network.name)||(network.name==='Instagram'&&stories.length>0);
    button.disabled=used;button.title=used?'Esta red tiene entradas. Conservamos sus referencias.':'Eliminar red sin entradas';
    button.addEventListener('click',()=>removeAgendaNetwork(network.id));row.append(label,button);list.appendChild(row);
  }
}
function persistNetworks(next) {
  const old=networks;const keys=['po_networks_v1','po_sync_dirty','po_last_updated_at'];const previous=keys.map(k=>[k,localStorage.getItem(k)]);
  try {
    localStorage.setItem('po_networks_v1',JSON.stringify(next));localStorage.setItem('po_sync_dirty','1');localStorage.setItem('po_last_updated_at',String(Date.now()));networks=next;
  } catch(error) {networks=old;for(const [k,v] of previous)try{v===null?localStorage.removeItem(k):localStorage.setItem(k,v);}catch(_){}throw error;}
  if(typeof scheduleGitHubCloudSync==='function')scheduleGitHubCloudSync();refreshAgendaControls();
}
function addAgendaNetwork() {
  const input=document.getElementById('newNetworkName'),name=input.value.trim(),status=document.getElementById('networkSettingsStatus');
  if(!name||name.length>60){status.textContent='Escribe un nombre de entre 1 y 60 caracteres.';return;}
  if(networkNames().some(n=>n.toLocaleLowerCase()===name.toLocaleLowerCase())){status.textContent='Esa red ya existe.';return;}
  // The normalized name gives simultaneous additions from two devices the same identity.
  const id='network-'+encodeURIComponent(name.normalize('NFKC').toLocaleLowerCase());
  try {persistNetworks([...networks,{id,name}]);input.value='';status.textContent='Red añadida.';} catch(_){status.textContent='No se pudo guardar la red en este dispositivo.';}
}
function removeAgendaNetwork(id) {
  const network=networks.find(n=>n.id===id);if(!network)return;
  if(posts.some(p=>entryType(p)==='post'&&p.channel===network.name)||(network.name==='Instagram'&&stories.length))return;
  try {persistNetworks(networks.filter(n=>n.id!==id));}catch(_){document.getElementById('networkSettingsStatus').textContent='No se pudo eliminar la red.';}
}
function onAgendaTypeChange() {
  const type=document.getElementById('edit-type').value,isPost=type==='post',event=type==='meeting'||type==='class';
  document.querySelectorAll('[data-agenda-post]').forEach(el=>el.hidden=!isPost);
  document.querySelectorAll('[data-agenda-event]').forEach(el=>el.hidden=!event);
  document.querySelectorAll('[data-agenda-meeting]').forEach(el=>el.hidden=type!=='meeting');
  document.querySelectorAll('[data-agenda-class]').forEach(el=>el.hidden=type!=='class');
  document.querySelectorAll('[data-agenda-task]').forEach(el=>el.hidden=type!=='task');
  document.getElementById('agendaDateLabel').textContent=type==='task'?'Fecha límite':'Fecha';
  document.getElementById('agendaTimeLabel').textContent=event?'Hora de inicio':'Hora (opcional)';
  document.getElementById('edit-time').required=event;document.getElementById('edit-endTime').required=event;
  const status=document.getElementById('edit-status'),old=status.value;
  agendaOptions('edit-status',Object.entries(AGENDA_STATUS).map(([key,label])=>[key,isPost?({Idea:'Planificado / Idea','En Diseño':'En diseño',Listo:'Listo para publicar',Publicado:'Publicado'}[key]):label]),null,old);
}
function openAgendaEntry(id=null) {
  const entry=id?posts.find(p=>p.id===id):null;if(id&&!entry)return;
  const value=entry||{type:'post',title:'',date:agendaToday(),status:'Idea',channel:networkNames()[0]||'',format:'Post',phase:''};
  refreshAgendaControls();
  agendaOptions('edit-channel',networkNames().map(n=>[n,n]),['','Seleccionar red'],value.channel||'');
  const phase=document.getElementById('edit-phase');
  if(value.phase&&!Array.from(phase.options).some(o=>o.value===value.phase)){const option=document.createElement('option');option.value=value.phase;option.textContent=value.phase;phase.appendChild(option);}
  const format=document.getElementById('edit-format');
  if(value.format&&!Array.from(format.options).some(o=>o.value===value.format)){const option=document.createElement('option');option.value=value.format;option.textContent=value.format;format.appendChild(option);}
  for(const key of ['title','date','phase','format','structure','caption','description','time','endTime','participants','subject','location','priority']) {
    document.getElementById('edit-'+key).value=value[key]|| (key==='priority'?'Normal':'');
  }
  document.getElementById('edit-id').value=entry?.id||'';document.getElementById('edit-type').value=entryType(value);document.getElementById('edit-status').value=value.status||'Idea';
  onAgendaTypeChange();document.getElementById('agendaFormError').textContent='';
  document.getElementById('drawerStatusTag').textContent=entry?'Editar entrada':'Nueva entrada';document.getElementById('btnDelete').style.display=entry?'block':'none';
  document.getElementById('modalOverlay').style.display='flex';
}
function validateAgendaEntry(entry) {
  if(!Object.hasOwn(AGENDA_TYPES,entry.type))throw Error('Selecciona un tipo de entrada válido.');
  if(!entry.title.trim())throw Error('Escribe un título.');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(entry.date))throw Error('Selecciona una fecha.');
  const date=new Date(entry.date+'T00:00:00Z');if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==entry.date)throw Error('La fecha no es válida.');
  for(const key of ['time','endTime'])if(entry[key]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(entry[key]))throw Error('La hora no es válida.');
  if(['meeting','class'].includes(entry.type)) {
    if(!entry.time||!entry.endTime)throw Error('Indica la hora de inicio y de fin.');
    if(entry.endTime<=entry.time)throw Error('La hora de fin debe ser posterior al inicio, dentro del mismo día.');
  }
  if(!Object.hasOwn(AGENDA_STATUS,entry.status))throw Error('Selecciona un estado válido.');
  if(entry.type==='post'&&!networkNames().includes(entry.channel))throw Error('Selecciona una red o añádela en Ajustes.');
  if(entry.type==='task'&&!['Baja','Normal','Alta'].includes(entry.priority))throw Error('Selecciona una prioridad válida.');
  return entry;
}
function saveAgendaEntry() {
  const get=key=>document.getElementById('edit-'+key).value;
  const id=get('id'),previous=posts.find(p=>p.id===id),type=get('type');
  if(id&&!previous){document.getElementById('agendaFormError').textContent='La entrada ya no existe.';return;}
  const entry={...previous,id:id||'entry-'+(globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random().toString(36).slice(2)),type,title:get('title').trim(),date:get('date'),status:get('status'),phase:get('phase'),description:get('description'),time:get('time'),
    channel:type==='post'?get('channel'):'',format:type==='post'?get('format'):'',structure:type==='post'?get('structure'):'',caption:type==='post'?get('caption'):'',
    endTime:['meeting','class'].includes(type)?get('endTime'):'',location:['meeting','class'].includes(type)?get('location'):'',participants:type==='meeting'?get('participants'):'',subject:type==='class'?get('subject'):'',priority:type==='task'?get('priority'):''};
  const before=posts;const keys=['po_posts_v6','po_sync_dirty','po_last_updated_at'];const stored=keys.map(k=>[k,localStorage.getItem(k)]);
  try {validateAgendaEntry(entry);posts=id?posts.map(p=>p.id===id?entry:p):[...posts,entry];saveToStorage();}
  catch(error){posts=before;for(const [k,v] of stored)try{v===null?localStorage.removeItem(k):localStorage.setItem(k,v);}catch(_){}document.getElementById('agendaFormError').textContent=error.message;return;}
  closeModal();renderCurrentView();
}
