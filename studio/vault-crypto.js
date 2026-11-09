/* Password-derived credential encryption. No password or verifier is persisted. */
(function (root) {
  const VERSION = 1, ITERATIONS = 600000;
  const encode = value => new TextEncoder().encode(value);
  function toBase64(bytes) { let out = ''; for (const b of bytes) out += String.fromCharCode(b); return btoa(out); }
  function fromBase64(value, max = 1500000) {
    if (typeof value !== 'string' || !value.length || value.length > max || !/^[A-Za-z0-9+/]*={0,2}$/.test(value)) throw Error('Formato de bóveda inválido.');
    return Uint8Array.from(atob(value), c => c.charCodeAt(0));
  }
  function validate(envelope) {
    if (!envelope || envelope.version !== VERSION || envelope.cipher !== 'AES-256-GCM' || envelope.kdf !== 'PBKDF2-SHA256' ||
        !Number.isInteger(envelope.iterations) || envelope.iterations < ITERATIONS || envelope.iterations > 2000000 ||
        fromBase64(envelope.salt, 64).length !== 16 || fromBase64(envelope.iv, 32).length !== 12 || fromBase64(envelope.ciphertext).length < 16) throw Error('Formato de bóveda no compatible.');
    return envelope;
  }
  function header(e) { return encode(JSON.stringify({purpose:'peter-studio-credentials',version:e.version,cipher:e.cipher,kdf:e.kdf,iterations:e.iterations,salt:e.salt})); }
  async function derive(password, salt, iterations = ITERATIONS) {
    if (typeof password !== 'string' || !password.length || password.length > 1024) throw Error('Contraseña no válida.');
    const material = await crypto.subtle.importKey('raw', encode(password), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({name:'PBKDF2',salt:fromBase64(salt,64),iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
  }
  async function seal(payload, key, params) {
    const envelope = {version:VERSION,cipher:'AES-256-GCM',kdf:'PBKDF2-SHA256',iterations:params.iterations,salt:params.salt,
      iv:toBase64(crypto.getRandomValues(new Uint8Array(12)))};
    envelope.ciphertext = toBase64(new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv:fromBase64(envelope.iv),additionalData:header(envelope),tagLength:128},key,encode(JSON.stringify(payload)))));
    return envelope;
  }
  async function create(payload, password) {
    if (typeof password !== 'string' || password.length < 12 || password.length > 1024) throw Error('Usa una contraseña de al menos 12 caracteres; preferiblemente una frase larga.');
    const params = {salt:toBase64(crypto.getRandomValues(new Uint8Array(16))),iterations:ITERATIONS};
    const key = await derive(password,params.salt,params.iterations);
    return {key,envelope:await seal(payload,key,params)};
  }
  async function open(envelope, key) {
    validate(envelope);
    try {
      const raw = await crypto.subtle.decrypt({name:'AES-GCM',iv:fromBase64(envelope.iv),additionalData:header(envelope),tagLength:128},key,fromBase64(envelope.ciphertext));
      const data = JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw));
      if (!data || data.version !== 1 || !data.providers || typeof data.providers !== 'object' || Array.isArray(data.providers) || typeof data.githubToken !== 'string') throw Error('Invalid payload');
      return data;
    } catch (_) { throw Error('No se pudo abrir la bóveda: contraseña incorrecta o archivo modificado.'); }
  }
  async function unlock(envelope, password) { validate(envelope);const key=await derive(password,envelope.salt,envelope.iterations);return {key,payload:await open(envelope,key)}; }
  const api = { create, seal, open, unlock, validate, toBase64, fromBase64 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.StudioVaultCrypto = api;
})(globalThis);
