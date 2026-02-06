---
layout: page
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Audio → Transcript (Browser‑only)</title>
  <style>
    :root{--gap:12px;--pad:14px;--radius:12px;--border:#e3e3e7;--bg:#0b0b0f;--card:#111219;--text:#e8e8f0;--muted:#b5b5c3}
    html,body{height:100%}
    body{margin:0;background:var(--bg);color:var(--text);font:14px/1.45 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Inter,Helvetica,Arial}
    .wrap{max-width:900px;margin:40px auto;padding:0 var(--pad)}
    h1{font-size:20px;margin:0 0 var(--gap)}
    p{color:var(--muted)}
    .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:18px;margin-top:var(--gap)}
    label{display:block;margin:10px 0 6px;color:var(--muted)}
    input[type="text"],input[type="password"],input[type="number"],select,textarea{width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:#0f1016;color:var(--text)}
    textarea{min-height:220px;white-space:pre-wrap}
    .row{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap)}
    .controls{display:flex;gap:10px;flex-wrap:wrap;margin-top:var(--gap)}
    button{padding:10px 14px;border-radius:10px;border:1px solid var(--border);background:#1b1d2a;color:var(--text);cursor:pointer}
    button[disabled]{opacity:.6;cursor:not-allowed}
    .hint{font-size:12px;color:var(--muted)}
    .inline{display:flex;align-items:center;gap:8px}
    .success{color:#90ee90}
    .error{color:#ffb3b3}
    .pill{display:inline-block;padding:2px 8px;border:1px solid var(--border);border-radius:999px;margin-left:6px;font-size:12px;color:var(--muted)}
    .footer{margin-top:24px;color:var(--muted)}
    .kbd{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#0e0f15;border:1px solid var(--border);border-radius:6px;padding:0 6px}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Audio → Transcript <span class="pill">OpenAI</span></h1>
    <p>Runs entirely in your browser. No server. Paste your OpenAI API key, drop an audio/video file, and get a transcript (text / srt / vtt / JSON).</p>

    <div class="card">
      <div class="row">
        <div>
          <label for="apiKey">OpenAI API Key</label>
          <input id="apiKey" type="password" placeholder="sk-..." autocomplete="off" />
          <div class="inline hint" style="margin-top:6px">
            <input id="storeKey" type="checkbox" /> <label for="storeKey" style="margin:0">Store key in this browser (localStorage)</label>
          </div>
        </div>
        <div>
          <label for="model">Model</label>
          <select id="model">
            <option value="gpt-4o-mini-transcribe">gpt-4o-mini-transcribe (fast, $)</option>
            <option value="whisper-1">whisper-1 (robust)</option>
          </select>
          <label for="format" style="margin-top:12px">Response format</label>
          <select id="format">
            <option value="text">text</option>
            <option value="json">json</option>
            <option value="verbose_json">verbose_json</option>
            <option value="srt">srt</option>
            <option value="vtt">vtt</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div>
          <label for="file">Audio / Video file</label>
          <input id="file" type="file" accept="audio/*,video/*,.m4a,.mp3,.wav,.mp4,.mov,.mkv" />
          <div class="hint">Large files work, but your browser must upload them directly to OpenAI (CORS is supported). Costs apply to your key.</div>
        </div>
        <div>
          <label for="language">Language (optional ISO code)</label>
          <input id="language" type="text" placeholder="auto or e.g. en, pt, ru" />
          <label for="temperature" style="margin-top:12px">Temperature</label>
          <input id="temperature" type="number" step="0.1" min="0" max="1" value="0" />
        </div>
      </div>

      <label for="prompt" style="margin-top:6px">Prompt / Vocabulary (optional)</label>
      <input id="prompt" type="text" placeholder="e.g. brand names, jargon to bias transcription" />

      <div class="controls">
        <button id="btnTranscribe">Transcribe</button>
        <button id="btnClear" type="button">Clear</button>
        <span id="status" class="hint"></span>
      </div>
    </div>

    <div class="card">
      <label for="output">Output</label>
      <textarea id="output" placeholder="Transcript will appear here..." readonly></textarea>
      <div class="controls">
        <button id="btnCopy" type="button">Copy</button>
        <button id="btnDownloadTxt" type="button">Download .txt</button>
        <button id="btnDownloadSrt" type="button">Download .srt</button>
        <button id="btnDownloadVtt" type="button">Download .vtt</button>
      </div>
    </div>

    <div class="footer">
      <div>Tip: press <span class="kbd">Ctrl</span>/<span class="kbd">⌘</span> + <span class="kbd">Enter</span> to transcribe.</div>
      <div class="hint" style="margin-top:8px">Security note: your key is used only from this page to call the official OpenAI endpoint. If you tick “Store key”, it’s saved in <code>localStorage</code> on this device.</div>
    </div>
  </div>

<script>
(function(){
  const els = {
    apiKey: document.getElementById('apiKey'),
    storeKey: document.getElementById('storeKey'),
    model: document.getElementById('model'),
    format: document.getElementById('format'),
    file: document.getElementById('file'),
    language: document.getElementById('language'),
    temperature: document.getElementById('temperature'),
    prompt: document.getElementById('prompt'),
    btnTranscribe: document.getElementById('btnTranscribe'),
    btnClear: document.getElementById('btnClear'),
    output: document.getElementById('output'),
    status: document.getElementById('status'),
    btnCopy: document.getElementById('btnCopy'),
    btnDownloadTxt: document.getElementById('btnDownloadTxt'),
    btnDownloadSrt: document.getElementById('btnDownloadSrt'),
    btnDownloadVtt: document.getElementById('btnDownloadVtt'),
  };

  // Restore saved prefs
  try {
    const saved = JSON.parse(localStorage.getItem('x_transcriber_prefs')||'{}');
    if(saved.model) els.model.value = saved.model;
    if(saved.format) els.format.value = saved.format;
    if(saved.language) els.language.value = saved.language;
    if(saved.temperature!=null) els.temperature.value = saved.temperature;
    if(saved.prompt) els.prompt.value = saved.prompt;
    if(saved.storeKey){ els.storeKey.checked = true; els.apiKey.value = localStorage.getItem('x_openai_key')||''; }
  } catch(e){}

  function savePrefs(){
    const prefs = {
      model: els.model.value,
      format: els.format.value,
      language: els.language.value,
      temperature: els.temperature.value,
      prompt: els.prompt.value,
      storeKey: els.storeKey.checked,
    };
    localStorage.setItem('x_transcriber_prefs', JSON.stringify(prefs));
    if(els.storeKey.checked) localStorage.setItem('x_openai_key', els.apiKey.value||'');
    else localStorage.removeItem('x_openai_key');
  }

  ['change','input'].forEach(ev=>{
    els.model.addEventListener(ev, savePrefs);
    els.format.addEventListener(ev, savePrefs);
    els.language.addEventListener(ev, savePrefs);
    els.temperature.addEventListener(ev, savePrefs);
    els.prompt.addEventListener(ev, savePrefs);
    els.storeKey.addEventListener(ev, savePrefs);
    els.apiKey.addEventListener(ev, savePrefs);
  });

  async function transcribe(){
    const key = els.apiKey.value.trim();
    const file = els.file.files[0];
    if(!key){ return setStatus('Add your API key', true); }
    if(!file){ return setStatus('Choose an audio/video file', true); }

    setBusy(true);
    setStatus('Uploading…');

    try{
      const fd = new FormData();
      fd.append('file', file);
      fd.append('model', els.model.value);
      fd.append('response_format', els.format.value);
      if(els.language.value && els.language.value.toLowerCase() !== 'auto') fd.append('language', els.language.value.trim());
      if(els.prompt.value) fd.append('prompt', els.prompt.value.trim());
      if(els.temperature.value) fd.append('temperature', String(els.temperature.value));

      const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${key}` },
        body: fd
      });

      if(!res.ok){
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      let text = '';
      const fmt = els.format.value;
      if(fmt === 'json' || fmt === 'verbose_json'){
        const json = await res.json();
        text = JSON.stringify(json, null, 2);
      } else {
        text = await res.text();
      }

      els.output.value = text;
      setStatus('Done ✔', false);
    } catch(err){
      console.error(err);
      setStatus(String(err.message||err), true);
    } finally {
      setBusy(false);
    }
  }

  function setBusy(b){
    els.btnTranscribe.disabled = b;
    els.btnClear.disabled = b;
  }

  function setStatus(msg, isErr=false){
    els.status.textContent = msg;
    els.status.className = isErr ? 'hint error' : 'hint success';
  }

  function clearAll(){
    els.output.value = '';
    els.status.textContent = '';
  }

  function download(name){
    const blob = new Blob([els.output.value||''], {type:'text/plain;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href), 5000);
  }

  els.btnTranscribe.addEventListener('click', transcribe);
  els.btnClear.addEventListener('click', clearAll);
  els.btnCopy.addEventListener('click', async ()=>{
    await navigator.clipboard.writeText(els.output.value||'');
    setStatus('Copied');
  });
  els.btnDownloadTxt.addEventListener('click', ()=>download('transcript.txt'));
  els.btnDownloadSrt.addEventListener('click', ()=>download('transcript.srt'));
  els.btnDownloadVtt.addEventListener('click', ()=>download('transcript.vtt'));

  document.addEventListener('keydown', (e)=>{
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='enter') transcribe();
  });
})();
</script>
</body>
</html>