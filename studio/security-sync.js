// GitHub Pages: the password decrypts credentials; it does not hide public site files.
function unlockStudioUI() {
  document.getElementById("authOverlay").classList.add("hidden");
  document.body.classList.remove("auth-locked");
}
function lockStudioSession() { return StudioCredentialVault.lock(); }
function toggleAuthPasswordVisibility() {
  const input = document.getElementById("authPasswordInput");
  input.type = input.type === "password" ? "text" : "password";
}
function handleStudioLogin(event) { return StudioCredentialVault.login(event); }
function changeStudioPasswordFlow() { StudioCredentialVault.openPasswordDialog(); }
function initStudioAuth() { return StudioCredentialVault.init(); }

    function decodeUtf8Base64Url(b64url) {
      let b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder().decode(bytes);
    }

    function showSyncModalStatus(text, isError) {
      const box = document.getElementById("syncModalStatusMsg");
      if (!box) return;
      box.style.display = "block";
      box.style.background = isError ? "var(--tag-red-bg)" : "var(--tag-green-bg)";
      box.style.color = isError ? "var(--tag-red-text)" : "var(--tag-green-text)";
      box.textContent = text;
    }

// GitHub Pages: automatic three-way sync, durable base, atomic state/context commits.
const GH_REPO_OWNER='soyorostegui', GH_REPO_NAME='soyorostegui.github.io';
const GH_STATE_PATH='studio/studio-cloud-state.json', GH_CONTEXT_MD_PATH='studio/CONTEXTO_CONVERSACIONES_IA.md';
const GH_API=`https://api.github.com/repos/${GH_REPO_OWNER}/${GH_REPO_NAME}`;
let ghCloudSyncTimer=null, syncFlight=null, syncAgain=false, syncRetryTimer=null, retryCount=0, nextSyncAt=0, blockedToken=null;
let stateSyncConflict=null, tabBaseRecord=null;
try { tabBaseRecord=JSON.parse(localStorage.getItem('po_sync_base_record')||'null'); } catch (_) {}
const cloneSync = value => JSON.parse(JSON.stringify(value));
function readSyncJson(key,fallback) { try { return JSON.parse(localStorage.getItem(key)||'null')??fallback; } catch (_) { return fallback; } }
function buildCloudStateObject() {
  return cloneSync({version:4,updatedAt:Number(localStorage.getItem('po_last_updated_at'))||0,updatedAtISO:new Date().toISOString(),
    posts,stories,highlights,projects:typeof projects==='undefined'?undefined:projects,networks:typeof networks==='undefined'?undefined:networks,chatHistory,importedCustomContextNotes:importedCustomContextNotes||'',
    chatResetId:localStorage.getItem('po_ai_chat_reset')||'legacy',tombstones:readSyncJson('po_sync_tombstones',{})});
}
function canonicalSyncValue(value) { if(Array.isArray(value))return value.map(canonicalSyncValue);if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonicalSyncValue(value[k])]));return value; }
function editorialSyncContent(value) { return StudioSyncMerge.normalize({...value,stories:(value.stories||[]).map(normalizeStoryEntry)}); }
function sameEditorialContent(a,b) { return StudioSyncMerge.equal(editorialSyncContent(a),editorialSyncContent(b)); }
function parseRemoteState(meta) {
  const value=JSON.parse(decodeUtf8Base64Url(meta.content.replace(/\s+/g,'')));
  if(!meta.sha||!value||!['posts','stories','highlights','chatHistory'].every(k=>Array.isArray(value[k])))throw Error('El respaldo de GitHub no tiene un formato válido. Se conserva el estado local.');
  // Validate identifiers before applying data to any renderer.
  StudioSyncMerge.merge(value,value,value);
  return value;
}
function applyCloudStateObject(input) {
  const state=editorialSyncContent(input), before=buildCloudStateObject();
  const values={po_projects_v1:state.projects,po_networks_v1:state.networks,po_posts_v6:state.posts,po_stories_v1:state.stories,po_highlights_v1:state.highlights,po_ai_chat_history:state.chatHistory,po_sync_tombstones:state.tombstones};
  const old=Object.keys(values).concat(['po_ai_imported_notes','po_ai_chat_reset']).map(k=>[k,localStorage.getItem(k)]);
  localStorage.setItem('po_sync_recovery',JSON.stringify(before));
  try {
    for(const [key,value] of Object.entries(values))localStorage.setItem(key,JSON.stringify(value));
    localStorage.setItem('po_ai_imported_notes',state.importedCustomContextNotes);localStorage.setItem('po_ai_chat_reset',state.chatResetId);
  } catch(error) {
    for(const [key,value] of old)try{if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value);}catch(_){}
    throw Error('No se pudo guardar la combinación en este navegador. Se conserva el respaldo local.');
  }
  if(typeof networks!=='undefined')networks=state.networks;
  if(typeof projects!=='undefined')projects=state.projects;
  posts=state.posts;stories=state.stories;highlights=state.highlights;chatHistory=state.chatHistory;importedCustomContextNotes=state.importedCustomContextNotes;
  renderCurrentView();if(typeof renderSavedChatHistory==='function')renderSavedChatHistory();return true;
}
function rememberCommonBase(state,sha) {
  const record={sha,state:editorialSyncContent(state)};
  localStorage.setItem('po_sync_base_record',JSON.stringify(record));localStorage.setItem('po_sync_base_sha',sha);tabBaseRecord=record;
}
function clearStateSyncConflict() { stateSyncConflict=null;const panel=document.getElementById('stateSyncConflictPanel');if(panel)panel.hidden=true; }
function updateGhCloudStatusUI(text,colorBg,colorText) {
  const token=secretStorage.getItem('po_gh_repo_token')||'',input=document.getElementById('ghRepoTokenInput');if(input&&token&&!input.value)input.value=token;
  const setup=document.getElementById('githubTokenSetup');if(setup)setup.hidden=!!token&&blockedToken!==token;
  const message=text||(token?'Sincronización automática lista':'Guardado en este dispositivo');
  const compact = /incompatibles/.test(message) ? 'Revisar cambios' : /Sin conexión/.test(message) ? 'Sin conexión' :
    /Sincronizando/.test(message) ? 'Sincronizando…' : /reintent|conservados|Revisa el token|limita consultas/.test(message) ? 'Guardado local · pendiente' :
    /Sincronizado con GitHub/.test(message) ? 'Guardado' : 'Guardado local';
  for(const id of ['ghCloudStatusBadge','globalSyncStatus','ctxDiskSyncStatus']){
    const badge=document.getElementById(id);if(!badge)continue;
    badge.textContent=id==='ghCloudStatusBadge'?message:compact;badge.title=message;
    if(id!=='globalSyncStatus'){if(colorBg)badge.style.background=colorBg;if(colorText)badge.style.color=colorText;}
  }
}
function syncCountSummary(state) { return `${state.posts.length} publicaciones, ${state.stories.length} historias y ${state.chatHistory.length} mensajes`; }
function conflictSignature(conflicts) { return JSON.stringify(canonicalSyncValue(conflicts)); }
function stageStateSyncConflict(local,remote,sha,base=null,conflicts=[]) {
  localStorage.setItem('po_sync_conflict_backup',JSON.stringify({version:2,createdAt:new Date().toISOString(),remoteSha:sha,base,local,remote,conflicts}));
  localStorage.setItem('po_sync_recovery',JSON.stringify(local));
  stateSyncConflict={remoteSha:sha,base,signature:conflictSignature(conflicts)};
  const panel=document.getElementById('stateSyncConflictPanel');if(panel){
    panel.hidden=false;document.getElementById('stateSyncConflictLocal').textContent='Este dispositivo: '+syncCountSummary(local);
    document.getElementById('stateSyncConflictRemote').textContent='GitHub: '+syncCountSummary(remote);
    const details=document.getElementById('stateSyncConflictDetails');if(details)details.textContent=conflicts.slice(0,8).map(c=>`${c.entity} · ${c.id||''} · ${c.field}: ${c.kind}`).join('\n');
  }
  updateGhCloudStatusUI('Hay ediciones incompatibles: ambas están respaldadas','var(--tag-yellow-bg)','var(--tag-yellow-text)');
  showSyncModalStatus('Los demás cambios se pueden combinar. Solo falta elegir qué edición usar en los campos indicados; ambas copias están respaldadas.',true);
}
function exportSyncBackup(key,name) {
  const raw=localStorage.getItem(key);if(!raw){showSyncModalStatus('Todavía no hay un respaldo disponible.',true);return;}
  const url=URL.createObjectURL(new Blob([raw],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function exportRecoverySnapshot(){exportSyncBackup('po_sync_recovery','studio-recuperacion.json');}
function exportStateConflictBackup(){exportSyncBackup('po_sync_conflict_backup','studio-conflicto-ambas-copias.json');}
function editorOpen(){return (typeof calendarDragEntry!=='undefined'&&calendarDragEntry!==null)||['modalOverlay','storyOverlay','projectOverlay'].some(id=>document.getElementById(id)?.style.display==='flex');}
async function githubSyncRequest(path,token,options={}) {
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
  const headers={Accept:'application/vnd.github+json',...options.headers};if(token)headers.Authorization='Bearer '+token;
  try {
    const response=await fetch(GH_API+path,{...options,headers,signal:controller.signal,cache:'no-store'});
    if(!response.ok){
      const error=Error('GitHub HTTP '+response.status);error.status=response.status;
      const remaining=response.headers?.get('x-ratelimit-remaining'),reset=Number(response.headers?.get('x-ratelimit-reset'))*1000;
      if(response.status===429||(response.status===403&&remaining==='0'))error.retryAt=reset>Date.now()?reset:Date.now()+60000;
      throw error;
    }
    return await response.json();
  } finally {clearTimeout(timer);}
}
async function readRemoteSnapshot(token) {
  const branch=await githubSyncRequest('/branches/main?t='+Date.now(),token);
  const head=branch.commit?.sha,tree=branch.commit?.commit?.tree?.sha;
  if(!head||!tree)throw Error('GitHub no devolvió la referencia del repositorio.');
  const meta=await githubSyncRequest(`/contents/${GH_STATE_PATH}?ref=${head}`,token);
  return {head,tree,sha:meta.sha,state:parseRemoteState(meta)};
}
async function commonBase(remote,token) {
  const outbound=readSyncJson('po_sync_outbound',null);
  if(outbound?.blobSha===remote.sha)return outbound.localBefore;
  if(tabBaseRecord?.state&&tabBaseRecord.sha)return tabBaseRecord.state;
  const sha=localStorage.getItem('po_sync_base_sha');
  if(sha===remote.sha)return remote.state;
  if(sha){
    try{const meta=await githubSyncRequest('/git/blobs/'+sha,token);const state=parseRemoteState({...meta,sha});rememberCommonBase(state,sha);return state;}
    catch(error){if(error.status!==404)throw error;}
  }
  return null;
}
async function gitBlobSha(content) {
  const bytes=new TextEncoder().encode(content),header=new TextEncoder().encode('blob '+bytes.length+'\0'),input=new Uint8Array(header.length+bytes.length);input.set(header);input.set(bytes,header.length);
  return [...new Uint8Array(await crypto.subtle.digest('SHA-1',input))].map(x=>x.toString(16).padStart(2,'0')).join('');
}
async function publishAtomicState(remote,candidate,localBefore,token) {
  const content=JSON.stringify(candidate,null,2),blobSha=await gitBlobSha(content);
  const context=buildContextMarkdown(candidate);
  const tree=await githubSyncRequest('/git/trees',token,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({base_tree:remote.tree,tree:[
    {path:GH_STATE_PATH,mode:'100644',type:'blob',content},{path:GH_CONTEXT_MD_PATH,mode:'100644',type:'blob',content:context}
  ]})});
  const commit=await githubSyncRequest('/git/commits',token,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:'sync(studio): combinar y guardar calendario y contexto',tree:tree.sha,parents:[remote.head]})});
  if(!tree.sha||!commit.sha)throw Error('GitHub no confirmó la creación del guardado.');
  localStorage.setItem('po_sync_outbound',JSON.stringify({blobSha,state:candidate,localBefore}));
  if(globalThis.StudioCredentialVault&&!StudioCredentialVault.active){const error=Error('Bóveda bloqueada');error.cancelled=true;throw error;}
  await githubSyncRequest('/git/refs/heads/main',token,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({sha:commit.sha,force:false})});
  return blobSha;
}
function deferSync(milliseconds){clearTimeout(syncRetryTimer);syncRetryTimer=setTimeout(()=>requestAutomaticSync(false),milliseconds);}
function markSyncComplete(message='Sincronizado con GitHub') {
  retryCount=0;nextSyncAt=0;localStorage.setItem('po_last_saved_time_str',new Date().toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit'}));
  updateGhCloudStatusUI(message,'var(--tag-green-bg)','var(--tag-green-text)');
}
async function performAutomaticSync(manual,decision=null) {
  const token=sanitizeApiKey(secretStorage.getItem('po_gh_repo_token')||'');
  if(manual)blockedToken=null;
  if(blockedToken&&blockedToken===token)return false;
  if(globalThis.navigator?.onLine===false){updateGhCloudStatusUI('Sin conexión · cambios guardados en este dispositivo');deferSync(60000);return false;}
  if(blockedToken!==token)blockedToken=null;
  if(Date.now()<nextSyncAt){deferSync(nextSyncAt-Date.now());return false;}
  if(editorOpen()){deferSync(2000);return false;}
  for(let attempt=0;attempt<3;attempt++){
    try {
      const starting=buildCloudStateObject(),fresh=!tabBaseRecord&&!localStorage.getItem('po_sync_base_sha')&&!localStorage.getItem('po_sync_dirty')&&!starting.updatedAt;
      updateGhCloudStatusUI('Sincronizando…','var(--tag-blue-bg)','var(--tag-blue-text)');
      const remote=await readRemoteSnapshot(token),base=await commonBase(remote,token),local=buildCloudStateObject();
      if(globalThis.StudioCredentialVault&&!StudioCredentialVault.active)return false;
      if(editorOpen()){deferSync(2000);return false;}
      let merged=fresh&&sameEditorialContent(starting,local)?{ok:true,state:editorialSyncContent(remote.state),conflicts:[]}:
        StudioSyncMerge.merge(base&&editorialSyncContent(base),editorialSyncContent(local),editorialSyncContent(remote.state));
      if(!merged.ok){
        if(decision&&conflictSignature(merged.conflicts)===decision.signature)merged=StudioSyncMerge.merge(base&&editorialSyncContent(base),editorialSyncContent(local),editorialSyncContent(remote.state),{prefer:decision.prefer});
        else{stageStateSyncConflict(local,remote.state,remote.sha,base,merged.conflicts);return false;}
      }
      const candidate={...merged.state,version:4,updatedAt:Date.now(),updatedAtISO:new Date().toISOString()};
      if(sameEditorialContent(candidate,remote.state)){
        if(!sameEditorialContent(local,candidate))applyCloudStateObject(candidate);
        rememberCommonBase(candidate,remote.sha);localStorage.removeItem('po_sync_dirty');localStorage.removeItem('po_sync_outbound');clearStateSyncConflict();markSyncComplete(token?'Sincronizado con GitHub':'Datos cargados · guardado local');return true;
      }
      if(!token){
        if(!sameEditorialContent(local,candidate))applyCloudStateObject(candidate);
        rememberCommonBase(remote.state,remote.sha);localStorage.setItem('po_sync_dirty','1');updateGhCloudStatusUI('Guardado local · configura GitHub una sola vez');return false;
      }
      const sha=await publishAtomicState(remote,candidate,local,token);
      const current=buildCloudStateObject(),rebased=StudioSyncMerge.merge(editorialSyncContent(local),editorialSyncContent(current),editorialSyncContent(candidate));
      if(!rebased.ok||editorOpen()){
        // Retain the causal fork for edits made while the confirmed write was in flight.
        rememberCommonBase(local,sha);localStorage.setItem('po_sync_dirty','1');localStorage.removeItem('po_sync_outbound');
        if(!rebased.ok)stageStateSyncConflict(current,candidate,sha,local,rebased.conflicts);else deferSync(2000);
        return false;
      }
      if(!sameEditorialContent(current,rebased.state))applyCloudStateObject(rebased.state);
      rememberCommonBase(candidate,sha);localStorage.removeItem('po_sync_outbound');clearStateSyncConflict();
      if(sameEditorialContent(buildCloudStateObject(),candidate))localStorage.removeItem('po_sync_dirty');else{localStorage.setItem('po_sync_dirty','1');syncAgain=true;}
      markSyncComplete();return true;
    } catch(error) {
      if(error.cancelled)return false;
      if([409,422].includes(error.status)&&attempt<2)continue;
      if([401,403].includes(error.status)&&!error.retryAt){blockedToken=token;updateGhCloudStatusUI('Revisa el token de GitHub · datos guardados localmente','var(--tag-yellow-bg)','var(--tag-yellow-text)');if(manual)showSyncModalStatus('GitHub rechazó el token o sus permisos. Actualízalo una vez en la bóveda; tus cambios siguen en el dispositivo.',true);return false;}
      retryCount++;nextSyncAt=error.retryAt||Date.now()+Math.min(60000,2000*2**Math.min(retryCount,5));
      updateGhCloudStatusUI(error.retryAt?'GitHub limita consultas · se reintentará automáticamente':'Cambios locales conservados · reintentando automáticamente','var(--tag-yellow-bg)','var(--tag-yellow-text)');
      if(manual)showSyncModalStatus(error.message+' Se reintentará sin descartar cambios.',true);
      deferSync(nextSyncAt-Date.now());return false;
    }
  }
}
function requestAutomaticSync(manual=false,decision=null) {
  if(globalThis.StudioCredentialVault&&!StudioCredentialVault.active)return Promise.resolve(false);
  if(syncFlight){syncAgain=true;return syncFlight;}
  const task=async()=>{let result=false,round=0;do{syncAgain=false;result=await performAutomaticSync(manual,decision);}while(syncAgain&&++round<3&&!stateSyncConflict);if(syncAgain)deferSync(1000);return result;};
  const lock=globalThis.navigator?.locks;
  const operation=lock?lock.request('peter-studio-github-sync',task).catch(error=>{if(['SecurityError','NotSupportedError'].includes(error.name))return task();throw error;}):task();
  syncFlight=operation.catch(()=>{updateGhCloudStatusUI('Guardado local · reintentando sincronización');deferSync(5000);return false;}).finally(()=>{syncFlight=null;});return syncFlight;
}
function pullStateFromGitHubRepoNow(manual=false){return requestAutomaticSync(manual);}
function pushStateToGitHubRepoNow(manual=false){return requestAutomaticSync(manual);}
function resolveStateSyncConflict(choice) {
  if(!stateSyncConflict||!['local','remote'].includes(choice))return Promise.resolve(false);
  return requestAutomaticSync(true,{prefer:choice,signature:stateSyncConflict.signature});
}
function scheduleGitHubCloudSync(immediate=false){clearTimeout(ghCloudSyncTimer);ghCloudSyncTimer=setTimeout(()=>requestAutomaticSync(false),immediate?100:2500);}
function onGitHubTokenInput(){showSyncModalStatus('Pulsa Guardar acceso para guardar este token en la bóveda.',false);}
async function saveGitHubRepoTokenAndPush(){
  const token=sanitizeApiKey(document.getElementById('ghRepoTokenInput')?.value||'');if(!token){showSyncModalStatus('Introduce tu token de GitHub para la primera configuración.',true);return;}
  secretStorage.setItem('po_gh_repo_token',token);blockedToken=null;
  try{await StudioCredentialVault.save(true);await requestAutomaticSync(true);}catch(error){showSyncModalStatus(error.message,true);}
}
function startAutomaticSync(){
  const resume=()=>{nextSyncAt=0;scheduleGitHubCloudSync(true);};
  window.addEventListener('online',resume);window.addEventListener('focus',()=>scheduleGitHubCloudSync(true));
  window.addEventListener('storage',event=>{if(['po_posts_v6','po_stories_v1','po_highlights_v1','po_ai_chat_history','po_networks_v1','po_projects_v1','po_sync_base_record'].includes(event.key))scheduleGitHubCloudSync(true);});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')scheduleGitHubCloudSync(true);});
  setInterval(()=>{if(document.visibilityState!=='hidden')requestAutomaticSync(false);},60000);
}
// Inicializar
initStudioAuth();setupKanbanDropZones();renderCurrentView();updateApiKeyStatus();updateQuickAiSwitchers();restoreCopilotPanelState();updateGhCloudStatusUI();startAutomaticSync();
window.addEventListener('keydown',event=>{if(event.key!=='Escape')return;for(const [id,close] of [['projectOverlay',closeProjectModal],['keyModalOverlay',closeKeyModal],['modalOverlay',closeModal]]){const el=document.getElementById(id);if(el?.style.display==='flex'){close();return;}}});
