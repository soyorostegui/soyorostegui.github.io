/* GitHub Pages credential vault: remote ciphertext, local non-extractable device key. */
const StudioCredentialVault = (() => {
  const CACHE = 'po_credential_vault_v1', BASE = 'po_credential_vault_sha', DIRTY = 'po_credential_vault_dirty';
  const PATH = 'studio/credential-vault.json';
  const API = 'https://api.github.com/repos/soyorostegui/soyorostegui.github.io/contents/' + PATH;
  const legacyKeys = ['po_api_vault','po_ai_key','po_gemini_key','po_gh_repo_token'];
  const memory = new Map();
  let managed = false, active = false, envelope = null, key = null, remoteSha = null;
  let busy = false, timer = null, serial = Promise.resolve(), setup = false, generation = 0;
  let dbPromise;
  const element = id => document.getElementById(id);
  const status = (message, error = false) => {
    const label = element('credentialVaultStatus');
    if (label) { label.hidden = !error; label.textContent = message; label.style.color = error ? '#b45309' : 'var(--text-muted)'; }
  };
  function authError(message) { const box = element('authErrorMsg'); box.textContent = message; box.style.display = 'block'; }
  function db() {
    if (!dbPromise) dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open('peter-studio-device-key', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('keys');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(Error('No se pudo recordar este dispositivo.'));
      request.onblocked = () => reject(Error('El almacenamiento del dispositivo está bloqueado.'));
    });
    return dbPromise;
  }
  async function deviceRecord(mode, value) {
    const database = await db();
    return new Promise((resolve, reject) => {
      const tx = database.transaction('keys', mode === 'get' ? 'readonly' : 'readwrite');
      const store = tx.objectStore('keys');
      const request = mode === 'get' ? store.get('credentials') : mode === 'put' ? store.put(value, 'credentials') : store.delete('credentials');
      tx.oncomplete = () => resolve(request.result);
      tx.onerror = tx.onabort = () => reject(Error('No se pudo actualizar la memoria de este dispositivo.'));
    });
  }
  async function rememberDevice(remember) {
    localStorage.setItem('po_vault_remember', remember ? '1' : '0');
    try {
      if (remember && key && envelope) await deviceRecord('put', { key, salt: envelope.salt, iterations: envelope.iterations });
      else await deviceRecord('delete');
    } catch (error) {
      localStorage.setItem('po_vault_remember', '0');
      status('Bóveda abierta. No se pudo recordar este dispositivo; la próxima visita necesitará contraseña.', true);
    }
    if (element('rememberSecretsCheck')) element('rememberSecretsCheck').checked = localStorage.getItem('po_vault_remember') === '1';
  }
  function snapshot() {
    return { version:1, providers:JSON.parse(memory.get('po_api_vault') || '{}'), githubToken:memory.get('po_gh_repo_token') || '',
      activeProvider:currentAiProvider, activeModel:currentAiModel, activeVersion:currentAiVersion, activeEndpoint:currentAiEndpoint };
  }
  function legacySnapshot() {
    return {version:1,providers:JSON.parse(JSON.stringify(apiVault)),githubToken:secretStorage.getItem('po_gh_repo_token') || '',
      activeProvider:currentAiProvider,activeModel:currentAiModel,activeVersion:currentAiVersion,activeEndpoint:currentAiEndpoint};
  }
  function hydrate(payload) {
    const providers = {};
    for (const provider of Object.keys(AI_PROVIDERS)) {
      const entry = payload.providers[provider];
      if (entry && typeof entry.key === 'string') providers[provider] = {
        key:entry.key, model:typeof entry.model === 'string' ? entry.model : AI_PROVIDERS[provider].defaultModel,
        endpoint:typeof entry.endpoint === 'string' ? entry.endpoint : ''
      };
    }
    memory.clear(); memory.set('po_api_vault',JSON.stringify(providers)); memory.set('po_gh_repo_token',payload.githubToken);
    managed = true; active = true; apiVault = providers;
    currentAiProvider = Object.hasOwn(AI_PROVIDERS,payload.activeProvider) ? payload.activeProvider : 'deepseek';
    currentAiModel = typeof payload.activeModel === 'string' ? payload.activeModel : (providers[currentAiProvider]?.model || AI_PROVIDERS[currentAiProvider].defaultModel);
    currentAiVersion = typeof payload.activeVersion === 'string' ? payload.activeVersion : 'v1beta';
    currentAiEndpoint = typeof payload.activeEndpoint === 'string' ? payload.activeEndpoint : '';
    currentAiKey = providers[currentAiProvider]?.key || ''; storedKey = '';
    geminiApiKey = currentAiKey; detectedModel = currentAiModel;
    for (const legacy of legacyKeys) { localStorage.removeItem(legacy); sessionStorage.removeItem(legacy); }
    localStorage.removeItem('po_studio_auth_session_v1'); sessionStorage.removeItem('po_studio_auth_session_v1');
    localStorage.removeItem('po_studio_custom_pass_hash_v1');
    updateApiKeyStatus(); updateQuickAiSwitchers(); updateGhCloudStatusUI(); updateContextToolbarUI();
  }
  async function remote(token = '') {
    const headers = {Accept:'application/vnd.github+json'};
    if (token) headers.Authorization = 'Bearer ' + token;
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(),15000);
    try {
      const response = await fetch(API + '?ref=main&t=' + Date.now(), {headers,cache:'no-store',signal:controller.signal});
      if (response.status === 404) return null;
      if (!response.ok) throw Error('No se pudo consultar la bóveda en GitHub (HTTP ' + response.status + ').');
      const meta = await response.json();
      if (typeof meta.sha !== 'string' || typeof meta.content !== 'string') throw Error('Respuesta de GitHub no válida.');
      const data = JSON.parse(new TextDecoder().decode(StudioVaultCrypto.fromBase64(meta.content.replace(/\s/g,''))));
      StudioVaultCrypto.validate(data);
      return {sha:meta.sha,envelope:data};
    } finally { clearTimeout(timeout); }
  }
  async function upload(candidate) {
    const token = memory.get('po_gh_repo_token');
    if (!token) { status('Bóveda cifrada en este navegador. Añade tu token de GitHub y pulsa Guardar para usarla en otros dispositivos.'); return false; }
    const latest = await remote(token);
    if ((latest?.sha || null) !== remoteSha) throw Error('La bóveda cambió en otro dispositivo. No se sobrescribió. Conserva tu respaldo y vuelve a abrir la versión actual.');
    const body = {message:'sync(studio): actualizar bóveda cifrada',branch:'main',content:StudioVaultCrypto.toBase64(new TextEncoder().encode(JSON.stringify(candidate,null,2)))};
    if (remoteSha) body.sha = remoteSha;
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(),20000);
    try {
      const response = await fetch(API,{method:'PUT',headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal});
      if (!response.ok) throw Error(response.status === 409 ? 'Conflicto de bóveda: no se sobrescribió la otra versión.' : 'No se pudo guardar la bóveda cifrada en GitHub (HTTP '+response.status+').');
      const saved = await response.json();
      if (!saved.content?.sha) throw Error('GitHub no confirmó el guardado de la bóveda.');
      remoteSha = saved.content.sha; localStorage.setItem(BASE,remoteSha);
      return true;
    } finally { clearTimeout(timeout); }
  }
  function save(sync = true) {
    const operation = serial.catch(()=>{}).then(async () => {
      if (!active || !key) return;
      const revision = generation, candidate = await StudioVaultCrypto.seal(snapshot(),key,envelope);
      localStorage.setItem(CACHE,JSON.stringify(candidate)); envelope = candidate;
      if (sync && await upload(candidate)) {
        if (revision === generation) localStorage.removeItem(DIRTY);
        status('Bóveda cifrada sincronizada con GitHub. Lista para otros dispositivos.');
      }
    });
    serial = operation; return operation;
  }
  function changed() {
    if (!active) return;
    generation++; localStorage.setItem(DIRTY,'1');
    status('Guardando cambios de credenciales…');
    clearTimeout(timer); timer = setTimeout(() => save(true).catch(error=>status(error.message,true)),650);
  }
  function setSetup(value) {
    setup=value; element('authConfirmField').hidden=!value;
    element('authPasswordInput').autocomplete=value?'new-password':'current-password';
    element('authPasswordInput').minLength=value?12:1;
    element('authConfirmInput').required=value;
    element('authSubmitBtn').textContent=value?'Crear bóveda cifrada':'Abrir Studio';
    element('authVaultHint').textContent=value?'Crea una frase de al menos 12 caracteres. Después configura tus claves y el token una sola vez.':'Introduce la contraseña de tu bóveda. Recuperaremos las claves guardadas en GitHub.';
  }
  async function finishUnlock(payload, remember) {
    hydrate(payload);
    await rememberDevice(remember);
    element('authPasswordInput').value='';element('authConfirmInput').value='';
    unlockStudioUI();
    if (localStorage.getItem(DIRTY)==='1') save(true).catch(error=>status(error.message,true));
    await pullStateFromGitHubRepoNow(false);
  }
  async function login(event) {
    event?.preventDefault(); if (busy) return;
    busy=true;element('authSubmitBtn').disabled=true;element('authErrorMsg').style.display='none';
    let password=element('authPasswordInput').value;
    try {
      const remember=element('authRememberCheck').checked;
      if (setup) {
        if (password!==element('authConfirmInput').value) throw Error('Las contraseñas no coinciden.');
        const payload=legacySnapshot();
        const created=await StudioVaultCrypto.create(payload,password);
        localStorage.setItem(CACHE,JSON.stringify(created.envelope));localStorage.setItem(DIRTY,'1');
        key=created.key;envelope=created.envelope;setSetup(false);
        await finishUnlock(payload,remember);
      } else {
        const opened=await StudioVaultCrypto.unlock(envelope,password);key=opened.key;
        await finishUnlock(opened.payload,remember);
      }
    } catch (error) { authError(error.message); }
    finally { password='';element('authPasswordInput').value='';element('authConfirmInput').value='';busy=false;element('authSubmitBtn').disabled=false; }
  }
  async function init() {
    element('authSubmitBtn').disabled=true;
    try {
      if (!globalThis.crypto?.subtle) throw Error('La bóveda necesita HTTPS y un navegador compatible con Web Crypto.');
      const cached=localStorage.getItem(CACHE);
      if (cached) { envelope=StudioVaultCrypto.validate(JSON.parse(cached));remoteSha=localStorage.getItem(BASE); }
      try {
        const latest=await remote();
        if (localStorage.getItem(DIRTY)==='1' && envelope) {
          status('Hay cambios de credenciales pendientes en este dispositivo.');
        } else if (latest) {
          envelope=latest.envelope;remoteSha=latest.sha;
          localStorage.setItem(CACHE,JSON.stringify(envelope));localStorage.setItem(BASE,remoteSha);
        } else if (remoteSha) {
          throw Error('La bóveda remota ya no está disponible. Se conserva la copia local.');
        }
      } catch (error) {
        if (!envelope) throw error;
        status('Usando copia cifrada local: GitHub no está disponible.',true);
      }
      setSetup(!envelope);
      if (envelope && localStorage.getItem('po_vault_remember')==='1') {
        try {
          const record=await deviceRecord('get');
          if (record && record.salt===envelope.salt && record.iterations===envelope.iterations) {
            const payload=await StudioVaultCrypto.open(envelope,record.key);key=record.key;
            await finishUnlock(payload,true);return;
          }
        } catch (_) { status('Introduce la contraseña para volver a recordar este dispositivo.'); }
        await rememberDevice(false);
      }
      element('authSubmitBtn').disabled=false;
    } catch (error) { authError(error.message+' Puedes volver a intentarlo con el botón Reintentar.'); }
  }
  async function lock() {
    clearTimeout(timer);
    try { await save(false); } catch (_) { status('No se pudo guardar la última copia cifrada local.',true); return; }
    await rememberDevice(false);
    active=false;key=null;memory.clear();apiVault={};currentAiKey='';storedKey='';geminiApiKey='';
    element('inputApiKey').value='';element('ghRepoTokenInput').value='';
    if(typeof closeKeyModal==='function')closeKeyModal();
    element('authOverlay').classList.remove('hidden');document.body.classList.add('auth-locked');
    element('authRememberCheck').checked=false;
    status('Dispositivo bloqueado. Introduce la contraseña para volver a abrir la bóveda.');
  }
  async function changePassword(event) {
    event.preventDefault();if(busy)return;busy=true;
    const dialog=element('vaultPasswordDialog'),errorBox=element('vaultChangeError');errorBox.textContent='';
    let current=element('vaultCurrentPassword').value, next=element('vaultNewPassword').value;
    try {
      clearTimeout(timer);await save(false);
      await StudioVaultCrypto.unlock(envelope,current);
      if(next!==element('vaultConfirmPassword').value)throw Error('Las contraseñas nuevas no coinciden.');
      if(remoteSha&&!memory.get('po_gh_repo_token'))throw Error('Necesitas tu token de GitHub para actualizar la contraseña en todos los dispositivos.');
      const created=await StudioVaultCrypto.create(snapshot(),next);
      const uploaded=memory.get('po_gh_repo_token')?await upload(created.envelope):false;
      key=created.key;envelope=created.envelope;localStorage.setItem(CACHE,JSON.stringify(envelope));
      if(uploaded)localStorage.removeItem(DIRTY);else localStorage.setItem(DIRTY,'1');
      await rememberDevice(localStorage.getItem('po_vault_remember')==='1');dialog.close();
      status(uploaded?'Contraseña actualizada en GitHub. Los otros dispositivos pedirán la nueva contraseña.':'Contraseña actualizada localmente; falta sincronizar con GitHub.');
    } catch(error){errorBox.textContent=error.message;}
    finally {current='';next='';for(const id of ['vaultCurrentPassword','vaultNewPassword','vaultConfirmPassword'])element(id).value='';busy=false;}
  }
  async function refresh() {
    if (!active) return init();
    if (busy) return;
    busy=true;clearTimeout(timer);
    try {
      await save(false);
      const revision=generation, latest=await remote(memory.get('po_gh_repo_token') || '');
      if(!latest)throw Error('No hay una bóveda disponible en GitHub. Se conserva la copia local.');
      if(revision!==generation)throw Error('Las credenciales cambiaron durante la descarga. Vuelve a intentarlo.');
      if(localStorage.getItem(DIRTY)==='1' && !confirm('Traer la bóveda reemplazará los cambios de credenciales pendientes. Se guardará una copia cifrada anterior en este navegador. ¿Continuar?')) return;
      localStorage.setItem('po_credential_vault_recovery',localStorage.getItem(CACHE));
      let payload;
      try { payload=await StudioVaultCrypto.open(latest.envelope,key); } catch (_) { payload=null; }
      localStorage.setItem(CACHE,JSON.stringify(latest.envelope));
      envelope=latest.envelope;remoteSha=latest.sha;localStorage.setItem(BASE,remoteSha);localStorage.removeItem(DIRTY);
      if(payload) { hydrate(payload);if(typeof closeKeyModal==='function')closeKeyModal();status('Bóveda actualizada desde GitHub.'); }
      else {
        await rememberDevice(false);active=false;key=null;memory.clear();apiVault={};currentAiKey='';storedKey='';geminiApiKey='';
        element('inputApiKey').value='';element('ghRepoTokenInput').value='';
        element('authOverlay').classList.remove('hidden');document.body.classList.add('auth-locked');
        setSetup(false);authError('La contraseña de la bóveda cambió. Introduce la contraseña actual.');
      }
    } catch(error) { status(error.message,true); }
    finally {busy=false;}
  }
  async function exportEncrypted(recovery = false) {
    if(active && !recovery) { try { await save(false); } catch(error) {status(error.message,true);return;} }
    const raw=localStorage.getItem(recovery ? 'po_credential_vault_recovery' : CACHE);if(!raw){if(active)status('No hay una copia cifrada disponible.',true);else authError('No hay una copia cifrada anterior disponible.');return;}
    const url=URL.createObjectURL(new Blob([raw],{type:'application/json'})),a=document.createElement('a');
    a.href=url;a.download='studio-boveda-cifrada.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return {get managed(){return managed;},get active(){return active;},init,login,lock,changed,save,refresh,exportEncrypted,changePassword,
    read:name=>memory.get(name)||null,
    write(name,value){if(memory.get(name)!==String(value)){memory.set(name,String(value));changed();}},
    remove(name){if(memory.delete(name))changed();},
    setRemember:rememberDevice,
    openPasswordDialog(){if(!active){authError('Primero abre tu bóveda con la contraseña actual.');return;}for(const id of ['vaultCurrentPassword','vaultNewPassword','vaultConfirmPassword'])element(id).value='';element('vaultChangeError').textContent='';element('vaultPasswordDialog').showModal();}
  };
})();
globalThis.StudioCredentialVault = StudioCredentialVault;
