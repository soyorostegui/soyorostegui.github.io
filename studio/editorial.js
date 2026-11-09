// Inventario Estratégico
    const defaultPosts = [
      // --- LUNES 9 NOV ---
      {
        id: "post-ig-1",
        channel: "Instagram",
        title: "Lanzamiento Expectativa: «Mientras tanto...»",
        date: "2026-11-09",
        status: "Listo",
        phase: "Fase 1: Señal",
        format: "Carrusel",
        structure: "Slide 1: Mientras tanto...\nSlide 2: mucho se estuvo construyendo\nSlide 3: y pronto lo verás aquí.\n(Solo tipografía sobria sobre fondo claro y retícula tenue).",
        caption: "No todo lo que se construye se publica de inmediato.\nMe tomé el tiempo para prepararlo.\nAhora toca mostrarlo."
      },
      {
        id: "post-li-1",
        channel: "LinkedIn",
        title: "El valor de construir en silencio (Por qué no todo se publica en tiempo real)",
        date: "2026-11-09",
        status: "Listo",
        phase: "Fase 1: Señal",
        format: "Reflexiones",
        structure: "Post reflexivo sobre el oficio y la madurez profesional antes del autopromoción.",
        caption: "Vivimos en una industria obsesionada con compartir cada boceto en tiempo real. Durante meses preferí hacer lo contrario: encerrarme en el taller, afinar el criterio y llevar encargos reales hasta su producción física. Hoy entiendo que el valor de un diseñador no está en la frecuencia con la que publica, sino en la solidez de lo que sostiene en las manos cuando termina."
      },

      // --- MARTES 10 NOV ---
      {
        id: "post-ig-2",
        channel: "Instagram",
        title: "El fetiche del papel y lo tangible (Detalle Físico)",
        date: "2026-11-10",
        status: "En Diseño",
        phase: "Fase 1: Señal",
        format: "Post",
        structure: "Fotografía macro de estudio: textura de papel de algodón, guardas encuadernadas o el pin metálico personal.",
        caption: "Cuando el vector se convierte en materia.\nEl rigor de un diseñador no se mide en cómo se ve en su pantalla Retina, sino en cómo se siente cuando sale de la imprenta."
      },

      // --- MIÉRCOLES 11 NOV ---
      {
        id: "post-ig-3",
        channel: "Instagram",
        title: "3 errores de preprensa que arruinan un diseño",
        date: "2026-11-11",
        status: "Idea",
        phase: "Fase 1: Señal",
        format: "Reel",
        structure: "Reel educativo dinámico (15 seg): 1. Sangrías omitidas, 2. Negro 100K vs. Negro enriquecido, 3. Resolución efectiva a escala. Formato tutorial rápido de alto guardado.",
        caption: "Cosas que duelen en el taller de impresión: enviar un archivo sin sangría o usar RGB para una gigantografía. 3 detalles técnicos que salvan presupuestos."
      },
      {
        id: "post-li-2",
        channel: "LinkedIn",
        title: "Diseñar vallas de 12x4m: lo que la universidad no te enseña sobre preprensa OOH",
        date: "2026-11-11",
        status: "Idea",
        phase: "Fase 1: Señal",
        format: "Procesos",
        structure: "Post técnico y detallado sobre cómo se prepara un archivo de publicidad exterior a escala 1:10, resoluciones DPI según distancia de visualización y pruebas de color en lona vinílica.",
        caption: "Una valla publicitaria en una avenida principal no perdona un error de preprensa. En la academia diseñamos en lienzos infinitos de Illustrator; en la práctica aprendes sobre sobreimpresión, reventados (trapping) y por qué un texto en cuerpo 24pt desaparece si el carro pasa a 80 km/h."
      },

      // --- JUEVES 12 NOV ---
      {
        id: "post-ig-4",
        channel: "Instagram",
        title: "Un logo no es una marca: anatomía de un sistema visual",
        date: "2026-11-12",
        status: "En Diseño",
        phase: "Fase 2: Archivo",
        format: "Carrusel",
        structure: "Carrusel conceptual con esquemas vectoriales limpios: Slide 1: El logo solo representa el 10% | Slide 2: El sistema tipográfico como voz | Slide 3: El comportamiento en empaque | Slide 4: El impacto en vía pública.",
        caption: "Si le quitas el isotipo a una marca y no sabes de quién es, no tienes una identidad: tienes solo un dibujo. Un sistema visual vive en el espacio, en el papel y en la calle."
      },

      // --- VIERNES 13 NOV ---
      {
        id: "post-ig-5",
        channel: "Instagram",
        title: "Sneak Peek 01: El ornamento geométrico",
        date: "2026-11-13",
        status: "Idea",
        phase: "Fase 2: Archivo",
        format: "Post",
        structure: "Macro cerrada de un patrón geométrico dorado con textura sin revelar el nombre de la marca.",
        caption: "Una pista de lo que se abre el 20.11.\nPrecisión geométrica y contraste. Los detalles que hacen que un producto hable antes de abrirlo."
      },

      // --- SÁBADO 14 NOV ---
      {
        id: "post-ig-6",
        channel: "Instagram",
        title: "La tipografía tiene tono de voz",
        date: "2026-11-14",
        status: "Idea",
        phase: "Fase 2: Archivo",
        format: "Post",
        structure: "Composición tipográfica en alto contraste comparando pesos y caracteres para demostrar cómo la elección tipográfica comunica antes de que el cerebro lea.",
        caption: "Antes de que el ojo lea una sola palabra, la tipografía ya le dijo al lector si debe confiar, si es algo urgente o si es algo exclusivo. La tipografía no decora: modula la voz."
      },

      // --- LUNES 16 NOV ---
      {
        id: "post-ig-7",
        channel: "Instagram",
        title: "Cómo diseñar una valla que sí se lea a 80 km/h",
        date: "2026-11-16",
        status: "Idea",
        phase: "Fase 2: Archivo",
        format: "Carrusel",
        structure: "Carrusel educativo sobre diseño exterior: Slide 1: La regla de los 3 segundos | Slide 2: Contraste cromático contra el cielo y la ciudad | Slide 3: Menos de 7 palabras | Slide 4: Ejemplo de estructura en valla real.",
        caption: "En publicidad exterior tienes 3 segundos para captar la atención de alguien que va manejando. Si intentas poner todo el menú o todos los patrocinadores, no dijiste nada."
      },
      {
        id: "post-li-3",
        channel: "LinkedIn",
        title: "Más allá de la portada: cómo se orquesta la identidad visual de un lanzamiento musical",
        date: "2026-11-16",
        status: "Idea",
        phase: "Fase 2: Archivo",
        format: "Logros",
        structure: "Análisis de caso de negocio: el reto de coordinar lanzamientos musicales donde el diseño debe alimentar simultáneamente plataformas de streaming (Spotify/Apple), vía pública y visuales de concierto.",
        caption: "En la industria musical, el diseño gráfico es el pegamento de la campaña. No se trata solo de entregar la portada en 3000x3000px; se trata de concebir un lenguaje que se adapte con la misma contundencia a una valla de carretera, una miniatura de playlist y un visual de pantalla LED de 20 metros."
      },

      // --- MARTES 17 NOV ---
      {
        id: "post-ig-8",
        channel: "Instagram",
        title: "POV: Renderizando visuales para concierto a medianoche",
        date: "2026-11-17",
        status: "Idea",
        phase: "Fase 2: Archivo",
        format: "Reel",
        structure: "Reel con música de fondo acelerada, luces de monitor y clips de motion graphics sincronizados para pantallas de conciertos.",
        caption: "El diseño de entretenimiento no duerme. Cuando las luces del escenario se encienden, el trabajo de semanas cobra vida en milésimas de segundo."
      },
      {
        id: "post-li-4",
        channel: "LinkedIn",
        title: "Diseñar a contrarreloj para música en vivo: cuando el margen de error es cero",
        date: "2026-11-17",
        status: "Idea",
        phase: "Fase 2: Archivo",
        format: "Cultura",
        structure: "Reflexión sobre la velocidad y adaptabilidad en la producción de entretenimiento en vivo.",
        caption: "Si el equipo de producción te pide ajustar los visuales de una gira 2 horas antes de abrir puertas, no hay espacio para la queja ni para la improvisación técnica. Trabajar para espectáculos en vivo te enseña a crear sistemas modulares, automatizar flujos y resolver con precisión bajo presión."
      },

      // --- MIÉRCOLES 18 NOV ---
      {
        id: "post-ig-9",
        channel: "Instagram",
        title: "Sneak Peek 02: Streetwear & Textil",
        date: "2026-11-18",
        status: "Idea",
        phase: "Fase 3: Convocatoria",
        format: "Post",
        structure: "Foto de detalle cerrado de un bordado tipográfico en tela de gorra o etiqueta textil.",
        caption: "Identidad que se viste.\nEn 48 horas el archivo completo sale a la luz. 20.11."
      },

      // --- JUEVES 19 NOV ---
      {
        id: "post-ig-10",
        channel: "Instagram",
        title: "24 Horas: Mañana se abre el archivo",
        date: "2026-11-19",
        status: "Idea",
        phase: "Fase 3: Convocatoria",
        format: "Post",
        structure: "Composición tipográfica minimalista: «24 HORAS. Mañana se abre el archivo completo. 20.11.2026».",
        caption: "Todo lo que estuvo tomando forma en silencio, en un solo lugar.\nMañana viernes 20 de noviembre."
      },
      {
        id: "post-li-5",
        channel: "LinkedIn",
        title: "Unpopular opinion: Los manuales de marca de 150 páginas ya nadie los lee",
        date: "2026-11-19",
        status: "Idea",
        phase: "Fase 3: Convocatoria",
        format: "Opiniones",
        structure: "Ensayo sobre por qué las marcas hoy necesitan guías de diseño ágiles y sistemas de diseño accionables en lugar de manuales PDF gigantes que terminan olvidados en un Google Drive.",
        caption: "Entregar un PDF de 150 páginas con reglas sobre cómo NO girar el logo a 45 grados ya no resuelve los problemas de un equipo de marketing moderno. Las marcas necesitan sistemas vivos, activos listos para producción y directrices claras de cómo comportarse en entornos físicos y digitales. Mañana compartiré mi propuesta en la presentación de mi portafolio."
      },

      // --- VIERNES 20 NOV (DÍA D) ---
      {
        id: "post-behance-1",
        channel: "Behance",
        title: "PORTAFOLIO PROFESIONAL 2026 — PETER OROSTEGUI",
        date: "2026-11-20",
        status: "En Diseño",
        phase: "Fase 3: Convocatoria",
        format: "Landing",
        structure: "Landing continua oficial (1400px): Portada -> Bio -> Brandpedia Vol I-IV completos -> Transmedia Karen Lizarazo & LBD5 -> Créditos y contacto.",
        caption: "Presentación oficial de 8 semestres de formación y proyectos reales de branding, artes finales y campañas transmedia."
      },
      {
        id: "post-ig-11",
        channel: "Instagram",
        title: "Portafolio 2026: Ya disponible (El Gran Lanzamiento)",
        date: "2026-11-20",
        status: "Idea",
        phase: "Fase 3: Convocatoria",
        format: "Carrusel",
        structure: "Slide 1: Portada oficial | Slide 2: Brandpedia (4 tomos) | Slide 3: Campañas de calle y música | Slide 4: «Explora el proyecto completo en el link de mi bio».",
        caption: "Oficialmente publicado.\n8 semestres de formación, marcas reales, empaques físicos y campañas de publicidad exterior reunidas en un solo lugar.\nDescubre el portafolio completo en el enlace de mi biografía (Behance)."
      },
      {
        id: "post-li-6",
        channel: "LinkedIn",
        title: "Hoy presento oficialmente mi Portafolio Profesional 2026",
        date: "2026-11-20",
        status: "Idea",
        phase: "Fase 3: Convocatoria",
        format: "Hitos",
        structure: "Anuncio oficial de culminación y sustentación, agradecimiento a mentores y enlace directo al proyecto en Behance para captación de oportunidades.",
        caption: "Hoy es un día decisivo: culmino mi etapa académica y presento mi Portafolio Profesional de Diseño Gráfico 2026. Han sido años de trabajo con marcas del sector gastronómico, salud, moda urbana y entretenimiento masivo. Los invito a ver el proyecto completo en Behance (link en comentarios)."
      },

      // --- LUNES 23 NOV ---
      {
        id: "post-ig-12",
        channel: "Instagram",
        title: "Recap: El viaje del taller a la calle",
        date: "2026-11-23",
        status: "Idea",
        phase: "Fase 4: Continuidad",
        format: "Reel",
        structure: "Video recap enérgico: tomas rápidas de la sustentación, la gente interactuando con los manuales impresos y el portafolio en pantalla.",
        caption: "Un agradecimiento especial a todos los que hicieron parte de este proceso. El portafolio sigue disponible en el link de la bio."
      }
    ];

    // 30 Historias con fechas y sus 4 highlights permanentes
    const storiesData = [
      { num: 1, date: "09 Nov", name: "Detrás de cámaras de la mesa de trabajo", highlight: "🛠️ PROCESO", format: "Foto con retícula" },
      { num: 2, date: "09 Nov", name: "Pantalla con vectores y curvas en Illustrator", highlight: "🛠️ PROCESO", format: "Video corto" },
      { num: 3, date: "09 Nov", name: "Caja de preguntas: «¿Qué se viene?»", highlight: "🎯 HITO 20.11", format: "Sticker interactivo" },
      { num: 4, date: "10 Nov", name: "Muestra de texturas de papel especial", highlight: "🛠️ PROCESO", format: "Foto macro" },
      { num: 5, date: "10 Nov", name: "Encuesta: ¿Prefieres papel mate o brillante?", highlight: "💡 CRITERIO", format: "Encuesta" },
      { num: 6, date: "11 Nov", name: "Marcas de corte y sangría en archivo real", highlight: "🛠️ PROCESO", format: "Captura técnica" },
      { num: 7, date: "11 Nov", name: "Preparando planchas de impresión", highlight: "🛠️ PROCESO", format: "Boomerang taller" },
      { num: 8, date: "12 Nov", name: "Debate: ¿Cuándo un logo necesita simplificarse?", highlight: "💡 CRITERIO", format: "Sticker deslizador" },
      { num: 9, date: "12 Nov", name: "Libros y referencias de diseño que uso", highlight: "💡 CRITERIO", format: "Foto de biblioteca" },
      { num: 10, date: "12 Nov", name: "Hojeando rápido un cuadernillo impreso", highlight: "🛠️ PROCESO", format: "Video rápido" },
      { num: 11, date: "13 Nov", name: "Reflejo de luz en estampado dorado", highlight: "🛠️ PROCESO", format: "Video con luz" },
      { num: 12, date: "13 Nov", name: "Votación: ¿Tipografía Serif o Sans?", highlight: "💡 CRITERIO", format: "Encuesta" },
      { num: 13, date: "14 Nov", name: "Muestra de espaciado y kerning manual", highlight: "💡 CRITERIO", format: "Captura antes/después" },
      { num: 14, date: "14 Nov", name: "El orden de capas en un archivo maestro", highlight: "🛠️ PROCESO", format: "Captura de capas" },
      { num: 15, date: "15 Nov", name: "Q&A: Preguntas sobre diseño y dirección de arte", highlight: "💡 CRITERIO", format: "Cajita de preguntas" },
      { num: 16, date: "15 Nov", name: "Respondiendo la pregunta más votada", highlight: "💡 CRITERIO", format: "Hablando a cámara" },
      { num: 17, date: "16 Nov", name: "Pasando en carro frente a una valla en la avenida", highlight: "⚡ EN LA CALLE", format: "Video en movimiento" },
      { num: 18, date: "16 Nov", name: "La escala humana frente a una pieza OOH", highlight: "⚡ EN LA CALLE", format: "Foto urbana" },
      { num: 19, date: "16 Nov", name: "Render de visualizer en After Effects", highlight: "🛠️ PROCESO", format: "Video de pantalla" },
      { num: 20, date: "17 Nov", name: "Caravana de vehículos con gráfica instalada", highlight: "⚡ EN LA CALLE", format: "Video de calle" },
      { num: 21, date: "17 Nov", name: "Prueba de pantallas LED en tarima de concierto", highlight: "⚡ EN LA CALLE", format: "Video prueba luces" },
      { num: 22, date: "17 Nov", name: "El concierto en vivo lleno de visuales", highlight: "⚡ EN LA CALLE", format: "Foto de multitud" },
      { num: 23, date: "18 Nov", name: "Detalle macro de hilo y bordado en gorra", highlight: "⚡ EN LA CALLE", format: "Foto macro" },
      { num: 24, date: "18 Nov", name: "Pegatinas troqueladas listas en la mesa", highlight: "⚡ EN LA CALLE", format: "Boomerang" },
      { num: 25, date: "18 Nov", name: "Comprobando resolución a escala 1:1", highlight: "⚡ EN LA CALLE", format: "Captura técnica" },
      { num: 26, date: "19 Nov", name: "Sticker oficial de Countdown: 24 Horas", highlight: "🎯 HITO 20.11", format: "Cuenta regresiva" },
      { num: 27, date: "19 Nov", name: "Mesa con los 4 tomos encuadernados listos", highlight: "🎯 HITO 20.11", format: "Foto mesa de entrega" },
      { num: 28, date: "19 Nov", name: "Reflexión previa al día de entrega", highlight: "🎯 HITO 20.11", format: "Texto sobrio con audio" },
      { num: 29, date: "20 Nov", name: "Sustentación del portafolio en directo", highlight: "🎯 HITO 20.11", format: "Foto en auditorio" },
      { num: 30, date: "20 Nov", name: "¡Portafolio online en Behance! Desliza arriba", highlight: "🎯 HITO 20.11", format: "Link Sticker directo" }
    ];

    /* ============================================================
       MODELO DE HISTORIAS & DESTACADAS (entidades editables, no código)
       ============================================================ */
    const defaultHighlights = [
      { id: "hl-proceso",  name: "PROCESO",     icon: "🛠️", desc: "Mesas de trabajo en Illustrator, sangrías, marcas de corte, pruebas de color e imprenta física.", order: 0 },
      { id: "hl-criterio", name: "CRITERIO",    icon: "💡", desc: "Encuestas tipográficas, recomendaciones de libros, debates sobre simplificación y valor del diseño.", order: 1 },
      { id: "hl-calle",    name: "EN LA CALLE", icon: "⚡", desc: "Vallas publicitarias en avenidas, caravanas de vehículos, pantallas LED en conciertos masivos.", order: 2 },
      { id: "hl-hito",     name: "HITO 20.11",  icon: "🎯", desc: "Teaser «Mientras tanto», sticker countdown, sustentación en vivo y enlace al Behance.", order: 3 }
    ];

    const LEGACY_HIGHLIGHT_MAP = {
      "🛠️ PROCESO": "hl-proceso",
      "💡 CRITERIO": "hl-criterio",
      "⚡ EN LA CALLE": "hl-calle",
      "🎯 HITO 20.11": "hl-hito"
    };

    function legacyDateToIso(raw) {
      // "09 Nov" -> "2026-11-09"
      const m = String(raw || "").match(/(\d{1,2})\s*([A-Za-zÁ-ú]{3,})/);
      if (!m) return "2026-11-09";
      const day = String(m[1]).padStart(2, "0");
      const months = { ene: "01", feb: "02", mar: "03", abr: "04", may: "05", jun: "06", jul: "07", ago: "08", sep: "09", oct: "10", nov: "11", dic: "12" };
      const monthName = m[2].toLowerCase().slice(0, 3);
      return `2026-${months[monthName] || "11"}-${day}`;
    }

    const MONTHS_SHORT = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    function formatShortDate(iso) {
      const m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!m) return iso || "—";
      return `${m[3]} ${MONTHS_SHORT[parseInt(m[2], 10) - 1] || ""}`.trim();
    }

    const STORY_FORMATS = ["Foto", "Video", "Reel", "Boomerang", "Captura", "Carrusel", "Encuesta", "Sticker", "Texto", "Otro"];

    function normalizeStoryFormat(raw) {
      if (!raw) return "";
      const exact = STORY_FORMATS.find(f => f.toLowerCase() === String(raw).trim().toLowerCase());
      if (exact) return exact;
      const t = String(raw).toLowerCase();
      if (t.includes("boomerang")) return "Boomerang";
      if (t.includes("reel")) return "Reel";
      if (t.includes("video")) return "Video";
      if (t.includes("encuesta") || t.includes("votaci")) return "Encuesta";
      if (t.includes("sticker") || t.includes("caja") || t.includes("pregunta") || t.includes("deslizador") || t.includes("countdown") || t.includes("cuenta regresiva") || t.includes("link")) return "Sticker";
      if (t.includes("captura")) return "Captura";
      if (t.includes("carrusel")) return "Carrusel";
      if (t.includes("foto") || t.includes("retrato") || t.includes("imagen")) return "Foto";
      if (t.includes("texto") || t.includes("reflexi")) return "Texto";
      return "Otro";
    }

    function normalizeStoryEntry(s) {
      const norm = normalizeStoryFormat(s && s.format);
      const entry = Object.assign({ time: "", context: "", formatDetail: "" }, s, { format: norm });
      if (!entry.formatDetail && s && s.format && s.format !== norm) {
        entry.formatDetail = s.format;
      }
      return entry;
    }

    function buildSeedStories() {
      return storiesData.map((s, i) => ({
        id: "st-" + (i + 1),
        date: legacyDateToIso(s.date),
        time: "",
        name: s.name,
        highlightId: LEGACY_HIGHLIGHT_MAP[s.highlight] || "hl-proceso",
        format: normalizeStoryFormat(s.format),
        formatDetail: s.format || "",
        status: "Idea",
        context: "",
        order: i
      }));
    }

    let posts = JSON.parse(localStorage.getItem("po_posts_v6")) || defaultPosts;

    let highlights;
    try { highlights = JSON.parse(localStorage.getItem("po_highlights_v1")); } catch (e) { highlights = null; }
    if (!Array.isArray(highlights)) {
      highlights = JSON.parse(JSON.stringify(defaultHighlights));
      localStorage.setItem("po_highlights_v1", JSON.stringify(highlights));
    }

    let stories;
    try { stories = JSON.parse(localStorage.getItem("po_stories_v1")); } catch (e) { stories = null; }
    if (!Array.isArray(stories)) {
      stories = buildSeedStories();
    }
    // Normaliza entradas antiguas (sin hora/contexto y con formato en texto libre)
    stories = stories.map(normalizeStoryEntry);
    localStorage.setItem("po_stories_v1", JSON.stringify(stories));

    let activeView = "kanban";

    function saveToStorage() {
      localStorage.setItem("po_sync_dirty", "1");
      localStorage.setItem("po_posts_v6", JSON.stringify(posts));
      localStorage.setItem("po_last_updated_at", String(Date.now()));
      if (typeof scheduleGitHubCloudSync === "function") scheduleGitHubCloudSync();
    }

    function saveStoriesToStorage() {
      localStorage.setItem("po_sync_dirty", "1");
      localStorage.setItem("po_stories_v1", JSON.stringify(stories));
      localStorage.setItem("po_highlights_v1", JSON.stringify(highlights));
      localStorage.setItem("po_last_updated_at", String(Date.now()));
      if (typeof scheduleGitHubCloudSync === "function") scheduleGitHubCloudSync();
    }

    function switchView(view) {
      activeView = view;
      document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
      document.getElementById(`btn-${view}`).classList.add("active");

      document.getElementById("view-kanban").style.display = view === "kanban" ? "grid" : "none";
      document.getElementById("view-table").style.display = view === "table" ? "block" : "none";
      document.getElementById("view-calendar").style.display = view === "calendar" ? "block" : "none";
      document.getElementById("view-stories").style.display = view === "stories" ? "flex" : "none";

      renderCurrentView();
    }

    function getChannelTagClass(channel) {
      if (channel === "Behance") return "tag-blue";
      if (channel === "LinkedIn") return "tag-cyan";
      return "tag-purple";
    }

    function getTagPhaseClass(phase) {
      if (phase.includes("Señal")) return "tag-purple";
      if (phase.includes("Archivo")) return "tag-blue";
      if (phase.includes("Convocatoria")) return "tag-red";
      return "tag-green";
    }

    function getTagStatusClass(status) {
      if (status === "Idea") return "tag-gray";
      if (status === "En Diseño") return "tag-yellow";
      if (status === "Listo") return "tag-blue";
      return "tag-green";
    }

    function getFilteredPosts() {
      const filterPhase = document.getElementById("filterPhase").value;
      const filterChannel = document.getElementById("filterChannel").value;

      return posts.filter(p => {
        const matchPhase = filterPhase === "ALL" || p.phase === filterPhase;
        const matchChannel = filterChannel === "ALL" || p.channel === filterChannel;
        return matchPhase && matchChannel;
      });
    }

    /* RENDER KANBAN */
    let kanbanDragJustEnded = false;

    function setupKanbanDropZones() {
      document.querySelectorAll("#view-kanban .kanban-col").forEach(col => {
        const status = col.getAttribute("data-status");
        if (!status) return;
        col.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          col.classList.add("drag-over");
        });
        col.addEventListener("dragleave", (e) => {
          if (!col.contains(e.relatedTarget)) col.classList.remove("drag-over");
        });
        col.addEventListener("drop", (e) => {
          e.preventDefault();
          col.classList.remove("drag-over");
          const id = e.dataTransfer.getData("text/plain");
          if (!id) return;
          const post = posts.find(p => p.id === id);
          if (!post || post.status === status) return;
          post.status = status;
          saveToStorage();
          renderCurrentView();
        });
      });
    }

    function renderKanban() {
      const listIdea = document.getElementById("cards-idea");
      const listDesign = document.getElementById("cards-design");
      const listReady = document.getElementById("cards-ready");
      const listPublished = document.getElementById("cards-published");

      listIdea.innerHTML = "";
      listDesign.innerHTML = "";
      listReady.innerHTML = "";
      listPublished.innerHTML = "";

      let count = { Idea: 0, "En Diseño": 0, Listo: 0, Publicado: 0 };
      const filtered = getFilteredPosts();

      filtered.forEach(post => {
        const card = document.createElement("div");
        card.className = "notion-card";
        card.dataset.postId = post.id;
        card.setAttribute("draggable", "true");
        card.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", post.id);
          e.dataTransfer.effectAllowed = "move";
          card.classList.add("dragging");
        });
        card.addEventListener("dragend", () => {
          card.classList.remove("dragging");
          kanbanDragJustEnded = true;
          setTimeout(() => { kanbanDragJustEnded = false; }, 80);
        });
        card.onclick = () => {
          if (kanbanDragJustEnded) return;
          openEditModal(post.id);
        };

        const channelClass = getChannelTagClass(post.channel);
        const phaseTagClass = getTagPhaseClass(post.phase);

        card.innerHTML = `
          <div class="card-top">
            <span class="tag ${channelClass}">${escapeHtmlForChat(post.channel)}</span>
            <span class="card-date">📅 ${escapeHtmlForChat(post.date.substring(5))}</span>
          </div>
          <div class="card-title">${escapeHtmlForChat(post.title)}</div>
          <div class="card-tags">
            <span class="tag ${phaseTagClass}">${escapeHtmlForChat(post.phase.split(":")[0])}</span>
            <span class="tag tag-gray">${escapeHtmlForChat(post.format)}</span>
          </div>
          <div class="card-snippet">“${escapeHtmlForChat(post.caption ? post.caption.replace(/\n/g, ' ') : 'Sin caption')}”</div>
        `;

        if (post.status === "Idea") { listIdea.appendChild(card); count.Idea++; }
        else if (post.status === "En Diseño") { listDesign.appendChild(card); count["En Diseño"]++; }
        else if (post.status === "Listo") { listReady.appendChild(card); count.Listo++; }
        else if (post.status === "Publicado") { listPublished.appendChild(card); count.Publicado++; }
      });

      document.getElementById("count-idea").innerText = count.Idea;
      document.getElementById("count-design").innerText = count["En Diseño"];
      document.getElementById("count-ready").innerText = count.Listo;
      document.getElementById("count-published").innerText = count.Publicado;
    }

    /* RENDER TABLE */
    function renderTable() {
      const tbody = document.getElementById("table-body");
      tbody.innerHTML = "";
      const filtered = getFilteredPosts();

      filtered.sort((a,b) => (a.date > b.date ? 1 : -1)).forEach(post => {
        const tr = document.createElement("tr");
        tr.onclick = () => openEditModal(post.id);

        const channelClass = getChannelTagClass(post.channel);
        const statusClass = getTagStatusClass(post.status);
        const phaseClass = getTagPhaseClass(post.phase);

        tr.innerHTML = `
          <td style="white-space: nowrap; font-weight: 500;">📅 ${escapeHtmlForChat(post.date)}</td>
          <td><span class="tag ${channelClass}">${escapeHtmlForChat(post.channel)}</span></td>
          <td><div class="table-title">${escapeHtmlForChat(post.title)}</div></td>
          <td><span class="tag tag-gray">${escapeHtmlForChat(post.format)}</span></td>
          <td><span class="tag ${statusClass}">${escapeHtmlForChat(post.status)}</span></td>
          <td><span class="tag ${phaseClass}">${escapeHtmlForChat(post.phase.split(":")[0])}</span></td>
          <td style="color: var(--text-muted); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${escapeHtmlForChat(post.caption || "-")}
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    /* RENDER CALENDAR (9 AL 25 NOV) */
    function onToggleCalStories(checked) {
      localStorage.setItem("po_cal_show_stories", checked ? "1" : "0");
      renderCalendar();
    }

    let calendarMonth = /^\d{4}-(0[1-9]|1[0-2])$/.test(localStorage.getItem("po_calendar_month") || "")
      ? localStorage.getItem("po_calendar_month") : "2026-11";
    function setCalendarMonth(value) {
      if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value) || Number(value.slice(0, 4)) < 1000 || Number(value.slice(0, 4)) > 9999) return;
      calendarMonth = value;
      localStorage.setItem("po_calendar_month", value);
      renderCalendar();
    }
    function changeCalendarMonth(delta) {
      const [year, month] = calendarMonth.split("-").map(Number);
      const date = new Date(Date.UTC(year, month - 1 + delta, 1));
      setCalendarMonth(date.toISOString().slice(0, 7));
    }
    function goToCurrentMonth() { setCalendarMonth(buildEditorialContext().today.slice(0, 7)); }
    function calendarMonthDetails(value) {
      const [year, month] = value.split("-").map(Number);
      const first = new Date(Date.UTC(year, month - 1, 1));
      return { year, month, offset: (first.getUTCDay() + 6) % 7,
        days: new Date(Date.UTC(year, month, 0)).getUTCDate(),
        label: new Intl.DateTimeFormat("es-CO", { month: "long", year: "numeric", timeZone: "UTC" }).format(first) };
    }

    function renderCalendar() {
      const calGrid = document.getElementById("cal-grid");
      calGrid.innerHTML = "";

      const details = calendarMonthDetails(calendarMonth);
      document.getElementById("calendarMonth").value = calendarMonth;
      document.getElementById("calendarMonthTitle").textContent = details.label;
      const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
      daysOfWeek.forEach(d => {
        const label = document.createElement("div");
        label.className = "cal-day-label";
        label.innerText = d;
        calGrid.appendChild(label);
      });

      for (let i = 0; i < details.offset; i++) {
        const empty = document.createElement("div");
        empty.className = "cal-cell outside-campaign";
        empty.setAttribute("aria-hidden", "true");
        calGrid.appendChild(empty);
      }

      const filtered = getFilteredPosts();
      const channelFilterEl = document.getElementById("filterChannel");
      const channelFilter = channelFilterEl ? channelFilterEl.value : "ALL";
      const storiesPref = localStorage.getItem("po_cal_show_stories") !== "0";
      const toggle = document.getElementById("calShowStories");
      if (toggle) toggle.checked = storiesPref;
      const allStories = (storiesPref && (channelFilter === "ALL" || channelFilter === "Instagram"))
        ? sortedStories()
        : [];

      for (let day = 1; day <= details.days; day++) {
        const dateStr = `${calendarMonth}-${String(day).padStart(2, "0")}`;
        const dayPosts = filtered.filter(p => p.date === dateStr);
        const dayStories = allStories.filter(s => s.date === dateStr);

        const cell = document.createElement("div");
        cell.className = "cal-cell";

        const inCampaign = dateStr >= "2026-11-09" && dateStr <= "2026-11-25";
        if (inCampaign) {
          cell.classList.add("in-campaign");
        } else if (dayPosts.length === 0 && dayStories.length === 0) {
          cell.classList.add("outside-campaign");
        }
        if (dateStr === "2026-11-20") cell.classList.add("target-day");

        let headerHtml = `<div class="day-num">
          <span>${day}</span>
          ${dateStr === "2026-11-20" ? '<span class="tag tag-red" style="font-size:9px; padding:1px 5px;">🔥 DÍA D</span>' : ''}
          ${dateStr === "2026-11-09" ? '<span class="tag tag-purple" style="font-size:9px; padding:1px 5px;">Arranque</span>' : ''}
          ${dateStr === "2026-11-25" ? '<span class="tag tag-green" style="font-size:9px; padding:1px 5px;">Cierre</span>' : ''}
        </div>`;
        cell.innerHTML = headerHtml;

        dayPosts.forEach(post => {
          const chip = document.createElement("div");
          chip.className = "cal-post-chip";
          chip.title = `${post.channel} (${post.format}): ${post.title}`;
          chip.onclick = (e) => { e.stopPropagation(); openEditModal(post.id); };
          const chClass = getChannelTagClass(post.channel);
          chip.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; gap:4px; min-width:0;">
              <span class="tag ${chClass}" style="font-size: 9px; padding: 1px 4px; flex-shrink:0;">${escapeHtmlForChat(post.channel)}</span>
              <span style="font-size: 9px; color: var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtmlForChat(post.format)}</span>
            </div>
            <div class="cal-chip-title">${escapeHtmlForChat(post.title)}</div>
          `;
          cell.appendChild(chip);
        });

        dayStories.forEach(story => {
          const chip = document.createElement("div");
          chip.className = "cal-story-chip";
          chip.title = `Historia${story.time ? " " + story.time : ""}: ${story.name}`;
          chip.onclick = (e) => { e.stopPropagation(); openStoryModal(story.id); };
          chip.innerHTML = `
            <span class="cs-time">${story.time ? escapeHtmlForChat(story.time) : "📱"}</span>
            <span class="cs-name">${escapeHtmlForChat(story.name)}</span>
          `;
          cell.appendChild(chip);
        });

        calGrid.appendChild(cell);
      }
    }

    /* RENDER STORIES LIST */
    function getHighlightById(id) {
      return highlights.find(h => h.id === id) || null;
    }

    function sortedStories() {
      return stories.slice().sort((a, b) => {
        if (a.date !== b.date) return a.date < b.date ? -1 : 1;
        return (a.order || 0) - (b.order || 0);
      });
    }

    // Reordena un día: primero las historias con hora (cronológico),
    // después las que no tienen hora (respetando su orden manual).
    function reflowDayOrder(date) {
      if (!date) return;
      const dayStories = stories.filter(s => s.date === date);
      const timed = dayStories.filter(s => s.time).sort((a, b) => String(a.time).localeCompare(String(b.time)));
      const untimed = dayStories.filter(s => !s.time).sort((a, b) => (a.order || 0) - (b.order || 0));
      [...timed, ...untimed].forEach((s, i) => { s.order = i; });
    }

    function renderStoriesChrome() {
      const total = stories.length;
      const btnLabel = document.getElementById("btnStoriesLabel");
      if (btnLabel) btnLabel.innerText = String(total);
      const kpiS = document.getElementById("kpiStoryCount");
      if (kpiS) kpiS.innerText = String(total);
      const kpiH = document.getElementById("kpiHighlightCount");
      if (kpiH) kpiH.innerText = String(highlights.length);
      const countLabel = document.getElementById("storiesCountLabel");
      if (countLabel) countLabel.innerText = String(total);
      const subLabel = document.getElementById("storiesSubLabel");
      if (subLabel) subLabel.innerText = `${highlights.length} destacadas`;
    }

    function renderHighlights() {
      const grid = document.getElementById("highlights-grid");
      if (!grid) return;
      grid.innerHTML = "";
      const ordered = highlights.slice().sort((a, b) => (a.order || 0) - (b.order || 0));
      if (ordered.length === 0) {
        grid.innerHTML = `<div style="font-size:13px;color:var(--text-muted);">Sin destacadas. Crea la primera con «+ Nuevo destacado».</div>`;
        return;
      }
      ordered.forEach((h, idx) => {
        const count = stories.filter(s => s.highlightId === h.id).length;
        const card = document.createElement("div");
        card.className = "highlight-card";
        card.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;">
            <div class="hl-icon-wrap">${escapeHtmlForChat(h.icon || "📌")}</div>
            <div style="display:flex;gap:2px;">
              <button class="ghost-mini" title="Subir" ${idx === 0 ? "disabled" : ""}>↑</button>
              <button class="ghost-mini" title="Bajar" ${idx === ordered.length - 1 ? "disabled" : ""}>↓</button>
              <button class="ghost-mini" title="Editar">✎</button>
              <button class="ghost-mini danger" title="Eliminar">🗑</button>
            </div>
          </div>
          <div class="hl-name">${escapeHtmlForChat(h.name)}</div>
          <div class="hl-count">${count} ${count === 1 ? "Historia asociada" : "Historias asociadas"}</div>
          <div class="hl-desc">${escapeHtmlForChat(h.desc || "")}</div>
        `;
        card.querySelectorAll("button").forEach((button, index) => {
          const actions = [() => moveHighlight(h.id, -1), () => moveHighlight(h.id, 1), () => openHighlightModal(h.id), () => deleteHighlight(h.id)];
          button.addEventListener("click", () => actions[index]());
        });
        grid.appendChild(card);
      });
    }

    function renderStories() {
      const container = document.getElementById("stories-list");
      if (!container) return;
      container.innerHTML = "";
      const list = sortedStories();
      if (list.length === 0) {
        container.innerHTML = `<div style="font-size:13px;color:var(--text-muted);padding:8px 0;">Sin historias todavía. Usa «+ Nueva historia» o pídeselas a Piti.</div>`;
        return;
      }
      list.forEach((s, idx) => {
        const h = getHighlightById(s.highlightId);
        const canUp = idx > 0 && list[idx - 1].date === s.date;
        const canDown = idx < list.length - 1 && list[idx + 1].date === s.date;
        const div = document.createElement("div");
        div.className = "st-item";
        div.setAttribute("draggable", "true");
        div.dataset.storyId = s.id;
        div.innerHTML = `
          <span class="st-idx" data-label="#">#${idx + 1}</span>
          <span class="st-date" data-label="Fecha" title="${escapeHtmlForChat(s.date)}">${formatShortDate(s.date)}</span>
          <span class="st-time" data-label="Hora">${s.time ? escapeHtmlForChat(s.time) : "—"}</span>
          <span class="st-highlight" data-label="Destacada" title="${h ? escapeHtmlForChat((h.icon ? h.icon + " " : "") + h.name) : "Sin destacada"}">${h ? escapeHtmlForChat((h.icon ? h.icon + " " : "") + h.name) : "—"}</span>
          <span class="st-name" data-label="Historia" title="${escapeHtmlForChat(s.name + (s.context ? " — " + s.context : ""))}">
            <span class="st-name-title">${escapeHtmlForChat(s.name)}</span>
            ${s.context
              ? `<span class="st-context">${escapeHtmlForChat(s.context)}</span>`
              : `<span class="st-context st-context-empty">+ Añadir contexto</span>`}
          </span>
          <span data-label="Formato"><span class="tag tag-gray">${escapeHtmlForChat(s.format || "—")}</span></span>
          <span data-label="Estado"><span class="tag ${getTagStatusClass(s.status || "Idea")}">${escapeHtmlForChat(s.status || "Idea")}</span></span>
          <span style="display:flex;gap:2px;justify-content:flex-end;" data-label="Acciones">
            <button class="ghost-mini" title="Subir" ${canUp ? "" : "disabled"}>↑</button>
            <button class="ghost-mini" title="Bajar" ${canDown ? "" : "disabled"}>↓</button>
            <button class="ghost-mini" title="Editar">✎</button>
            <button class="ghost-mini danger" title="Eliminar">🗑</button>
          </span>
        `;
        div.querySelectorAll("button").forEach((button, index) => {
          const actions = [() => moveStory(s.id, -1), () => moveStory(s.id, 1), () => openStoryModal(s.id), () => deleteStory(s.id)];
          button.addEventListener("click", () => actions[index]());
        });
        div.addEventListener("dragstart", (e) => { e.dataTransfer.setData("text/plain", s.id); });
        div.addEventListener("dragover", (e) => { e.preventDefault(); });
        div.addEventListener("drop", (e) => {
          e.preventDefault();
          const draggedId = e.dataTransfer.getData("text/plain");
          if (draggedId && draggedId !== s.id) reorderStoryBefore(draggedId, s.id);
        });
        div.addEventListener("click", (e) => {
          if (e.target.closest("button")) return;
          openStoryModal(s.id);
        });
        container.appendChild(div);
      });
    }

    function renderCurrentView() {
      if (activeView === "kanban") renderKanban();
      else if (activeView === "table") renderTable();
      else if (activeView === "calendar") renderCalendar();
      else if (activeView === "stories") { renderHighlights(); renderStories(); }
      renderStoriesChrome();
    }

    /* MODAL LOGIC */
    function openEditModal(id) {
      const post = posts.find(p => p.id === id);
      if (!post) return;

      document.getElementById("edit-id").value = post.id;
      document.getElementById("edit-title").value = post.title;
      document.getElementById("edit-channel").value = post.channel || "Instagram";
      document.getElementById("edit-date").value = post.date;
      document.getElementById("edit-status").value = post.status;
      document.getElementById("edit-phase").value = post.phase;
      document.getElementById("edit-format").value = post.format;
      document.getElementById("edit-structure").value = post.structure || "";
      document.getElementById("edit-caption").value = post.caption || "";

      document.getElementById("drawerStatusTag").innerText = "Editar Pieza (" + post.channel + ")";
      document.getElementById("btnDelete").style.display = "block";
      document.getElementById("modalOverlay").style.display = "flex";
    }

    function openCreateModal() {
      document.getElementById("edit-id").value = "";
      document.getElementById("edit-title").value = "";
      document.getElementById("edit-channel").value = "Instagram";
      document.getElementById("edit-date").value = "2026-11-12";
      document.getElementById("edit-status").value = "Idea";
      document.getElementById("edit-phase").value = "Fase 2: Archivo";
      document.getElementById("edit-format").value = "Carrusel";
      document.getElementById("edit-structure").value = "";
      document.getElementById("edit-caption").value = "";

      document.getElementById("drawerStatusTag").innerText = "Nueva Pieza";
      document.getElementById("btnDelete").style.display = "none";
      document.getElementById("modalOverlay").style.display = "flex";
    }

    function closeModal() {
      document.getElementById("modalOverlay").style.display = "none";
    }

    function closeModalOnOverlay(e) {
      if (e.target.id === "modalOverlay") closeModal();
    }

    function saveCurrentPost() {
      const id = document.getElementById("edit-id").value;
      const title = document.getElementById("edit-title").value.trim();
      if (!title) { alert("Por favor escribe un título para la pieza"); return; }

      const channel = document.getElementById("edit-channel").value;
      const date = document.getElementById("edit-date").value;
      const status = document.getElementById("edit-status").value;
      const phase = document.getElementById("edit-phase").value;
      const format = document.getElementById("edit-format").value;
      const structure = document.getElementById("edit-structure").value;
      const caption = document.getElementById("edit-caption").value;

      if (id) {
        const post = posts.find(p => p.id === id);
        if (post) {
          post.title = title;
          post.channel = channel;
          post.date = date;
          post.status = status;
          post.phase = phase;
          post.format = format;
          post.structure = structure;
          post.caption = caption;
        }
      } else {
        const newPost = {
          id: "post-" + Date.now(),
          title, channel, date, status, phase, format, structure, caption
        };
        posts.push(newPost);
      }

      saveToStorage();
      closeModal();
      renderCurrentView();
    }

    function deleteCurrentPost() {
      const id = document.getElementById("edit-id").value;
      if (!id) return;
      if (confirm("¿Estás seguro de eliminar esta pieza del calendario?")) {
        posts = posts.filter(p => p.id !== id);
        saveToStorage();
        closeModal();
        renderCurrentView();
      }
    }

    /* =================== CRUD DE HISTORIAS & DESTACADAS =================== */
    function nextHighlightOrder() {
      return highlights.reduce((max, h) => Math.max(max, h.order || 0), -1) + 1;
    }

    function nextStoryOrder(dateIso) {
      return stories.filter(s => s.date === dateIso)
        .reduce((max, s) => Math.max(max, s.order || 0), -1) + 1;
    }

    function slugifyHighlight(name) {
      const base = String(name || "destacada")
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 24) || "destacada";
      let id = "hl-" + base;
      let n = 2;
      while (highlights.some(h => h.id === id)) { id = "hl-" + base + "-" + n; n++; }
      return id;
    }

    function resolveHighlightId(value) {
      if (!value) return (highlights[0] && highlights[0].id) || "";
      const raw = String(value).trim();
      if (highlights.some(h => h.id === raw)) return raw;
      const clean = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
      const norm = clean(raw);
      const exact = highlights.find(h => clean(h.name) === norm);
      if (exact) return exact.id;
      const partial = highlights.find(h => norm.includes(clean(h.name)) || clean(h.name).includes(norm));
      if (partial) return partial.id;
      return (highlights[0] && highlights[0].id) || "";
    }

    function normalizeDateParam(value) {
      if (!value) return "";
      const raw = String(value).trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
      const m = raw.match(/(\d{1,2})\s*(?:de\s*)?([A-Za-zÁ-ú]{3,})/);
      if (m) {
        const months = { ene: "01", feb: "02", mar: "03", abr: "04", may: "05", jun: "06", jul: "07", ago: "08", sep: "09", oct: "10", nov: "11", dic: "12" };
        const day = String(m[1]).padStart(2, "0");
        const mon = months[m[2].toLowerCase().slice(0, 3)];
        if (mon) return `2026-${mon}-${day}`;
      }
      return "";
    }

    function fillStoryHighlightOptions(selectedId) {
      const sel = document.getElementById("story-highlight");
      if (!sel) return;
      sel.innerHTML = "";
      highlights.slice().sort((a, b) => (a.order || 0) - (b.order || 0)).forEach(h => {
        const opt = document.createElement("option");
        opt.value = h.id;
        opt.textContent = `${h.icon || ""} ${h.name}`.trim();
        if (h.id === selectedId) opt.selected = true;
        sel.appendChild(opt);
      });
      if (highlights.length === 0) {
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = "Sin destacadas";
        sel.appendChild(opt);
      }
    }

    function showStoryModalMode(mode) {
      const isStory = mode === "story";
      document.getElementById("story-mode").value = mode;
      document.getElementById("storyDrawerTag").innerText = isStory ? "Historia" : "Destacada";
      document.getElementById("storyNameLabel").innerText = isStory ? "Nombre de la historia" : "Nombre de la destacada";
      document.getElementById("storyFields").style.display = isStory ? "flex" : "none";
      document.getElementById("storyIconGroup").style.display = isStory ? "none" : "block";
      document.getElementById("storyDescGroup").style.display = isStory ? "none" : "block";
    }

    function openStoryModal(id) {
      const item = id ? stories.find(s => s.id === id) : null;
      showStoryModalMode("story");
      fillStoryHighlightOptions(item ? item.highlightId : (highlights[0] && highlights[0].id));
      document.getElementById("story-id").value = item ? item.id : "";
      document.getElementById("story-name").value = item ? item.name : "";
      document.getElementById("story-date").value = item ? item.date : new Date().toISOString().slice(0, 10);
      document.getElementById("story-time").value = item ? (item.time || "") : "";
      document.getElementById("story-context").value = item ? (item.context || "") : "";
      document.getElementById("story-status").value = item ? (item.status || "Idea") : "Idea";

      const fmtSel = document.getElementById("story-format");
      const fmt = item ? (item.format || "") : "";
      if (fmt && !Array.from(fmtSel.options).some(o => o.value === fmt)) {
        const opt = document.createElement("option");
        opt.value = fmt;
        opt.textContent = fmt;
        fmtSel.appendChild(opt);
      }
      fmtSel.value = fmt;

      document.getElementById("storyBtnDelete").style.display = item ? "block" : "none";
      document.getElementById("storyOverlay").style.display = "flex";
      setTimeout(() => document.getElementById("story-name").focus(), 60);
    }

    function openHighlightModal(id) {
      const hl = id ? highlights.find(h => h.id === id) : null;
      showStoryModalMode("highlight");
      document.getElementById("story-id").value = hl ? hl.id : "";
      document.getElementById("story-name").value = hl ? hl.name : "";
      document.getElementById("story-icon").value = hl ? (hl.icon || "") : "📌";
      document.getElementById("story-desc").value = hl ? (hl.desc || "") : "";
      document.getElementById("storyBtnDelete").style.display = hl ? "block" : "none";
      document.getElementById("storyOverlay").style.display = "flex";
      setTimeout(() => document.getElementById("story-name").focus(), 60);
    }

    function closeStoryModal() {
      document.getElementById("storyOverlay").style.display = "none";
    }

    function closeStoryModalOnOverlay(e) {
      if (e.target.id === "storyOverlay") closeStoryModal();
    }

    function saveStoryModal() {
      const mode = document.getElementById("story-mode").value;
      const id = document.getElementById("story-id").value;
      const name = document.getElementById("story-name").value.trim();
      if (!name) { alert("Escribe un nombre para continuar."); return; }

      if (mode === "highlight") {
        const icon = document.getElementById("story-icon").value.trim() || "📌";
        const desc = document.getElementById("story-desc").value.trim();
        if (id) {
          const hl = highlights.find(h => h.id === id);
          if (hl) { hl.name = name; hl.icon = icon; hl.desc = desc; }
        } else {
          highlights.push({ id: slugifyHighlight(name), name, icon, desc, order: nextHighlightOrder() });
        }
      } else {
        const date = document.getElementById("story-date").value || new Date().toISOString().slice(0, 10);
        const time = document.getElementById("story-time").value || "";
        const highlightId = resolveHighlightId(document.getElementById("story-highlight").value);
        const format = normalizeStoryFormat(document.getElementById("story-format").value);
        const status = document.getElementById("story-status").value;
        const context = document.getElementById("story-context").value.trim();
        if (id) {
          const s = stories.find(x => x.id === id);
          if (s) {
            const oldDate = s.date;
            s.name = name; s.date = date; s.time = time; s.highlightId = highlightId; s.format = format; s.status = status; s.context = context;
            reflowDayOrder(oldDate);
            reflowDayOrder(s.date);
          }
        } else {
          stories.push({ id: "st-" + Date.now(), name, date, time, highlightId, format, status, context, order: nextStoryOrder(date) });
          reflowDayOrder(date);
        }
      }

      saveStoriesToStorage();
      closeStoryModal();
      renderCurrentView();
    }

    function deleteStory(id) {
      const s = stories.find(x => x.id === id);
      if (!s) return;
      if (!confirm(`¿Eliminar la historia «${s.name}»?`)) return;
      stories = stories.filter(x => x.id !== id);
      saveStoriesToStorage();
      renderCurrentView();
    }

    function deleteFromStoryModal() {
      const mode = document.getElementById("story-mode").value;
      const id = document.getElementById("story-id").value;
      if (!id) return;
      if (mode === "highlight") deleteHighlight(id);
      else deleteStory(id);
      closeStoryModal();
    }

    function deleteHighlight(id) {
      const hl = highlights.find(h => h.id === id);
      if (!hl) return;
      const count = stories.filter(s => s.highlightId === id).length;
      const msg = count > 0
        ? `La destacada «${hl.name}» tiene ${count} historia(s). Si la eliminas, esas historias quedarán sin destacada. ¿Continuar?`
        : `¿Eliminar la destacada «${hl.name}»?`;
      if (!confirm(msg)) return;
      highlights = highlights.filter(h => h.id !== id);
      stories.forEach(s => { if (s.highlightId === id) s.highlightId = ""; });
      saveStoriesToStorage();
      renderCurrentView();
    }

    function moveHighlight(id, dir) {
      const ordered = highlights.slice().sort((a, b) => (a.order || 0) - (b.order || 0));
      const idx = ordered.findIndex(h => h.id === id);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= ordered.length) return;
      const tmp = ordered[idx];
      ordered[idx] = ordered[target];
      ordered[target] = tmp;
      ordered.forEach((h, i) => { h.order = i; });
      saveStoriesToStorage();
      renderCurrentView();
    }

    function moveStory(id, dir) {
      const list = sortedStories();
      const idx = list.findIndex(s => s.id === id);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= list.length) return;
      const a = list[idx], b = list[target];
      if (a.date !== b.date) return; // el orden manual solo aplica dentro del mismo día
      const tmp = a.order || 0;
      a.order = b.order || 0;
      b.order = tmp;
      saveStoriesToStorage();
      renderCurrentView();
    }

    function reorderStoryBefore(draggedId, targetId) {
      const dragged = stories.find(s => s.id === draggedId);
      const target = stories.find(s => s.id === targetId);
      if (!dragged || !target || dragged.id === target.id) return;
      const originDate = dragged.date;
      dragged.date = target.date;
      const group = stories.filter(s => s.date === target.date && s.id !== dragged.id)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      const targetIdx = group.indexOf(target);
      group.splice(targetIdx >= 0 ? targetIdx : group.length, 0, dragged);
      group.forEach((s, i) => { s.order = i; });
      if (originDate !== target.date) {
        stories.filter(s => s.date === originDate)
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .forEach((s, i) => { s.order = i; });
      }
      saveStoriesToStorage();
      renderCurrentView();
    }

    /* =================== MOTOR UNIVERSAL MULTI-PROVEEDOR DE IA (CATÁLOGO EN VIVO /models) =================== */
