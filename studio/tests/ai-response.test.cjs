const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const ctx = { console, lastCallWasTruncated:false, lastCallUsageFooter:'', messages:[], effects:0 };
vm.createContext(ctx);
vm.runInContext(read('ai-response.js'), ctx);
const source = read('ai.js');
vm.runInContext(source.slice(source.indexOf('    function buildActionDataFromParsed('), source.indexOf('    // Devuelve los rangos')), ctx);
vm.runInContext(source.slice(source.indexOf('    function parseCalendarAIResponse('), source.indexOf('    function applyDirectUpdate(')), ctx);
ctx.formatAiMarkdown = x => x;
ctx.appendAIChat = (sender, text, actions) => {ctx.messages.push({sender,text,actions});ctx.effects += actions?.length || 0;};
const valid = JSON.stringify({message:'Propongo actualizar el copy.',actions:[{action:'update_post',id:'p1',caption:'Nuevo copy'}]});
const parse = raw => ctx.parseCalendarAIResponse(raw, 'Actualiza el copy de p1');
const api = ctx.StudioAIResponse;

(async () => {
  for (const broken of [
    'Ya lo actualice. Se me olvido enviar el JSON.',
    '{"message":"Voy a actualizarlo","actions":[]}',
    '```json\n{"action":"update_post","id":"p1","caption":"partial"',
    '{"message":"Cambio","actions":[{"action":"update_post","id":"p1","caption":"first"},{"action":"unknown"}]}',
    '{"action":"update_post","id":"p1","caption":"first"}\n{"action":"update_post","id":}',
    '{"action":"update_post","id":"p1","caption":"first"}\n{"action":"update_post"'
  ]) {
    let calls = 0; const before = ctx.effects;
    const response = await api.request(async (system,user) => {
      assert.equal(user,'Actualiza el copy de p1');assert.equal(ctx.effects,before);
      if (++calls === 2) assert.match(system,/CORRECCION AUTOMATICA/);
      return calls === 1 ? broken : valid;
    }, api.contract, 'Actualiza el copy de p1', [], parse);
    assert.equal(calls,2);assert.equal(ctx.effects,before);
    ctx.processAndDisplayAIResponse(response);assert.equal(ctx.effects,before+1);
  }
  let calls=0;
  const question = await api.request(async()=>{calls++;return '{"message":"Hay tres entradas.","actions":[]}';},api.contract,'Cuantas entradas hay',[],raw=>ctx.parseCalendarAIResponse(raw,'Cuantas entradas hay'));
  assert.equal(calls,1);assert.equal(question.actions.length,0);
  assert.equal(ctx.parseCalendarAIResponse('{"message":"Necesito la fecha de destino. Cual prefieres?","actions":[]}', 'Mueve la entrada').actions.length,0);
  assert.equal(ctx.parseCalendarAIResponse('{"message":"No puedo crear proyectos desde este chat; usa el formulario.","actions":[]}', 'Crea un proyecto').actions.length,0);
  let failures=0;const before=ctx.effects;
  await assert.rejects(api.request(async()=>{failures++;return 'Listo';},api.contract,'Hazlo',[],parse),error=>error.code==='AI_RESPONSE_INVALID');
  assert.equal(failures,2);assert.equal(ctx.effects,before);
  calls=0;await assert.rejects(api.request(async()=>{if(++calls===2)throw Error('offline');return 'Listo';},api.contract,'Hazlo',[],parse),error=>error.code==='AI_RESPONSE_INVALID');
  assert.equal(ctx.effects,before);
  // Complete legacy batches and arrays remain supported, with order and deduplication.
  const a='{"action":"update_post","id":"p1","caption":"A"}',b='{"action":"update_post","id":"p2","caption":"B"}';
  const legacy=ctx.parseCalendarAIResponse('Texto con "comillas".\n'+a+'\n```json\n'+b+'\n```\n'+a);
  assert.equal(legacy.actions.length,2);assert.equal(legacy.actions[0].id,'p1');assert.equal(legacy.actions[1].id,'p2');
  assert.equal(ctx.parseCalendarAIResponse('['+a+','+b+']').actions.length,2);
  assert.equal(ctx.parseCalendarAIResponse('```json\n'+valid+'\n```').actions.length,1);
  assert.equal(ctx.parseCalendarAIResponse('{"message":"Ejemplo {sin cambios}","actions":[]}').message,'Ejemplo {sin cambios}');
  ctx.lastCallWasTruncated=true;assert.throws(()=>parse(valid),/incompleta/);ctx.lastCallWasTruncated=false;

  // Exercise the real chat route: the busy flag stays set through repair and execution.
  Object.assign(ctx,{
    aiChatBusy:false,pitiEntryReference:null,importedCustomContextNotes:'',
    currentAiProvider:'test',currentAiModel:'mock',
    document:{getElementById:id=>id==='aiChatInput'?ctx.input:ctx.button},
    input:{value:'Actualiza el copy de p1',style:{}},button:{disabled:false},
    escapeHtmlForChat:x=>x,buildEditorialContext:()=>({posts:[],highlights:[],stories:[],today:'2026-11-10',timeZone:'America/Bogota',projects:[],publicationFormats:[],networks:[]}),
    buildConversationHistoryForAI:()=>[],buildOlderConversationContext:()=>'',
    showAiTypingIndicator:()=>null,hasActiveAI:()=>true,
    handleLocalAIResponse:()=>{throw Error('Must not invent fallback mutations');}
  });
  vm.runInContext(source.slice(source.indexOf('    async function sendAIChat()'),source.indexOf('    function escapeHtmlForChat(')),ctx);
  calls=0;ctx.callUniversalAI=async()=>{assert.equal(ctx.aiChatBusy,true);assert.equal(ctx.button.disabled,true);return ++calls===1?'Olvide el JSON':valid;};
  const prior=ctx.effects;await ctx.sendAIChat();assert.equal(calls,2);assert.equal(ctx.effects,prior+1);assert.equal(ctx.aiChatBusy,false);assert.equal(ctx.button.disabled,false);
  ctx.input.value='Hazlo';ctx.callUniversalAI=async()=> 'Sin comandos';await ctx.sendAIChat();assert.equal(ctx.effects,prior+1);assert.equal(ctx.messages.at(-1).sender,'error');assert.equal(ctx.aiChatBusy,false);
  ctx.input.value='Crea una publicacion';ctx.callUniversalAI=async()=>{throw Error('offline');};await ctx.sendAIChat();assert.equal(ctx.effects,prior+1);assert.equal(ctx.messages.at(-1).sender,'error');assert.equal(ctx.aiChatBusy,false);assert.equal(ctx.button.disabled,false);
  console.log('PASS: omitted/malformed/truncated commands repaired before execution, no partial or duplicate effects, bounded retry, failure closed, queries, clarification, unsupported operations, legacy batches and real chat busy lifecycle.');
})().catch(error=>{console.error(error);process.exitCode=1;});
