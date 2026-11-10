/* Pure three-way merge. No I/O, timestamps never decide which edit wins. */
(function(root) {
  const ABSENT = Symbol('absent'), entities = ['posts','stories','highlights','networks','projects','publicationFormats'];
  function sorted(value) {
    if (Array.isArray(value)) return value.map(sorted);
    if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k=>[k,sorted(value[k])]));
    return value;
  }
  const canonical = value => JSON.stringify(sorted(value));
  const same = (a,b) => a===ABSENT || b===ABSENT ? a===b : canonical(a)===canonical(b);
  const copy = value => value===ABSENT ? ABSENT : JSON.parse(JSON.stringify(value));
  function fingerprint(value) {
    const text=canonical(value);let a=2166136261,b=2246822519;
    for(let i=0;i<text.length;i++){a=Math.imul(a^text.charCodeAt(i),16777619);b=Math.imul(b^text.charCodeAt(i),3266489917);}
    return (a>>>0).toString(16).padStart(8,'0')+(b>>>0).toString(16).padStart(8,'0');
  }
  function messages(history) {
    const seen=new Map();
    return (history||[]).map(message=>{
      if(message.id && typeof message.id==='string')return copy(message);
      const digest=fingerprint(message), occurrence=seen.get(digest)||0;seen.set(digest,occurrence+1);
      return {...copy(message),id:'legacy-'+digest+'-'+occurrence};
    });
  }
  function normalize(state) {
    const byId=(a,b)=>String(a.id).localeCompare(String(b.id));
    const stages=['Fase 1: Señal','Fase 2: Archivo','Fase 3: Convocatoria','Fase 4: Continuidad'];
    const defaults=[{id:'project-portafolio-2026',name:'Lanzamiento del portafolio',objective:'Presentar el portafolio profesional de Peter Orostegui.',type:'campaign',startDate:'2026-11-09',endDate:'2026-11-25',status:'active',color:'#8b5cf6',stages}];
    return {publicationFormats:copy(state.publicationFormats||['Post','Carrusel','Video','Reel','Historia','Directo','Artículo','Podcast','Otro','Reflexiones','Procesos','Logros','Cultura','Opiniones','Hitos','Landing'].map(name=>({id:'format-'+encodeURIComponent(name.normalize('NFKC').toLocaleLowerCase()),name}))).sort(byId),projects:copy(state.projects||defaults).sort(byId),networks:copy(state.networks||['Instagram','LinkedIn','Behance'].map(name=>({id:'network-'+name.toLowerCase(),name}))).sort(byId),posts:(state.posts||[]).map(p=>({...copy(p),projectId:typeof p.projectId==='string'?p.projectId:(stages.includes(p.phase)?'project-portafolio-2026':'')})).sort((a,b)=>String(a.date||" ").localeCompare(String(b.date||" "))||byId(a,b)),stories:(state.stories||[]).map(s=>({...{time:'',context:'',formatDetail:''},...copy(s)})).sort((a,b)=>String(a.date||'').localeCompare(String(b.date||''))||String(a.time||'').localeCompare(String(b.time||''))||((a.order||0)-(b.order||0))||byId(a,b)),
      highlights:copy(state.highlights||[]).sort((a,b)=>((a.order||0)-(b.order||0))||byId(a,b)),chatHistory:messages(state.chatHistory),
      chatResetId:typeof state.chatResetId==='string'?state.chatResetId:'legacy',
      tombstones:Object.fromEntries(entities.map(entity=>[entity,copy(state.tombstones?.[entity]||{})])),
      importedCustomContextNotes:state.importedCustomContextNotes||''};
  }
  const equal = (a,b) => same(normalize(a),normalize(b));
  function index(items) {
    const map=new Map();
    for(const item of items){if(!item || typeof item.id!=='string'||!item.id||map.has(item.id))throw Error('Hay identificadores vacíos o repetidos. Se conservan ambas copias sin sincronizar.');map.set(item.id,item);}
    return map;
  }
  function merge(baseInput,localInput,remoteInput,options={}) {
    const hasBase=!!baseInput, base=normalize(baseInput||{}),local=normalize(localInput),remote=normalize(remoteInput);
    const conflicts=[], output={};
    function conflict(b,l,r,path,kind='ediciones incompatibles') {
      conflicts.push({entity:path[0],id:path[1]||'',field:path.slice(2).join('.')||'entrada',kind,
        base:b===ABSENT?null:copy(b),local:l===ABSENT?null:copy(l),remote:r===ABSENT?null:copy(r)});
      return copy(options.prefer==='remote'?r:l);
    }
    function value(b,l,r,path) {
      if(same(l,r))return copy(l);
      if(same(l,b))return copy(r);
      if(same(r,b))return copy(l);
      if(l===ABSENT||r===ABSENT)return conflict(b,l,r,path,'eliminación y edición de la misma entrada');
      const object=x=>x!==ABSENT&&x&&typeof x==='object'&&!Array.isArray(x);
      if(object(l)&&object(r)&&(b===ABSENT||object(b))){
        const result=[];
        for(const k of new Set([...Object.keys(b===ABSENT?{}:b),...Object.keys(l),...Object.keys(r)])){
          const merged=value(b!==ABSENT&&Object.hasOwn(b,k)?b[k]:ABSENT,Object.hasOwn(l,k)?l[k]:ABSENT,Object.hasOwn(r,k)?r[k]:ABSENT,[...path,k]);
          if(merged!==ABSENT)result.push([k,merged]);
        }
        return Object.fromEntries(result);
      }
      return conflict(b,l,r,path);
    }
    output.tombstones={};
    for(const entity of entities){
      const b=index(base[entity]),l=index(local[entity]),r=index(remote[entity]);
      const deleted=new Map();
      for(const source of [base,local,remote])for(const [id,marker] of Object.entries(source.tombstones[entity]))if(marker&&typeof marker.hash==='string')deleted.set(id,copy(marker));
      for(const side of [l,r])for(const [id,record] of b)if(!side.has(id))deleted.set(id,{hash:fingerprint(record)});
      const merged=[];
      for(const id of new Set([...r.keys(),...l.keys(),...b.keys(),...deleted.keys()])){
        let bv=b.get(id)??ABSENT,lv=l.get(id)??ABSENT,rv=r.get(id)??ABSENT;
        const marker=deleted.get(id);
        // A known deleted record arriving unchanged from an old device must not reappear.
        if(marker){if(lv!==ABSENT&&fingerprint(lv)===marker.hash)lv=ABSENT;if(rv!==ABSENT&&fingerprint(rv)===marker.hash)rv=ABSENT;}
        let result;
        if(marker && bv===ABSENT && (lv!==ABSENT||rv!==ABSENT)) result=conflict(bv,lv,rv,[entity,id],'edición de una entrada eliminada');
        else if(!hasBase && ((lv===ABSENT)!==(rv===ABSENT)) && !marker)result=conflict(bv,lv,rv,[entity,id],'sin referencia común para esta entrada');
        else result=value(bv,lv,rv,[entity,id]);
        if(result!==ABSENT){merged.push(result);deleted.delete(id);}
      }
      output[entity]=merged;
      output.tombstones[entity]=Object.fromEntries([...deleted.entries()].sort(([a],[b])=>a.localeCompare(b)));
    }
    // Clearing chat is explicit; trimming a display window is not interpreted as deletion.
    const baseIds=new Set(base.chatHistory.map(m=>m.id));
    const resetFor=(state)=>state.chatResetId!==base.chatResetId?state.chatResetId:
      hasBase&&base.chatHistory.length&&!state.chatHistory.length?'clear-'+fingerprint([...baseIds]):state.chatResetId;
    const lr=resetFor(local),rr=resetFor(remote),cleared=lr!==base.chatResetId||rr!==base.chatResetId;
    output.chatResetId=cleared?[lr,rr].filter(x=>x!==base.chatResetId).sort().at(-1):base.chatResetId;
    const left=local.chatHistory.filter(m=>!cleared||!baseIds.has(m.id)),right=remote.chatHistory.filter(m=>!cleared||!baseIds.has(m.id));
    const bm=index(base.chatHistory),lm=index(left),rm=index(right),all=new Map();
    for(const id of new Set([...lm.keys(),...rm.keys()])){
      const bv=bm.get(id)??ABSENT,lv=lm.get(id)??ABSENT,rv=rm.get(id)??ABSENT;
      // Messages are immutable. A missing retained message is a window trim, not a delete.
      const item=lv===ABSENT?copy(rv):rv===ABSENT?copy(lv):value(bv,lv,rv,['chatHistory',id]);all.set(id,item);
    }
    const edges=new Map([...all.keys()].map(id=>[id,new Set()])),degree=new Map([...all.keys()].map(id=>[id,0]));
    for(const list of [left,right]){
      const ids=list.map(m=>m.id).filter(id=>all.has(id));
      for(let i=1;i<ids.length;i++){const a=ids[i-1],b=ids[i];if(a!==b&&!edges.get(a).has(b)){edges.get(a).add(b);degree.set(b,degree.get(b)+1);}}
    }
    const order=(a,b)=>String(all.get(a).createdAt||all.get(a).timestamp||'').localeCompare(String(all.get(b).createdAt||all.get(b).timestamp||''))||a.localeCompare(b);
    const ready=[...degree.keys()].filter(id=>!degree.get(id)).sort(order),ordered=[];
    while(ready.length){const id=ready.shift();ordered.push(id);for(const next of edges.get(id)){degree.set(next,degree.get(next)-1);if(!degree.get(next)){ready.push(next);ready.sort(order);}}}
    if(ordered.length!==all.size){conflicts.push({entity:'chatHistory',id:'',field:'orden',kind:'orden incompatible del historial'});for(const id of [...all.keys()].sort(order))if(!ordered.includes(id))ordered.push(id);}
    // Keep the existing 80-message retention policy in a deterministic shared order.
    output.chatHistory=ordered.slice(-80).map(id=>all.get(id));
    output.importedCustomContextNotes=value(hasBase?base.importedCustomContextNotes:ABSENT,local.importedCustomContextNotes,remote.importedCustomContextNotes,['importedCustomContextNotes']);
    // If a concurrent deletion removed a folder used by a newly added story, ask instead of silently dropping the link.
    const highlightMap=new Map(output.highlights.map(h=>[h.id,h]));
    for(const story of output.stories)if(story.highlightId&&!highlightMap.has(story.highlightId)){
      const folder=local.highlights.find(h=>h.id===story.highlightId)||remote.highlights.find(h=>h.id===story.highlightId);
      if(folder){
        conflicts.push({entity:'stories',id:story.id,field:'highlightId',kind:'la destacada fue eliminada en otro dispositivo'});
        const preferred=(options.prefer==='remote'?remote:local).highlights.find(h=>h.id===story.highlightId);
        if(preferred){output.highlights.push(copy(preferred));highlightMap.set(preferred.id,preferred);delete output.tombstones.highlights[preferred.id];}else story.highlightId='';
      } else story.highlightId='';
    }
    const projectMap=new Map(output.projects.map(p=>[p.id,p]));
    for(const entry of [...output.posts,...output.stories])if(entry.projectId&&!projectMap.has(entry.projectId)){
      const project=local.projects.find(p=>p.id===entry.projectId)||remote.projects.find(p=>p.id===entry.projectId);
      if(project){
        conflicts.push({entity:output.stories.includes(entry)?'stories':'posts',id:entry.id,field:'projectId',kind:'el proyecto fue eliminado en otro dispositivo'});
        const preferred=(options.prefer==='remote'?remote:local).projects.find(p=>p.id===entry.projectId);
        if(preferred){output.projects.push(copy(preferred));projectMap.set(preferred.id,preferred);delete output.tombstones.projects[preferred.id];}else{entry.projectId='';entry.phase='';}
      }else{entry.projectId='';entry.phase='';}
    }
    for(const entry of [...output.posts,...output.stories])if(entry.projectId&&entry.phase){
      const project=projectMap.get(entry.projectId);if(!project||(project.stages||[]).includes(entry.phase))continue;
      const known=[...local.projects,...remote.projects].some(p=>p.id===entry.projectId&&(p.stages||[]).includes(entry.phase));
      if(known){
        conflicts.push({entity:output.stories.includes(entry)?'stories':'posts',id:entry.id,field:'phase',kind:'la etapa fue retirada del proyecto en otro dispositivo'});
        const preferred=(options.prefer==='remote'?remote:local).projects.find(p=>p.id===entry.projectId);
        if((preferred?.stages||[]).includes(entry.phase))project.stages=[...(project.stages||[]),entry.phase];else entry.phase='';
      }else entry.phase='';
    }
    for(const post of [...output.posts]){
      const story=output.stories.find(s=>s.id===post.id);if(!story)continue;
      conflicts.push({entity:'posts',id:post.id,field:'publicationKind',kind:'la misma publicación fue convertida y editada en otro dispositivo'});
      const preferred=options.prefer==='remote'?remote:local;
      if(preferred.stories.some(s=>s.id===post.id)&&!preferred.posts.some(p=>p.id===post.id)){
        output.posts=output.posts.filter(p=>p.id!==post.id);output.tombstones.posts[post.id]={hash:fingerprint(post)};
      }else{output.stories=output.stories.filter(s=>s.id!==post.id);output.tombstones.stories[post.id]={hash:fingerprint(story)};}
    }
    return {state:{version:4,...output},conflicts,ok:!conflicts.length||['local','remote'].includes(options.prefer)};
  }
  const api={merge,normalize,equal,fingerprint,messages};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.StudioSyncMerge=api;
})(globalThis);
