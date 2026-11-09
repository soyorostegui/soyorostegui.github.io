const {source}=require('./source.cjs');const vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={Intl,Date,localStorage:{getItem:()=>null,setItem(){}},renderCalendar(){},buildEditorialContext:()=>({today:'2026-11-09'})};vm.createContext(ctx);
vm.runInContext(source.slice(source.indexOf('    let calendarMonth ='),source.indexOf('    function renderCalendar(')),ctx);
assert.equal(ctx.calendarMonthDetails('2026-11').offset,6);assert.equal(ctx.calendarMonthDetails('2026-11').days,30);
assert.equal(ctx.calendarMonthDetails('2028-02').days,29);assert.equal(ctx.calendarMonthDetails('2027-02').days,28);
ctx.setCalendarMonth('2026-12');ctx.changeCalendarMonth(1);assert.equal(vm.runInContext('calendarMonth',ctx),'2027-01');
ctx.changeCalendarMonth(-1);assert.equal(vm.runInContext('calendarMonth',ctx),'2026-12');ctx.setCalendarMonth('bad');assert.equal(vm.runInContext('calendarMonth',ctx),'2026-12');ctx.goToCurrentMonth();assert.equal(vm.runInContext('calendarMonth',ctx),'2026-11');
console.log('PASS: calendar month/year navigation, Monday offset, leap years, invalid month and local today.');
