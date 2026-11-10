const AI_PROVIDERS = {
      deepseek: {
        name: "DeepSeek",
        icon: "🐋",
        help: 'Obtén tu API Key en <a href="https://platform.deepseek.com/api_keys" target="_blank" style="color:var(--blue-accent); font-weight:600;">DeepSeek Platform</a>. Los IDs oficiales en <code>api.deepseek.com</code> son <strong>deepseek-v4-pro</strong> y <strong>deepseek-flash</strong>.',
        placeholder: "sk-...",
        models: [
          { id: "deepseek-v4-pro", label: "👑 deepseek-v4-pro (DeepSeek V4 Pro · Máxima Calidad Oficial)" },
          { id: "deepseek-flash", label: "⚡ deepseek-flash (DeepSeek V4.1 Flash · Ultra Rápido y Económico)" },
          { id: "deepseek-chat", label: "🔥 deepseek-chat (Alias Oficial Chat)" },
          { id: "deepseek-reasoner", label: "🧠 deepseek-reasoner (Alias Oficial Razonador R1)" }
        ],
        defaultModel: "deepseek-v4-pro"
      },
      google: {
        name: "Google Gemini",
        icon: "✨",
        help: 'Obtén tu API Key gratuita en <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--blue-accent); font-weight:600;">Google AI Studio</a>. El modelo oficial activo para tu cuenta es <strong>gemini-3.8-flash</strong>.',
        placeholder: "AIzaSy...",
        models: [
          { id: "gemini-3.8-flash", label: "⚡ gemini-3.8-flash (Oficial Actual 2026 · Ultra Rápido y Gratuito)" },
          { id: "gemini-4-argon", label: "👑 gemini-4-argon (Máxima Calidad 2026)" },
          { id: "gemini-omni-1.2-flash", label: "🌐 gemini-omni-1.2-flash (Omnimodal)" },
          { id: "gemini-2.5-pro", label: "👑 gemini-2.5-pro (Razonamiento Avanzado)" }
        ],
        defaultModel: "gemini-3.8-flash"
      },
      openai: {
        name: "OpenAI",
        icon: "🤖",
        help: 'Obtén tu API Key en <a href="https://platform.openai.com/api-keys" target="_blank" style="color:var(--blue-accent); font-weight:600;">OpenAI Platform</a>. Carga en vivo todos los modelos de tu organización.',
        placeholder: "sk-proj-...",
        models: [
          { id: "gpt-6.1-terra-pro", label: "👑 gpt-6.1-terra-pro (Flagship Máxima Inteligencia)" },
          { id: "gpt-6.1-sol-pro", label: "👑 gpt-6.1-sol-pro (Razonamiento & Creatividad)" },
          { id: "gpt-6.1-terra", label: "⚡ gpt-6.1-terra" },
          { id: "gpt-6.1-sol", label: "⚡ gpt-6.1-sol" },
          { id: "gpt-4o", label: "🔥 gpt-4o" },
          { id: "o3-mini", label: "🧠 o3-mini" },
          { id: "o1", label: "🧠 o1" }
        ],
        defaultModel: "gpt-6.1-terra-pro"
      },
      anthropic: {
        name: "Anthropic Claude",
        icon: "🧠",
        help: 'Obtén tu API Key en <a href="https://console.anthropic.com/settings/keys" target="_blank" style="color:var(--blue-accent); font-weight:600;">Anthropic Console</a>. Consulta en vivo todos los modelos Claude activos.',
        placeholder: "sk-ant-api03-...",
        models: [
          { id: "claude-opus-5.5", label: "👑 claude-opus-5.5 (Máxima Capacidad Editorial)" },
          { id: "claude-sonnet-5.5", label: "👑 claude-sonnet-5.5 (Equilibrio Ideal Razonamiento & Copy)" },
          { id: "claude-fable-5.1", label: "✨ claude-fable-5.1 (Especialista Creativo)" },
          { id: "claude-haiku-5.5", label: "⚡ claude-haiku-5.5 (Ultra Rápido)" },
          { id: "claude-3-7-sonnet-20250219", label: "🔥 claude-3-7-sonnet-20250219" },
          { id: "claude-3-5-sonnet-20241022", label: "🔥 claude-3-5-sonnet-20241022" }
        ],
        defaultModel: "claude-sonnet-5.5"
      },
      openrouter: {
        name: "OpenRouter",
        icon: "🌐",
        help: 'Una sola clave para más de 460 modelos actuales sin bloqueos CORS en <a href="https://openrouter.ai/keys" target="_blank" style="color:var(--blue-accent); font-weight:600;">OpenRouter.ai</a>.',
        placeholder: "sk-or-v1-...",
        models: [
          { id: "deepseek/deepseek-v4-pro-0813", label: "👑 deepseek/deepseek-v4-pro-0813 (DeepSeek V4 Pro)" },
          { id: "deepseek/deepseek-v4.1-flash-1017", label: "⚡ deepseek/deepseek-v4.1-flash-1017 (DeepSeek V4.1 Flash)" },
          { id: "anthropic/claude-opus-5.5", label: "👑 anthropic/claude-opus-5.5" },
          { id: "anthropic/claude-sonnet-5.5", label: "👑 anthropic/claude-sonnet-5.5" },
          { id: "openai/gpt-6.1-terra-pro", label: "👑 openai/gpt-6.1-terra-pro" },
          { id: "google/gemini-4-argon", label: "👑 google/gemini-4-argon" },
          { id: "meta-llama/llama-4-maverick", label: "🔥 meta-llama/llama-4-maverick" },
          { id: "mistralai/mistral-large-4-0", label: "🌪️ mistralai/mistral-large-4-0" }
        ],
        defaultModel: "deepseek/deepseek-v4-pro-0813"
      },
      groq: {
        name: "Groq",
        icon: "⚡",
        help: 'Obtén tu API Key en <a href="https://console.groq.com/keys" target="_blank" style="color:var(--blue-accent); font-weight:600;">Groq Console</a>. Consulta en vivo todos los modelos de inferencia rápida.',
        placeholder: "gsk_...",
        models: [
          { id: "meta-llama/llama-4-maverick-17b-128e-instruct", label: "👑 llama-4-maverick (Llama 4 Maverick)" },
          { id: "meta-llama/llama-4-scout-17b-16e-instruct", label: "⚡ llama-4-scout (Llama 4 Scout)" },
          { id: "llama-3.3-70b-versatile", label: "🔥 llama-3.3-70b-versatile" }
        ],
        defaultModel: "meta-llama/llama-4-maverick-17b-128e-instruct"
      },
      mistral: {
        name: "Mistral AI",
        icon: "🌪️",
        help: 'Obtén tu API Key en <a href="https://console.mistral.ai/api-keys" target="_blank" style="color:var(--blue-accent); font-weight:600;">Mistral Console</a>.',
        placeholder: "...",
        models: [
          { id: "mistral-large-4-0", label: "👑 mistral-large-4-0 (Mistral Large 4.0)" },
          { id: "mistral-medium-3-5", label: "👑 mistral-medium-3-5 (Mistral Medium 3.5)" },
          { id: "devstral-2512", label: "⚡ devstral-2512" },
          { id: "mistral-large-latest", label: "🔥 mistral-large-latest" }
        ],
        defaultModel: "mistral-large-4-0"
      },
      custom: {
        name: "Personalizado / Local",
        icon: "🛠️",
        help: 'Conecta cualquier servidor local (ej: <strong>Ollama</strong> en <code>http://localhost:11434/v1/chat/completions</code> o LM Studio) o servicio compatible con la API de OpenAI.',
        placeholder: "Opcional si es Ollama local...",
        models: [],
        defaultModel: "llama4"
      }
    };

    function sanitizeApiKey(raw) {
      if (!raw) return "";
      return raw.replace(/["'\s\r\n]/g, "").trim();
    }

    function detectProviderByKeyFormat(cleanKey) {
      if (!cleanKey) return null;
      if (cleanKey.startsWith("AIza")) return "google";
      if (cleanKey.startsWith("sk-or-v1-")) return "openrouter";
      if (cleanKey.startsWith("sk-ant-")) return "anthropic";
      if (cleanKey.startsWith("gsk_")) return "groq";
      if (/^sk-[a-f0-9]{32}$/i.test(cleanKey)) return "deepseek";
      if (cleanKey.startsWith("sk-proj-") || cleanKey.startsWith("sk-svcacct-")) return "openai";
      return null;
    }

    /* =================== BÓVEDA MULTI-API (KEYCHAIN MULTI-PROVEEDOR) =================== */
    const SECRET_STORAGE_KEYS = ["po_api_vault", "po_ai_key", "po_gemini_key", "po_gh_repo_token"];
    function rememberSecrets() { return globalThis.StudioCredentialVault?.managed ? localStorage.getItem("po_vault_remember") === "1" : localStorage.getItem("po_remember_secrets") !== "0"; }
    const secretStorage = {
      getItem(key) { return globalThis.StudioCredentialVault?.managed ? StudioCredentialVault.read(key) : (rememberSecrets() ? localStorage : sessionStorage).getItem(key); },
      setItem(key, value) { if (globalThis.StudioCredentialVault?.managed) StudioCredentialVault.write(key, value); else (rememberSecrets() ? localStorage : sessionStorage).setItem(key, value); },
      removeItem(key) { if (globalThis.StudioCredentialVault?.managed) StudioCredentialVault.remove(key); localStorage.removeItem(key); sessionStorage.removeItem(key); }
    };
    function setRememberSecrets(remember) {
      if (globalThis.StudioCredentialVault?.managed) return StudioCredentialVault.setRemember(remember);
      const source = rememberSecrets() ? localStorage : sessionStorage;
      const target = remember ? localStorage : sessionStorage;
      try {
        const entries = SECRET_STORAGE_KEYS.map(key => [key, source.getItem(key)]);
        // Copy first: if storage fails, keep the current mode and original keys.
        for (const [key, value] of entries) { if (value !== null) target.setItem(key, value); else target.removeItem(key); }
        localStorage.setItem("po_remember_secrets", remember ? "1" : "0");
        if (source !== target) for (const key of SECRET_STORAGE_KEYS) source.removeItem(key);
      } catch (_) {
        alert("No se pudo cambiar dónde se guardan las claves. Se mantiene la configuración anterior.");
      }
      const checkbox = document.getElementById("rememberSecretsCheck");
      if (checkbox) checkbox.checked = rememberSecrets();
    }

    let apiVault = {};
    try {
      const rawVault = secretStorage.getItem("po_api_vault");
      if (rawVault) {
        const parsed = JSON.parse(rawVault);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          for (const provider of Object.keys(AI_PROVIDERS)) {
            const entry = parsed[provider];
            if (entry && typeof entry.key === "string") apiVault[provider] = {
              key: sanitizeApiKey(entry.key), model: typeof entry.model === "string" ? entry.model : "",
              endpoint: typeof entry.endpoint === "string" ? entry.endpoint : ""
            };
          }
        }
      }
    } catch (e) {
      apiVault = {};
    }

    // Inicialización inteligente respetando siempre el proveedor elegido por el usuario
    let storedKey = sanitizeApiKey(secretStorage.getItem("po_ai_key") || secretStorage.getItem("po_gemini_key") || "");
    let autoProv = detectProviderByKeyFormat(storedKey);
    let currentAiProvider = localStorage.getItem("po_ai_provider") || autoProv || "deepseek";

    function normalizeModelIdForProvider(provider, rawModel) {
      let m = (rawModel || "").trim();
      if (!m) return AI_PROVIDERS[provider]?.defaultModel || "deepseek-v4-pro";
      if (provider === "deepseek") {
        const lower = m.toLowerCase().replace(/^deepseek\//, "");
        if (lower === "deepseek-v4.1-flash" || lower === "deepseek-v4-flash" || lower.includes("v4.1-flash") || lower.includes("v4-flash")) {
          return "deepseek-flash";
        }
        if (lower.startsWith("deepseek-v4-pro")) {
          return "deepseek-v4-pro";
        }
        return m.replace(/^deepseek\//i, "");
      }
      if (provider === "google") {
        const cleanG = m.replace(/^models\//i, "");
        if (cleanG === "gemini-2.5-flash" || cleanG === "gemini-1.5-flash" || cleanG === "gemini-2.0-flash" || cleanG === "gemini-1.5-pro") {
          return "gemini-3.8-flash";
        }
        return cleanG;
      }
      return m;
    }

    let rawStoredModel = localStorage.getItem("po_ai_model") || (AI_PROVIDERS[currentAiProvider]?.defaultModel || "deepseek-v4-pro");
    let currentAiModel = normalizeModelIdForProvider(currentAiProvider, rawStoredModel);
    let currentAiVersion = localStorage.getItem("po_gemini_ver") || "v1beta";
    let currentAiEndpoint = localStorage.getItem("po_ai_endpoint") || "http://localhost:11434/v1/chat/completions";

    // Auto-migrar claves individuales previas a la Bóveda Multi-API
    if (storedKey && (!apiVault[currentAiProvider] || !apiVault[currentAiProvider].key)) {
      apiVault[currentAiProvider] = {
        key: storedKey,
        model: currentAiModel,
        endpoint: currentAiEndpoint
      };
    }
    const legacyGemini = sanitizeApiKey(secretStorage.getItem("po_gemini_key") || "");
    if (legacyGemini && legacyGemini.startsWith("AIza") && (!apiVault.google || !apiVault.google.key)) {
      apiVault.google = {
        key: legacyGemini,
        model: "gemini-3.8-flash",
        endpoint: ""
      };
    }
    // Si una clave de Google se desvió por error a OpenAI por el bug previo de longitud >42, rescatarla
    if (apiVault.openai && apiVault.openai.key && !apiVault.openai.key.startsWith("sk-")) {
      if (!apiVault.google || !apiVault.google.key) {
        apiVault.google = {
          key: apiVault.openai.key,
          model: "gemini-3.8-flash",
          endpoint: ""
        };
      }
      delete apiVault.openai;
    }
    // Actualizar en la bóveda cualquier modelo previo retirado (como gemini-2.5-flash) al oficial gemini-3.8-flash
    if (apiVault.google && apiVault.google.model) {
      apiVault.google.model = normalizeModelIdForProvider("google", apiVault.google.model);
    }
    secretStorage.setItem("po_api_vault", JSON.stringify(apiVault));
    secretStorage.removeItem("po_ai_key");
    secretStorage.removeItem("po_gemini_key");

    // Si el proveedor activo tiene datos en la bóveda, sincronizarlos
    let currentAiKey = apiVault[currentAiProvider]?.key || storedKey;
    if (apiVault[currentAiProvider]?.model) {
      currentAiModel = normalizeModelIdForProvider(currentAiProvider, apiVault[currentAiProvider].model);
    }

    function getVaultEntry(prov) {
      return apiVault[prov] || { key: "", model: AI_PROVIDERS[prov]?.defaultModel || "", endpoint: "" };
    }

    function saveVaultEntry(prov, key, model, endpoint = "") {
      if (!prov) return;
      if (!apiVault[prov]) apiVault[prov] = {};
      apiVault[prov].key = key;
      apiVault[prov].model = model || AI_PROVIDERS[prov]?.defaultModel || "";
      if (endpoint || prov === "custom") apiVault[prov].endpoint = endpoint;
      secretStorage.setItem("po_api_vault", JSON.stringify(apiVault));
    }

    function deleteVaultEntry(prov) {
      if (apiVault[prov]) {
        delete apiVault[prov];
        secretStorage.setItem("po_api_vault", JSON.stringify(apiVault));
          }
    }

    function hasKeyConfigured(prov) {
      if (prov === "custom") return true;
      return !!(apiVault[prov]?.key && sanitizeApiKey(apiVault[prov].key).length > 6);
    }

    // Compatibilidad retroactiva y seguimiento de costos en tiempo real
    let geminiApiKey = currentAiKey;
    let detectedModel = currentAiModel;
    let detectedVersion = currentAiVersion;
    let liveFetchTimeout = null;
    const liveModelPricingMap = {};
    let sessionTotalCostUSD = parseFloat(localStorage.getItem("po_session_cost_usd") || "0");
    let sessionTotalTokens = parseInt(localStorage.getItem("po_session_tokens") || "0", 10);
    let lastCallUsage = null;

    function estimateModelPricing(provider, modelId) {
      const m = (modelId || "").toLowerCase();
      if (liveModelPricingMap[modelId]) {
        const p = liveModelPricingMap[modelId];
        const isFree = p.inPerM === 0 && p.outPerM === 0;
        const costPerUse = (900 / 1_000_000) * p.inPerM + (350 / 1_000_000) * p.outPerM;
        return {
          isFree,
          inPerM: p.inPerM,
          outPerM: p.outPerM,
          costPerUse,
          badge: isFree ? "🆓 GRATIS ($0.00)" : `💲 ~$${costPerUse < 0.001 ? costPerUse.toFixed(5) : costPerUse.toFixed(4)} USD/uso`,
          tierLabel: isFree ? "🆓 100% GRATUITO ($0.00 USD por uso)" : "💳 PAGO POR USO (Tarifa en vivo de la API)",
          detail: isFree
            ? "Este modelo no cobra por tokens de entrada ni de salida."
            : `Entrada: <strong>$${p.inPerM.toFixed(2)}</strong> / 1M tok · Salida: <strong>$${p.outPerM.toFixed(2)}</strong> / 1M tok`
        };
      }

      if (m.includes(":free") || provider === "custom") {
        return {
          isFree: true,
          inPerM: 0,
          outPerM: 0,
          costPerUse: 0,
          badge: "🆓 GRATIS ($0.00)",
          tierLabel: "🆓 100% GRATUITO ($0.00 USD por uso)",
          detail: provider === "custom"
            ? "Corre localmente en tu equipo sin costo de API."
            : "Modelo gratuito sin costo por token."
        };
      }

      if (provider === "groq") {
        return {
          isFree: true,
          inPerM: 0,
          outPerM: 0,
          costPerUse: 0,
          badge: "🆓 GRATIS (Groq Free Tier)",
          tierLabel: "🆓 GRATUITO en Plan Developer de Groq ($0.00 USD)",
          detail: "Incluye hasta 14,400 peticiones diarias gratis en console.groq.com."
        };
      }

      if (provider === "google") {
        const isPro = m.includes("argon") || m.includes("pro");
        const inPerM = isPro ? 2.0 : 0.4;
        const outPerM = isPro ? 10.0 : 1.5;
        const costPerUse = (900 / 1_000_000) * inPerM + (350 / 1_000_000) * outPerM;
        return {
          isFree: true,
          inPerM: 0,
          outPerM: 0,
          costPerUse: 0,
          badge: "🆓 GRATIS (AI Studio Free Tier)",
          tierLabel: "🆓 GRATUITO en Google AI Studio (Plan Estándar)",
          detail: `En cuenta gratuita de AI Studio cuesta <strong>$0.00 USD</strong>. (En facturación Cloud Pay-as-you-go equivale a ~$${costPerUse.toFixed(4)} USD por uso).`
        };
      }

      let inPerM = 0.30;
      let outPerM = 0.90;
      let tier = "💳 PAGO POR USO";

      if (provider === "deepseek" || m.includes("deepseek")) {
        tier = "💳 PAGO POR USO (Ultra Económico)";
        if (m.includes("v4.1-flash") || m === "deepseek-flash") { inPerM = 0.05; outPerM = 0.50; }
        else if (m.includes("v4-flash")) { inPerM = 0.09; outPerM = 0.18; }
        else if (m.includes("v4-pro")) { inPerM = 0.35; outPerM = 0.71; }
        else if (m.includes("reasoner") || m.includes("r1")) { inPerM = 0.50; outPerM = 2.15; }
        else { inPerM = 0.27; outPerM = 0.89; }
      } else if (provider === "openai" || m.includes("gpt-") || m.startsWith("o1") || m.startsWith("o3")) {
        tier = "💳 PAGO POR USO (OpenAI)";
        if (m.includes("mini") || m.includes("nano")) { inPerM = 0.15; outPerM = 0.60; }
        else if (m.includes("terra")) { inPerM = 1.00; outPerM = 5.00; }
        else { inPerM = 2.00; outPerM = 10.00; }
      } else if (provider === "anthropic" || m.includes("claude")) {
        tier = "💳 PAGO POR USO (Anthropic)";
        if (m.includes("haiku")) { inPerM = 0.80; outPerM = 4.00; }
        else if (m.includes("opus")) { inPerM = 4.00; outPerM = 20.00; }
        else { inPerM = 2.00; outPerM = 10.00; }
      } else if (provider === "mistral" || m.includes("mistral") || m.includes("devstral")) {
        tier = "💳 PAGO POR USO (Mistral)";
        if (m.includes("small") || m.includes("ministral")) { inPerM = 0.20; outPerM = 0.60; }
        else { inPerM = 2.00; outPerM = 6.00; }
      }

      const costPerUse = (900 / 1_000_000) * inPerM + (350 / 1_000_000) * outPerM;
      return {
        isFree: false,
        inPerM,
        outPerM,
        costPerUse,
        badge: `💲 ~$${costPerUse < 0.001 ? costPerUse.toFixed(5) : costPerUse.toFixed(4)} USD/uso`,
        tierLabel: tier,
        detail: `Entrada: <strong>$${inPerM.toFixed(2)}</strong> / 1M tok · Salida: <strong>$${outPerM.toFixed(2)}</strong> / 1M tok`
      };
    }

    function updateModelPricingBox(provider, modelId) {
      const box = document.getElementById("modelPricingBox");
      if (!box) return;
      const p = estimateModelPricing(provider, modelId);

      if (p.isFree) {
        box.style.background = "#f0fdf4";
        box.style.borderColor = "#bbf7d0";
        box.style.color = "#166534";
        box.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; font-weight:700; margin-bottom:2px;">
            <span>${p.tierLabel}</span>
            <span style="background:#dcfce7; padding:2px 8px; border-radius:99px; font-size:11px;">Costo por consulta: $0.00 USD</span>
          </div>
          <div style="font-size:11.5px; color:#15803d;">${p.detail}</div>
        `;
      } else {
        const usesPerDollar = Math.max(1, Math.floor(1 / p.costPerUse)).toLocaleString("es-CO");
        box.style.background = "#fffbeb";
        box.style.borderColor = "#fde68a";
        box.style.color = "#92400e";
        box.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; font-weight:700; margin-bottom:3px;">
            <span>${p.tierLabel}</span>
            <span style="background:#fef3c7; color:#b45309; padding:2px 8px; border-radius:99px; font-size:11px;">~${p.badge}</span>
          </div>
          <div style="font-size:11.5px; color:#78350f;">
            ${p.detail}<br>
            💡 <strong>Rendimiento real:</strong> Con <strong>$1.00 USD</strong> puedes hacer aprox. <strong>~${usesPerDollar} consultas/ediciones</strong> en tu calendario.
            ${sessionTotalCostUSD > 0 ? `<br>📊 <strong>Gasto acumulado en esta sesión:</strong> $${sessionTotalCostUSD.toFixed(5)} USD (${sessionTotalTokens.toLocaleString()} tokens)` : ""}
          </div>
        `;
      }
    }

    function onCustomModelTyped(val) {
      currentAiModel = val.trim();
      const provider = document.getElementById("selectAiProvider")?.value || currentAiProvider;
      updateModelPricingBox(provider, currentAiModel);
    }

    function hasActiveAI() {
      if (currentAiProvider === "custom") return true;
      return !!sanitizeApiKey(currentAiKey);
    }

    // Consulta en vivo el endpoint /models de CUALQUIER proveedor para obtener el catálogo 100% actual sin restricciones
    async function discoverAllModelsFromAPI(provider, key, customEndpoint = "") {
      try {
        if (provider === "google") {
          const endpoints = ["v1beta", "v1"];
          for (const ver of endpoints) {
            try {
              const res = await fetch(`https://generativelanguage.googleapis.com/${ver}/models?key=${key}`);
              if (!res.ok) continue;
              const data = await res.json();
              if (data.models && data.models.length > 0) {
                const valid = data.models.filter(m => {
                  const id = m.name.replace(/^models\//, "");
                  if (m.supportedGenerationMethods && !m.supportedGenerationMethods.includes("generateContent")) return false;
                  if (/embed|aqa|bison|2\.5-flash|1\.5-flash|2\.0-flash/i.test(id)) return false;
                  return true;
                });
                const list = valid.map(m => {
                  const cleanId = m.name.replace(/^models\//, "");
                  const isTop = /pro|argon|ultra/i.test(cleanId);
                  return {
                    id: cleanId,
                    label: `${isTop ? "👑" : "⚡"} ${cleanId} [🆓 Gratis AI Studio]`,
                    isTop: isTop
                  };
                });
                list.sort((a, b) => {
                  const score = id => {
                    if (id.includes("3.8-flash")) return 110;
                    if (id.includes("4-argon") || id.includes("argon")) return 105;
                    if (id.includes("omni")) return 100;
                    if (id.includes("2.5-pro")) return 90;
                    return 50;
                  };
                  return score(b.id) - score(a.id);
                });
                if (list.length > 0) return { models: list, version: ver };
              }
            } catch (verErr) {
              console.warn(`Error consultando Google ${ver}:`, verErr);
            }
          }
          return null;
        }

        if (provider === "anthropic") {
          const res = await fetch("https://api.anthropic.com/v1/models", {
            method: "GET",
            headers: {
              "x-api-key": key,
              "anthropic-version": "2023-06-01",
              "anthropic-dangerous-direct-browser-access": "true"
            }
          });
          if (!res.ok) return null;
          const data = await res.json();
          if (data.data && Array.isArray(data.data)) {
            return {
              models: data.data.map(m => {
                const est = estimateModelPricing("anthropic", m.id);
                return {
                  id: m.id,
                  label: `🧠 ${m.id} [${est.badge}]`
                };
              })
            };
          }
          return null;
        }

        // Proveedores compatibles con GET /models (DeepSeek, OpenAI, OpenRouter, Groq, Mistral, Custom)
        let modelsUrl = "";
        let headers = { "Accept": "application/json" };
        if (key) headers["Authorization"] = `Bearer ${key}`;

        if (provider === "deepseek") modelsUrl = "https://api.deepseek.com/models";
        else if (provider === "openai") modelsUrl = "https://api.openai.com/v1/models";
        else if (provider === "openrouter") modelsUrl = "https://openrouter.ai/api/v1/models";
        else if (provider === "groq") modelsUrl = "https://api.groq.com/openai/v1/models";
        else if (provider === "mistral") modelsUrl = "https://api.mistral.ai/v1/models";
        else if (provider === "custom") {
          const base = (customEndpoint || "http://localhost:11434/v1/chat/completions").replace(/\/chat\/completions\/?$/, "");
          modelsUrl = `${base}/models`;
        }

        if (!modelsUrl) return null;
        const res = await fetch(modelsUrl, { method: "GET", headers });
        if (!res.ok) return null;
        const data = await res.json();
        const rawList = data.data || data.models || [];
        if (!Array.isArray(rawList) || rawList.length === 0) return null;

        const formatted = rawList.map(m => {
          const id = m.id || m.name;
          if (m.pricing && (m.pricing.prompt !== undefined || m.pricing.completion !== undefined)) {
            const inPerM = parseFloat(m.pricing.prompt || 0) * 1_000_000;
            const outPerM = parseFloat(m.pricing.completion || 0) * 1_000_000;
            liveModelPricingMap[id] = { inPerM, outPerM };
          }
          const est = estimateModelPricing(provider, id);
          const isTop = /pro|opus|reasoner|r1|v4|gpt-6|argon|large|maverick/i.test(id);
          return {
            id: id,
            label: `${isTop ? "👑" : "⚡"} ${id} [${est.badge}]`,
            isTop,
            isFree: est.isFree
          };
        });

        // Ordenar poniendo los modelos más potentes/recientes arriba
        formatted.sort((a, b) => (b.isTop ? 1 : 0) - (a.isTop ? 1 : 0));
        return { models: formatted };
      } catch (e) {
        console.warn("No se pudo listar /models en vivo:", e);
        return null;
      }
    }

    function populateModelSelectors(modelObjects, selectedModelId, isLiveFromApi = false) {
      const sel = document.getElementById("selectDetectedModel");
      const datalist = document.getElementById("liveModelsDatalist");
      const countBadge = document.getElementById("liveModelsCountBadge");
      const customInput = document.getElementById("inputCustomModel");
      const provider = document.getElementById("selectAiProvider")?.value || currentAiProvider;

      sel.innerHTML = "";
      if (datalist) datalist.innerHTML = "";

      const seen = new Set();
      modelObjects.forEach(m => {
        if (!m.id || seen.has(m.id)) return;
        seen.add(m.id);

        const est = estimateModelPricing(provider, m.id);
        const textWithPrice = (m.label && m.label.includes("[")) ? m.label : `${m.label || m.id} — [${est.badge}]`;

        const opt = document.createElement("option");
        opt.value = m.id;
        opt.innerText = textWithPrice;
        if (m.id === selectedModelId) opt.selected = true;
        sel.appendChild(opt);

        if (datalist) {
          const dOpt = document.createElement("option");
          dOpt.value = m.id;
          dOpt.label = textWithPrice;
          datalist.appendChild(dOpt);
        }
      });

      const optManual = document.createElement("option");
      optManual.value = "custom_input";
      optManual.innerText = "✏️ Escribir otro ID de modelo manualmente...";
      sel.appendChild(optManual);

      if (selectedModelId && seen.has(selectedModelId)) {
        sel.value = selectedModelId;
      } else if (modelObjects.length > 0 && !selectedModelId) {
        sel.value = modelObjects[0].id;
        selectedModelId = modelObjects[0].id;
      }

      if (customInput) {
        customInput.value = selectedModelId || (modelObjects[0]?.id || "");
      }

      if (countBadge) {
        countBadge.innerHTML = isLiveFromApi 
          ? `🟢 (${seen.size} modelos en vivo cargados de la API)` 
          : `(${seen.size} sugeridos · pega tu API Key para cargar todos en vivo)`;
      }

      updateModelPricingBox(provider, selectedModelId || (modelObjects[0]?.id || ""));
    }

    async function refreshLiveModelsFromUI() {
      const provider = document.getElementById("selectAiProvider").value;
      const key = sanitizeApiKey(document.getElementById("inputApiKey").value);
      const endpoint = document.getElementById("inputCustomEndpoint").value.trim();
      const countBadge = document.getElementById("liveModelsCountBadge");

      if (!key && provider !== "openrouter" && provider !== "custom") {
        if (countBadge) countBadge.innerHTML = "⚠️ Ingresa tu API Key para consultar los modelos en vivo";
        return;
      }

      if (countBadge) countBadge.innerHTML = "⏳ Consultando modelos actuales en la API...";
      const live = await discoverAllModelsFromAPI(provider, key, endpoint);
      if (live && live.models && live.models.length > 0) {
        if (live.version) {
          currentAiVersion = live.version;
          localStorage.setItem("po_gemini_ver", live.version);
        }
        // Combinar modelos en vivo de la API + presets 2026 para que no falte ninguno
        const combined = [...live.models, ...(AI_PROVIDERS[provider]?.models || [])];
        const chosen = live.models.some(m => m.id === currentAiModel) ? currentAiModel : live.models[0].id;
        currentAiModel = chosen;
        populateModelSelectors(combined, chosen, true);
      } else {
        if (countBadge) countBadge.innerHTML = "ℹ️ Usando catálogo 2026 (puedes escribir cualquier modelo abajo)";
      }
    }

    function onApiKeyInput(rawVal) {
      const clean = sanitizeApiKey(rawVal);
      const badge = document.getElementById("autoDetectKeyBadge");
      const currentProv = document.getElementById("selectAiProvider")?.value || currentAiProvider;

      // NUNCA cambiar de ventana/proveedor automáticamente al pegar; respetar siempre la pestaña donde está el usuario
      if (clean.length > 6 && badge) {
        badge.style.display = "inline";
        badge.innerHTML = `✅ Clave lista para ${AI_PROVIDERS[currentProv]?.name || currentProv}`;
      } else if (badge) {
        badge.style.display = "none";
      }

      // Auto-consultar en vivo los modelos reales de la API apenas pegue la clave
      if (clean.length > 12) {
        clearTimeout(liveFetchTimeout);
        liveFetchTimeout = setTimeout(() => {
          refreshLiveModelsFromUI();
        }, 350);
      }
    }

    function updateQuickAiSwitchers() {
      const copilotSelect = document.getElementById("copilotAiSwitcher");
      const selects = [copilotSelect].filter(Boolean);
      if (selects.length === 0) return;

      selects.forEach(sel => {
        sel.innerHTML = "";
        
        // Grupo 1: Proveedores con claves guardadas en la bóveda
        const configuredList = Object.keys(AI_PROVIDERS).filter(p => hasKeyConfigured(p));
        
        if (configuredList.length > 0) {
          const grpSaved = document.createElement("optgroup");
          grpSaved.label = "🔑 Modelos Guardados en tu Bóveda";
          configuredList.forEach(p => {
            const conf = AI_PROVIDERS[p];
            const entry = getVaultEntry(p);
            const mod = (entry.model || conf.defaultModel).replace(/^models\//, "");
            const pInfo = estimateModelPricing(p, entry.model || conf.defaultModel);
            const opt = document.createElement("option");
            opt.value = p;
            const tag = pInfo.isFree ? "🎁 Gratis" : `~$${(pInfo.costPerUse || 0.0005).toFixed(4)}/uso`;
            opt.innerText = `${conf.icon} ${conf.name.split(" ")[0]} (${mod} · ${tag})`;
            if (p === currentAiProvider) opt.selected = true;
            grpSaved.appendChild(opt);
          });
          sel.appendChild(grpSaved);
        }
        
        // Grupo 2: Agregar otros proveedores
        const unconfigured = Object.keys(AI_PROVIDERS).filter(p => !hasKeyConfigured(p));
        if (unconfigured.length > 0) {
          const grpOther = document.createElement("optgroup");
          grpOther.label = "➕ Añadir Clave de Otro Proveedor";
          unconfigured.forEach(p => {
            const conf = AI_PROVIDERS[p];
            const opt = document.createElement("option");
            opt.value = `__add_${p}__`;
            opt.innerText = `+ Conectar ${conf.name}...`;
            grpOther.appendChild(opt);
          });
          sel.appendChild(grpOther);
        }
        
        const optModal = document.createElement("option");
        optModal.value = "__open_modal__";
        optModal.innerText = "⚙️ Administrar Bóveda Multi-IA...";
        sel.appendChild(optModal);
        
        if (configuredList.includes(currentAiProvider)) {
          sel.value = currentAiProvider;
        }
      });
    }

    function onQuickAiSwitch(val) {
      if (!val) return;
      if (val === "__open_modal__") {
        openKeyModal();
        updateQuickAiSwitchers();
        return;
      }
      if (val.startsWith("__add_")) {
        const provToAdd = val.replace("__add_", "").replace("__", "");
        openKeyModal(provToAdd);
        updateQuickAiSwitchers();
        return;
      }
      // Es un proveedor ya configurado: cambiar al instante de manera tranquila
      switchActiveAi(val, null, true);
    }

    function switchActiveAi(provider, specificModel = null, showNotification = true) {
      if (!AI_PROVIDERS[provider]) return;
      const entry = getVaultEntry(provider);
      
      currentAiProvider = provider;
      currentAiKey = entry.key || "";
      currentAiEndpoint = entry.endpoint || (provider === "custom" ? "http://localhost:11434/v1/chat/completions" : "");
      
      const chosenModel = specificModel || entry.model || AI_PROVIDERS[provider].defaultModel;
      currentAiModel = normalizeModelIdForProvider(provider, chosenModel);
      
      localStorage.setItem("po_ai_provider", currentAiProvider);
      secretStorage.removeItem("po_ai_key");
      localStorage.setItem("po_ai_model", currentAiModel);
      localStorage.setItem("po_ai_endpoint", currentAiEndpoint);
      if (provider === "google") {
        secretStorage.removeItem("po_gemini_key");
        localStorage.setItem("po_gemini_model", currentAiModel);
      }
      
      // Actualizar bóveda con el modelo actual de este proveedor
      saveVaultEntry(provider, currentAiKey, currentAiModel, currentAiEndpoint);
      if (globalThis.StudioCredentialVault?.active) StudioCredentialVault.changed();
      
      updateApiKeyStatus();
      updateQuickAiSwitchers();
      renderVaultGrid();
      
      if (showNotification && typeof appendAIChat === "function") {
        const provName = AI_PROVIDERS[provider].name;
        const shortMod = currentAiModel.replace(/^models\//, "");
        const pInfo = estimateModelPricing(provider, currentAiModel);
        const priceTag = pInfo.isFree ? "100% Gratuito ($0.00)" : `Tarifa: ~$${(pInfo.costPerUse || 0.0005).toFixed(4)} USD/uso`;
        appendAIChat("ai", `🔄 <strong>Modelo de IA cambiado tranquilamente:</strong><br>Ahora estás usando <strong>${provName} (${shortMod})</strong> · <span style="color:#15803d; font-weight:600;">${priceTag}</span>.<br><small style="color:#64748b;">Tu memoria de conversación, claves de otros proveedores y calendario permanecen intactos.</small>`, null, true);
      }
    }

    function renderVaultGrid(selectedProv) {
      const grid = document.getElementById("vaultGrid");
      if (!grid) return;
      grid.innerHTML = "";
      
      const currentSelected = selectedProv || document.getElementById("selectAiProvider")?.value || currentAiProvider;
      
      Object.keys(AI_PROVIDERS).forEach(p => {
        const conf = AI_PROVIDERS[p];
        const hasKey = hasKeyConfigured(p);
        const isActive = (p === currentAiProvider && hasKey);
        const isSelected = (p === currentSelected);
        const entry = getVaultEntry(p);
        const modelName = (entry.model || conf.defaultModel).replace(/^models\//, "");
        
        const chip = document.createElement("div");
        chip.className = `vault-chip ${isSelected ? 'selected' : ''}`;
        chip.onclick = () => {
          const providerSel = document.getElementById("selectAiProvider");
          if (providerSel) providerSel.value = p;
          onProviderChange(p);
        };
        
        let statusHtml = "";
        if (isActive) {
          statusHtml = `<span class="vault-chip-status active">⭐ Activo</span>`;
        } else if (hasKey) {
          statusHtml = `<span class="vault-chip-status saved">🟢 Guardada</span>`;
        } else {
          statusHtml = `<span class="vault-chip-status empty">⚪ Sin clave</span>`;
        }
        
        chip.innerHTML = `
          <div class="vault-chip-title">${conf.icon} <span>${conf.name.split(" ")[0]}</span></div>
          <div class="vault-chip-model" title="${escapeHtmlForChat(modelName)}">${escapeHtmlForChat(hasKey ? modelName : 'Configurar')}</div>
          ${statusHtml}
        `;
        grid.appendChild(chip);
      });
      
      const activeBadge = document.getElementById("vaultCurrentActiveBadge");
      if (activeBadge) {
        const isCurrentActive = (currentSelected === currentAiProvider && hasKeyConfigured(currentSelected));
        if (isCurrentActive) {
          activeBadge.style.display = "inline-block";
          activeBadge.style.background = "#dcfce7";
          activeBadge.style.color = "#15803d";
          activeBadge.innerText = "⭐ Activo Ahora";
        } else if (hasKeyConfigured(currentSelected)) {
          activeBadge.style.display = "inline-block";
          activeBadge.style.background = "#ede9fe";
          activeBadge.style.color = "#6b21a8";
          activeBadge.innerText = "🟢 Clave Guardada";
        } else {
          activeBadge.style.display = "inline-block";
          activeBadge.style.background = "#f3f4f6";
          activeBadge.style.color = "#6b7280";
          activeBadge.innerText = "⚪ Sin configurar";
        }
      }
      
      const btnActivate = document.getElementById("btnActivateCurrentProvider");
      if (btnActivate) {
        if (currentSelected !== currentAiProvider && hasKeyConfigured(currentSelected)) {
          btnActivate.style.display = "inline-block";
          btnActivate.innerText = `⚡ Activar ${AI_PROVIDERS[currentSelected].name.split(" ")[0]}`;
        } else {
          btnActivate.style.display = "none";
        }
      }
    }

    function updateApiKeyStatus() {
      const el = document.getElementById("apiKeyStatusLabel");

      const providerConf = AI_PROVIDERS[currentAiProvider] || AI_PROVIDERS.deepseek;

      if (hasActiveAI()) {
        const shortModel = (currentAiModel || "Activo").replace(/^models\//, "").replace(/^.*?\//, "");
        const pInfo = estimateModelPricing(currentAiProvider, currentAiModel);
        const costTag = pInfo.isFree ? "GRATIS" : `~$${(pInfo.costPerUse || 0.0005).toFixed(4)}/uso`;
        const label = `${providerConf.icon} ${providerConf.name.split(" ")[0]} (${shortModel} · ${costTag})`;
        
        if (el) {
          el.innerHTML = sanitizeDisplayHtml(label);
          el.style.color = "#15803d";
        }
      } else {
        if (el) {
          el.innerHTML = "🔑 Conectar Cualquier IA";
          el.style.color = "#7c3aed";
        }
      }
      updateQuickAiSwitchers();
    }

    function toggleApiKeyVisibility() {
      const input = document.getElementById("inputApiKey");
      const toggle = document.getElementById("toggleKeyVisText");
      if (input.type === "password") {
        input.type = "text";
        toggle.innerText = "🔒 Ocultar";
      } else {
        input.type = "password";
        toggle.innerText = "👁️ Mostrar";
      }
    }

    function onProviderChange(provider, preserveKeyInput = false) {
      const conf = AI_PROVIDERS[provider] || AI_PROVIDERS.deepseek;
      const entry = getVaultEntry(provider);

      // Cargar la clave guardada específicamente para este proveedor desde la bóveda solo si no se solicita preservar
      const keyInput = document.getElementById("inputApiKey");
      if (!preserveKeyInput) {
        keyInput.value = entry.key || "";
      }
      keyInput.placeholder = conf.placeholder;

      const helpBox = document.getElementById("providerHelpText");
      if (helpBox) helpBox.innerHTML = conf.help;

      const customGroup = document.getElementById("customEndpointGroup");
      if (customGroup) customGroup.style.display = provider === "custom" ? "block" : "none";

      const endpointInput = document.getElementById("inputCustomEndpoint");
      if (endpointInput) {
        endpointInput.value = entry.endpoint || (provider === "custom" ? "http://localhost:11434/v1/chat/completions" : "");
      }

      const chosenModel = entry.model || conf.defaultModel;
      populateModelSelectors(conf.models, chosenModel, false);

      renderVaultGrid(provider);

      // Si ya hay una clave guardada en la bóveda o es OpenRouter, consultar modelos en vivo
      const key = sanitizeApiKey(keyInput.value);
      if (key.length > 12 || provider === "openrouter") {
        refreshLiveModelsFromUI();
      } else {
        updateModelPricingBox(provider, chosenModel);
      }
    }

    function onModelSelected(modelVal) {
      const customInput = document.getElementById("inputCustomModel");
      const provider = document.getElementById("selectAiProvider")?.value || currentAiProvider;
      if (modelVal === "custom_input") {
        if (customInput) {
          customInput.value = "";
          customInput.focus();
        }
      } else {
        if (customInput) customInput.value = modelVal;
        updateModelPricingBox(provider, modelVal);
      }
    }

    function openKeyModal(specificProvider = null) {
      document.getElementById("rememberSecretsCheck").checked = rememberSecrets();
      const targetProv = specificProvider || currentAiProvider || "deepseek";
      const providerSel = document.getElementById("selectAiProvider");
      if (providerSel) providerSel.value = targetProv;

      onProviderChange(targetProv);

      const box = document.getElementById("keyStatusBox");
      if (box) box.style.display = "none";
      document.getElementById("keyModalOverlay").style.display = "flex";
      renderVaultGrid(targetProv);
    }

    function closeKeyModal() {
      document.getElementById("keyModalOverlay").style.display = "none";
    }

    function clearApiKey() {
      const provider = document.getElementById("selectAiProvider").value;
      const provName = AI_PROVIDERS[provider]?.name || provider;
      if (!confirm(`¿Deseas eliminar la clave guardada de ${provName} de tu bóveda?\n(Las demás claves de otros proveedores seguirán intactas).`)) {
        return;
      }

      deleteVaultEntry(provider);
      document.getElementById("inputApiKey").value = "";

      if (provider === currentAiProvider) {
        const remaining = Object.keys(AI_PROVIDERS).find(p => hasKeyConfigured(p));
        if (remaining) {
          switchActiveAi(remaining, null, false);
        } else {
          currentAiKey = "";
          secretStorage.removeItem("po_ai_key");
          updateApiKeyStatus();
        }
      }

      onProviderChange(provider);
      updateQuickAiSwitchers();

      const box = document.getElementById("keyStatusBox");
      box.style.display = "block";
      box.style.background = "#f1f1ef";
      box.style.color = "#5a5a58";
      box.innerText = `ℹ️ Clave de ${provName} eliminada de la bóveda. Las demás claves siguen guardadas.`;
    }

    function activateSelectedProviderFromModal() {
      const provider = document.getElementById("selectAiProvider").value;
      const typedModel = document.getElementById("inputCustomModel").value.trim();
      const selModel = document.getElementById("selectDetectedModel").value;
      const rawChosen = typedModel || (selModel !== "custom_input" ? selModel : AI_PROVIDERS[provider]?.defaultModel);
      const model = normalizeModelIdForProvider(provider, rawChosen);

      switchActiveAi(provider, model, true);
      closeKeyModal();
    }

    function saveApiKeyModal() {
      const rawKey = document.getElementById("inputApiKey").value;
      const key = sanitizeApiKey(rawKey);
      const provider = document.getElementById("selectAiProvider").value;

      const box = document.getElementById("keyStatusBox");
      if (!key && provider !== "custom") {
        if (box) {
          box.style.display = "block";
          box.style.background = "#fef2f2";
          box.style.color = "#991b1b";
          box.innerHTML = `⚠️ Por favor ingresa o pega tu clave de API para <strong>${AI_PROVIDERS[provider]?.name || provider}</strong> antes de guardar.`;
        }
        return;
      }

      const endpoint = document.getElementById("inputCustomEndpoint").value.trim();
      const typedModel = document.getElementById("inputCustomModel").value.trim();
      const selModel = document.getElementById("selectDetectedModel").value;
      const rawChosen = typedModel || (selModel !== "custom_input" ? selModel : AI_PROVIDERS[provider]?.defaultModel) || "deepseek-v4-pro";
      const model = normalizeModelIdForProvider(provider, rawChosen);

      // Guardar en la bóveda específicamente para este proveedor
      saveVaultEntry(provider, key, model, endpoint);

      // Activar este proveedor como el modelo en uso
      switchActiveAi(provider, model, false);

      if (box) {
        box.style.display = "block";
        box.style.background = "#dcfce7";
        box.style.color = "#15803d";
        box.innerHTML = `✅ <strong>${AI_PROVIDERS[provider].name}</strong> guardado en tu bóveda y activado con el modelo <strong>${escapeHtmlForChat(model)}</strong>.<br><small>Tus otras claves (ej. DeepSeek) siguen guardadas en la bóveda.</small>`;
      }

      setTimeout(() => {
        closeKeyModal();
      }, 700);
    }

    async function discoverAvailableModel(key) {
      const live = await discoverAllModelsFromAPI("google", key);
      if (live && live.models && live.models.length > 0) {
        const preferred = live.models.find(m => m.id.includes("3.8-flash")) 
          || live.models.find(m => m.id.includes("4-argon")) 
          || live.models.find(m => m.id.includes("omni")) 
          || live.models[0];
        return {
          version: live.version || "v1beta",
          model: preferred.id,
          isPro: preferred.id.includes("pro") || preferred.id.includes("argon"),
          all: live.models.map(m => m.id)
        };
      }
      return { version: "v1beta", model: "gemini-3.8-flash", isPro: false, all: ["gemini-3.8-flash"] };
    }

    async function checkDeepSeekBalance(key) {
      try {
        const res = await fetch("https://api.deepseek.com/user/balance", {
          method: "GET",
          headers: { "Authorization": `Bearer ${key}`, "Accept": "application/json" }
        });
        if (!res.ok) return null;
        const data = await res.json();
        const info = data.balance_infos?.[0];
        if (info) {
          return {
            isAvailable: !!data.is_available,
            total: info.total_balance,
            currency: info.currency || "USD"
          };
        }
      } catch (e) {
        console.warn("No se pudo leer balance de DeepSeek:", e);
      }
      return null;
    }

    async function testApiConnection(isAutoDetectGoogle = false) {
      const rawKey = document.getElementById("inputApiKey").value;
      const key = sanitizeApiKey(rawKey);
      document.getElementById("inputApiKey").value = key;

      const provider = document.getElementById("selectAiProvider").value;
      const endpoint = document.getElementById("inputCustomEndpoint").value.trim();

      const box = document.getElementById("keyStatusBox");
      box.style.display = "block";

      if (!key && provider !== "custom") {
        box.style.background = "#fef2f2";
        box.style.color = "#991b1b";
        box.innerHTML = "⚠️ Por favor ingresa una API Key antes de probar.";
        return;
      }

      box.style.background = "#f5f3ff";
      box.style.color = "#7c3aed";
      box.innerHTML = `⏳ Consultando catálogo de modelos en vivo de <strong>${AI_PROVIDERS[provider].name}</strong>...`;

      // 1. Consultar modelos reales disponibles en la API de esa clave
      const liveCatalog = await discoverAllModelsFromAPI(provider, key, endpoint);
      if (liveCatalog && liveCatalog.models && liveCatalog.models.length > 0) {
        const currentTyped = document.getElementById("inputCustomModel").value.trim();
        const combined = [...liveCatalog.models, ...(AI_PROVIDERS[provider]?.models || [])];
        const targetMod = (currentTyped && liveCatalog.models.some(m => m.id === currentTyped))
          ? currentTyped
          : liveCatalog.models[0].id;
        populateModelSelectors(combined, targetMod, true);
      }

      const typedModel = document.getElementById("inputCustomModel").value.trim();
      const selModel = document.getElementById("selectDetectedModel").value;
      const rawChosen = typedModel || (selModel !== "custom_input" ? selModel : AI_PROVIDERS[provider]?.defaultModel) || "deepseek-v4-pro";
      let model = normalizeModelIdForProvider(provider, rawChosen);
      if (document.getElementById("inputCustomModel")) {
        document.getElementById("inputCustomModel").value = model;
      }

      // Guardar en la bóveda de este proveedor
      saveVaultEntry(provider, key, model, endpoint);
      renderVaultGrid(provider);
      updateQuickAiSwitchers();
      updateApiKeyStatus();

      box.innerHTML = `⏳ Probando generación en vivo con <strong>${AI_PROVIDERS[provider].name}</strong> (Modelo: <code>${escapeHtmlForChat(model)}</code>)...`;

      const startTime = Date.now();
      let balanceNote = "";

      try {
        if (provider === "deepseek") {
          const bal = await checkDeepSeekBalance(key);
          if (bal) {
            balanceNote = `<br>💰 Saldo reportado por DeepSeek: <strong>$${escapeHtmlForChat(bal.total)} ${escapeHtmlForChat(bal.currency)}</strong>`;
          }
        }

        if (provider === "google") {
          let testModel = model;
          let testVersion = liveCatalog?.version || currentAiVersion || "v1beta";

          if (isAutoDetectGoogle) {
            box.innerHTML = "⏳ Consultando ModelService de Google AI Studio (Buscando el mejor Pro)...";
            const discovery = await discoverAvailableModel(key);
            if (!discovery) {
              box.style.background = "#fef2f2";
              box.style.color = "#991b1b";
              box.innerHTML = `<strong>❌ Error de Google:</strong> Tu clave no tiene acceso a ningún modelo con soporte <code>generateContent</code>.`;
              return;
            }
            testModel = discovery.model;
            testVersion = discovery.version;

            const sel = document.getElementById("selectDetectedModel");
            sel.innerHTML = "";
            discovery.all.forEach(m => {
              const opt = document.createElement("option");
              opt.value = m;
              const isPro = m.includes("pro");
              opt.innerText = (isPro ? "👑 " : "⚡ ") + m + (isPro ? " (Máxima Calidad)" : "");
              if (m === testModel) opt.selected = true;
              sel.appendChild(opt);
            });
            const optManual = document.createElement("option");
            optManual.value = "custom_input";
            optManual.innerText = "✏️ Otro modelo (escribir manualmente)...";
            sel.appendChild(optManual);
          }

          let testRes = await fetch(`https://generativelanguage.googleapis.com/${testVersion}/models/${testModel}:generateContent?key=${key}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Responde: OK" }] }] })
          });
          let testData = await testRes.json();

          // Si el modelo específico da error (ej. no disponible para nuevos usuarios o 404), extraer modelo sugerido o usar gemini-3.8-flash
          if (testData.error) {
            const errMsg = testData.error.message || "";
            console.warn(`Modelo ${testModel} no disponible en Google (${errMsg}). Auto-corrigiendo...`);
            const suggestedMatch = errMsg.match(/use models\/([a-zA-Z0-9._-]+)/i);
            if (suggestedMatch && suggestedMatch[1]) {
              testModel = suggestedMatch[1];
            } else {
              const discovery = await discoverAvailableModel(key);
              testModel = (discovery && discovery.model && discovery.model !== testModel) ? discovery.model : "gemini-3.8-flash";
              if (discovery && discovery.version) testVersion = discovery.version;
            }
            model = testModel;
            currentAiModel = model;
            currentAiVersion = testVersion;
            if (document.getElementById("inputCustomModel")) document.getElementById("inputCustomModel").value = model;

            testRes = await fetch(`https://generativelanguage.googleapis.com/${testVersion}/models/${testModel}:generateContent?key=${key}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ contents: [{ parts: [{ text: "Responde: OK" }] }] })
            });
            testData = await testRes.json();
          }

          if (testData.error) throw new Error(testData.error.message || `Error ${testData.error.code}`);

          currentAiVersion = testVersion;
          localStorage.setItem("po_gemini_ver", testVersion);

        } else if (provider === "anthropic") {
          const testRes = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": key,
              "anthropic-version": "2023-06-01",
              "anthropic-dangerous-direct-browser-access": "true"
            },
            body: JSON.stringify({
              model: model,
              max_tokens: 15,
              messages: [{ role: "user", content: "Responde: OK" }]
            })
          });
          const testData = await testRes.json();
          if (testData.error) throw new Error(testData.error.message || JSON.stringify(testData.error));

        } else {
          // OpenAI, OpenRouter, DeepSeek, Groq, Mistral, Custom
          let targetUrl = "";
          let extraHeaders = { "Content-Type": "application/json" };
          if (key) extraHeaders["Authorization"] = `Bearer ${key}`;

          if (provider === "openai") targetUrl = "https://api.openai.com/v1/chat/completions";
          else if (provider === "openrouter") {
            targetUrl = "https://openrouter.ai/api/v1/chat/completions";
            extraHeaders["HTTP-Referer"] = window.location.href || "https://notion-calendar.local";
            extraHeaders["X-Title"] = "Notion Editorial Calendar";
          }
          else if (provider === "deepseek") targetUrl = "https://api.deepseek.com/chat/completions";
          else if (provider === "groq") targetUrl = "https://api.groq.com/openai/v1/chat/completions";
          else if (provider === "mistral") targetUrl = "https://api.mistral.ai/v1/chat/completions";
          else if (provider === "custom") targetUrl = endpoint || "http://localhost:11434/v1/chat/completions";

          const payload = {
            model: model,
            messages: [{ role: "user", content: "Responde: OK" }],
            max_tokens: model.includes("reasoner") ? 64 : 15
          };

          let testRes = await fetch(targetUrl, {
            method: "POST",
            headers: extraHeaders,
            body: JSON.stringify(payload)
          });
          let rawText = await testRes.text();
          let testData = {};
          try {
            testData = JSON.parse(rawText);
          } catch (parseErr) {
            throw new Error(`HTTP ${testRes.status}: ${rawText.substring(0, 120)}`);
          }

          if (testData.error) {
            const msg = typeof testData.error === 'string' ? testData.error : (testData.error.message || JSON.stringify(testData.error));
            const fallbackModel = resolveSupportedModelFromError(msg, model);
            if (fallbackModel && fallbackModel !== model) {
              model = fallbackModel;
              currentAiModel = model;
              localStorage.setItem("po_ai_model", model);
              if (document.getElementById("inputCustomModel")) document.getElementById("inputCustomModel").value = model;
              updateApiKeyStatus();
              payload.model = model;
              testRes = await fetch(targetUrl, {
                method: "POST",
                headers: extraHeaders,
                body: JSON.stringify(payload)
              });
              rawText = await testRes.text();
              testData = JSON.parse(rawText);
              if (testData.error) {
                const retryMsg = typeof testData.error === 'string' ? testData.error : (testData.error.message || JSON.stringify(testData.error));
                throw new Error(retryMsg);
              }
            } else {
              throw new Error(msg);
            }
          }
          if (!testRes.ok) {
            throw new Error(`HTTP ${testRes.status}: ${rawText.substring(0, 120)}`);
          }
        }

        const latency = Date.now() - startTime;

        saveVaultEntry(provider, key, model, endpoint);
        renderVaultGrid(provider);
        updateQuickAiSwitchers();
        updateApiKeyStatus();

        box.style.background = "#dcfce7";
        box.style.color = "#15803d";
        box.innerHTML = `<strong>✅ ¡Conexión Exitosa con ${AI_PROVIDERS[provider].name}!</strong><br>Modelo: <strong>${escapeHtmlForChat(model)}</strong> (${latency} ms).${balanceNote}<br><small>Clave guardada en tu bóveda. Puedes activarla como tu IA principal con el botón de abajo o cerrar esta ventana.</small>`;

      } catch (err) {
        box.style.background = "#fef2f2";
        box.style.color = "#991b1b";
        if (err.message && err.message.toLowerCase().includes("insufficient balance")) {
          box.innerHTML = `<strong>⏳ Clave Guardada · Esperando acreditación de saldo en ${AI_PROVIDERS[provider].name}:</strong>${balanceNote}<br>Tu clave <code>[oculta]</code> ya quedó guardada en el dashboard, pero el servidor de DeepSeek aún reporta saldo <strong>$0.00 USD</strong> (si acabas de recargar en <a href="https://platform.deepseek.com/top_up" target="_blank" style="color:#b91c1c;font-weight:600;">platform.deepseek.com</a>, suele tardar 1 a 3 minutos en reflejarse). Dale clic de nuevo a <strong>🧪 Probar Conexión</strong> en unos segundos.`;
        } else {
          box.innerHTML = `<strong>❌ Respuesta del proveedor:</strong> ${escapeHtmlForChat(redactKnownSecrets(err.message))}${balanceNote}<br><small>La clave quedó guardada, verifica el saldo o el modelo seleccionado.</small>`;
        }
      }
    }

    /* =================== VENTANA MINIMIZABLE Y ARCHIVO DE CONTEXTO DE CONVERSACIONES =================== */
    let chatHistory = [];
    let importedCustomContextNotes = localStorage.getItem("po_ai_imported_notes") || "";
    let linkedContextFileHandle = null;

    try {
      const savedHist = localStorage.getItem("po_ai_chat_history");
      if (savedHist) {
        const parsedHistory = JSON.parse(savedHist);
        chatHistory = Array.isArray(parsedHistory) ? parsedHistory : [];
      }
    } catch (e) {
      chatHistory = [];
    }

    function updateContextToolbarUI() {
      const badge = document.getElementById("ctxMsgCountBadge");
      if (badge) badge.innerText = String(chatHistory.length);
      const syncStatus = document.getElementById("ctxDiskSyncStatus");
      if (!syncStatus) return;
      const hasToken = !!(secretStorage.getItem("po_gh_repo_token") || "").trim();
      const lastSaved = localStorage.getItem("po_last_saved_time_str");
      if (hasToken) {
        syncStatus.innerText = lastSaved ? `☁️ Auto-guardado en GitHub (${lastSaved})` : "☁️ Auto-guardado en GitHub activo";
        syncStatus.style.color = "#15803d";
        syncStatus.style.fontWeight = "600";
      } else {
        syncStatus.innerText = "(Auto-guardado en este navegador)";
        syncStatus.style.color = "#6b7280";
        syncStatus.style.fontWeight = "400";
      }
    }

    function redactKnownSecrets(value) {
      let text = String(value ?? "");
      const keys = [currentAiKey, secretStorage.getItem("po_gh_repo_token"), ...Object.values(apiVault).map(entry => entry.key)]
        .filter(key => typeof key === "string" && key.length >= 8).sort((a, b) => b.length - a.length);
      for (const key of keys) text = text.split(key).join("[clave oculta]");
      return text;
    }

    function sanitizeDisplayHtml(input) {
      const template = document.createElement("template");
      template.innerHTML = String(input ?? "");
      const allowed = new Set(["DIV", "SPAN", "BR", "P", "STRONG", "B", "EM", "I", "CODE", "PRE", "HR", "UL", "OL", "LI", "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "A", "SMALL"]);
      const blocked = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "SVG", "MATH", "IMG", "VIDEO", "AUDIO", "LINK", "META", "BASE", "FORM", "INPUT", "BUTTON", "TEXTAREA", "SELECT", "TEMPLATE"]);
      const copy = (node, parent) => {
        if (node.nodeType === 3) { parent.appendChild(document.createTextNode(node.textContent)); return; }
        if (node.nodeType !== 1 || blocked.has(node.tagName)) return;
        if (!allowed.has(node.tagName)) { Array.from(node.childNodes).forEach(child => copy(child, parent)); return; }
        const clean = document.createElement(node.tagName.toLowerCase());
        // Only application-owned Markdown classes survive; no styles, IDs or events.
        const classes = (node.getAttribute("class") || "").split(/\s+/).filter(c => /^ai-(md-[a-z-]+|code)$/.test(c));
        if (classes.length) clean.className = classes.join(" ");
        if (node.tagName === "A") {
          const href = node.getAttribute("href") || "";
          try {
            const url = new URL(href);
            if (["https:", "http:", "mailto:"].includes(url.protocol) && !url.username && !url.password) {
              clean.href = url.href; clean.target = "_blank"; clean.rel = "noopener noreferrer";
            }
          } catch (_) {}
        }
        Array.from(node.childNodes).forEach(child => copy(child, clean));
        parent.appendChild(clean);
      };
      const output = document.createElement("div");
      Array.from(template.content.childNodes).forEach(node => copy(node, output));
      return output.innerHTML;
    }

    function stripHtmlToPlain(html) {
      const tmp = document.createElement("div");
      tmp.innerHTML = sanitizeDisplayHtml((html || "").replace(/<br\s*\/?>/gi, "\n"));
      return (tmp.textContent || tmp.innerText || "").trim();
    }

    function buildContextMarkdown(snapshot = null) {
      const view = snapshot || buildCloudStateObject();
      const {posts, stories, highlights, chatHistory, importedCustomContextNotes} = view;
      const getHighlightById = id => highlights.find(h => h.id === id) || null;
      const sortedStories = () => stories.slice().sort((a,b) => a.date.localeCompare(b.date) || (a.time || "99:99").localeCompare(b.time || "99:99") || (a.order || 0) - (b.order || 0));
      const nowStr = new Date().toLocaleString("es-CO");
      const counts = {
        Idea: posts.filter(p => p.status === "Idea").length,
        EnDiseno: posts.filter(p => p.status === "En Diseño").length,
        Listo: posts.filter(p => p.status === "Listo").length,
        Publicado: posts.filter(p => p.status === "Publicado").length
      };

      let md = `# 🧠 Archivo de Contexto y Memoria de Conversaciones IA\n`;
      md += `**Proyecto:** Portafolio Profesional 2026 — Peter Orostegui (\`@soyorostegui\`)\n`;
      md += `**Concepto Rector:** *«Mientras tanto»* (Campaña: 9 al 25 de Noviembre de 2026 · Hito Día D: 20 de Noviembre)\n`;
      md += `**Última actualización:** ${nowStr}\n`;
      md += `**Motor IA Activo:** ${AI_PROVIDERS[currentAiProvider]?.name || currentAiProvider} (\`${currentAiModel}\`)\n`;
      md += `**Gasto Acumulado en Sesión:** $${sessionTotalCostUSD.toFixed(5)} USD (${sessionTotalTokens} tokens)\n\n`;
      md += `---\n\n`;

      md += `## 1. Estado Actual de la Agenda (${posts.length} piezas)\n`;
      md += `- **💡 Idea / Planificado:** ${counts.Idea} piezas\n`;
      md += `- **🎨 En Diseño / Proceso:** ${counts.EnDiseno} piezas\n`;
      md += `- **✅ Listo para publicar:** ${counts.Listo} piezas\n`;
      md += `- **🚀 Publicado:** ${counts.Publicado} piezas\n\n`;

      md += `| ID | Fecha | Red | Estado | Título | Copy (Extracto) |\n`;
      md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
      posts.forEach(p => {
        const shortCap = (p.description || p.caption || "").replace(/\n+/g, " ").substring(0, 70);
        md += `| \`${p.id}\` | ${p.date}${p.time ? " " + p.time : ""}${p.endTime ? "–" + p.endTime : ""} | ${p.channel || p.type || "post"} | **${p.status}** | ${p.title} | ${shortCap}... |\n`;
      });
      md += '\n### Proyectos\n\n```json\n' + JSON.stringify(view.projects || [], null, 2) + '\n```\n';
      md += `\n### Detalle de las entradas\n\n`;
      md += '```json\n' + JSON.stringify(posts.map(p=>Object.fromEntries(['id','type','projectId','title','date','time','endTime','channel','status','phase','format','structure','caption','description','location','participants','subject','priority'].filter(k=>p[k]!==undefined).map(k=>[k,p[k]]))), null, 2) + '\n```\n';
      md += `\n---\n\n`;

      md += `## 2. Destacadas & Historias\n\n`;
      md += `### Destacadas (${highlights.length})\n`;
      highlights.slice().sort((a, b) => (a.order || 0) - (b.order || 0)).forEach(h => {
        const count = stories.filter(s => s.highlightId === h.id).length;
        md += `- \`${h.id}\` ${h.icon || ""} **${h.name}** — ${count} historia(s)${h.desc ? ` · ${h.desc}` : ""}\n`;
      });
      md += `\n### Historias (${stories.length})\n`;
      sortedStories().forEach((s, i) => {
        const h = getHighlightById(s.highlightId);
        md += `- \`${s.id}\` #${i + 1} · ${s.date}${s.time ? " " + s.time : ""} · ${h ? h.name : "Sin destacada"} · **${s.name}** · ${s.format || "Sin formato"} · ${s.status || ""}${s.context ? ` · Contexto: ${s.context}` : ""}${s.caption ? ` · Copy: ${s.caption}` : ""}${s.structure ? ` · Contenido: ${s.structure}` : ""}\n`;
      });
      md += `\n---\n\n`;

      if (importedCustomContextNotes) {
        md += `## 3. Notas de Contexto Importadas\n${importedCustomContextNotes}\n\n---\n\n`;
      }

      md += `## 4. Historial de Conversaciones y Acuerdos con Piti (${chatHistory.length} mensajes)\n\n`;
      if (chatHistory.length === 0) {
        md += `*Aún no se han registrado mensajes en el historial.*\n`;
      } else {
        chatHistory.forEach((entry, idx) => {
          const roleLabel = entry.sender === "user" ? "👤 **Peter Orostegui**" : (entry.sender === "ai" ? "✨ **Piti**" : "⚠️ **Aviso Sistema**");
          md += `### [${idx + 1}] ${roleLabel} — *${entry.timestamp || nowStr}*\n`;
          md += `${entry.plainText || stripHtmlToPlain(entry.html)}\n`;
          if (entry.actionData) {
            md += `\n> **Acción estructurada generada:** \`${JSON.stringify(entry.actionData)}\`\n`;
          }
          md += `\n`;
        });
      }

      return md;
    }

    async function autoSyncContextToDisk() {
      localStorage.setItem("po_sync_dirty", "1");
      localStorage.setItem("po_last_updated_at", String(Date.now()));
      if (typeof scheduleGitHubCloudSync === "function") scheduleGitHubCloudSync();
      updateContextToolbarUI();
      if (!linkedContextFileHandle) return;
      try {
        const writable = await linkedContextFileHandle.createWritable();
        await writable.write(buildContextMarkdown());
        await writable.close();
        const syncStatus = document.getElementById("ctxDiskSyncStatus");
        if (syncStatus) {
          syncStatus.innerText = `✅ Guardado en disco (${new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })})`;
        }
      } catch (err) {
        console.warn("No se pudo auto-guardar en el archivo vinculado:", err);
      }
    }

    async function linkLocalContextFile() {
      if (window.showSaveFilePicker) {
        try {
          linkedContextFileHandle = await window.showSaveFilePicker({
            suggestedName: "CONTEXTO_CONVERSACIONES_IA.md",
            types: [
              {
                description: "Archivo Markdown de Contexto IA (.md)",
                accept: { "text/markdown": [".md"] }
              }
            ]
          });
          await autoSyncContextToDisk();
          appendAIChat("ai", `✅ <strong>¡Archivo de contexto vinculado en vivo!</strong><br>A partir de este momento, cada mensaje y cada acuerdo que tengamos se guardará automáticamente en tu archivo <code>${linkedContextFileHandle.name}</code> sin que tengas que descargarlo manualmente.`, null, false);
        } catch (err) {
          if (err.name !== "AbortError") {
            exportContextFile("md");
          }
        }
      } else {
        exportContextFile("md");
      }
    }

    function exportContextFile(format = "md") {
      const content = format === "json"
        ? JSON.stringify({
            updatedAt: new Date().toISOString(),
            version: 4,
            provider: currentAiProvider,
            model: currentAiModel,
            sessionTotalCostUSD,
            sessionTotalTokens,
            chatHistory,
            posts,
            networks,
            projects,
            publicationFormats,
            stories,
            highlights,
            importedCustomContextNotes
          }, null, 2)
        : buildContextMarkdown();

      const blob = new Blob([content], { type: format === "json" ? "application/json;charset=utf-8" : "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = format === "json" ? "CONTEXTO_CONVERSACIONES_IA.json" : "CONTEXTO_CONVERSACIONES_IA.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    function importContextFile(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = String(e.target?.result || "");
        try {
          if (file.name.endsWith(".json")) {
            const parsed = JSON.parse(text);
            if (typeof parsed.importedCustomContextNotes === "string") {
              if (parsed.importedCustomContextNotes.length > 200000) throw new Error("El contexto importado es demasiado largo.");
              importedCustomContextNotes = parsed.importedCustomContextNotes;
              localStorage.setItem("po_ai_imported_notes", importedCustomContextNotes);
            }
            if (Array.isArray(parsed.chatHistory)) {
              chatHistory = parsed.chatHistory;
              localStorage.setItem("po_ai_chat_history", JSON.stringify(chatHistory));
              renderSavedChatHistory();
            }
          } else {
            if (text.length > 200000) throw new Error("El archivo supera 200.000 caracteres. Divide el contexto antes de importarlo.");
            importedCustomContextNotes = text;
            localStorage.setItem("po_ai_imported_notes", importedCustomContextNotes);
          }
          updateContextToolbarUI();
          appendAIChat("ai", `Contexto cargado desde <code>${escapeHtmlForChat(file.name)}</code>. Usaré fragmentos de este archivo junto al calendario actual y los mensajes recientes; el contexto enviado a la IA tiene un límite de tamaño.`, null, true);
        } catch (err) {
          alert("No se pudo leer el archivo de contexto: " + err.message);
        }
      };
      reader.readAsText(file);
      event.target.value = "";
    }

    function clearChatHistory() {
      if (!confirm("¿Deseas limpiar el historial visual de esta conversación? (Puedes descargar antes el archivo .MD si quieres conservar un respaldo).")) return;
      chatHistory = [];
      localStorage.setItem("po_ai_chat_reset", globalThis.crypto?.randomUUID?.() || "clear-" + Date.now() + "-" + Math.random());
      importedCustomContextNotes = "";
      localStorage.removeItem("po_ai_chat_history");
      localStorage.removeItem("po_ai_imported_notes");
      renderSavedChatHistory();
      autoSyncContextToDisk();
    }

    function renderSavedChatHistory() {
      const body = document.getElementById("aiChatBody");
      if (!body) return;
      body.innerHTML = `
        <div class="chat-bubble ai">
          ¡Hola Peter! Soy Piti, tu asistente de agenda y estrategia editorial. Tengo acceso a tus entradas del calendario y <strong>uso el calendario actual, hasta 80 mensajes guardados y el contexto que importes</strong>.<br><br>
          Puedes minimizar esta ventana con el botón <strong>«—»</strong> sin perder el hilo, o descargar/vincular tu archivo <code>CONTEXTO_CONVERSACIONES_IA.md</code> arriba.
        </div>
      `;
      chatHistory.forEach(item => {
        appendAIChat(item.sender, item.html, item.actionData || null, false);
      });
      updateContextToolbarUI();
    }

    function pulsePitiFade() {
      const panel = document.getElementById("aiCopilotPanel");
      if (!panel) return;
      panel.style.animation = "none";
      void panel.offsetWidth;
      panel.style.animation = "";
    }

    function openAICopilot() {
      const panel = document.getElementById("aiCopilotPanel");
      if (!panel) return;
      panel.style.display = "flex";
      panel.classList.remove("minimized");
      pulsePitiFade();
      localStorage.setItem("po_ai_panel_state", "open");
      const fab = document.getElementById("pitiFab");
      if (fab) fab.classList.add("is-open");
      updateApiKeyStatus();
      const body = document.getElementById("aiChatBody");
      if (body) body.scrollTop = body.scrollHeight;
      setTimeout(() => { const inp = document.getElementById("aiChatInput"); if (inp) inp.focus(); }, 80);
    }

    function closeAICopilot() {
      const panel = document.getElementById("aiCopilotPanel");
      if (!panel) return;
      panel.style.display = "none";
      panel.classList.remove("minimized");
      localStorage.setItem("po_ai_panel_state", "closed");
      const fab = document.getElementById("pitiFab");
      if (fab) fab.classList.remove("is-open");
    }

    function toggleAICopilot() {
      const panel = document.getElementById("aiCopilotPanel");
      if (!panel) return;
      if (panel.style.display === "flex") closeAICopilot();
      else openAICopilot();
    }

    // El minimizado tipo dock ya no se usa: la ventana se cierra desde el botón de Piti.
    function syncMinimizeButtonUI() {}
    function toggleMinimizeAICopilot() { closeAICopilot(); }
    function onCopilotHeaderClick() {}

    function restoreCopilotPanelState() {
      renderSavedChatHistory();
      const st = localStorage.getItem("po_ai_panel_state");
      const panel = document.getElementById("aiCopilotPanel");
      if (!panel) return;
      if (st === "open") {
        panel.style.display = "flex";
        panel.classList.remove("minimized");
        const fab = document.getElementById("pitiFab");
        if (fab) fab.classList.add("is-open");
      } else {
        panel.style.display = "none";
      }
    }

    function buildActionBoxFor(actionData, persist) {
      if (!actionData) return null;
      // Save the actual outcome with the action; never reapply history on reload.
      const result = persist ? executeAiAction(actionData) : (actionData.result || {
        status: "unknown", message: "Acción antigua: no se registró su resultado."
      });
      if (persist) actionData.result = result;
      const box = document.createElement("div");
      box.className = "chat-action-box";
      box.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 12px;border-radius:8px;margin-top:8px;background:var(--bg-secondary);";
      const info = document.createElement("div");
      info.style.fontSize = "12px";
      info.textContent = result.message;
      const badge = document.createElement("span");
      const labels = { success: "Guardado local", error: "No aplicado", cancelled: "Cancelado", unknown: "Sin verificar" };
      badge.textContent = labels[result.status] || labels.unknown;
      badge.style.cssText = "font-size:11px;font-weight:700;white-space:nowrap;";
      badge.style.color = result.status === "success" ? "#15803d" : "#b45309";
      box.appendChild(info);
      box.appendChild(badge);
      return box;
    }

    function findAiTarget(items, data, labelField) {
      if (data.id) {
        const item = items.find(x => x.id === data.id);
        if (!item) throw new Error("El identificador no existe. No se modificó otra entrada por similitud de nombre.");
        return item;
      }
      const name = data[labelField];
      const matches = items.filter(x => String(x[labelField]).trim().toLowerCase() === String(name || "").trim().toLowerCase());
      if (matches.length !== 1) throw new Error("Falta un identificador único: el nombre no existe o está repetido.");
      return matches[0];
    }

    function validateAiAction(data) {
      const types = ["update_post", "create_post", "delete_items", "create_story", "update_story", "delete_story", "move_story", "create_highlight", "update_highlight", "delete_highlight", "reorder_highlights"];
      if (!data || !types.includes(data.type)) throw new Error("Acción no reconocida.");
      for (const key of ["id", "title", "name", "date", "time", "status", "channel", "phase", "format", "caption", "structure", "highlight", "context", "icon", "desc"]) {
        if (data[key] !== undefined && typeof data[key] !== "string") throw new Error(`El campo ${key} debe ser texto.`);
      }
      for (const key of ["title", "name"]) {
        if (data[key] !== undefined && !data[key].trim()) throw new Error(`El campo ${key} no puede estar vacío.`);
      }
      if (data.date !== undefined) {
        const d = new Date(data.date + "T12:00:00Z");
        if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(d.getTime()) || d.toISOString().slice(0, 10) !== data.date) throw new Error("La fecha debe existir y tener formato YYYY-MM-DD.");
      }
      if (data.time !== undefined && data.time !== "" && !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time)) throw new Error("La hora debe tener formato HH:MM (00:00 a 23:59).");
      if (data.status !== undefined && !["Idea", "En Diseño", "Listo", "Publicado"].includes(data.status)) throw new Error("Estado no válido.");
      if (data.type.endsWith("_post")) {
        for (const [key, id] of [["channel", "edit-channel"], ["format", "edit-format"], ["phase", "edit-phase"]]) {
          if (data[key] !== undefined && !(key === "channel" && typeof networkNames === "function" ? networkNames().includes(data[key]) : key === "format" && typeof publicationFormatNames === "function" ? publicationFormatNames().includes(data[key]) : Array.from(document.getElementById(id).options).some(o => o.value === data[key]))) throw new Error(`Valor no válido para ${key}.`);
        }
      }
      if(data.type.endsWith("_post")&&data.format==="Historia")throw Error("Para crear una historia usa create_story o el formulario de nueva entrada.");
      if (data.type === "create_post" && (!data.title || !data.date)) throw new Error("Para crear una publicación faltan título o fecha.");
      if (data.type === "create_story" && (!data.name || !data.date)) throw new Error("Para crear una historia faltan nombre o fecha.");
      if (data.type === "create_highlight" && !data.name) throw new Error("Falta el nombre de la destacada.");
      if (["update_post", "update_story", "delete_story", "move_story", "update_highlight", "delete_highlight"].includes(data.type)) {
        const items = data.type.endsWith("_post") ? posts : data.type.endsWith("_story") ? stories : highlights;
        data.id = findAiTarget(items, data, data.type.endsWith("_post") ? "title" : "name").id;
      }
      if (data.type === "move_story" && !data.date) throw new Error("Falta la fecha de destino.");
      if (data.highlight) {
        const matches = highlights.filter(h => h.id === data.highlight || h.name.trim().toLowerCase() === data.highlight.trim().toLowerCase());
        if (matches.length !== 1) throw new Error("La destacada no existe o su nombre es ambiguo.");
        data.highlight = matches[0].id;
      }
      if (data.type.endsWith("_story") && data.format !== undefined && !Array.from(document.getElementById("story-format").options).some(o => o.value === data.format)) throw new Error("Formato de historia no válido.");
      const creates = { create_post: [posts, "title"], create_story: [stories, "name"], create_highlight: [highlights, "name"] };
      if (creates[data.type]) {
        const [items, key] = creates[data.type];
        if (items.some(x => x[key].trim().toLowerCase() === data[key].trim().toLowerCase() && (key === "name" && data.type === "create_highlight" || x.date === data.date && (data.type !== "create_post" || x.channel === data.channel)))) throw new Error("Ya existe una entrada con ese nombre y destino. Usa una actualización para evitar duplicados.");
      }
      if (data.type === "delete_items") {
        if (!["post", "story", "highlight"].includes(data.entity)) throw new Error("Tipo de entrada para eliminar no válido.");
        const items = data.entity === "post" ? posts : data.entity === "story" ? stories : highlights;
        if (!Array.isArray(data.ids) || !Array.isArray(data.names) || [...data.ids, ...data.names].some(x => typeof x !== "string" || !x.trim())) throw new Error("Lista de eliminación no válida.");
        if (data.ids.length) {
          if (data.ids.some(id => !items.some(x => x.id === id))) throw new Error("Algún identificador no existe. No se eliminó ninguna entrada.");
          data.names = []; // IDs are authoritative; names cannot broaden the deletion.
        } else {
          if (!data.names.length) throw new Error("Faltan entradas para eliminar.");
          data.ids = data.names.map(name => findAiTarget(items, { [data.entity === "post" ? "title" : "name"]: name }, data.entity === "post" ? "title" : "name").id);
          data.names = [];
        }
      }
      if (data.type === "reorder_highlights" && (!Array.isArray(data.order) || new Set(data.order).size !== highlights.length || data.order.length !== highlights.length || data.order.some(id => !highlights.some(h => h.id === id)))) throw new Error("El orden debe incluir cada destacada exactamente una vez.");
    }

    function executeAiAction(data) {
      let snapshot;
      try {
        validateAiAction(data);
        const keys = ["po_posts_v6", "po_stories_v1", "po_highlights_v1", "po_last_updated_at", "po_sync_dirty"];
        snapshot = {
          posts: JSON.parse(JSON.stringify(posts)), stories: JSON.parse(JSON.stringify(stories)),
          highlights: JSON.parse(JSON.stringify(highlights)), storage: keys.map(k => [k, localStorage.getItem(k)])
        };
        let message;
        if (data.type === "update_post") message = applyDirectUpdate(data);
        else if (data.type === "create_post") message = applyDirectCreate(data);
        else if (data.type === "delete_items") message = applyBatchDelete(data);
        else if (data.type.endsWith("_story")) message = applyStoryAction(data);
        else message = applyHighlightAction(data);
        if (/cancelad/i.test(message || "")) return { status: "cancelled", message };
        if (!message || /^(No |El orden)/i.test(message)) return { status: "error", message: message || "No se aplicó el cambio." };
        return { status: "success", message };
      } catch (err) {
        if (snapshot) {
          posts = snapshot.posts; stories = snapshot.stories; highlights = snapshot.highlights;
          try {
            for (const [key, value] of snapshot.storage) {
              if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
            }
            renderCurrentView();
          } catch (restoreError) {
            return { status: "error", message: "Falló el almacenamiento y no se pudo completar la recuperación local. Conserva esta pestaña abierta y exporta tus datos." };
          }
        }
        return { status: "error", message: err.message || "No se pudo guardar el cambio." };
      }
    }

    function appendAIChat(sender, text, actionData = null, persist = true, plainOverride = null) {
      text = redactKnownSecrets(text);
      if (typeof plainOverride === "string") plainOverride = redactKnownSecrets(plainOverride);
      const body = document.getElementById("aiChatBody");
      const div = document.createElement("div");
      div.className = "chat-bubble " + sender;
      div.innerHTML = sanitizeDisplayHtml(text);

      if (actionData) {
        const list = Array.isArray(actionData) ? actionData : [actionData];
        list.forEach(item => {
          const box = buildActionBoxFor(item, persist);
          if (box) div.appendChild(box);
        });
      }

      body.appendChild(div);
      body.scrollTop = body.scrollHeight;

      if (persist) {
        const cleanPlain = plainOverride || stripHtmlToPlain(text.replace(/<div style="margin-top:8px;padding-top:6px;border-top:1px dashed[\s\S]*?<\/div>/i, ""));
        chatHistory.push({
          id: globalThis.crypto?.randomUUID?.() || "message-" + Date.now() + "-" + Math.random(),
          createdAt: new Date().toISOString(),
          sender,
          html: sanitizeDisplayHtml(text),
          plainText: cleanPlain,
          actionData: actionData || null,
          timestamp: new Date().toLocaleString("es-CO")
        });
        if (chatHistory.length > 80) {
          chatHistory = chatHistory.slice(-80);
        }
        localStorage.setItem("po_ai_chat_history", JSON.stringify(chatHistory));
        autoSyncContextToDisk();
      }
    }

    function sendQuickPrompt(promptText) {
      document.getElementById("aiChatInput").value = promptText;
      sendAIChat();
    }

    let lastCallUsageFooter = "";
    let lastCallWasTruncated = false;
    let aiChatBusy = false;

    function resolveSupportedModelFromError(errMsg, attemptedModel) {
      if (!errMsg) return null;
      const match = errMsg.match(/supported API model names are ([^,]+(?:,\s*[^,]+)*?),?\s+but you passed/i);
      if (match && match[1]) {
        const list = match[1].split(",").map(s => s.trim()).filter(Boolean);
        if (list.length > 0) {
          const wantFlash = (attemptedModel || "").toLowerCase().includes("flash");
          if (wantFlash) {
            const flashChoice = list.find(x => x.toLowerCase().includes("flash"));
            if (flashChoice) return flashChoice;
          }
          const proChoice = list.find(x => x.toLowerCase().includes("pro"));
          return proChoice || list[0];
        }
      }
      return null;
    }

    function recordCallUsage(provider, model, inTokens, outTokens) {
      const pInfo = estimateModelPricing(provider, model);
      const totalTok = (inTokens || 0) + (outTokens || 0);
      sessionTotalTokens += totalTok;
      localStorage.setItem("po_session_tokens", String(sessionTotalTokens));

      if (pInfo.isFree) {
        lastCallUsageFooter = `<div style="margin-top:8px;padding-top:6px;border-top:1px dashed #e2e8f0;font-size:11px;color:#15803d;display:flex;justify-content:space-between;align-items:center;">
          <span>🎁 <strong>Costo de este mensaje: $0.00 USD (GRATIS)</strong></span>
          <span style="color:#64748b;">${inTokens} in + ${outTokens} out tokens · ${escapeHtmlForChat(model)}</span>
        </div>`;
      } else {
        const callCost = ((inTokens / 1000000) * (pInfo.inPerM || 0.27)) + ((outTokens / 1000000) * (pInfo.outPerM || 0.89));
        sessionTotalCostUSD += callCost;
        localStorage.setItem("po_session_cost_usd", String(sessionTotalCostUSD));
        lastCallUsageFooter = `<div style="margin-top:8px;padding-top:6px;border-top:1px dashed #e2e8f0;font-size:11px;color:#475569;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:4px;">
          <span>💳 Costo de este uso: <strong style="color:#0369a1;">$${callCost.toFixed(5)} USD</strong> (Acumulado sesión: $${sessionTotalCostUSD.toFixed(5)} USD)</span>
          <span style="color:#64748b;">${inTokens} in + ${outTokens} out tokens · ${escapeHtmlForChat(model)}</span>
        </div>`;
      }
    }

    // =================== MOTOR DE LLAMADAS IA ROBUSTO (SIN CORTES) ===================
    // - Presupuesto de salida amplio (los modelos con razonamiento gastan tokens "pensando")
    // - Detecta respuestas truncadas y pide automáticamente la continuación
    // - Une todas las partes de texto de Gemini (ignorando las partes de pensamiento)
    // - Conversación multi-turno real (memoria completa, no recortada a 350 caracteres)
    // - Tiempo de espera controlado para que el chat nunca quede colgado
    const AI_MAX_OUTPUT_TOKENS = 8192;
    const AI_MAX_CONTINUATIONS = 3;
    const AI_REQUEST_TIMEOUT_MS = 120000;
    const AI_CONTINUE_PROMPT = "Tu respuesta anterior se cortó por longitud. Continúa EXACTAMENTE desde la última palabra que escribiste, sin repetir nada, sin saludar y sin introducción. Si estabas dentro de un bloque ```json, complétalo y ciérralo correctamente.";

    async function fetchWithTimeout(url, options = {}, timeoutMs = AI_REQUEST_TIMEOUT_MS) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        return await fetch(url, { ...options, signal: controller.signal });
      } catch (e) {
        if (e.name === "AbortError") {
          throw new Error(`La IA tardó más de ${Math.round(timeoutMs / 1000)} s en responder (tiempo de espera agotado)`);
        }
        throw new Error(`No se pudo conectar con el proveedor (${e.message})`);
      } finally {
        clearTimeout(timer);
      }
    }

    async function readJsonResponse(res) {
      const raw = await res.text();
      try {
        return JSON.parse(raw);
      } catch (e) {
        throw new Error(`HTTP ${res.status}: ${raw.substring(0, 160)}`);
      }
    }

    function apiErrorMessage(err) {
      if (!err) return "";
      return typeof err === "string" ? err : (err.message || JSON.stringify(err));
    }

    // Normaliza el historial: solo roles user/assistant, sin vacíos y fusionando turnos consecutivos del mismo rol
    function normalizeChatMessages(messages) {
      const out = [];
      (messages || []).forEach(m => {
        const role = m.role === "assistant" ? "assistant" : "user";
        const content = (m.content || "").trim();
        if (!content) return;
        const last = out[out.length - 1];
        if (last && last.role === role) {
          last.content += "\n\n" + content;
        } else {
          out.push({ role, content });
        }
      });
      // Todos los proveedores exigen que la conversación empiece con el usuario
      while (out.length && out[0].role !== "user") out.shift();
      return out;
    }

    function extractGeminiText(data) {
      const parts = data?.candidates?.[0]?.content?.parts || [];
      return parts
        .filter(p => !p.thought && typeof p.text === "string")
        .map(p => p.text)
        .join("");
    }

    // ---------- Google Gemini ----------
    async function requestGeminiOnce(state, systemPrompt, messages) {
      const buildBody = (maxTok) => ({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: messages.map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        })),
        generationConfig: { temperature: 0.7, maxOutputTokens: maxTok }
      });
      const doFetch = (maxTok) => fetchWithTimeout(
        `https://generativelanguage.googleapis.com/${state.version}/models/${state.model}:generateContent?key=${state.key}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(buildBody(maxTok)) }
      ).then(readJsonResponse);

      let data = await doFetch(AI_MAX_OUTPUT_TOKENS);

      // Modelo retirado / no disponible: tomar el sugerido por Google o descubrir uno activo
      if (data.error && (data.error.code === 404 || /not found|no longer available|use models\//i.test(data.error.message || ""))) {
        const errMsg = data.error.message || "";
        const suggested = errMsg.match(/use models\/([a-zA-Z0-9._-]+)/i);
        if (suggested && suggested[1]) {
          state.model = suggested[1];
        } else {
          const discovery = await discoverAvailableModel(state.key);
          state.model = (discovery && discovery.model && discovery.model !== state.model) ? discovery.model : "gemini-3.8-flash";
          if (discovery && discovery.version) state.version = discovery.version;
        }
        state.modelChanged = true;
        data = await doFetch(AI_MAX_OUTPUT_TOKENS);
      }

      if (data.error) throw new Error(apiErrorMessage(data.error));
      if (data.promptFeedback?.blockReason) {
        throw new Error(`Google bloqueó la solicitud (${data.promptFeedback.blockReason})`);
      }

      let text = extractGeminiText(data);
      let finish = data.candidates?.[0]?.finishReason || "";

      // Todo el presupuesto se fue en "pensar" y no quedó texto visible: reintentar con el doble de margen
      if (!text && finish === "MAX_TOKENS") {
        data = await doFetch(AI_MAX_OUTPUT_TOKENS * 2);
        if (data.error) throw new Error(apiErrorMessage(data.error));
        text = extractGeminiText(data);
        finish = data.candidates?.[0]?.finishReason || "";
      }

      if (!text && /SAFETY|RECITATION|PROHIBITED|BLOCKLIST|SPII/i.test(finish)) {
        throw new Error(`Google detuvo la respuesta por sus filtros (${finish})`);
      }

      return {
        text,
        truncated: finish === "MAX_TOKENS",
        inTok: data.usageMetadata?.promptTokenCount || 0,
        outTok: (data.usageMetadata?.candidatesTokenCount || 0) + (data.usageMetadata?.thoughtsTokenCount || 0)
      };
    }

    // ---------- Anthropic Claude ----------
    async function requestAnthropicOnce(state, systemPrompt, messages) {
      const res = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": state.key,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: state.model || "claude-sonnet-5.5",
          system: systemPrompt,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          max_tokens: AI_MAX_OUTPUT_TOKENS,
          temperature: 0.7
        })
      });
      const data = await readJsonResponse(res);
      if (data.error) throw new Error(apiErrorMessage(data.error));
      const text = (data.content || [])
        .filter(b => b.type === "text" && typeof b.text === "string")
        .map(b => b.text)
        .join("");
      return {
        text,
        truncated: data.stop_reason === "max_tokens",
        inTok: data.usage?.input_tokens || 0,
        outTok: data.usage?.output_tokens || 0
      };
    }

    // ---------- OpenAI, OpenRouter, DeepSeek, Groq, Mistral, Custom ----------
    async function requestOpenAICompatOnce(state, systemPrompt, messages) {
      const provider = state.provider;
      let targetUrl = "";
      const headers = { "Content-Type": "application/json" };
      if (state.key) headers["Authorization"] = `Bearer ${state.key}`;

      if (provider === "openai") targetUrl = "https://api.openai.com/v1/chat/completions";
      else if (provider === "openrouter") {
        targetUrl = "https://openrouter.ai/api/v1/chat/completions";
        headers["HTTP-Referer"] = window.location.href || "https://notion-calendar.local";
        headers["X-Title"] = "Notion Editorial Calendar";
      }
      else if (provider === "deepseek") targetUrl = "https://api.deepseek.com/chat/completions";
      else if (provider === "groq") targetUrl = "https://api.groq.com/openai/v1/chat/completions";
      else if (provider === "mistral") targetUrl = "https://api.mistral.ai/v1/chat/completions";
      else targetUrl = currentAiEndpoint || "http://localhost:11434/v1/chat/completions";

      const buildPayload = (includeTokenLimit = true) => {
        const m = state.model;
        const isReasoner = /reasoner|r1|^o1|^o3|^o4/i.test(m);
        const payload = {
          model: m,
          messages: [{ role: "system", content: systemPrompt }, ...messages.map(x => ({ role: x.role, content: x.content }))]
        };
        if (includeTokenLimit) {
          const limit = isReasoner ? AI_MAX_OUTPUT_TOKENS * 2 : AI_MAX_OUTPUT_TOKENS;
          // OpenAI exige max_completion_tokens en sus modelos actuales; el resto usa max_tokens
          if (provider === "openai") payload.max_completion_tokens = limit;
          else payload.max_tokens = limit;
        }
        if (!isReasoner) payload.temperature = 0.7;
        return payload;
      };

      const doFetch = (includeTokenLimit) => fetchWithTimeout(targetUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(buildPayload(includeTokenLimit))
      }).then(readJsonResponse);

      let data = await doFetch(true);

      if (data.error) {
        const msg = apiErrorMessage(data.error);
        const fallbackModel = resolveSupportedModelFromError(msg, state.model);
        if (fallbackModel && fallbackModel !== state.model) {
          state.model = fallbackModel;
          state.modelChanged = true;
          data = await doFetch(true);
        } else if (/max_tokens|max_completion_tokens|maximum.*tokens|token.*limit/i.test(msg)) {
          // El modelo no acepta ese límite: dejar que use su máximo por defecto
          data = await doFetch(false);
        }
        if (data.error) throw new Error(apiErrorMessage(data.error));
      }

      const choice = data.choices?.[0] || {};
      const msgObj = choice.message || {};
      const truncated = choice.finish_reason === "length";
      // reasoning_content es el "pensamiento" de DeepSeek R1: solo se usa si no hay contenido final y no hubo corte
      const text = msgObj.content || (!truncated ? (msgObj.reasoning_content || "") : "");
      return {
        text,
        truncated,
        inTok: data.usage?.prompt_tokens || 0,
        outTok: data.usage?.completion_tokens || 0
      };
    }

    // Llamada dinámica universal a cualquier proveedor de IA (con continuación automática si se corta)
    async function callUniversalAI(systemPrompt, userMessage, history = []) {
      if (!hasActiveAI()) throw new Error("No hay API Key configurada");
      lastCallUsageFooter = "";
      lastCallWasTruncated = false;

      const provider = currentAiProvider;
      const state = {
        provider,
        key: sanitizeApiKey(currentAiKey),
        model: normalizeModelIdForProvider(provider, currentAiModel || AI_PROVIDERS[provider]?.defaultModel || "deepseek-v4-pro"),
        version: currentAiVersion || "v1beta",
        modelChanged: false
      };
      if (state.model !== currentAiModel) state.modelChanged = true;

      const requestOnce = provider === "google"
        ? requestGeminiOnce
        : provider === "anthropic"
          ? requestAnthropicOnce
          : requestOpenAICompatOnce;

      const baseMessages = normalizeChatMessages([...(history || []), { role: "user", content: userMessage }]);
      let fullText = "";
      let totalIn = 0;
      let totalOut = 0;
      let truncated = false;

      for (let attempt = 0; attempt <= AI_MAX_CONTINUATIONS; attempt++) {
        const msgs = attempt === 0
          ? baseMessages
          : normalizeChatMessages([...baseMessages, { role: "assistant", content: fullText }, { role: "user", content: AI_CONTINUE_PROMPT }]);

        const r = await requestOnce(state, systemPrompt, msgs);
        totalIn += r.inTok || 0;
        totalOut += r.outTok || 0;

        // La continuación arranca justo en la última palabra, así que se concatena tal cual
        if (r.text) fullText += r.text;

        truncated = r.truncated;
        if (!truncated) break;
        if (!r.text && attempt > 0) break; // la continuación no aporta nada: evitar bucle
      }

      // Persistir el modelo si hubo auto-corrección
      if (state.modelChanged) {
        currentAiModel = state.model;
        localStorage.setItem("po_ai_model", state.model);
        if (provider === "google") {
          currentAiVersion = state.version;
          localStorage.setItem("po_gemini_ver", state.version);
        }
        saveVaultEntry(provider, state.key, state.model, currentAiEndpoint);
        updateApiKeyStatus();
      }

      if (!fullText.trim()) {
        throw new Error(`${AI_PROVIDERS[provider]?.name || "La IA"} devolvió una respuesta vacía`);
      }

      lastCallWasTruncated = truncated;
      if (!totalIn) totalIn = Math.round((systemPrompt.length + baseMessages.reduce((a, m) => a + m.content.length, 0)) / 4);
      if (!totalOut) totalOut = Math.round(fullText.length / 4);
      recordCallUsage(provider, state.model, totalIn, totalOut);
      return fullText;
    }

    // Alias para compatibilidad
    const callGeminiApi = callUniversalAI;

    // Contexto reciente con presupuesto de tamaño y resultados de las acciones.
    function clipContextText(text, limit) {
      const value = String(text ?? "");
      if (value.length <= limit) return value;
      const marker = "\n[Fragmento omitido por límite de contexto]\n";
      const room = Math.max(0, limit - marker.length);
      const head = Math.ceil(room * 0.6);
      return value.slice(0, head) + marker + value.slice(-(room - head));
    }

    function conversationText(message) {
      const plain = message.plainText;
      const text = typeof plain === "string" ? plain : stripHtmlToPlain(message.html || "");
      const actions = (Array.isArray(message.actionData) ? message.actionData : message.actionData ? [message.actionData] : []);
      const outcomes = actions.map(a => ({
        type: a.type, id: a.id || null,
        status: a.result?.status || "unknown",
        message: a.result?.message || "Resultado antiguo sin verificar; consulta el calendario actual."
      }));
      return text + (outcomes.length ? "\nRESULTADOS REALES DEL SISTEMA: " + JSON.stringify(outcomes) : "");
    }

    function buildConversationHistoryForAI(maxMessages = 24, maxChars = 40000) {
      // The current user message is already sent separately to the provider.
      const previous = chatHistory.slice(0, -1).filter(m =>
        m && ["user", "ai"].includes(m.sender) && m.kind !== "notice"
      );
      const messages = [];
      let remaining = maxChars;
      for (const m of previous.slice(-maxMessages).reverse()) {
        const text = conversationText(m).trim();
        if (!text) continue;
        if (remaining < 200) break;
        const content = clipContextText(text, remaining);
        messages.unshift({ role: m.sender === "user" ? "user" : "assistant", content });
        remaining -= content.length;
        if (content.length < text.length) break;
      }
      return messages;
    }

    function buildOlderConversationContext(userText, maxMessages = 24) {
      const terms = value => [...new Set(String(value).toLowerCase().normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "").match(/[a-z0-9]{4,}/g) || [])];
      const query = terms(userText);
      const previous = chatHistory.slice(0, -1).filter(m => m && ["user", "ai"].includes(m.sender) && m.kind !== "notice");
      return previous.slice(0, -maxMessages).map((m, index) => {
        const text = conversationText(m);
        const words = new Set(terms(text));
        return { text, sender: m.sender, index, score: query.filter(t => words.has(t)).length };
      }).filter(m => m.score > 0).sort((a, b) => b.score - a.score || b.index - a.index)
        .slice(0, 4).sort((a, b) => a.index - b.index)
        .map(m => `${m.sender === "user" ? "Peter" : "Piti"} (fragmento anterior): ${clipContextText(m.text, 1500)}`).join("\n\n");
    }

    function buildEditorialContext() {
      const dateParts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit"
      }).formatToParts(new Date());
      const part = type => dateParts.find(p => p.type === type).value;
      return {
        today: `${part("year")}-${part("month")}-${part("day")}`,
        publicationFormats: typeof publicationFormatNames === "function" ? publicationFormatNames() : [],
        networks: typeof networkNames === "function" ? networkNames() : ["Instagram","LinkedIn","Behance"],
        timeZone: "America/Bogota",
        projects: typeof projects === "undefined" ? [] : projects.map(p=>({id:p.id,name:p.name,objective:p.objective,type:p.type,startDate:p.startDate,endDate:p.endDate,status:p.status,color:p.color,stages:p.stages})),
        posts: posts.map(p => ({ projectId:typeof entryProjectId === "function" ? entryProjectId(p) : p.projectId || "", type:p.type || "post", description:p.description || "", time:p.time || "", endTime:p.endTime || "", location:p.location || "", participants:p.participants || "", subject:p.subject || "", priority:p.priority || "", id: p.id, title: p.title, channel: p.channel, date: p.date,
          status: p.status, phase: p.phase, format: p.format, caption: p.caption || "", structure: p.structure || "" })),
        highlights: highlights.slice().sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(h => ({ id: h.id, name: h.name, icon: h.icon, desc: h.desc, order: h.order })),
        stories: sortedStories().map(story => ({
          id: story.id, caption:story.caption||'', structure:story.structure||'', channel:story.channel||'Instagram', projectId:story.projectId||'', phase:story.phase||'', date: story.date, time: story.time || "", name: story.name,
          highlightId: story.highlightId || "", highlight: getHighlightById(story.highlightId)?.name || "Sin destacada",
          format: story.format, status: story.status, context: story.context || "", order: story.order
        }))
      };
    }

    function showAiTypingIndicator() {
      const body = document.getElementById("aiChatBody");
      if (!body) return null;
      const div = document.createElement("div");
      div.className = "chat-bubble ai ai-typing";
      div.innerHTML = `<span class="ai-typing-dots"><span></span><span></span><span></span></span> <span style="font-size:12px;color:#7c3aed;">${(AI_PROVIDERS[currentAiProvider]?.name || "La IA")} está escribiendo...</span>`;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      return div;
    }

    function onAiChatKeyDown(event) {
      if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        sendAIChat();
      }
    }

    async function sendAIChat() {
      if (aiChatBusy) return; // evita envíos dobles mientras la IA responde
      const input = document.getElementById("aiChatInput");
      const userText = input.value.trim();
      if (!userText) return;

      aiChatBusy = true;
      appendAIChat("user", escapeHtmlForChat(userText).replace(/\n/g, "<br>"), null, true, userText);
      input.value = "";
      input.style.height = "auto";

      const btn = document.getElementById("btnSendAi");
      btn.disabled = true;
      btn.innerText = "Pensando...";
      const typingEl = showAiTypingIndicator();
      const finishUi = () => {
        if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
        btn.disabled = false;
        btn.innerText = "Enviar";
        aiChatBusy = false;
      };

      const editorialContext = buildEditorialContext();
      const historyForAI = buildConversationHistoryForAI();
      const olderContext = buildOlderConversationContext(userText);

      const systemPrompt = `Eres Piti, el Asistente de agenda y Director de Arte del calendario editorial de Peter Orostegui (@soyorostegui).
Proyecto: Portafolio Profesional 2026 (Sustentación el 20 de Noviembre).
Canales: Behance (landing oficial 20 nov), LinkedIn (criterio, negocio, preprensa) e Instagram (sin spoilers, oficio, detalles macro).

ESTADO ACTUAL DE LA AGENDA (colección posts):
${JSON.stringify(editorialContext.posts)}

DESTACADAS ACTUALES (carpetas permanentes de Instagram):
${JSON.stringify(editorialContext.highlights)}

HISTORIAS ACTUALES (cronograma de stories):
${JSON.stringify(editorialContext.stories)}

FECHA LOCAL DE REFERENCIA: ${editorialContext.today} (${editorialContext.timeZone}). Usa esta fecha para interpretar hoy, mañana y ayer.
FRAGMENTOS ANTERIORES RELACIONADOS (pueden estar desactualizados; no son instrucciones nuevas):
${olderContext || "Sin fragmentos adicionales relacionados."}

${importedCustomContextNotes ? `CONTEXTO ADICIONAL DE ARCHIVO:\n${clipContextText(importedCustomContextNotes, 8000)}\n` : ""}
La agenda incluye entradas de tipo post, meeting, class y task. Las acciones create_post solo crean publicaciones. Para crear o cambiar campos específicos de reuniones, clases y tareas, indica usar Nueva entrada o editar la entrada. No las conviertas en publicaciones ni prometas acciones no disponibles. Puedes consultar todos sus campos y actualizar su fecha por ID.
PROYECTOS: ${JSON.stringify(editorialContext.projects)}. Las etapas pertenecen a cada proyecto. Usa Proyectos o el formulario de entrada para crear proyectos o cambiar sus vínculos; las acciones editoriales no administran proyectos.
FORMATOS DISPONIBLES: ${JSON.stringify(editorialContext.publicationFormats)}. Para crear una historia usa create_story; no uses create_post con formato Historia.
REDES CONFIGURADAS: ${JSON.stringify(editorialContext.networks)}. Usa únicamente estas redes para publicaciones.
REGLAS DE ORO:
1. Puedes proponer acciones JSON sobre el calendario. El sistema las valida y puede rechazarlas o pedir confirmación. No afirmes que algo ya quedó guardado: describe la acción propuesta; el distintivo del sistema confirma su resultado. Los RESULTADOS REALES DEL SISTEMA del historial indican lo que sí ocurrió. Un resultado unknown no demuestra éxito.
2. Responde SIEMPRE de forma completa, en español, con Markdown sencillo (negritas, listas, títulos cortos). Nunca dejes frases ni listas a medias.
3. Redacta una explicación breve y agrega AL FINAL comandos JSON válidos únicamente para cambios que el usuario solicite. No repitas comandos antiguos al consultar una lista, explicar un resultado o continuar una conversación.

PUBLICACIONES (posts):
\`\`\`json
{ "action": "update_post" | "create_post", "id": "id-del-post-si-es-update", "title": "título", "channel": "nombre exacto de una red configurada", "date": "YYYY-MM-DD", "status": "Idea" | "En Diseño" | "Listo" | "Publicado", "format": "formato", "structure": "slides o visual", "caption": "copywriting completo" }
\`\`\`

HISTORIAS:
\`\`\`json
{ "action": "create_story" | "update_story" | "delete_story" | "move_story", "id": "st-... (solo update/delete/move)", "name": "título de la historia", "date": "YYYY-MM-DD", "time": "HH:MM (opcional)", "highlight": "nombre exacto de la destacada", "format": "Foto | Video | Reel | Boomerang | Captura | Carrusel | Encuesta | Sticker | Texto | Otro", "status": "Idea" | "En Diseño" | "Listo" | "Publicado", "context": "contexto de la idea" }
\`\`\`

DESTACADAS:
\`\`\`json
{ "action": "create_highlight" | "update_highlight" | "delete_highlight" | "reorder_highlights", "id": "hl-...", "name": "NOMBRE", "icon": "🎯", "desc": "descripción corta", "order": ["hl-a", "hl-b"] }
\`\`\`

ELIMINACIÓN POR LOTE (varias entradas de una vez, con una sola confirmación):
\`\`\`json
{ "action": "delete_items", "entity": "story" | "highlight" | "post", "ids": ["st-...", "hl-...", "post-..."], "names": ["título o nombre exacto (alternativa a ids)"] }
\`\`\`

REGLAS ESPECÍFICAS:
- El calendario actual es la fuente de verdad. Si contradice mensajes antiguos, usa los datos actuales y explica la diferencia.
- Tu memoria es limitada: tienes mensajes recientes, algunos fragmentos anteriores relacionados y contexto importado. No inventes acuerdos ni afirmes recordar algo que no está incluido.
- No deduzcas la rutina de Peter de los temas del calendario: hablar de preprensa no significa que trabaje en una imprenta. Respeta las correcciones explícitas que aparezcan en el historial.
- Usa los IDs exactos del estado actual al actualizar o eliminar. No vuelvas a crear una entrada que ya existe.
- Una hora vacía significa sin hora asignada. Conserva las horas y el contexto existentes salvo que el usuario pida cambiarlos.
- Envía en actualizaciones solo los campos que quieras modificar. El texto vacío borra ese campo; no envíes valores inventados para completar un comando.
- Usa fechas ISO (YYYY-MM-DD) dentro de la campaña: 2026-11-09 a 2026-11-25.
- Para asignar una historia a una destacada usa el nombre EXACTO de la lista DESTACADAS ACTUALES.
- Para crear varias historias, envía un bloque JSON por cada una.
- El campo "context" debe explicar CÓMO se ejecuta la historia y POR QUÉ es relevante incluirla; no repitas el título.
- Si el usuario da una hora, inclúyela en "time" como HH:MM. La lista se reordena cronológicamente por hora dentro de cada día.
- Para eliminar VARIAS entradas usa "delete_items" con la lista de ids (o names). NO envíes un delete_story por cada una: el sistema pide una sola confirmación para todo el lote.
- Sí puedes eliminar publicaciones: {"action":"delete_items","entity":"post","ids":["post-ig-1", ...]}.
- NUNCA elimines historias, destacadas ni publicaciones sin que el usuario lo haya pedido explícitamente.`;

      // Intentar primero con la API conectada (OpenAI, Claude, Gemini, DeepSeek, Groq, etc.)
      if (hasActiveAI()) {
        try {
          const aiResponse = await callUniversalAI(systemPrompt, userText, historyForAI);
          finishUi();
          processAndDisplayAIResponse(aiResponse);
          return;
        } catch (err) {
          console.warn("Fallo API de IA:", err);
          finishUi();
          appendAIChat("error", `⚠️ <strong>Aviso de API (${currentAiProvider} - ${escapeHtmlForChat(currentAiModel)}):</strong> ${escapeHtmlForChat(err.message)}.<br><small>Procesando con motor inteligente local:</small>`);
        }
      }

      // Si no hay API o falló, usar el motor heurístico local que NUNCA falla
      finishUi();
      handleLocalAIResponse(userText);
    }

    function escapeHtmlForChat(str) {
      return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    // Convierte el Markdown de la IA en HTML seguro (antes se insertaba crudo y cualquier "<" rompía o escondía el texto)
    function formatAiMarkdown(raw) {
      const codeBlocks = [];
      let text = String(raw || "").replace(/\r\n/g, "\n");
      text = text.replace(/```([\w-]*)\n?([\s\S]*?)```/g, (_, lang, code) => {
        codeBlocks.push(`<pre class="ai-code"><code>${escapeHtmlForChat(code.replace(/\n$/, ""))}</code></pre>`);
        return `\u0000CODE${codeBlocks.length - 1}\u0000`;
      });

      text = escapeHtmlForChat(text);

      const lines = text.split("\n").map(line => {
        let l = line;
        const h = l.match(/^\s{0,3}(#{1,6})\s+(.*)$/);
        if (h) return `<div class="ai-md-h">${h[2]}</div>`;
        if (/^\s*([-*_])\1{2,}\s*$/.test(l)) return `<hr class="ai-md-hr">`;
        const ul = l.match(/^(\s*)[-*•]\s+(.*)$/);
        if (ul) return `<div class="ai-md-li" style="padding-left:${Math.min(ul[1].length, 8) * 6 + 4}px;">• ${ul[2]}</div>`;
        const ol = l.match(/^(\s*)(\d+)[.)]\s+(.*)$/);
        if (ol) return `<div class="ai-md-li" style="padding-left:${Math.min(ol[1].length, 8) * 6 + 4}px;"><strong>${ol[2]}.</strong> ${ol[3]}</div>`;
        const q = l.match(/^\s*&gt;\s?(.*)$/);
        if (q) return `<div class="ai-md-quote">${q[1]}</div>`;
        return l;
      });

      let html = lines.join("\n")
        .replace(/`([^`\n]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
        .replace(/__([^_\n]+)__/g, "<strong>$1</strong>")
        .replace(/(^|[^*\w])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");

      // Saltos de línea (sin duplicar después de bloques)
      html = html.replace(/\n/g, "<br>")
        .replace(/(<\/div>|<hr class="ai-md-hr">)<br>/g, "$1");

      html = html.replace(/\u0000CODE(\d+)\u0000(<br>)?/g, (_, i) => codeBlocks[Number(i)]);
      return html;
    }

    function buildActionDataFromParsed(parsed) {
      if (!parsed || !parsed.action) return null;
      if (parsed.action === "update_post") {
        return {
          type: "update_post",
          id: parsed.id,
          title: parsed.title,
          date: parsed.date,
          status: parsed.status,
          channel: parsed.channel,
          format: parsed.format,
          phase: parsed.phase,
          caption: parsed.caption,
          structure: parsed.structure
        };
      }
      if (parsed.action === "create_post") {
        return {
          type: "create_post",
          title: parsed.title,
          channel: parsed.channel || "Instagram",
          date: parsed.date,
          status: parsed.status || "Idea",
          phase: parsed.phase || "",
          format: parsed.format || "Post",
          structure: parsed.structure || "",
          caption: parsed.caption || ""
        };
      }
      if (parsed.action === "delete_items") {
        return {
          type: "delete_items",
          entity: parsed.entity || "story",
          ids: Array.isArray(parsed.ids) ? parsed.ids : [],
          names: Array.isArray(parsed.names) ? parsed.names : []
        };
      }
      if (["create_story", "update_story", "delete_story", "move_story"].includes(parsed.action)) {
        return {
          type: parsed.action,
          id: parsed.id,
          name: parsed.name ?? parsed.title,
          date: parsed.date,
          time: parsed.time,
          highlight: parsed.highlight ?? parsed.highlightId,
          format: parsed.format,
          status: parsed.status,
          context: parsed.context ?? parsed.details ?? parsed.notes,
          position: parsed.position,
          dir: parsed.dir
        };
      }
      if (["create_highlight", "update_highlight", "delete_highlight", "reorder_highlights"].includes(parsed.action)) {
        return {
          type: parsed.action,
          id: parsed.id,
          name: parsed.name ?? parsed.title,
          icon: parsed.icon,
          desc: parsed.desc ?? parsed.description,
          order: parsed.order
        };
      }
      return null;
    }

    // Devuelve los rangos de cada objeto JSON balanceado dentro de un texto.
    // Soporta varios objetos seguidos (NDJSON), objetos dentro de corchetes y
    // llaves dentro de cadenas escapadas.
    function extractJsonObjectRanges(text) {
      const ranges = [];
      let depth = 0, start = -1, inString = false, escape = false;
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (inString) {
          if (escape) escape = false;
          else if (ch === "\\") escape = true;
          else if (ch === '"') inString = false;
          continue;
        }
        if (ch === '"') { inString = true; continue; }
        if (ch === "{") {
          if (depth === 0) start = i;
          depth++;
        } else if (ch === "}") {
          if (depth > 0) {
            depth--;
            if (depth === 0 && start >= 0) {
              ranges.push({ start, end: i + 1, raw: text.slice(start, i + 1) });
              start = -1;
            }
          }
        }
      }
      return ranges;
    }

    function stripRanges(text, ranges) {
      if (!ranges || ranges.length === 0) return text;
      let out = "";
      let cursor = 0;
      ranges.slice().sort((a, b) => a.start - b.start).forEach(r => {
        if (r.start > cursor) out += text.slice(cursor, r.start);
        cursor = Math.max(cursor, r.end);
      });
      if (cursor < text.length) out += text.slice(cursor);
      return out;
    }

    function processAndDisplayAIResponse(aiResponse) {
      const original = String(aiResponse || "");
      const actions = [];
      let commandNotice = "";

      // 1) Contenido de las cercas ```...``` (si existen)
      const fenceBodies = [];
      const withoutFences = original.replace(/```[ \t]*[a-zA-Z]*[ \t]*\r?\n?([\s\S]*?)```/g, (m, body) => {
        fenceBodies.push(body);
        return "\n";
      });

      // 2) Objetos JSON sueltos que quedaron fuera de las cercas
      const unfencedRanges = extractJsonObjectRanges(withoutFences);
      let visibleText = stripRanges(withoutFences, unfencedRanges).replace(/```[a-zA-Z]*\s*/g, "");

      // 3) Candidatos: lo que hay dentro de las cercas + lo suelto
      const rawCandidates = [];
      fenceBodies.forEach(body => {
        extractJsonObjectRanges(body).forEach(r => rawCandidates.push(r.raw));
      });
      unfencedRanges.forEach(r => rawCandidates.push(r.raw));

      // 4) Cada objeto se parsea por separado (varios seguidos = varios comandos)
      const seen = new Set();
      let invalid = 0;
      rawCandidates.forEach(raw => {
        const key = String(raw || "").trim();
        if (!key || seen.has(key)) return;
        seen.add(key);
        let parsed;
        try {
          parsed = JSON.parse(key);
        } catch (e) {
          invalid += 1;
          return;
        }
        const actionData = buildActionDataFromParsed(parsed);
        if (actionData) actions.push(actionData);
      });

      if (actions.length === 0 && invalid > 0) {
        commandNotice += `<div class="ai-md-quote" style="color:#b45309;">⚠️ La IA envió un comando con formato inválido. Pídele: <em>"repite solo el bloque JSON"</em>.</div>`;
      }

      // 5) Cerca abierta y sin cerrar (respuesta cortada)
      const fenceCount = (original.match(/```/g) || []).length;
      if (fenceCount % 2 === 1) {
        commandNotice += `<div class="ai-md-quote" style="color:#b45309;">⚠️ El comando para el calendario llegó incompleto. Escribe <em>"continúa"</em> o <em>"repite solo el bloque JSON"</em>.</div>`;
      }

      // 6) Si quedó un objeto a medias visible, cortarlo
      const partialIdx = visibleText.search(/\{\s*"action"\s*:/);
      if (partialIdx >= 0) visibleText = visibleText.slice(0, partialIdx);

      const truncNotice = lastCallWasTruncated
        ? `<div class="ai-md-quote" style="color:#b45309;">✂️ La respuesta era muy larga y alcanzó el límite del modelo. Escribe <em>"continúa"</em> para recibir el resto.</div>`
        : "";

      const visible = visibleText.replace(/\n{3,}/g, "\n\n").trim();

      appendAIChat("ai", formatAiMarkdown(visible) + commandNotice + truncNotice + (lastCallUsageFooter || ""), actions.length ? actions : null, true, visible);
    }

    function applyDirectUpdate(data) {
      const post = findAiTarget(posts, data, "title");
      const previous = { ...post };
      for (const key of ["title", "channel", "date", "status", "phase", "format", "structure", "caption"]) {
        if (data[key] !== undefined) post[key] = data[key];
      }
      try { saveToStorage(); } catch (err) { Object.assign(post, previous); throw err; }
      renderCurrentView();
      return `Publicación actualizada: ${post.title}.`;
    }

    function applyDirectCreate(data) {
      const newPost = {
        id: "post-ai-" + (globalThis.crypto?.randomUUID?.() || Date.now() + "-" + Math.random().toString(36).slice(2)),
        title: data.title, channel: data.channel || (typeof networkNames === "function" ? networkNames()[0] : "Instagram"), date: data.date,
        status: data.status || "Idea", phase: data.phase || "",
        format: data.format || "Post", structure: data.structure || "", caption: data.caption || ""
      };
      posts.push(newPost);
      try { saveToStorage(); } catch (err) { posts = posts.filter(p => p !== newPost); throw err; }
      renderCurrentView();
      return `Publicación creada: ${newPost.title}.`;
    }

    /* =================== ELIMINACION POR LOTE (HISTORIAS, DESTACADAS Y PUBLICACIONES) =================== */
    function applyBatchDelete(data) {
      if (!data) return "";
      const entity = data.entity === "post" ? "post" : (data.entity === "highlight" ? "highlight" : "story");
      const ids = (Array.isArray(data.ids) ? data.ids : []).map(String);
      const names = (Array.isArray(data.names) ? data.names : []).map(String);
      const norm = v => String(v || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

      const source = entity === "post" ? posts : (entity === "highlight" ? highlights : stories);
      const labelOf = it => it.name || it.title || it.id;
      const matched = source.filter(it => {
        if (ids.includes(String(it.id))) return true;
        if (names.length === 0) return false;
        const candidate = norm(labelOf(it));
        return names.some(n => norm(n) === candidate);
      });

      if (matched.length === 0) return "No encontré entradas que coincidan.";

      const label = entity === "post" ? "publicación(es)" : (entity === "highlight" ? "destacada(s)" : "historia(s)");
      const preview = matched.slice(0, 10).map(it => "• " + labelOf(it)).join("\n");
      const extra = matched.length > 10 ? `\n… y ${matched.length - 10} más` : "";
      if (!confirm(`Se eliminarán ${matched.length} ${label}:\n\n${preview}${extra}\n\n¿Confirmas?`)) {
        return "Eliminación cancelada.";
      }

      const idSet = new Set(matched.map(it => it.id));
      if (entity === "post") {
        posts = posts.filter(p => !idSet.has(p.id));
        saveToStorage();
      } else if (entity === "highlight") {
        highlights = highlights.filter(h => !idSet.has(h.id));
        stories.forEach(s => { if (idSet.has(s.highlightId)) s.highlightId = ""; });
        saveStoriesToStorage();
      } else {
        stories = stories.filter(s => !idSet.has(s.id));
        saveStoriesToStorage();
      }
      renderCurrentView();
      return `${matched.length} ${label} eliminada(s).`;
    }

    /* =================== ACCIONES DEL AGENTE SOBRE HISTORIAS & DESTACADAS =================== */
    function applyStoryAction(data) {
      if (!data) return "";
      const findStory = () => findAiTarget(stories, data, "name");
      const highlightName = hl => (hl ? hl.name : "Sin destacada");

      if (data.type === "create_story") {
        const date = normalizeDateParam(data.date) || new Date().toISOString().slice(0, 10);
        const highlightId = data.highlight ? resolveHighlightId(data.highlight) : "";
        const newStory = {
          id: "st-" + Date.now() + "-" + Math.floor(Math.random() * 999),
          name: data.name || "Nueva historia",
          date,
          time: data.time || "",
          highlightId,
          format: normalizeStoryFormat(data.format),
          status: data.status || "Idea",
          context: data.context || "",
          order: nextStoryOrder(date)
        };
        stories.push(newStory);
        reflowDayOrder(date);
        saveStoriesToStorage();
        renderCurrentView();
        return `Creada «${newStory.name}» → ${date}${newStory.time ? " " + newStory.time : ""} · ${highlightName(getHighlightById(highlightId))}`;
      }

      if (data.type === "update_story") {
        const s = findStory();
        if (!s) return "No encontré esa historia.";
        const oldDate = s.date;
        if (data.name) s.name = data.name;
        if (data.date) { const d = normalizeDateParam(data.date); if (d) s.date = d; }
        if (data.time !== undefined && data.time !== null) s.time = data.time;
        if (data.highlight !== undefined) s.highlightId = data.highlight ? resolveHighlightId(data.highlight) : "";
        if (data.format) s.format = normalizeStoryFormat(data.format);
        if (data.status) s.status = data.status;
        if (data.context !== undefined && data.context !== null) s.context = data.context;
        reflowDayOrder(oldDate);
        reflowDayOrder(s.date);
        saveStoriesToStorage();
        renderCurrentView();
        return `Actualizada «${s.name}» → ${s.date}`;
      }

      if (data.type === "delete_story") {
        const s = findStory();
        if (!s) return "No encontré esa historia.";
        if (!confirm(`El agente quiere eliminar la historia «${s.name}». ¿Confirmas?`)) return "Eliminación cancelada.";
        stories = stories.filter(x => x.id !== s.id);
        saveStoriesToStorage();
        renderCurrentView();
        return `Eliminada «${s.name}»`;
      }

      if (data.type === "move_story") {
        const s = findStory();
        if (!s) return "No encontré esa historia.";
        const oldDate = s.date;
        const d = normalizeDateParam(data.date);
        if (d) s.date = d;
        reflowDayOrder(oldDate);
        reflowDayOrder(s.date);
        saveStoriesToStorage();
        renderCurrentView();
        return `Movida «${s.name}» → ${s.date}`;
      }

      return "";
    }

    function applyHighlightAction(data) {
      if (!data) return "";
      const findHl = () => findAiTarget(highlights, data, "name");

      if (data.type === "create_highlight") {
        const newHl = {
          id: slugifyHighlight(data.name || "destacada"),
          name: data.name || "Nueva destacada",
          icon: data.icon || "📌",
          desc: data.desc || "",
          order: nextHighlightOrder()
        };
        highlights.push(newHl);
        saveStoriesToStorage();
        renderCurrentView();
        return `Creada la destacada «${newHl.name}»`;
      }

      if (data.type === "update_highlight") {
        const h = findHl();
        if (!h) return "No encontré esa destacada.";
        if (data.name) h.name = data.name;
        if (data.icon) h.icon = data.icon;
        if (data.desc !== undefined && data.desc !== null) h.desc = data.desc;
        saveStoriesToStorage();
        renderCurrentView();
        return `Actualizada la destacada «${h.name}»`;
      }

      if (data.type === "delete_highlight") {
        const h = findHl();
        if (!h) return "No encontré esa destacada.";
        const count = stories.filter(s => s.highlightId === h.id).length;
        const msg = count > 0
          ? `El agente quiere eliminar la destacada «${h.name}», que tiene ${count} historia(s). ¿Confirmas?`
          : `El agente quiere eliminar la destacada «${h.name}». ¿Confirmas?`;
        if (!confirm(msg)) return "Eliminación cancelada.";
        highlights = highlights.filter(x => x.id !== h.id);
        stories.forEach(s => { if (s.highlightId === h.id) s.highlightId = ""; });
        saveStoriesToStorage();
        renderCurrentView();
        return `Eliminada la destacada «${h.name}»`;
      }

      if (data.type === "reorder_highlights") {
        const ids = Array.isArray(data.order) ? data.order : [];
        if (ids.length === 0) return "No recibí un orden válido.";
        const ordered = ids.map(id => highlights.find(h => h.id === id)).filter(Boolean);
        if (ordered.length !== highlights.length) return "El orden recibido no incluye todas las destacadas.";
        ordered.forEach((h, i) => { h.order = i; });
        saveStoriesToStorage();
        renderCurrentView();
        return "Destacadas reordenadas.";
      }

      return "";
    }

    // Motor local resiliente que procesa cualquier petición en lenguaje natural
    function handleLocalAIResponse(userText) {
      const text = userText.toLowerCase();

      // ---- Intents de HISTORIAS y DESTACADAS (fallback local sin API) ----
      if (/(historia|storie)/i.test(userText)) {
        const iso = normalizeDateParam(userText);
        if (/(crea|agrega|añade|anade|nueva|genera|suma)/i.test(userText)) {
          const m = userText.match(/(?:sobre|de|llamada)\s+(.+)$/i);
          const name = (m ? m[1] : "Nueva historia de proceso").trim().replace(/[.]+$/, "");
          const hl = highlights[0];
          appendAIChat("ai", `Perfecto. Creo la historia <strong>${escapeHtmlForChat(name)}</strong>${iso ? ` para el <strong>${iso}</strong>` : ""}.`, {
            type: "create_story", name, date: iso || "", time: "", highlight: hl ? hl.name : "", format: "", status: "Idea", context: ""
          }, true);
          return;
        }
        if (/(borra|elimina|quita)/i.test(userText)) {
          const n = userText.match(/#\s*(\d{1,2})|(\d{1,2})/);
          const idx = n ? parseInt(n[1] || n[2], 10) : NaN;
          const list = sortedStories();
          const s = (!isNaN(idx) && list[idx - 1]) ? list[idx - 1] : null;
          if (s) {
            appendAIChat("ai", `Voy a eliminar la historia <strong>#${idx} · ${escapeHtmlForChat(s.name)}</strong>.`, { type: "delete_story", id: s.id }, true);
            return;
          }
        }
      }

      if (/destacad/i.test(userText)) {
        if (/(crea|agrega|añade|anade|nueva|genera)/i.test(userText)) {
          const m = userText.match(/(?:llamada|sobre|de)\s+(.+)$/i);
          const name = (m ? m[1] : "Nueva destacada").trim().replace(/[.]+$/, "");
          appendAIChat("ai", `Creo la destacada <strong>${escapeHtmlForChat(name)}</strong>.`, {
            type: "create_highlight", name, icon: "📌", desc: ""
          }, true);
          return;
        }
        if (/(borra|elimina|quita)/i.test(userText)) {
          const m = userText.match(/(?:destacada)\s+(.+)$/i);
          if (m) {
            appendAIChat("ai", `Voy a eliminar la destacada <strong>${escapeHtmlForChat(m[1].trim())}</strong>.`, { type: "delete_highlight", name: m[1].trim() }, true);
            return;
          }
        }
      }

      // Detectar peticiones de cambio de fecha
      const dateMatch = text.match(/(\d{1,2})\s+de\s+(noviembre|nov)/i) || text.match(/al\s+(\d{1,2})/i);
      let targetDate = null;
      if (dateMatch) {
        const dayNum = String(dateMatch[1]).padStart(2, "0");
        targetDate = `2026-11-${dayNum}`;
      }

      // Buscar si menciona algún proyecto
      let matchedPost = null;
      if (text.includes("kivado")) matchedPost = posts.find(p => p.title.toLowerCase().includes("kivado"));
      else if (text.includes("carboneo")) matchedPost = posts.find(p => p.title.toLowerCase().includes("carboneo"));
      else if (text.includes("cemedicar")) matchedPost = posts.find(p => p.title.toLowerCase().includes("cemedicar"));
      else if (text.includes("gyal")) matchedPost = posts.find(p => p.title.toLowerCase().includes("gyal"));
      else if (text.includes("karen") || text.includes("lizarazo")) matchedPost = posts.find(p => p.title.toLowerCase().includes("karen"));
      else if (text.includes("banda") || text.includes("lbd5")) matchedPost = posts.find(p => p.title.toLowerCase().includes("banda"));

      if (matchedPost && targetDate) {
        appendAIChat("ai", `Entendido. He preparado la reprogramación del post <strong>${matchedPost.title}</strong> para el <strong>${targetDate}</strong>:`, {
          type: "update_post",
          id: matchedPost.id,
          title: matchedPost.title,
          date: targetDate,
          status: text.includes("listo") ? "Listo" : matchedPost.status
        });
        return;
      }

      if (text.includes("karen") || text.includes("lizarazo")) {
        const copy = `En la música en vivo, el diseño es el pegamento de la campaña.\n\nPara el lanzamiento de ETP con Karen Lizarazo, no nos limitamos a la carátula digital: pensamos cómo la identidad respiraba en una valla de autopista a 80 km/h, en la miniatura de Spotify y en las pantallas LED durante el concierto.\n\nDiseño que no se queda en pantalla: diseño que sale a la calle.`;
        appendAIChat("ai", `Aquí tienes una versión de alto impacto con enfoque de agencia:<br><br>“${copy.replace(/\n/g, '<br>')}”`, {
          type: "update_post",
          id: "post-li-3",
          title: "Más allá de la portada: cómo se orquesta la identidad visual de un lanzamiento musical",
          caption: copy
        });
      } else if (text.includes("ganchos") || text.includes("reel") || text.includes("imprenta")) {
        appendAIChat("ai", `Aquí tienes 3 opciones de ganchos virales para el Reel de errores de imprenta:<br><br>
        1. <strong>«El error de 3 milímetros que le costó 4 millones de pesos a un cliente.»</strong> (Alto impacto / pérdida económica).<br>
        2. <strong>«Por qué tu diseño se ve perfecto en Mac pero sale pixelado en la valla.»</strong> (Contraste pantalla vs realidad).<br>
        3. <strong>«3 cosas que tu impresor desearía que supieras antes de mandarle el PDF.»</strong> (Empatía de gremio).`);
      } else if (text.includes("tipograf") || text.includes("empaque")) {
        const copy = `La tipografía no decora: modula la voz del producto.\n\nEn empaques de retail, la fuente tiene menos de 2 segundos para comunicar si el producto es artesanal, clínico o premium antes de que el cliente lo tome del estante.\n\n¿Serif o geométrica? Depende de la promesa de marca.`;
        appendAIChat("ai", `Te propongo esta nueva pieza de criterio para Instagram:<br><br><strong>Título:</strong> Tipografía en empaque: cómo modular la voz del producto.<br><strong>Fecha sugerida:</strong> 15 de Noviembre (IG Post Estático).<br><br>“${copy.replace(/\n/g, '<br>')}”`, {
          type: "create_post",
          title: "Tipografía en empaque: cómo modular la voz del producto",
          channel: "Instagram",
          date: "2026-11-15",
          status: "Idea",
          phase: "",
          format: "Post",
          structure: "Foto o render comparando dos etiquetas con diferentes familias tipográficas y su percepción psicológica.",
          caption: copy
        });
      } else {
        appendAIChat("ai", `He analizado tu petición: <em>"${userText}"</em>.<br><br>
        Puedo modificar cualquier elemento del calendario. Intenta pedirme:<br>
        • <em>«Mueve el post de Kivado al 14 de Noviembre»</em><br>
        • <em>«Redacta un copy más persuasivo para Karen Lizarazo»</em><br>
        • <em>«Agrega un post sobre retículas para el 15 de Noviembre»</em><br><br>
        <em>Tip:</em> Haz clic en <strong>🔑 Configurar API Key</strong> para probar tu clave con Google.`);
      }
    }

    /* INLINE AI EN EL EDITOR */
    async function aiImproveTitle() {
      const current = document.getElementById("edit-title").value;
      if (!current) { alert("Por favor escribe un título base primero"); return; }
      
      const btn = document.getElementById("btnAiTitle");
      btn.disabled = true;
      btn.innerText = "Pensando...";

      if (hasActiveAI()) {
        try {
          const res = await callUniversalAI(
            "Eres un director de arte de diseño gráfico. Genera 1 solo título potente y profesional (máximo 7 palabras) para una publicación basada en el título que te da el usuario. Devuelve ÚNICAMENTE el texto del título, sin comillas ni explicaciones.",
            current
          );
          document.getElementById("edit-title").value = res.trim().replace(/^["']|["']$/g, '');
          btn.disabled = false;
          btn.innerText = "✨ Mejorar Título";
          return;
        } catch (e) {
          console.warn("Fallo API de IA para título, usando heurística local:", e);
        }
      }

      btn.disabled = false;
      btn.innerText = "✨ Mejorar Título";
      const suggestions = [
        current + " (Rigor de Taller)",
        "De la pantalla a la calle: " + current,
        "La anatomía detrás de: " + current,
        current + " [Detalle & Criterio]"
      ];
      document.getElementById("edit-title").value = suggestions[Math.floor(Math.random() * suggestions.length)];
    }

    async function aiGenerateSlides() {
      const title = document.getElementById("edit-title").value || "este proyecto";
      const format = document.getElementById("edit-format").value;
      const btn = document.getElementById("btnAiSlides");
      btn.disabled = true;
      btn.innerText = "Generando...";

      if (hasActiveAI()) {
        try {
          const res = await callUniversalAI(
            `Eres un estratega de contenido visual para diseñadores gráficos. Genera una estructura concisa paso a paso (${format.includes('Carrusel') ? 'Slide por slide' : 'Estructura por segundos'}) para una pieza titulada "${title}" con formato ${format}. Devuelve únicamente la estructura numerada, clara y accionable.`,
            title
          );
          document.getElementById("edit-structure").value = res.trim();
          btn.disabled = false;
          btn.innerText = "✨ Estructurar Slides";
          return;
        } catch (e) {
          console.warn("Fallo API de IA para slides, usando heurística local:", e);
        }
      }

      btn.disabled = false;
      btn.innerText = "✨ Estructurar Slides";
      if (format.includes("Carrusel")) {
        document.getElementById("edit-structure").value = 
`Slide 1: [Gancho visual] Título potente en tipografía display sobre fondo neutro.
Slide 2: [El problema / Reto] Por qué la mayoría falla al diseñar para este soporte.
Slide 3: [La solución técnica] Retícula, proporciones y pruebas de color.
Slide 4: [El resultado en físico] Detalle macro de la pieza terminada o render en contexto.
Slide 5: [Cierre / CTA] «Guarda este post para tu próxima entrega técnica».`;
      } else if (format.includes("Reel")) {
        document.getElementById("edit-structure").value = 
`0-3 seg: Gancho visual enérgico o texto en pantalla que plantee una duda técnica.
3-8 seg: Tomas rápidas del software (Illustrator/After Effects) mostrando el armado.
8-12 seg: Transición al resultado real (impreso o instalado en calle).
12-15 seg: Llamado a la acción con tu isotipo.`;
      } else {
        document.getElementById("edit-structure").value = 
`Composición única: Encuadre en plano cerrado (macro) con iluminación lateral para resaltar texturas y acabados físicos.`;
      }
    }

    async function aiOptimizeCopy(type) {
      const current = document.getElementById("edit-caption").value;
      const title = document.getElementById("edit-title").value;
      const channel = document.getElementById("edit-channel").value;
      const btn = type === 'short' ? document.getElementById("btnAiCopyShort") : document.getElementById("btnAiCopyPersuasive");
      
      btn.disabled = true;
      btn.innerText = "Optimizando...";

      if (hasActiveAI()) {
        try {
          const styleInstruction = type === 'short' 
            ? "un copy ultra corto, contundente y directo de máximo 3 líneas"
            : "un copy persuasivo con gancho fuerte, contexto de valor y llamada a la acción";

          const res = await callUniversalAI(
            `Eres copywriter experto para diseñadores gráficos de alto nivel. Redacta ${styleInstruction} para una publicación de ${channel} titulada "${title}". Texto actual de referencia: "${current}". Tono: profesional, seguro, sin frases hechas como "hola amigos" ni disculpas por no publicar. Devuelve únicamente el copy.`,
            title
          );
          document.getElementById("edit-caption").value = res.trim();
          btn.disabled = false;
          btn.innerText = type === 'short' ? "✨ Resumir" : "✨ Persuasivo";
          return;
        } catch (e) {
          console.warn("Fallo API de IA para copy:", e);
        }
      }

      btn.disabled = false;
      btn.innerText = type === 'short' ? "✨ Resumir" : "✨ Persuasivo";

      if (type === "short") {
        document.getElementById("edit-caption").value = 
`Lo que se construye en el taller no necesita adornos para sostenerse.\n\n${title}.\n\nPronto en el archivo completo → 20.11`;
      } else {
        document.getElementById("edit-caption").value = 
`Diseñar es tomar decisiones técnicas antes de que el cliente las note.\n\nEn este proyecto el reto no fue encontrar una forma atractiva, sino asegurar que funcionara con el mismo rigor en pantalla que en producción final.\n\nCriterio, preprensa y ejecución real.\n20.11.2026.`;
      }
    }

    // ============================================================
    // SISTEMA DE AUTENTICACIÓN SHA-256 + BLOQUEO ANTI-FUERZA BRUTA
    // ============================================================
