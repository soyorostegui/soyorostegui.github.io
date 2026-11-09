const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const vm = require('node:vm'), assert = require('node:assert/strict'), cp = require('node:child_process');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const code = require('./source.cjs').source;
new vm.Script(code);
const section = (a,b) => code.slice(code.indexOf(a),code.indexOf(b,code.indexOf(a)));
const makeStorage = () => { const m = new Map(); return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}; };
const local = makeStorage(), session = makeStorage();
const ctx = {localStorage:local, sessionStorage:session,document:{getElementById:()=>null}, alert(){throw Error('Unexpected storage error');}};
vm.createContext(ctx);vm.runInContext(section('    const SECRET_STORAGE_KEYS', '    let apiVault'),ctx);
local.setItem('po_api_vault','vault');local.setItem('po_gh_repo_token','token');local.setItem('po_posts_v6','posts');
ctx.setRememberSecrets(false);assert.equal(local.getItem('po_api_vault'),null);assert.equal(session.getItem('po_api_vault'),'vault');assert.equal(session.getItem('po_gh_repo_token'),'token');assert.equal(local.getItem('po_posts_v6'),'posts');
vm.runInContext('secretStorage.setItem("po_api_vault", "new-vault")',ctx);
ctx.setRememberSecrets(true);assert.equal(local.getItem('po_api_vault'),'new-vault');assert.equal(session.getItem('po_api_vault'),null);
assert(!code.includes('cloudObj.encryptedSecrets'));assert(!code.includes('xorDecipherWithKeyHex'));
assert(!/onclick="[^"\n]*\$\{/.test(html));
for(const field of ['post.title','post.channel','post.format','post.status']) assert(code.includes('${escapeHtmlForChat('+field+')}'));
assert(code.includes('div.innerHTML = sanitizeDisplayHtml(text)'));
console.log('PASS: syntax, credential migration in both directions, session writes, editorial data retained, legacy remote secrets disabled, dynamic inline handlers removed, and escaped post fields.');
const sanitizer = section('    function sanitizeDisplayHtml(', '    function stripHtmlToPlain(');
const browserTest = `
const check = (x,msg) => {if(!x)throw Error(msg);};
const attacks = [
 '<img src=x onerror="window.pwned=1"><script>window.pwned=1<\\/script>',
 '<svg onload="window.pwned=1"><a href="javascript:alert(1)">x</a></svg>',
 '<a href="java&#x73;cript:alert(1)" onclick="window.pwned=1">link</a>',
 '<iframe srcdoc="<script>alert(1)<\\/script>"></iframe><form><input name=x></form>',
 '<div id="authOverlay" style="position:fixed" onmouseover="window.pwned=1">text</div>',
 '<math><mtext><table><mglyph><style><!--</style><img title="--><img src=x onerror=alert(1)>">'
];
for (const attack of attacks) {
 const safe=sanitizeDisplayHtml(attack);const root=document.createElement('div');root.innerHTML=safe;
 check(!root.querySelector('script,img,svg,math,iframe,form,input,style'),safe);
 check(!root.querySelector('[onclick],[onerror],[onload],[onmouseover],[style],[id]'),safe);
 for(const a of root.querySelectorAll('a'))check(!a.hasAttribute('href')||!a.getAttribute('href').startsWith('javascript:'),safe);
 document.body.appendChild(root);
}
const formatted=sanitizeDisplayHtml('<strong>Texto</strong><pre class="ai-code"><code>&lt;img&gt;</code></pre><a href="https://example.com">link</a>');
check(formatted.includes('<strong>Texto</strong>'),'format lost');check(formatted.includes('class="ai-code"'),'code class lost');check(formatted.includes('noopener noreferrer'),'unsafe link');check(!window.pwned,'code executed');
document.body.textContent='BROWSER_SECURITY_PASS';`;
new vm.Script(sanitizer + browserTest);
if (process.env.STUDIO_BROWSER_TEST !== '1') {
  console.log('SKIP: DOM sanitizer payload tests require STUDIO_BROWSER_TEST=1 and a working headless browser.');
  process.exit(0);
}
const dir=fs.mkdtempSync(path.join(process.env.STUDIO_TEST_TMP || os.tmpdir(),'studio-security-'));
const file=path.join(dir,'test.html');fs.writeFileSync(file,'<!doctype html><meta charset="utf-8"><body><script>'+sanitizer+'\ntry{'+browserTest+'}catch(e){document.body.textContent="FAIL: "+e.message;}</script>');
const browser=process.env.STUDIO_TEST_BROWSER || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const result=cp.spawnSync(browser,['--headless','--disable-gpu','--no-first-run','--no-default-browser-check','--user-data-dir='+path.join(dir,'profile'),'--dump-dom','file:///'+file.replace(/\\/g,'/')],{encoding:'utf8',timeout:25000,maxBuffer:1000000,windowsHide:true});
assert(!result.error,result.error?.message);assert(result.stdout.includes('BROWSER_SECURITY_PASS'),result.stdout.slice(-3000)||result.stderr.slice(-1500));
console.log('PASS: real browser sanitizer rejects HTML/script/event/SVG/malformed payloads while preserving formatted text and safe links.');
