// GitHub Pages: the password decrypts credentials; it does not hide public site files.
function unlockStudioUI() {
  document.getElementById("authOverlay").classList.add("hidden");
  document.body.classList.remove("auth-locked");
}
function lockStudioSession() { return StudioCredentialVault.lock(); }
function toggleAuthPasswordVisibility() {
  const input = document.getElementById("authPasswordInput");
  input.type = input.type === "password" ? "text" : "password";
}
function handleStudioLogin(event) { return StudioCredentialVault.login(event); }
function changeStudioPasswordFlow() { StudioCredentialVault.openPasswordDialog(); }
function initStudioAuth() { return StudioCredentialVault.init(); }

    function decodeUtf8Base64Url(b64url) {
      let b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder().decode(bytes);
    }

    function showSyncModalStatus(text, isError) {
      const box = document.getElementById("syncModalStatusMsg");
      if (!box) return;
      box.style.display = "block";
      box.style.background = isError ? "var(--tag-red-bg)" : "var(--tag-green-bg)";
      box.style.color = isError ? "var(--tag-red-text)" : "var(--tag-green-text)";
      box.textContent = text;
    }

    // ============================================================
    // SINCRONIZACIÓN AUTOMÁTICA CON REPOSITORIO GITHUB (CLOUD STATE)
    // ============================================================
    const GH_REPO_OWNER = "soyorostegui";
    const GH_REPO_NAME = "soyorostegui.github.io";
    const GH_STATE_PATH = "studio/studio-cloud-state.json";
    const GH_CONTEXT_MD_PATH = "studio/CONTEXTO_CONVERSACIONES_IA.md";
    let ghCloudSyncTimer = null;

    function buildCloudStateObject() {
      // Las claves nunca se incluyen en el estado editorial en texto plano.
      // Se guardan aparte en la bóveda cifrada de credenciales.
      return {
        version: 3,
        updatedAt: Number(localStorage.getItem("po_last_updated_at")) || Date.now(),
        updatedAtISO: new Date().toISOString(),
        posts: posts,
        stories: stories,
        highlights: highlights,
        chatHistory: chatHistory,
        importedCustomContextNotes: importedCustomContextNotes || ""
      };
    }

    function applyCloudStateObject(cloudObj) {
      if (!cloudObj || typeof cloudObj !== "object") return false;
      let changed = false;
      if (Array.isArray(cloudObj.posts)) {
        posts = cloudObj.posts;
        localStorage.setItem("po_posts_v6", JSON.stringify(posts));
        changed = true;
      }
      if (Array.isArray(cloudObj.stories)) {
        stories = cloudObj.stories.map(normalizeStoryEntry);
        localStorage.setItem("po_stories_v1", JSON.stringify(stories));
        changed = true;
      }
      if (Array.isArray(cloudObj.highlights)) {
        highlights = cloudObj.highlights;
        localStorage.setItem("po_highlights_v1", JSON.stringify(highlights));
        changed = true;
      }
      if (Array.isArray(cloudObj.chatHistory)) {
        chatHistory = cloudObj.chatHistory;
        localStorage.setItem("po_ai_chat_history", JSON.stringify(chatHistory));
        changed = true;
      }
      if (typeof cloudObj.importedCustomContextNotes === "string") {
        importedCustomContextNotes = cloudObj.importedCustomContextNotes;
        localStorage.setItem("po_ai_imported_notes", importedCustomContextNotes);
      }
      if (cloudObj.updatedAt) {
        localStorage.setItem("po_last_updated_at", String(cloudObj.updatedAt));
      }
      if (changed) {
        renderCurrentView();
        updateApiKeyStatus();
        updateQuickAiSwitchers();
        if (typeof renderSavedChatHistory === "function") renderSavedChatHistory();
      }
      return changed;
    }

    function updateGhCloudStatusUI(text, colorBg, colorText) {
      const badge = document.getElementById("ghCloudStatusBadge");
      const savedTok = secretStorage.getItem("po_gh_repo_token") || "";
      const tokInp = document.getElementById("ghRepoTokenInput");
      if (tokInp && savedTok && !tokInp.value) tokInp.value = savedTok;
      if (!badge) return;
      const hasToken = !!savedTok.trim();
      if (text) {
        badge.textContent = text;
        if (colorBg) badge.style.background = colorBg;
        if (colorText) badge.style.color = colorText;
      } else if (hasToken) {
        badge.textContent = "🟢 Auto-Guardado Activo en GitHub";
        badge.style.background = "var(--tag-green-bg)";
        badge.style.color = "var(--tag-green-text)";
      } else {
        badge.textContent = "🔵 Lectura del Repo Activa";
        badge.style.background = "var(--tag-blue-bg)";
        badge.style.color = "var(--tag-blue-text)";
      }
    }

    function exportRecoverySnapshot() {
      const raw = localStorage.getItem("po_sync_recovery");
      if (!raw) { showSyncModalStatus("Todavía no hay copia de recuperación: se crea antes de cargar datos de GitHub.", true); return; }
      const url = URL.createObjectURL(new Blob([raw], { type: "application/json" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "studio-recuperacion.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showSyncModalStatus("Copia descargada con publicaciones, historias, destacadas y conversación. Conserva el archivo para recuperar estos datos.", false);
    }

    // Compare editorial content, not save timestamps, JSON indentation or object key order.
    function canonicalSyncValue(value) {
      if (Array.isArray(value)) return value.map(canonicalSyncValue);
      if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonicalSyncValue(value[key])]));
      return value;
    }
    function editorialSyncContent(state) {
      return { posts: state.posts || [], stories: (state.stories || []).map(normalizeStoryEntry),
        highlights: state.highlights || [], chatHistory: state.chatHistory || [], importedCustomContextNotes: state.importedCustomContextNotes || "" };
    }
    function sameEditorialContent(a, b) {
      return JSON.stringify(canonicalSyncValue(editorialSyncContent(a))) === JSON.stringify(canonicalSyncValue(editorialSyncContent(b)));
    }
    function parseRemoteState(meta) {
      const state = JSON.parse(decodeUtf8Base64Url(meta.content.replace(/\s+/g, "")));
      if (!meta.sha || !state || !["posts", "stories", "highlights", "chatHistory"].every(k => Array.isArray(state[k]))) throw new Error("El respaldo de GitHub tiene un formato inválido. Se conservan los datos locales.");
      return state;
    }
    let stateSyncConflict = null;
    function clearStateSyncConflict() {
      stateSyncConflict = null;
      const panel = document.getElementById("stateSyncConflictPanel");
      if (panel) panel.hidden = true;
    }
    function adoptMatchingState(meta, local, remote) {
      if (!sameEditorialContent(local, remote)) return false;
      localStorage.setItem("po_sync_base_sha", meta.sha);
      // No download or replacement: the existing local content is already the remote version.
      localStorage.removeItem("po_sync_dirty");
      clearStateSyncConflict();
      return true;
    }
    function syncCountSummary(state) {
      return `${state.posts.length} publicaciones, ${state.stories.length} historias, ${state.highlights.length} destacadas y ${state.chatHistory.length} mensajes`;
    }
    function stageStateSyncConflict(local, remote, sha) {
      // Both copies must be backed up before enabling any replacement choice.
      localStorage.setItem("po_sync_conflict_backup", JSON.stringify({version:1,createdAt:new Date().toISOString(),remoteSha:sha,local,remote}));
      localStorage.setItem("po_sync_recovery", JSON.stringify(local));
      stateSyncConflict = {remoteSha:sha};
      const panel = document.getElementById("stateSyncConflictPanel");
      if (panel) {
        panel.hidden = false;
        document.getElementById("stateSyncConflictLocal").textContent = "Este dispositivo: " + syncCountSummary(local);
        document.getElementById("stateSyncConflictRemote").textContent = "GitHub: " + syncCountSummary(remote);
      }
      updateGhCloudStatusUI("Elige qué calendario conservar", "var(--tag-yellow-bg)", "var(--tag-yellow-text)");
      showSyncModalStatus("Las copias del calendario son distintas. Ambas quedaron respaldadas en este navegador. Elige abajo cuál conservar; la bóveda de claves no se modifica.", true);
    }
    function exportStateConflictBackup() {
      const raw = localStorage.getItem("po_sync_conflict_backup");
      if (!raw) { showSyncModalStatus("No hay un conflicto respaldado.", true); return; }
      const url = URL.createObjectURL(new Blob([raw], {type:"application/json"}));
      const link = document.createElement("a"); link.href = url; link.download = "studio-conflicto-ambas-copias.json"; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    async function resolveStateSyncConflict(choice) {
      if (!["local", "remote"].includes(choice) || !stateSyncConflict) return;
      if (ghCloudSyncInProgress) { showSyncModalStatus("Espera a que termine el intento de guardado y vuelve a elegir.", true); return; }
      clearTimeout(ghCloudSyncTimer);
      const expectedSha = stateSyncConflict.remoteSha;
      const startedAt = localStorage.getItem("po_last_updated_at");
      const local = buildCloudStateObject();
      try {
        const token = sanitizeApiKey(secretStorage.getItem("po_gh_repo_token") || "");
        const headers = {Accept:"application/vnd.github+json"}; if (token) headers.Authorization = `Bearer ${token}`;
        const response = await fetch(`https://api.github.com/repos/${GH_REPO_OWNER}/${GH_REPO_NAME}/contents/${GH_STATE_PATH}?ref=main&t=${Date.now()}`, {headers,cache:"no-store"});
        if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
        const meta = await response.json(), remote = parseRemoteState(meta);
        if (meta.sha !== expectedSha || startedAt !== localStorage.getItem("po_last_updated_at") || !sameEditorialContent(local, buildCloudStateObject())) {
          stageStateSyncConflict(buildCloudStateObject(), remote, meta.sha);
          showSyncModalStatus("Una copia cambió mientras elegías. Se actualizaron los respaldos; revisa y vuelve a elegir.", true); return;
        }
        stageStateSyncConflict(local, remote, meta.sha);
        if (choice === "local") {
          if (!token) throw new Error("Necesitas conectar tu token de GitHub para guardar esta copia.");
          await pushStateToGitHubRepoNow(true, expectedSha);
        } else {
          applyCloudStateObject(remote);
          localStorage.setItem("po_sync_base_sha", meta.sha); localStorage.removeItem("po_sync_dirty");
          clearStateSyncConflict(); updateGhCloudStatusUI();
          showSyncModalStatus("Se cargó la copia de GitHub. La copia anterior de este dispositivo sigue disponible en el respaldo de ambas versiones.", false);
        }
      } catch (error) { showSyncModalStatus(error.message, true); }
    }

    async function pullStateFromGitHubRepoNow(manualTrigger) {
      const startedAt = localStorage.getItem("po_last_updated_at");
      try {
        const token = sanitizeApiKey(secretStorage.getItem("po_gh_repo_token") || "");
        const headers = { "Accept": "application/vnd.github+json" };
        if (token) headers.Authorization = `Bearer ${token}`;
        const res = await fetch(`https://api.github.com/repos/${GH_REPO_OWNER}/${GH_REPO_NAME}/contents/${GH_STATE_PATH}?ref=main&t=${Date.now()}`, { headers, cache: "no-store" });
        if (!res.ok) throw new Error(`GitHub HTTP ${res.status}`);
        const meta = await res.json();
        const cloudObj = parseRemoteState(meta);
        // A response arriving after an edit must never replace that edit.
        if (startedAt !== localStorage.getItem("po_last_updated_at")) {
          throw new Error("Hubo cambios mientras se descargaba. Se conserva el estado local; vuelve a sincronizar.");
        }
        if (adoptMatchingState(meta, buildCloudStateObject(), cloudObj)) {
          updateGhCloudStatusUI();
          if (manualTrigger) showSyncModalStatus("El calendario ya coincide con GitHub. Se recuperó el seguimiento sin reemplazar datos.", false);
          return;
        }
        const baseline = localStorage.getItem("po_sync_base_sha");
        const dirty = localStorage.getItem("po_sync_dirty") === "1" || (!baseline && Number(startedAt) > 0);
        if (baseline === meta.sha && !manualTrigger) { updateGhCloudStatusUI(); return; }
        if (dirty) {
          stageStateSyncConflict(buildCloudStateObject(), cloudObj, meta.sha);
          return;
        }
        // Keep the previous data before any replacement. If backup fails, abort.
        localStorage.setItem("po_sync_recovery", JSON.stringify(buildCloudStateObject()));
        applyCloudStateObject(cloudObj);
        localStorage.setItem("po_sync_base_sha", meta.sha);
        localStorage.removeItem("po_sync_dirty");
        clearStateSyncConflict();
        updateGhCloudStatusUI();
        if (manualTrigger) showSyncModalStatus("Calendario y conversación cargados desde GitHub. El estado anterior quedó respaldado en este navegador.", false);
      } catch (err) {
        console.warn("Sincronización detenida:", err);
        updateGhCloudStatusUI("Conflicto o error: datos locales conservados", "var(--tag-red-bg)", "var(--tag-red-text)");
        if (manualTrigger) showSyncModalStatus(err.message, true);
      }
    }

    async function putFileToGitHubRepo(token, filePath, utf8Content, commitMessage, expectedStateSha = null) {
      const apiUrl = `https://api.github.com/repos/${GH_REPO_OWNER}/${GH_REPO_NAME}/contents/${filePath}`;
      let existingSha = null;
      const getRes = await fetch(`${apiUrl}?ref=main&t=${Date.now()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github+json"
        },
        cache: "no-store"
      });
      if (getRes.ok) {
        const meta = await getRes.json();
        existingSha = meta.sha || null;
        if (filePath === GH_STATE_PATH) {
          const remote = parseRemoteState(meta), snapshot = JSON.parse(utf8Content);
          // Edits during the request are not part of this snapshot and must remain pending.
          if (sameEditorialContent(snapshot, remote)) {
            localStorage.setItem("po_sync_base_sha", meta.sha);
            if (sameEditorialContent(buildCloudStateObject(), remote)) localStorage.removeItem("po_sync_dirty");
            clearStateSyncConflict();
            return true;
          }
          const expected = expectedStateSha || localStorage.getItem("po_sync_base_sha");
          if (existingSha !== expected) {
            stageStateSyncConflict(buildCloudStateObject(), remote, existingSha);
            const error = new Error("El calendario local y el de GitHub son distintos. Elige abajo cuál conservar.");
            error.stateConflict = true; throw error;
          }
        }
      } else if (getRes.status !== 404) {
        throw new Error(`No se pudo comprobar la versión remota (HTTP ${getRes.status}).`);
      } else if (filePath === GH_STATE_PATH && localStorage.getItem("po_sync_base_sha")) {
        throw new Error("El respaldo remoto fue eliminado. Se detuvo el envío para no recrearlo automáticamente.");
      }
      const bytes = new TextEncoder().encode(utf8Content);
      let bin = "";
      for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      const contentB64 = btoa(bin);

      const bodyObj = {
        message: commitMessage,
        content: contentB64,
        branch: "main"
      };
      if (existingSha) bodyObj.sha = existingSha;

      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyObj)
      });
      if (!putRes.ok) {
        const errTxt = await putRes.text();
        throw new Error(`GitHub HTTP ${putRes.status}: ${errTxt.substring(0, 140)}`);
      }
      if (filePath === GH_STATE_PATH) {
        const saved = await putRes.json();
        if (!saved.content?.sha) throw new Error("GitHub no confirmó la versión guardada.");
        localStorage.setItem("po_sync_base_sha", saved.content.sha);
        clearStateSyncConflict();
        const snapshot = JSON.parse(utf8Content);
        if (Number(localStorage.getItem("po_last_updated_at")) === snapshot.updatedAt) localStorage.removeItem("po_sync_dirty");
      }
      return true;
    }

    let ghCloudSyncInProgress = false;
    let ghCloudSyncPending = false;

    function onGitHubTokenInput() {
      showSyncModalStatus("Pulsa Guardar para actualizar el token y sincronizar la bóveda cifrada.", false);
    }

    async function pushStateToGitHubRepoNow(manualTrigger = false, expectedStateSha = null) {
      const token = sanitizeApiKey(secretStorage.getItem("po_gh_repo_token") || document.getElementById("ghRepoTokenInput")?.value || "");
      if (!token) {
        updateGhCloudStatusUI();
        return;
      }
      if (ghCloudSyncInProgress) {
        ghCloudSyncPending = true;
        return;
      }
      ghCloudSyncInProgress = true;
      try {
        updateGhCloudStatusUI("☁️ Auto-guardando...", "var(--tag-blue-bg)", "var(--tag-blue-text)");
        const syncStatus = document.getElementById("ctxDiskSyncStatus");
        if (syncStatus) {
          syncStatus.innerText = "☁️ Auto-guardando en GitHub...";
          syncStatus.style.color = "#2563eb";
        }
        const stateJson = JSON.stringify(buildCloudStateObject(), null, 2);
        const contextMd = buildContextMarkdown();

        await putFileToGitHubRepo(token, GH_STATE_PATH, stateJson, "sync(studio): auto-guardar contexto IA y estado", expectedStateSha);
        await putFileToGitHubRepo(token, GH_CONTEXT_MD_PATH, contextMd, "docs(contexto): auto-guardar CONTEXTO_CONVERSACIONES_IA.md");

        const timeStr = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
        localStorage.setItem("po_last_saved_time_str", timeStr);
        updateGhCloudStatusUI("🟢 Auto-Guardado en GitHub (" + timeStr + ")", "var(--tag-green-bg)", "var(--tag-green-text)");
        if (syncStatus) {
          syncStatus.innerText = `☁️ Auto-guardado en GitHub (${timeStr})`;
          syncStatus.style.color = "#15803d";
        }
        if (manualTrigger) {
          showSyncModalStatus("✅ ¡Auto-guardado activo en tu repositorio GitHub!", false);
        }
      } catch (err) {
        console.error("Error auto-guardando en GitHub:", err);
        if (!err.stateConflict) updateGhCloudStatusUI("Error al sincronizar: cambios locales conservados", "var(--tag-red-bg)", "var(--tag-red-text)");
        if (manualTrigger) showSyncModalStatus(err.message, true);
      } finally {
        ghCloudSyncInProgress = false;
        if (ghCloudSyncPending) {
          ghCloudSyncPending = false;
          scheduleGitHubCloudSync(true);
        }
      }
    }

    async function saveGitHubRepoTokenAndPush() {
      const inp = document.getElementById("ghRepoTokenInput");
      const token = sanitizeApiKey(inp ? inp.value : "");
      if (!token) {
        showSyncModalStatus("⚠️ Pega un token de GitHub válido (empieza por ghp_ o github_pat_).", true);
        return;
      }
      secretStorage.setItem("po_gh_repo_token", token);
      try {
        await StudioCredentialVault.save(true);
        await pushStateToGitHubRepoNow(true);
      } catch (error) { showSyncModalStatus(error.message, true); }
    }

    function scheduleGitHubCloudSync(immediate = false) {
      const token = sanitizeApiKey(secretStorage.getItem("po_gh_repo_token") || "");
      if (!token) return;
      if (ghCloudSyncTimer) clearTimeout(ghCloudSyncTimer);
      const delay = immediate ? 100 : 2500;
      ghCloudSyncTimer = setTimeout(() => {
        pushStateToGitHubRepoNow(false);
      }, delay);
    }

    // Inicializar
    initStudioAuth();
    setupKanbanDropZones();
    renderCurrentView();
    updateApiKeyStatus();
    updateQuickAiSwitchers();
    restoreCopilotPanelState();
    updateGhCloudStatusUI();
    // State is loaded after the credential vault is unlocked.

    // Cierre accesible de modales con tecla Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const keyModal = document.getElementById("keyModalOverlay");
        if (keyModal && (keyModal.style.display === "flex" || getComputedStyle(keyModal).display === "flex")) {
          closeKeyModal();
          return;
        }
        const postModal = document.getElementById("modalOverlay");
        if (postModal && (postModal.style.display === "flex" || getComputedStyle(postModal).display === "flex")) {
          closeModal();
          return;
        }
      }
    });
