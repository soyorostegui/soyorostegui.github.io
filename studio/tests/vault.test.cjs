const assert = require('node:assert/strict');
const crypto = require('node:crypto').webcrypto;
const fs = require('node:fs'), vm = require('node:vm'), path = require('node:path');
const C = require('../vault-crypto.js');
const secret = {version:1,providers:{deepseek:{key:'sk-disposable-test-credential',model:'test-model',endpoint:''}},githubToken:'github_pat_disposable_test',activeProvider:'deepseek',activeModel:'test-model',activeVersion:'v1beta',activeEndpoint:''};
const password = 'a long disposable password for tests';
const storage = () => { const data = new Map();return {data,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)}; };
function fakeIndexedDB(records) {
  return {open(){const request={result:{objectStoreNames:[],createObjectStore(){},transaction(){const tx={objectStore(){return {
    get(k){const r={result:records.get(k)};setTimeout(()=>tx.oncomplete?.(),0);return r;},
    put(v,k){records.set(k,structuredClone(v));setTimeout(()=>tx.oncomplete?.(),0);return {};},
    delete(k){records.delete(k);setTimeout(()=>tx.oncomplete?.(),0);return {};}
  };}};return tx;}}};setTimeout(()=>request.onsuccess?.(),0);return request;}};
}
function device(remoteStore, local=storage(), records=new Map()) {
  const fields = new Map(); const classes = () => ({add(){},remove(){}});
  const field=id=>{if(!fields.has(id))fields.set(id,{value:'',checked:true,hidden:false,disabled:false,style:{},classList:classes(),close(){this.closed=true;},showModal(){this.closed=false;}});return fields.get(id);};
  const legacy=local;
  const ctx={crypto,TextEncoder,TextDecoder,AbortController,StudioVaultCrypto:C,URL,Blob,Map,Object,JSON,Date,Promise,Number,Error,clearTimeout,setTimeout,structuredClone,confirm:()=>true,
    localStorage:local,sessionStorage:storage(),indexedDB:fakeIndexedDB(records),document:{getElementById:field,body:{classList:classes()},createElement:()=>({click(){}})},
    apiVault:{},currentAiProvider:'deepseek',currentAiModel:'test-model',currentAiVersion:'v1beta',currentAiEndpoint:'',currentAiKey:'',storedKey:'',geminiApiKey:'',detectedModel:'',
    AI_PROVIDERS:{deepseek:{defaultModel:'test-model'}},updateApiKeyStatus(){},updateQuickAiSwitchers(){},updateGhCloudStatusUI(){},updateContextToolbarUI(){},unlockStudioUI(){ctx.unlocked=true;},pullStateFromGitHubRepoNow:async()=>{},
    secretStorage:{getItem:k=>ctx.StudioCredentialVault?.managed?ctx.StudioCredentialVault.read(k):legacy.getItem(k)},
    fetch:async(url,options={})=>{
      if(remoteStore.fail)throw Error('offline');
      if(url==='https://api.github.com/user') {
        if(remoteStore.identityGate){remoteStore.identityReached?.();await remoteStore.identityGate;}
        if(remoteStore.identityStatus)return {ok:false,status:remoteStore.identityStatus};
        return {ok:true,json:async()=>remoteStore.identity||{id:214716364,login:'soyorostegui'}};
      }
      if(url==='https://api.github.com/repos/soyorostegui/soyorostegui.github.io')return {ok:true,json:async()=>({id:1450734848,owner:{id:214716364},permissions:{push:!remoteStore.noPush}})};
      if(options.method==='PUT'){
        if(remoteStore.rejectWrites)return {ok:false,status:403};
        const body=JSON.parse(options.body);
        if((body.sha||null)!==(remoteStore.sha||null))return {ok:false,status:409};
        remoteStore.writes.push(options.body);
        remoteStore.envelope=JSON.parse(Buffer.from(body.content,'base64').toString('utf8'));
        remoteStore.sha='revision-'+remoteStore.writes.length;
        return {ok:true,json:async()=>({content:{sha:remoteStore.sha}})};
      }
      if(!remoteStore.envelope)return {ok:false,status:404};
      return {ok:true,json:async()=>({sha:remoteStore.sha,content:Buffer.from(JSON.stringify(remoteStore.envelope)).toString('base64')})};
    }
  };
  vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(__dirname,'../credential-vault.js'),'utf8'),ctx);
  return {ctx,fields,field,local,records,vault:ctx.StudioCredentialVault};
}
(async()=>{
  const created=await C.create(secret,password);
  assert.equal(created.key.extractable,false);
  await assert.rejects(crypto.subtle.exportKey('raw',created.key));
  assert(!JSON.stringify(created.envelope).includes(secret.githubToken));assert(!JSON.stringify(created.envelope).includes(password));
  assert.deepEqual((await C.unlock(created.envelope,password)).payload,secret);
  await assert.rejects(C.unlock(created.envelope,'wrong password'));
  await assert.rejects(C.create(secret,'short'));
  const resealed=await C.seal(secret,created.key,created.envelope);assert.notEqual(resealed.iv,created.envelope.iv);assert.notEqual(resealed.ciphertext,created.envelope.ciphertext);
  for(const changed of [{...created.envelope,ciphertext:created.envelope.ciphertext.slice(0,-8)+'AAAAAAAA'}, {...created.envelope,salt:resealed.iv}, {...created.envelope,iterations:1000000000}, {...created.envelope,version:2}]) await assert.rejects(C.unlock(changed,password));
  const remote={envelope:null,sha:null,writes:[]}, first=device(remote);
  first.ctx.apiVault=JSON.parse(JSON.stringify(secret.providers));first.local.setItem('po_api_vault',JSON.stringify(secret.providers));first.local.setItem('po_gh_repo_token',secret.githubToken);
  await first.vault.init();assert.equal(first.field('authConfirmField').hidden,false);
  first.field('authPasswordInput').value=password;first.field('authConfirmInput').value=password;
  await first.vault.login({preventDefault(){}});await first.vault.save(true);
  assert(first.ctx.unlocked);assert(first.vault.active);assert(remote.envelope);assert(first.records.has('credentials'));
  assert.equal(first.records.get('credentials').key.extractable,false);
  for(const raw of remote.writes) {assert(!raw.includes(secret.githubToken));assert(!raw.includes(secret.providers.deepseek.key));assert(!raw.includes(password));}
  for(const name of ['po_api_vault','po_ai_key','po_gemini_key','po_gh_repo_token'])assert.equal(first.local.getItem(name),null);
  const second=device(remote);await second.vault.init();assert.equal(second.field('authConfirmField').hidden,true);
  second.field('authPasswordInput').value='wrong';await second.vault.login({preventDefault(){}});assert(!second.vault.active);
  second.field('authPasswordInput').value=password;await second.vault.login({preventDefault(){}});assert(second.vault.active);assert.equal(second.vault.read('po_gh_repo_token'),secret.githubToken);
  const remembered=device(remote,second.local,second.records);await remembered.vault.init();assert(remembered.vault.active);assert(remembered.ctx.unlocked);
  second.vault.write('po_api_vault',JSON.stringify({deepseek:{key:'new-disposable-key',model:'test-model'}}));await second.vault.save(true);
  const firstCipher=first.local.getItem('po_credential_vault_v1');
  first.vault.write('po_gh_repo_token',secret.githubToken+'-changed');await assert.rejects(first.vault.save(true),/otro dispositivo/);
  assert.equal((await C.unlock(remote.envelope,password)).payload.providers.deepseek.key,'new-disposable-key');
  assert(first.local.getItem('po_credential_vault_v1'));assert(first.local.getItem('po_credential_vault_dirty'));
  first.ctx.confirm=()=>false;await first.vault.refresh();assert(first.local.getItem('po_credential_vault_dirty'));
  first.ctx.confirm=()=>true;await first.vault.refresh();assert.equal(first.local.getItem('po_credential_vault_dirty'),null);assert(first.local.getItem('po_credential_vault_recovery'));assert.equal((await C.unlock(JSON.parse(first.local.getItem('po_credential_vault_recovery')),password)).payload.githubToken,secret.githubToken+'-changed');assert.equal(JSON.parse(first.vault.read('po_api_vault')).deepseek.key,'new-disposable-key');
  const staleLocal=storage(); for(const [k,v] of remembered.local.data)staleLocal.setItem(k,v); const staleRecords=new Map([...remembered.records].map(([k,v])=>[k,structuredClone(v)]));
  const newPassword='another long disposable password';second.field('vaultCurrentPassword').value=password;second.field('vaultNewPassword').value=newPassword;second.field('vaultConfirmPassword').value=newPassword;
  await second.vault.changePassword({preventDefault(){}});assert.equal(second.field('vaultChangeError').textContent,'');
  await assert.rejects(C.unlock(remote.envelope,password));assert.equal((await C.unlock(remote.envelope,newPassword)).payload.githubToken,secret.githubToken);
  const staleRemembered=device(remote,staleLocal,staleRecords);await staleRemembered.vault.init();assert(!staleRemembered.vault.active);
  await second.vault.lock();assert(!second.vault.active);assert.equal(second.vault.read('po_gh_repo_token'),null);assert.equal(second.records.size,0);
  await first.vault.lock();await remembered.vault.lock();
  const offline=device({fail:true,writes:[]});await offline.vault.init();assert.equal(offline.field('authSubmitBtn').disabled,true);
  // Recovery requires independent account proof and never bypasses a locked vault.
  const recoveryPassword='a fresh recovery password for tests',freshToken='github_pat_fresh_disposable_recovery';
  const recoverySeed=await C.create(secret,password);
  const recoveryRemote={envelope:recoverySeed.envelope,sha:'before-recovery',writes:[]};
  const recovery=device(recoveryRemote);
  await recovery.vault.init();
  recovery.field('vaultRecoveryToken').value=freshToken;
  recovery.field('vaultRecoveryPassword').value=recoveryPassword;recovery.field('vaultRecoveryConfirm').value=recoveryPassword;
  await recovery.vault.recoverPassword({preventDefault(){}});
  assert.equal(recoveryRemote.writes.length,0);assert(!recovery.vault.active);
  recovery.field('authPasswordInput').value=password;await recovery.vault.login({preventDefault(){}});
  recovery.local.setItem('po_posts_v6','untouched-calendar');
  const enterRecovery=(token=freshToken,pass=recoveryPassword,confirmation=pass)=>{
    recovery.vault.openRecoveryDialog();
    recovery.field('vaultRecoveryToken').value=token;
    recovery.field('vaultRecoveryPassword').value=pass;recovery.field('vaultRecoveryConfirm').value=confirmation;
  };
  enterRecovery(secret.githubToken);await recovery.vault.recoverPassword({preventDefault(){}});
  assert.equal(recoveryRemote.writes.length,0);assert.match(recovery.field('vaultRecoveryError').textContent,/token nuevo/);
  recoveryRemote.identity={id:123,login:'someone-else'};
  enterRecovery();await recovery.vault.recoverPassword({preventDefault(){}});
  assert.equal(recoveryRemote.writes.length,0);assert.match(recovery.field('vaultRecoveryError').textContent,/propietaria/);
  delete recoveryRemote.identity;recoveryRemote.identityStatus=401;
  enterRecovery();await recovery.vault.recoverPassword({preventDefault(){}});assert.equal(recoveryRemote.writes.length,0);
  delete recoveryRemote.identityStatus;
  enterRecovery(freshToken,'short');await recovery.vault.recoverPassword({preventDefault(){}});assert.equal(recoveryRemote.writes.length,0);
  enterRecovery(freshToken,recoveryPassword,'different');await recovery.vault.recoverPassword({preventDefault(){}});assert.equal(recoveryRemote.writes.length,0);
  recoveryRemote.rejectWrites=true;
  enterRecovery();await recovery.vault.recoverPassword({preventDefault(){}});
  assert.equal(recovery.vault.read('po_gh_repo_token'),secret.githubToken);assert(recovery.vault.active);
  assert.deepEqual((await C.unlock(recoveryRemote.envelope,password)).payload,secret);
  assert(recovery.local.getItem('po_credential_vault_recovery'));
  assert(!recovery.local.getItem('po_credential_vault_pending_recovery').includes(freshToken));
  assert.equal(recovery.local.getItem('po_posts_v6'),'untouched-calendar');
  delete recoveryRemote.rejectWrites;
  // A changed remote vault must be preserved, even with a valid owner token.
  recoveryRemote.sha='concurrent-vault';
  enterRecovery();await recovery.vault.recoverPassword({preventDefault(){}});assert.equal(recoveryRemote.writes.length,0);
  recoveryRemote.sha='before-recovery';
  let releaseIdentity,identityReached;
  const reached=new Promise(resolve=>{identityReached=resolve;});
  recoveryRemote.identityGate=new Promise(resolve=>{releaseIdentity=resolve;});recoveryRemote.identityReached=identityReached;
  enterRecovery();const recovering=recovery.vault.recoverPassword({preventDefault(){}});
  await reached;
  assert(recovery.vault.recovering);assert(recovery.field('vaultRecoveryCancel').disabled);
  assert.throws(()=>recovery.vault.write('po_gh_repo_token','concurrent-change'));
  await assert.rejects(recovery.vault.save(true));await recovery.vault.lock();assert(recovery.vault.active);
  releaseIdentity();await recovering;
  delete recoveryRemote.identityGate;delete recoveryRemote.identityReached;
  assert.equal(recovery.field('vaultRecoveryError').textContent,'');assert.equal(recoveryRemote.writes.length,1);
  const recovered=(await C.unlock(recoveryRemote.envelope,recoveryPassword)).payload;
  assert.deepEqual(recovered.providers,secret.providers);assert.equal(recovered.githubToken,freshToken);
  await assert.rejects(C.unlock(recoveryRemote.envelope,password));
  assert.equal(recovery.local.getItem('po_posts_v6'),'untouched-calendar');
  for(const raw of recoveryRemote.writes)for(const value of [freshToken,recoveryPassword,secret.providers.deepseek.key])assert(!raw.includes(value));
  for(const id of ['vaultRecoveryToken','vaultRecoveryPassword','vaultRecoveryConfirm'])assert.equal(recovery.field(id).value,'');
  const recoveredDevice=device(recoveryRemote);await recoveredDevice.vault.init();
  recoveredDevice.field('authPasswordInput').value=recoveryPassword;await recoveredDevice.vault.login({preventDefault(){}});assert(recoveredDevice.vault.active);
  await recovery.vault.lock();await recoveredDevice.vault.lock();
  console.log('PASS: owner-verified recovery rejects locked sessions, reused/invalid tokens, other accounts, weak/mismatched passwords and remote conflicts; failed upload preserves access, ciphertext backup retained, calendar and AI keys preserved, new password works on another device.');
  console.log('PASS: real AES-GCM/PBKDF2, non-extractable device keys, unique IVs, wrong password/tamper rejection, ciphertext-only upload, first setup, second-device recovery, remembered unlock, conflict protection, password rotation, logout and offline setup protection.');
})().catch(error=>{console.error(error);process.exitCode=1;});
