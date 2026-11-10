// Validate a complete response before any calendar action or draft patch runs.
(function (root) {
  'use strict';
  const contract = 'Devuelve un unico objeto JSON {"message":"respuesta breve en espanol","actions":[]}. '
    + 'Incluye en actions los comandos de cambios solicitados, con su campo action. '
    + 'Si solo conversamos, faltan datos o la operacion no esta disponible, usa actions vacio y explicalo en message. '
    + 'Una orden concreta o la aprobacion de cambios ya definidos requiere los comandos en esta misma respuesta. '
    + 'No prometas ejecutar despues, no afirmes haber guardado y no repitas acciones antiguas. '
    + 'Esta estructura sustituye el formato de texto seguido de bloques JSON de los ejemplos anteriores.';

  function isObject(value) { return value && typeof value === 'object' && !Array.isArray(value); }
  function calendar(raw, convert) {
    const text = String(raw || '').trim();
    const unfenced = text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\s*```$/, '');
    let value;
    try { value = JSON.parse(unfenced); } catch (_) { /* Accept complete legacy commands below. */ }
    let message = '', commands = [];
    if (isObject(value) && Object.hasOwn(value, 'actions')) {
      if (typeof value.message !== 'string' || !Array.isArray(value.actions)) throw Error('Respuesta estructurada incompleta.');
      message = value.message; commands = value.actions;
    } else if (Array.isArray(value)) {
      commands = value;
    } else if (isObject(value) && (value.action || value.type)) {
      commands = [value];
    } else {
      // Legacy prose + commands. Keep their source order, including across fences.
      let depth = 0, start = -1, quoted = false, escaped = false, cursor = 0;
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (depth === 0) {
          if (ch === '{') { start = i; depth = 1; quoted = false; }
          continue;
        }
        if (quoted) {
          if (escaped) escaped = false;
          else if (ch === '\\') escaped = true;
          else if (ch === '"') quoted = false;
        } else if (ch === '"') quoted = true;
        else if (ch === '{') depth++;
        else if (ch === '}' && --depth === 0) {
          const candidate = text.slice(start, i + 1);
          if (/"(?:action|actions|type)"\s*:/.test(candidate)) {
            let parsed;
            try { parsed = JSON.parse(candidate); } catch (_) { throw Error('Comando JSON invalido.'); }
            if (parsed.actions) throw Error('La respuesta estructurada debe ser un unico objeto completo.');
            commands.push(parsed);
            message += text.slice(cursor, start); cursor = i + 1;
          }
        }
      }
      if (depth && /"(?:action|actions|type)"\s*:/.test(text.slice(start))) throw Error('Comando incompleto.');
      if ((text.match(/```/g) || []).length % 2) throw Error('Respuesta incompleta.');
      if (!commands.length) throw Error('Falta la respuesta estructurada.');
      message += text.slice(cursor);
      message = message.replace(/```(?:json)?\s*```/gi, '').trim();
    }
    const actions = [], seen = new Set();
    for (const command of commands) {
      if (!isObject(command)) throw Error('Comando no valido.');
      const action = convert({ ...command, action: command.action || command.type });
      if (!action) throw Error('Accion no reconocida.');
      const key = JSON.stringify(action);
      if (!seen.has(key)) { seen.add(key); actions.push(action); }
    }
    if (!actions.length && !message.trim()) throw Error('Respuesta vacia.');
    return { message, actions };
  }

  function checkMissingChanges(instruction, message, count) {
    if (count) return;
    const norm = text => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const user = norm(instruction), reply = norm(message);
    const request = /\b(crea|creame|agrega|anade|actualiza|modifica|edita|cambia|mueve|pasala|pasalo|reprograma|elimina|borra|guarda|aplica|hazlo|acorta|reescribe|reemplaza|pon|ponlo)\b/.test(user);
    const claim = /\b(he (guardado|actualizado|creado|cambiado)|ya (quedo|esta|lo hice)|voy a (guardar|actualizar|crear|cambiar|aplicar)|olvid[eoa].*(json|accion|comando))\b/.test(reply);
    const explanation = /[?\u00bf]/.test(message) || /\b(no puedo|no es posible|no (se |esta |estan )?(admite|admitido|disponible)|no tengo|necesito|falta|aclara|indica|especifica|desde (el|la)|usa (el|la))\b/.test(reply);
    if (claim || (request && !explanation)) throw Error('Faltan los cambios solicitados o una explicacion concreta de por que no se pueden aplicar.');
  }

  async function request(call, system, instruction, history, parse) {
    let reason = '';
    for (let attempt = 0; attempt < 2; attempt++) {
      const prompt = attempt === 0 ? system : system + '\nCORRECCION AUTOMATICA: La respuesta anterior no se ejecuto. '
        + reason + ' Responde de nuevo a la solicitud original con el formato completo. No inventes datos ni repitas acciones del historial. '
        + 'Si falta informacion, pregunta; si no puedes ejecutar la operacion, explica la limitacion.';
      let raw;
      try { raw = await call(prompt, instruction, history); }
      catch (error) {
        if (attempt === 0) throw error;
        const failure = Error('No se pudo completar la corrección automática. No se aplicaron cambios.');
        failure.code = 'AI_RESPONSE_INVALID';
        throw failure;
      }
      try { return parse(raw); } catch (error) { reason = error.message; }
    }
    const error = Error('Piti no pudo preparar una respuesta ejecutable tras el reintento automático. No se aplicaron cambios. ' + reason);
    error.code = 'AI_RESPONSE_INVALID';
    throw error;
  }

  root.StudioAIResponse = { contract, calendar, checkMissingChanges, request };
})(globalThis);
