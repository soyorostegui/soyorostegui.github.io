// Editable option catalogs. Hiding an option never rewrites historical entries.
const MAIN_NETWORKS=['Instagram','Facebook','LinkedIn','TikTok','YouTube','X','Threads','Pinterest','WhatsApp','Telegram','Twitch','Snapchat','Bluesky','Mastodon','Behance'];
const DEFAULT_PUBLICATION_FORMATS=['Post','Carrusel','Video','Reel','Historia','Directo','Artículo','Podcast','Otro','Reflexiones','Procesos','Logros','Cultura','Opiniones','Hitos','Landing'].map(name=>({id:'format-'+encodeURIComponent(name.normalize('NFKC').toLocaleLowerCase()),name}));
let publicationFormats;
try{publicationFormats=JSON.parse(localStorage.getItem('po_publication_formats_v1'));}catch(_){}
if(!Array.isArray(publicationFormats))publicationFormats=DEFAULT_PUBLICATION_FORMATS.map(f=>({...f}));
let optionCatalogKind='networks';
function catalogItems(kind){
 const saved=kind==='networks'?networks:publicationFormats;
 const presets=kind==='networks'?MAIN_NETWORKS.map(name=>({id:'network-'+encodeURIComponent(name.normalize('NFKC').toLocaleLowerCase()),name})):[];
 const historic=posts.filter(p=>entryType(p)==='post').map(p=>kind==='networks'?p.channel:p.format).filter(Boolean).map(name=>({id:(kind==='networks'?'network-':'format-')+encodeURIComponent(name.normalize('NFKC').toLocaleLowerCase()),name}));
 const map=new Map();for(const option of [...presets,...historic,...saved])map.set(option.name.normalize('NFKC').toLocaleLowerCase(),option);return [...map.values()];
}
function availableCatalogNames(kind){return catalogItems(kind).filter(o=>!o.hidden).map(o=>o.name);}
function networkFilterNames(){return [...new Set([...networkNames(),...posts.filter(p=>entryType(p)==='post').map(p=>p.channel),...stories.map(s=>s.channel||'Instagram')].filter(Boolean))].sort((a,b)=>a.localeCompare(b));}
function publicationFormatNames(){return availableCatalogNames('publicationFormats');}
function fillPublicationFormats(selected=''){
 const names=publicationFormatNames();if(selected&&!names.includes(selected))names.push(selected);
 agendaOptions('edit-format',names.map(name=>[name,name]),['','Seleccionar tipo de publicación'],selected);
}
function refreshPublicationOptions(){
 const select=document.getElementById('edit-channel'),selected=select?.value||'';const names=networkNames();if(selected&&!names.includes(selected))names.push(selected);
 agendaOptions('edit-channel',names.map(name=>[name,name]),['','Seleccionar red'],selected);
 fillPublicationFormats(document.getElementById('edit-format')?.value||'');renderOptionCatalog();
}
function persistOptionCatalog(kind,next){
 if(kind==='networks'){persistNetworks(next);return;}
 const old=publicationFormats,keys=['po_publication_formats_v1','po_sync_dirty','po_last_updated_at'],before=keys.map(k=>[k,localStorage.getItem(k)]);
 try{localStorage.setItem(keys[0],JSON.stringify(next));localStorage.setItem(keys[1],'1');localStorage.setItem(keys[2],String(Date.now()));publicationFormats=next;}
 catch(error){publicationFormats=old;for(const[k,v]of before)try{v===null?localStorage.removeItem(k):localStorage.setItem(k,v);}catch(_){}throw error;}
 if(typeof scheduleGitHubCloudSync==='function')scheduleGitHubCloudSync();
}
function openOptionCatalog(kind){optionCatalogKind=kind;document.getElementById('optionCatalogTitle').textContent=kind==='networks'?'Redes sociales':'Tipos de publicación';document.getElementById('optionCatalogName').value='';document.getElementById('optionCatalogStatus').textContent='';renderOptionCatalog();document.getElementById('optionCatalogOverlay').style.display='flex';}
function closeOptionCatalog(){document.getElementById('optionCatalogOverlay').style.display='none';}
function renderOptionCatalog(){
 const list=document.getElementById('optionCatalogList');if(!list)return;list.replaceChildren();
 for(const item of catalogItems(optionCatalogKind)){
  const row=document.createElement('div');row.className='agenda-network-row';const label=document.createElement('span');label.textContent=item.name+(item.hidden?' · Oculto':'');
  const button=document.createElement('button');button.type='button';button.className='ai-inline-btn';button.textContent=item.hidden?'Mostrar':'Quitar de la lista';button.addEventListener('click',()=>toggleCatalogOption(optionCatalogKind,item.name));row.append(label,button);list.appendChild(row);
 }
}
function toggleCatalogOption(kind,name){
 const item=catalogItems(kind).find(o=>o.name===name);if(!item)return;
 const saved=kind==='networks'?networks:publicationFormats,next=saved.filter(o=>o.name.normalize('NFKC').toLocaleLowerCase()!==name.normalize('NFKC').toLocaleLowerCase());
 try{persistOptionCatalog(kind,[...next,{...item,hidden:!item.hidden}]);
   const id=document.getElementById('edit-id').value,existing=posts.find(p=>p.id===id)||(stories.find(p=>p.id===id)?storyAsAgendaEntry(stories.find(p=>p.id===id)):null),key=kind==='networks'?'channel':'format',select=document.getElementById('edit-'+key);
   if(!item.hidden&&select.value===name&&existing?.[key]!==name)select.value='';
   refreshAgendaControls();refreshPublicationOptions();onPublicationFormatChange();document.getElementById('optionCatalogStatus').textContent='Opción actualizada. Las entradas existentes se conservan.';}
 catch(_){document.getElementById('optionCatalogStatus').textContent='No se pudo guardar la opción.';}
}
function addCatalogOption(){
 const input=document.getElementById('optionCatalogName'),name=input.value.trim(),status=document.getElementById('optionCatalogStatus'),kind=optionCatalogKind;
 if(!name||name.length>60){status.textContent='Escribe un nombre de entre 1 y 60 caracteres.';return;}
 if(catalogItems(kind).some(o=>o.name.normalize('NFKC').toLocaleLowerCase()===name.normalize('NFKC').toLocaleLowerCase())){status.textContent='Esa opción ya existe. Si está oculta, pulsa Mostrar.';return;}
 const saved=kind==='networks'?networks:publicationFormats,item={id:(kind==='networks'?'network-':'format-')+encodeURIComponent(name.normalize('NFKC').toLocaleLowerCase()),name};
 try{persistOptionCatalog(kind,[...saved,item]);refreshAgendaControls();refreshPublicationOptions();document.getElementById(kind==='networks'?'edit-channel':'edit-format').value=name;input.value='';status.textContent='Opción añadida y seleccionada.';onPublicationFormatChange();}
 catch(_){status.textContent='No se pudo guardar la opción.';}
}
function storyAsAgendaEntry(story){return {...story,status:story.status||'Idea',title:story.name,type:'post',format:'Historia',channel:story.channel||'Instagram',description:story.context||'',__story:true};}
function onPublicationFormatChange(){
 const isStory=document.getElementById('edit-type').value==='post'&&document.getElementById('edit-format').value==='Historia';
 const fields=document.getElementById('publicationStoryFields');if(fields)fields.hidden=!isStory;
 const group=document.getElementById('publicationHighlightGroup');if(group)group.hidden=!isStory||document.getElementById('edit-channel').value!=='Instagram';
}
function fillPublicationStoryFields(story=null){
 agendaOptions('edit-storyMedia',(typeof STORY_FORMATS==='undefined'?['Foto','Video','Texto']:STORY_FORMATS).map(f=>[f,f]),null,story?.format||'Foto');
 agendaOptions('edit-highlight',highlights.map(h=>[h.id,h.name]),['','Sin destacada'],story?.highlightId||'');onPublicationFormatChange();
}
