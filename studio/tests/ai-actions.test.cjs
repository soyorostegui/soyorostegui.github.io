const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const source = require('./source.cjs').source;
new vm.Script(source);
const section = (start, end) => source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));
const options = id => [...html.matchAll(new RegExp('<select[^>]*id="' + id + '"[^>]*>([\\s\\S]*?)</select>', 'g'))][0][1].matchAll(/<option value="([^"]*)"/g);
const storage = new Map();
let failSave = false, confirms = true;
const ctx = {
  console, Date, Math, JSON, Set,
  posts: [{ id: 'p1', title: 'Original', channel: 'Instagram', format: 'Post', phase: 'Fase 2: Archivo', status: 'Idea', date: '2026-11-09', caption: 'old', structure: 'old' }],
  stories: [{ id: 's1', name: 'Historia', date: '2026-11-09', time: '', highlightId: 'h1', status: 'Idea' }],
  highlights: [{ id: 'h1', name: 'DAILY', order: 0 }, { id: 'h2', name: 'SETUP', order: 1 }],
  document: { getElementById: id => ({ options: [...options(id)].map(m => ({ value: m[1] })) }),
    createElement: () => ({ style: {}, children: [], appendChild(x) { this.children.push(x); } }) },
  localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v), removeItem: k => storage.delete(k) },
  saveToStorage() { if (failSave) throw Error('storage failed'); },
  saveStoriesToStorage() { if (failSave) throw Error('storage failed'); },
  renderCurrentView() {}, confirm: () => confirms, reflowDayOrder() {},
  normalizeDateParam: x => x, normalizeStoryFormat: x => x || 'Foto', resolveHighlightId: x => x,
  nextStoryOrder: () => 0, getHighlightById: id => ctx.highlights.find(h => h.id === id),
  slugifyHighlight: x => 'hl-' + x, nextHighlightOrder: () => 2
};
vm.createContext(ctx);
vm.runInContext(section('    function buildActionBoxFor(', '    function appendAIChat(') + section('    function buildActionDataFromParsed(', '    // Devuelve los rangos') + section('    function applyDirectUpdate(', '    // Motor local resiliente'), ctx);
const run = command => ctx.executeAiAction(ctx.buildActionDataFromParsed(command));
assert.equal(run({ action:'update_post', id:'p1', channel:'LinkedIn', format:'Reel', caption:'', structure:'' }).status, 'success');
assert.equal(ctx.posts[0].channel, 'LinkedIn'); assert.equal(ctx.posts[0].format, 'Reel'); assert.equal(ctx.posts[0].caption, '');
for (const change of [{status:'INVALID'}, {date:'2026-02-30'}, {title:42}, {id:'missing', title:'Original'}]) {
  const before = JSON.stringify(ctx.posts); assert.equal(run({action:'update_post', id:'p1', ...change}).status, 'error'); assert.equal(JSON.stringify(ctx.posts), before);
}
assert.equal(run({action:'create_post', title:'Missing date'}).status, 'error');
const create = {action:'create_post', title:'Nueva', date:'2026-11-10'};
assert.equal(run(create).status, 'success'); assert.equal(run(create).status, 'error');
assert.equal(run({action:'update_story', id:'s1', time:'25:00'}).status, 'error');
assert.equal(run({action:'update_story', id:'s1', highlight:'UNKNOWN'}).status, 'error');
assert.equal(run({action:'update_story', id:'s1', highlight:'', time:'12:30', context:''}).status, 'success'); assert.equal(ctx.stories[0].highlightId, '');
assert.equal(run({action:'reorder_highlights', order:['h1','h1']}).status, 'error');
assert.equal(run({action:'delete_items', entity:'post', ids:['missing']}).status, 'error');
confirms = false; assert.equal(run({action:'delete_items', entity:'post', ids:['p1']}).status,'cancelled'); assert(ctx.posts.some(p=>p.id==='p1'));
confirms = true; assert.equal(run({action:'delete_items', entity:'post', ids:['p1'], names:['Nueva']}).status,'success'); assert(ctx.posts.some(p=>p.title==='Nueva'));
failSave = true; const before = JSON.stringify(ctx.stories); assert.equal(run({action:'update_story',id:'s1',name:'Lost'}).status,'error'); assert.equal(JSON.stringify(ctx.stories),before); failSave = false;
const box = ctx.buildActionBoxFor({type:'update_post',id:'missing'},true); assert.equal(box.children[1].textContent,'No aplicado');
const history = ctx.buildActionBoxFor({type:'create_post'},false); assert.equal(history.children[1].textContent,'Sin verificar');
const cancelled = ctx.buildActionBoxFor({type:'delete_items',result:{status:'cancelled',message:'Cancelada'}},false); assert.equal(cancelled.children[1].textContent,'Cancelado');
console.log('PASS: syntax, post fields, empty text, invalid inputs, missing IDs, duplicate prevention, story time/highlight validation, reorder validation, scoped deletion, cancellation, rollback and truthful history badges.');
