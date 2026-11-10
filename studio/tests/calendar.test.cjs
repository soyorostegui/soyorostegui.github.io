const {source}=require('./source.cjs');const vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={Intl,Date,localStorage:{getItem:()=>null,setItem(){}},renderCalendar(){},buildEditorialContext:()=>({today:'2026-11-09'})};vm.createContext(ctx);
vm.runInContext(source.slice(source.indexOf('    let calendarMonth ='),source.indexOf('    function renderCalendar(')),ctx);
assert.equal(ctx.calendarMonthDetails('2026-11').offset,6);assert.equal(ctx.calendarMonthDetails('2026-11').days,30);
assert.equal(ctx.calendarMonthDetails('2028-02').days,29);assert.equal(ctx.calendarMonthDetails('2027-02').days,28);
ctx.setCalendarMonth('2026-12');ctx.changeCalendarMonth(1);assert.equal(vm.runInContext('calendarMonth',ctx),'2027-01');
ctx.changeCalendarMonth(-1);assert.equal(vm.runInContext('calendarMonth',ctx),'2026-12');ctx.setCalendarMonth('bad');assert.equal(vm.runInContext('calendarMonth',ctx),'2026-12');ctx.goToCurrentMonth();assert.equal(vm.runInContext('calendarMonth',ctx),'2026-11');
console.log('PASS: calendar month/year navigation, Monday offset, leap years, invalid month and local today.');
class CalendarElement {
  constructor(){this.children=[];this.dataset={};this.style={};this.handlers={};this.classes=new Set();this.classList={add:(...v)=>v.forEach(x=>this.classes.add(x)),remove:(...v)=>v.forEach(x=>this.classes.delete(x))};}
  set innerHTML(v){this.children=[];this.html=v;} get innerHTML(){return this.html;}
  appendChild(v){this.children.push(v);} setAttribute(k,v){this[k]=v;} addEventListener(k,v){this.handlers[k]=v;}
  contains(v){return this.children.includes(v);}
}
const nodes=Object.fromEntries(['cal-grid','calendarMonth','calendarMonthTitle','calShowStories','calendarMoveStatus'].map(id=>[id,new CalendarElement()]));
const storage=new Map();let savedPosts=0,savedStories=0,renders=0,opened=0,failSave=false;
const dragCtx={Intl,Date,Math,Number,JSON,Array,posts:[{id:'p',date:'2026-11-09',title:'Publicación',status:'Idea',channel:'Instagram',format:'Carrusel'}],
  stories:[{id:'s',date:'2026-11-09',time:'13:00',order:0,name:'Historia',highlightId:'h'},{id:'s2',date:'2026-11-12',time:'09:00',order:0}],
  localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
  document:{getElementById:id=>nodes[id]||null,createElement:()=>new CalendarElement(),querySelectorAll:()=>nodes['cal-grid'].children.flatMap(c=>[c,...c.children])},
  entryLabel:p=>p.channel,entryDetail:p=>p.format,entryType:p=>p.type||'post',getFilteredPosts:()=>dragCtx.posts,sortedStories:()=>dragCtx.stories,getChannelTagClass:()=>'',escapeHtmlForChat:s=>s,
  openEditModal:()=>opened++,openStoryModal:()=>opened++,renderCurrentView:()=>renders++,
  saveToStorage:()=>{if(failSave)throw Error('quota');savedPosts++;storage.set('po_posts_v6',JSON.stringify(dragCtx.posts));storage.set('po_sync_dirty','1');},
  saveStoriesToStorage:()=>{if(failSave)throw Error('quota');savedStories++;storage.set('po_stories_v1',JSON.stringify(dragCtx.stories));storage.set('po_sync_dirty','1');},
  reflowDayOrder:date=>dragCtx.stories.filter(s=>s.date===date).sort((a,b)=>a.time.localeCompare(b.time)).forEach((s,i)=>s.order=i)
};vm.createContext(dragCtx);
vm.runInContext(source.slice(source.indexOf('    let calendarMonth ='),source.indexOf('    /* RENDER STORIES LIST */')),dragCtx);
dragCtx.renderCalendar();
const day=date=>nodes['cal-grid'].children.find(c=>c.dataset.date===date);
const postChip=day('2026-11-09').children.find(c=>c.dataset.entryKind==='post');
assert.equal(postChip.draggable,true);assert.equal(day('2026-11-12').dataset.date,'2026-11-12');
const payload=new Map(), transfer={types:[],setData(k,v){payload.set(k,v);this.types.push(k);},getData:k=>payload.get(k)};
const event={dataTransfer:transfer,preventDefault(){},stopPropagation(){}};
postChip.handlers.dragstart(event);day('2026-11-12').handlers.dragover(event);assert.equal(transfer.dropEffect,'move');
day('2026-11-12').handlers.drop(event);
assert.equal(dragCtx.posts[0].date,'2026-11-12');assert.equal(JSON.parse(storage.get('po_posts_v6'))[0].date,'2026-11-12');
assert.equal(dragCtx.posts[0].status,'Idea');assert.equal(savedPosts,1);assert.equal(storage.get('po_sync_dirty'),'1');
postChip.onclick(event);assert.equal(opened,0,'A completed drag must not open the editor');
assert.equal(dragCtx.moveCalendarEntry('story','s','2026-11-12'),true);assert.equal(savedStories,1);
assert.equal(dragCtx.stories[0].date,'2026-11-12');assert.equal(dragCtx.stories[0].time,'13:00');assert.equal(dragCtx.stories[0].highlightId,'h');assert.equal(dragCtx.stories[0].order,1);
assert.equal(JSON.parse(storage.get('po_stories_v1'))[0].date,'2026-11-12');
for(const args of [['story','s','2026-11-12'],['post','p','2026-02-30'],['post','missing','2026-11-13'],['bad','p','2026-11-13']])assert.equal(dragCtx.moveCalendarEntry(...args),false);
assert.equal(savedPosts,1);assert.equal(savedStories,1);
failSave=true;assert.equal(dragCtx.moveCalendarEntry('post','p','2026-11-14'),false);assert.equal(dragCtx.posts[0].date,'2026-11-12');assert.equal(JSON.parse(storage.get('po_posts_v6'))[0].date,'2026-11-12');
assert.match(nodes.calendarMoveStatus.textContent,/No se pudo guardar/);
assert.equal(nodes['cal-grid'].children.filter(c=>c['aria-hidden']==='true').every(c=>!c.handlers.drop),true);
const external={dataTransfer:{types:['text/plain']},preventDefault(){throw Error('Unexpected external drop');}};
day('2026-11-15').handlers.drop(external);assert.equal(savedPosts,1);
assert.ok(renders>=3);
console.log('PASS: calendar drag/drop updates persisted post/story dates, preserves other fields, schedules sync, suppresses edit clicks, rejects invalid/external drops, and rolls back failed saves.');
