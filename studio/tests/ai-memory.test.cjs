const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const source = require('./source.cjs').source;
new vm.Script(source);
const ctx = {
  Date, Intl, Set, JSON,
  chatHistory: [],
  posts: [{ id:'p1', title:'Publicación', caption:'c'.repeat(3000), structure:'Slides completos', phase:'Fase 2', key:'SECRET' }],
  highlights: [{id:'h1',name:'DAILY',order:0}],
  sortedStories: () => [{id:'s1',name:'Zoom',date:'2026-11-09',time:'12:30',context:'Clip de seis segundos',highlightId:'h1',order:2}],
  getHighlightById: () => ({name:'DAILY'}),
  stripHtmlToPlain: html => html.replace(/<[^>]*>/g, '')
};
vm.createContext(ctx);
vm.runInContext(source.slice(source.indexOf('    function clipContextText('), source.indexOf('    function showAiTypingIndicator(')), ctx);
const current = { sender:'user',plainText:'mensaje actual' };
ctx.chatHistory = [{sender:'user',plainText:'🙂 conserva las horas'}, {sender:'ai', html:'<b>Texto antiguo sin plainText</b>', actionData:{type:'update_story',id:'s1',result:{status:'error',message:'No aplicado'}}}, current];
let history = ctx.buildConversationHistoryForAI();
assert.equal(history.length,2);assert(history[0].content.startsWith('🙂'));
assert(history[1].content.includes('Texto antiguo sin plainText'));
assert(history[1].content.includes('"status":"error"'));assert(!JSON.stringify(history).includes('mensaje actual'));
ctx.chatHistory[1].actionData.result = undefined;
assert(ctx.buildConversationHistoryForAI()[1].content.includes('"status":"unknown"'));
ctx.chatHistory = [{sender:'user',plainText:'INICIO'+'x'.repeat(50000)+'FINAL'},current];
history = ctx.buildConversationHistoryForAI();assert(history[0].content.length <= 40000);assert(history[0].content.includes('INICIO'));assert(history[0].content.endsWith('FINAL'));assert(history[0].content.includes('Fragmento omitido'));
ctx.chatHistory = [{sender:'user',plainText:'No trabajo en una imprenta; respeta mi rutina.'}, ...Array.from({length:24},(_,i)=>({sender:i%2?'ai':'user',plainText:'mensaje reciente '+i})),current];
assert.equal(ctx.buildConversationHistoryForAI().length,24);
assert(ctx.buildOlderConversationContext('imprenta rutina').includes('No trabajo en una imprenta'));
assert.equal(ctx.buildOlderConversationContext('astronomía'), '');
const context = ctx.buildEditorialContext();
assert.equal(context.stories[0].time,'12:30');assert.equal(context.stories[0].context,'Clip de seis segundos');assert.equal(context.stories[0].highlightId,'h1');
assert.equal(context.posts[0].caption.length,3000);assert.equal(context.posts[0].structure,'Slides completos');assert(!JSON.stringify(context).includes('SECRET'));assert.equal(context.timeZone,'America/Bogota');assert(/^\d{4}-\d{2}-\d{2}$/.test(context.today));
assert(!html.includes('recuerdo todo lo que vamos conversando'));
assert(source.includes('const editorialContext = buildEditorialContext()'));
assert(source.includes('${olderContext ||'));
console.log('PASS: syntax, current-message exclusion, emoji messages, legacy history fallback, real action outcomes, unknown legacy outcomes, context budget, head/tail retention, relevant older excerpts, complete calendar context, secret exclusion and local date.');
