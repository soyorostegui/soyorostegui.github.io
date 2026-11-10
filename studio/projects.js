// Project identity is explicit for new entries; old campaign phases remain readable without destructive migration.
const PORTFOLIO_PROJECT_ID='project-portafolio-2026';
const PORTFOLIO_STAGES=['Fase 1: Señal','Fase 2: Archivo','Fase 3: Convocatoria','Fase 4: Continuidad'];
const DEFAULT_PROJECTS=[{id:PORTFOLIO_PROJECT_ID,name:'Lanzamiento del portafolio',objective:'Presentar el portafolio profesional de Peter Orostegui.',type:'campaign',startDate:'2026-11-09',endDate:'2026-11-25',status:'active',color:'#8b5cf6',stages:PORTFOLIO_STAGES}];
const PROJECT_TYPES={campaign:'Campaña',academic:'Académico',client:'Cliente',personal:'Personal'};
const PROJECT_STATUS={planned:'Planificado',active:'En curso',paused:'En pausa',completed:'Completado',archived:'Archivado'};
let projects;
try{projects=JSON.parse(localStorage.getItem('po_projects_v1'));}catch(_){}
if(!Array.isArray(projects))projects=JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
let selectedProjectId='';
function entryProjectId(entry){return typeof entry.projectId==='string'?entry.projectId:(PORTFOLIO_STAGES.includes(entry.phase)?PORTFOLIO_PROJECT_ID:'');}
function projectForEntry(entry){return projects.find(p=>p.id===entryProjectId(entry))||null;}
function projectLabel(entry){return projectForEntry(entry)?.name||'Sin proyecto';}
function projectEntries(id){return [...posts,...(typeof storyAsAgendaEntry==='function'?stories.map(storyAsAgendaEntry):[])].filter(entry=>entryProjectId(entry)===id);}
function projectProgress(id){
 const entries=projectEntries(id),progress=type=>{const items=entries.filter(p=>entryType(p)===type);return {total:items.length,done:items.filter(p=>p.status==='Publicado').length};};
 return {tasks:progress('task'),posts:progress('post'),meetings:progress('meeting'),classes:progress('class'),
   overdue:entries.filter(p=>entryType(p)==='task'&&p.status!=='Publicado'&&p.date<agendaToday()).length};
}
function refreshProjectControls(){
 agendaOptions('filterProject',[...projects.map(p=>[p.id,p.name]),['NONE','Sin proyecto']],['ALL','Todos los proyectos']);
 const list=document.getElementById('projectOverview');if(list)renderProjectOverview();
 if(selectedProjectId)renderProjectDetail();
}
function fillEntryProjectOptions(selected){agendaOptions('edit-project',projects.map(p=>[p.id,p.name]),['','Sin proyecto'],selected||'');}
function fillEntryStageOptions(selected=''){
 const id=document.getElementById('edit-project').value,project=projects.find(p=>p.id===id);
 agendaOptions('edit-phase',(project?.stages||[]).map(s=>[s,s]),['','Sin etapa'],selected);
 document.getElementById('entryStageGroup').hidden=!project;
}
function onEntryProjectChange(){fillEntryStageOptions();}
function projectNode(tag,text,className){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;}
function projectButton(label,action){const button=projectNode('button',label,'ai-inline-btn');button.type='button';button.addEventListener('click',action);return button;}
function renderProjectOverview(){
 const list=document.getElementById('projectOverview');if(!list)return;list.replaceChildren();
 if(!projects.length)list.appendChild(projectNode('p','Crea un proyecto para agrupar tus actividades.','project-muted'));
 for(const project of projects){
  const card=projectNode('article',undefined,'project-card');card.style.borderLeftColor=/^#[0-9a-f]{6}$/i.test(project.color)?project.color:'#8b5cf6';
  const progress=projectProgress(project.id);
  card.append(projectNode('h3',project.name),projectNode('p',PROJECT_TYPES[project.type]+' · '+PROJECT_STATUS[project.status],'project-muted'),projectNode('p',project.objective||'Sin objetivo definido'),
    projectNode('p',`${project.startDate||'Sin inicio'} → ${project.endDate||'Sin fecha límite'}`,'project-muted'),
    projectNode('p',`Tareas: ${progress.tasks.done}/${progress.tasks.total} · Publicaciones: ${progress.posts.done}/${progress.posts.total}`),
    projectNode('p',`${projectEntries(project.id).length} actividades · ${progress.overdue} tareas vencidas`,'project-muted'),
    projectButton('Abrir proyecto',()=>selectProject(project.id)));list.appendChild(card);
 }
}
function selectProject(id){selectedProjectId=id;renderProjectDetail();document.getElementById('projectDetail')?.scrollIntoView?.({behavior:'smooth',block:'start'});}
function showProjectCalendar(id){
 const project=projects.find(p=>p.id===id);if(!project)return;
 document.getElementById('filterProject').value=id;document.getElementById('filterType').value='ALL';document.getElementById('filterChannel').value='ALL';
 const dates=projectEntries(id).map(e=>e.date).sort();const date=dates.find(d=>d>=agendaToday())||project.startDate||dates[0];
 if(date)setCalendarMonth(date.slice(0,7));switchView('calendar');
}
function renderProjectDetail(){
 const detail=document.getElementById('projectDetail');if(!detail)return;detail.replaceChildren();const project=projects.find(p=>p.id===selectedProjectId);detail.hidden=!project;if(!project)return;
 const head=projectNode('div',undefined,'project-actions');head.append(projectNode('h3',project.name),projectButton('Editar proyecto',()=>openProjectModal(project.id)),projectButton('Nueva actividad',()=>{openAgendaEntry();fillEntryProjectOptions(project.id);fillEntryStageOptions();}),projectButton('Ver en calendario',()=>showProjectCalendar(project.id)),projectButton('Cerrar detalle',()=>{selectedProjectId='';renderProjectDetail();}));detail.appendChild(head);
 detail.appendChild(projectNode('p',project.objective||'Sin objetivo definido'));
 const entries=projectEntries(project.id),progress=projectProgress(project.id);
 detail.appendChild(projectNode('p',`Tareas completadas: ${progress.tasks.done}/${progress.tasks.total}. Publicaciones realizadas: ${progress.posts.done}/${progress.posts.total}. Reuniones completadas: ${progress.meetings.done}/${progress.meetings.total}. Clases completadas: ${progress.classes.done}/${progress.classes.total}.`,'project-muted'));
 detail.appendChild(projectNode('p','El avance usa el estado que marcas en cada entrada; una fecha pasada no completa una actividad.','project-muted'));
 if(project.stages?.length)detail.appendChild(projectNode('p','Etapas: '+project.stages.join(' → '),'project-muted'));
 const upcoming=entries.filter(e=>e.status!=='Publicado'&&e.date>=agendaToday()).sort((a,b)=>a.date.localeCompare(b.date)||(a.time||'').localeCompare(b.time||''))[0];
 detail.appendChild(projectNode('p',upcoming?`Próxima actividad: ${upcoming.date} ${upcoming.time||''} · ${upcoming.title}`:'No hay actividades próximas pendientes.'));
 for(const [key,label] of Object.entries(AGENDA_TYPES)){
  const items=entries.filter(e=>entryType(e)===key).sort((a,b)=>a.date.localeCompare(b.date)||(a.time||'').localeCompare(b.time||''));if(!items.length)continue;
  detail.appendChild(projectNode('h4',label+' · '+items.length));
  for(const entry of items){const row=projectButton(`${entry.date}${entry.time?' '+entry.time:''} · ${entry.title} · ${entryStatusLabel(entry)}${entry.phase?' · '+entry.phase:''}`,()=>openAgendaEntry(entry.id));row.classList.add('project-entry');detail.appendChild(row);}
 }
 if(!entries.length)detail.appendChild(projectNode('p','Este proyecto aún no tiene actividades. Usa Nueva actividad o vincula una entrada existente.','project-muted'));
}
function openProjectModal(id=''){
 const project=id?projects.find(p=>p.id===id):null;if(id&&!project)return;
 const values=project||{id:'',name:'',objective:'',type:'personal',startDate:'',endDate:'',status:'planned',color:'#8b5cf6',stages:[]};
 for(const key of ['id','name','objective','type','startDate','endDate','status','color'])document.getElementById('project-'+key).value=values[key]||'';
 document.getElementById('projectClearRemovedStages').checked=false;
 document.getElementById('project-stages').value=(values.stages||[]).join('\n');document.getElementById('projectFormError').textContent='';
 const button=document.getElementById('projectDelete');button.hidden=!project;button.disabled=!!project&&projectEntries(project.id).length>0;button.title=button.disabled?'El proyecto tiene entradas: archívalo para conservar sus referencias.':'Eliminar proyecto vacío';
 document.getElementById('projectOverlay').style.display='flex';
}
function openEntryProjectStages(){const id=document.getElementById('edit-project').value;if(!id)return;openProjectModal(id);const field=document.getElementById('project-stages');field.focus?.();field.scrollIntoView?.({block:'center'});}
function closeProjectModal(){document.getElementById('projectOverlay').style.display='none';}
function validateProject(project,allowStageRemoval=false){
 if(!project.name.trim()||project.name.length>100)throw Error('Escribe un nombre de hasta 100 caracteres.');
 if(!Object.hasOwn(PROJECT_TYPES,project.type)||!Object.hasOwn(PROJECT_STATUS,project.status))throw Error('Tipo o estado de proyecto no válido.');
 if(!/^#[0-9a-f]{6}$/i.test(project.color))throw Error('Selecciona un color válido.');
 for(const key of ['startDate','endDate'])if(project[key]){const d=new Date(project[key]+'T00:00:00Z');if(!/^\d{4}-\d{2}-\d{2}$/.test(project[key])||!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==project[key])throw Error('La fecha del proyecto no es válida.');}
 if(project.startDate&&project.endDate&&project.endDate<project.startDate)throw Error('La fecha final no puede ser anterior al inicio.');
 if(project.stages.length>20||project.stages.some(s=>s.length>100)||new Set(project.stages.map(s=>s.toLocaleLowerCase())).size!==project.stages.length)throw Error('Usa hasta 20 etapas distintas de hasta 100 caracteres.');
 if(!allowStageRemoval&&projectEntries(project.id).some(e=>e.phase&&!project.stages.includes(e.phase)))throw Error('Hay etapas en uso. Reasigna sus entradas o marca dejar sin etapa las actividades afectadas.');
 return project;
}
function persistProjects(next,changedEntries=null){
 const previous=projects,oldPosts=posts,oldStories=stories,keys=['po_projects_v1','po_posts_v6','po_stories_v1','po_sync_dirty','po_last_updated_at'],stored=keys.map(k=>[k,localStorage.getItem(k)]);
 try{localStorage.setItem('po_projects_v1',JSON.stringify(next));if(changedEntries){localStorage.setItem('po_posts_v6',JSON.stringify(changedEntries.posts));localStorage.setItem('po_stories_v1',JSON.stringify(changedEntries.stories));}localStorage.setItem('po_sync_dirty','1');localStorage.setItem('po_last_updated_at',String(Date.now()));projects=next;if(changedEntries){posts=changedEntries.posts;stories=changedEntries.stories;}}
 catch(error){projects=previous;posts=oldPosts;stories=oldStories;for(const[k,v]of stored)try{v===null?localStorage.removeItem(k):localStorage.setItem(k,v);}catch(_){}throw error;}
 if(typeof scheduleGitHubCloudSync==='function')scheduleGitHubCloudSync();renderCurrentView();
}
function saveProject(){
 const value=k=>document.getElementById('project-'+k).value,id=value('id');
 if(id&&!projects.some(p=>p.id===id)){document.getElementById('projectFormError').textContent='El proyecto ya no existe.';return;}
 const project={id:id||'project-'+(globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random().toString(36).slice(2)),name:value('name').trim(),objective:value('objective').trim(),type:value('type'),startDate:value('startDate'),endDate:value('endDate'),status:value('status'),color:value('color'),stages:value('stages').split('\n').map(s=>s.trim()).filter(Boolean)};
 const clearRemoved=document.getElementById('projectClearRemovedStages').checked;
 const clean=entry=>entryProjectId(entry)===project.id&&entry.phase&&!project.stages.includes(entry.phase)?{...entry,phase:''}:entry;
 try{validateProject(project,clearRemoved);persistProjects(id?projects.map(p=>p.id===id?project:p):[...projects,project],clearRemoved?{posts:posts.map(clean),stories:stories.map(clean)}:null);}
 catch(error){document.getElementById('projectFormError').textContent=error.message;return;}
 if(document.getElementById('modalOverlay').style.display==='flex'){const selected=id?document.getElementById('edit-project').value:project.id;const stage=document.getElementById('edit-phase').value;fillEntryProjectOptions(selected);fillEntryStageOptions(stage);}
 closeProjectModal();selectedProjectId=project.id;renderProjectDetail();
}
function deleteProject(){
 const id=document.getElementById('project-id').value;if(!id||projectEntries(id).length)return;
 try{persistProjects(projects.filter(p=>p.id!==id));if(selectedProjectId===id)selectedProjectId='';closeProjectModal();renderProjectDetail();}catch(error){document.getElementById('projectFormError').textContent=error.message;}
}
