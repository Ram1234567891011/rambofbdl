/*
const API = "http://localhost:3000/api/fetch";
const inputLink = document.getElementById("inputLink");
const fetchBtn = document.getElementById("fetchBtn");
const fetchLoader = document.getElementById("fetchLoader");
const result = document.getElementById("result");
const thumb = document.getElementById("thumb");
const titleEl = document.getElementById("title");
const noteEl = document.getElementById("note");


const sdInput = document.getElementById("sdInput");
const hdInput = document.getElementById("hdInput");
const sdCopyBtn = document.getElementById("sdCopy");
const hdCopyBtn = document.getElementById("hdCopy");
const sdDownloadBtn = document.getElementById("sdDownload");
const hdDownloadBtn = document.getElementById("hdDownload");
const sdStatus = document.getElementById("sdStatus");
const hdStatus = document.getElementById("hdStatus");


const progressArea = document.getElementById("progressArea");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");


const themeToggle = document.getElementById("themeToggle");
let currentTheme = "dark";
let currentTitle = "video";
let sdUrl = null;
let hdUrl = null;


fetchBtn.addEventListener("click", doFetch);
themeToggle.addEventListener("click", toggleTheme);
sdCopyBtn.addEventListener("click", () => copyToClipboard(sdInput.value));
hdCopyBtn.addEventListener("click", () => copyToClipboard(hdInput.value));
sdDownloadBtn.addEventListener("click", () => startDownload(sdUrl));
hdDownloadBtn.addEventListener("click", () => startDownload(hdUrl));


function toggleTheme(){
if(currentTheme === "dark"){ document.documentElement.style.setProperty('--bg1','#ffffff'); document.documentElement.style.setProperty('--bg2','#e6b3ff'); themeToggle.textContent = "Light"; currentTheme="light"; }
else{ document.documentElement.style.setProperty('--bg1','#1e003c'); document.documentElement.style.setProperty('--bg2','#ff4ffd'); themeToggle.textContent = "Dark"; currentTheme="dark"; }
}


function showFetchLoading(show=true){ fetchLoader.classList.toggle("hidden",!show); fetchBtn.disabled=show; }


async function doFetch(){
const url = inputLink.value.trim();
if(!url) return alert("Please paste a Facebook video link.");
showFetchLoading(true);
result.classList.add("hidden");
progressArea.classList.add("hidden");
progressBar.style.width="0%";
progressPercent.textContent="0%";


try{
const res = await fetch(API,{ method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({url}) });
const json = await res.json();
showFetchLoading(false);
if(!json.success){ alert("Failed to fetch. See backend logs."); return; }


currentTitle = sanitizeFilename(json.title || "video");
titleEl.textContent = json.title || "Untitled video";
thumb.src = json.thumbnail || "";
noteEl.textContent = "Choose quality or copy the URL.";


sdUrl=json.sd; hdUrl=json.hd;
updateQualityUI("sd", sdUrl, sdInput, sdCopyBtn, sdDownloadBtn, sdStatus);
updateQualityUI("hd", hdUrl, hdInput, hdCopyBtn, hdDownloadBtn, hdStatus);
result.classList.remove("hidden");
}catch(err){ showFetchLoading(false); console.error(err); alert("Error fetching video info."); }
}


function updateQualityUI(type,url,inputEl,copyBtn,dlBtn,statusEl){
if(url){
inputEl.value=url; copyBtn.disabled=false; dlBtn.disabled=false;
statusEl.textContent="Available"; statusEl.style.background="rgba(46,224,106,0.12)"; statusEl.style.color="#b8ffcf";
document.querySelector("."+type).classList.remove("disabled");
} else {
inputEl.value=""; copyBtn.disabled=true; dlBtn.disabled=true;
statusEl.textContent="Unavailable"; statusEl.style.background="rgba(255,82,82,0.08)"; statusEl.style.color="#ffbebe";
document.querySelector("."+type).classList.add("disabled");
}
}


function copyToClipboard(txt){ if(!txt) return; navigator.clipboard.writeText(txt).then(()=>flashMessage("Copied to clipboard")); }
function flashMessage(msg){ const el=document.createElement("div"); el.className="flash"; el.textContent=msg; el.style.position="fixed"; el.style.right="20px"; el.style.bottom="20px"; el.style.padding="10px 14px"; el.style.background="rgba(0,0,0,0.7)"; el.style.color="#fff"; el.style.borderRadius="8px"; document.body.appendChild(el); setTimeout(()=>el.remove(),1600); }


function startDownload(videoUrl){
if(!videoUrl) return alert("This quality is unavailable.");
const filename=currentTitle+".mp4";
const downloadUrl=`http://localhost:3000/api/download?url=${encodeURIComponent(videoUrl)}&filename=${encodeURIComponent(filename)}`;
const a=document.createElement("a"); a.href=downloadUrl; a.download=filename; document.body.appendChild(a); a.click(); a.remove();
}


function sanitizeFilename(name){ return name.replace(/[\/\?%*:|"<>]/g,'_').trim(); }


*/

///2!!!!!!


/*

// script.js (updated - use relative API paths & better error messages)
const API = "/api/fetch";
const inputLink = document.getElementById("inputLink");
const fetchBtn = document.getElementById("fetchBtn");
const fetchLoader = document.getElementById("fetchLoader");
const result = document.getElementById("result");
const thumb = document.getElementById("thumb");
const titleEl = document.getElementById("title");
const noteEl = document.getElementById("note");

const sdInput = document.getElementById("sdInput");
const hdInput = document.getElementById("hdInput");
const sdCopyBtn = document.getElementById("sdCopy");
const hdCopyBtn = document.getElementById("hdCopy");
const sdDownloadBtn = document.getElementById("sdDownload");
const hdDownloadBtn = document.getElementById("hdDownload");
const sdStatus = document.getElementById("sdStatus");
const hdStatus = document.getElementById("hdStatus");

const progressArea = document.getElementById("progressArea");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");

const themeToggle = document.getElementById("themeToggle");
let currentTheme = "dark";
let currentTitle = "video";
let sdUrl = null;
let hdUrl = null;

fetchBtn.addEventListener("click", doFetch);
themeToggle.addEventListener("click", toggleTheme);
sdCopyBtn.addEventListener("click", () => copyToClipboard(sdInput.value));
hdCopyBtn.addEventListener("click", () => copyToClipboard(hdInput.value));
sdDownloadBtn.addEventListener("click", () => startDownload(sdUrl));
hdDownloadBtn.addEventListener("click", () => startDownload(hdUrl));

function toggleTheme(){
  if(currentTheme === "dark"){
    document.documentElement.style.setProperty('--bg1','#ffffff');
    document.documentElement.style.setProperty('--bg2','#e6b3ff');
    themeToggle.textContent = "Light";
    currentTheme="light";
  } else {
    document.documentElement.style.setProperty('--bg1','#1e003c');
    document.documentElement.style.setProperty('--bg2','#ff4ffd');
    themeToggle.textContent = "Dark";
    currentTheme="dark";
  }
}

function showFetchLoading(show=true){
  fetchLoader.classList.toggle("hidden",!show);
  fetchBtn.disabled=show;
}

async function doFetch(){
  const url = inputLink.value.trim();
  if(!url) return alert("Please paste a Facebook video link.");
  showFetchLoading(true);
  result.classList.add("hidden");
  progressArea.classList.add("hidden");
  progressBar.style.width="0%";
  progressPercent.textContent="0%";

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    // try to parse JSON body (if any)
    let json = null;
    try { json = await res.json(); } catch(e){ /* no json */ }


/*
    showFetchLoading(false);

    if (!res.ok) {
      // prefer a backend-provided message when available
      const msg = json?.error || `Server responded ${res.status}`;
      alert("Failed to fetch: " + msg);
      return;
    }

    if (!json || !json.success) {
      const msg = json?.error || "Unknown error (no data)";
      alert("Failed to fetch: " + msg);
      return;
    }

    currentTitle = sanitizeFilename(json.title || "video");
    titleEl.textContent = json.title || "Untitled video";
    thumb.src = json.thumbnail || "";
    noteEl.textContent = "Choose quality or copy the URL.";

    sdUrl = json.sd || null;
    hdUrl = json.hd || null;
    updateQualityUI("sd", sdUrl, sdInput, sdCopyBtn, sdDownloadBtn, sdStatus);
    updateQualityUI("hd", hdUrl, hdInput, hdCopyBtn, hdDownloadBtn, hdStatus);
    result.classList.remove("hidden");
  } catch(err){
    showFetchLoading(false);
    console.error("Fetch error (client):", err);
    alert("Error fetching video info. Check server logs or try the debug route.");
  }
}

function updateQualityUI(type,url,inputEl,copyBtn,dlBtn,statusEl){
  if(url){
    inputEl.value=url;
    copyBtn.disabled=false;
    dlBtn.disabled=false;
    statusEl.textContent="Available";
    statusEl.style.background="rgba(46,224,106,0.12)";
    statusEl.style.color="#b8ffcf";
    document.querySelector("."+type).classList.remove("disabled");
  } else {
    inputEl.value="";
    copyBtn.disabled=true;
    dlBtn.disabled=true;
    statusEl.textContent="Unavailable";
    statusElemBackground(statusEl);
    document.querySelector("."+type).classList.add("disabled");
  }
}

function statusElemBackground(el){
  el.style.background="rgba(255,82,82,0.08)";
  el.style.color="#ffbebe";
}

function copyToClipboard(txt){
  if(!txt) return flashMessage("Nothing to copy");
  navigator.clipboard.writeText(txt).then(()=>flashMessage("Copied to clipboard"))
    .catch(()=>flashMessage("Copy failed"));
}

function flashMessage(msg){
  const el=document.createElement("div");
  el.className="flash";
  el.textContent=msg;
  el.style.position="fixed";
  el.style.right="20px";
  el.style.bottom="20px";
  el.style.padding="10px 14px";
  el.style.background="rgba(0,0,0,0.7)";
  el.style.color="#fff";
  el.style.borderRadius="8px";
  el.style.zIndex = 9999;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),1600);
}

function startDownload(videoUrl){
  if(!videoUrl) return alert("This quality is unavailable.");
  const filename = currentTitle + ".mp4";
  // use relative download endpoint on same origin
  const downloadUrl = `/api/download?url=${encodeURIComponent(videoUrl)}&filename=${encodeURIComponent(filename)}`;
  // open in new tab to let the browser handle the download
  window.open(downloadUrl, "_blank");
}

function sanitizeFilename(name){
  return name.replace(/[\/\?%*:|"<>]/g,'_').trim();
}
*/


// ==========================================
// RAMBO FBDL - UPDATED SCRIPT.JS
// Vercel Compatible
// ==========================================

const API = "/api/fetch";
const DOWNLOAD_API = "/api/download";

// HTML ELEMENTS
const inputLink = document.getElementById("inputLink");
const fetchBtn = document.getElementById("fetchBtn");
const fetchLoader = document.getElementById("fetchLoader");

const result = document.getElementById("result");
const thumb = document.getElementById("thumb");
const titleEl = document.getElementById("title");
const noteEl = document.getElementById("note");

const sdInput = document.getElementById("sdInput");
const hdInput = document.getElementById("hdInput");

const sdCopyBtn = document.getElementById("sdCopy");
const hdCopyBtn = document.getElementById("hdCopy");

const sdDownloadBtn = document.getElementById("sdDownload");
const hdDownloadBtn = document.getElementById("hdDownload");

const sdStatus = document.getElementById("sdStatus");
const hdStatus = document.getElementById("hdStatus");

const progressArea = document.getElementById("progressArea");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");

const themeToggle = document.getElementById("themeToggle");

// VARIABLES
let currentTheme = "dark";
let currentTitle = "video";
let sdUrl = null;
let hdUrl = null;
let isFetching = false;


// ==========================================
// EVENT LISTENERS
// ==========================================

fetchBtn?.addEventListener("click", doFetch);

themeToggle?.addEventListener("click", toggleTheme);

sdCopyBtn?.addEventListener("click", () => {
    copyToClipboard(sdInput.value);
});

hdCopyBtn?.addEventListener("click", () => {
    copyToClipboard(hdInput.value);
});

sdDownloadBtn?.addEventListener("click", () => {
    startDownload(sdUrl);
});

hdDownloadBtn?.addEventListener("click", () => {
    startDownload(hdUrl);
});

inputLink?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        doFetch();
    }
});


// ==========================================
// THEME TOGGLE
// ==========================================

function toggleTheme() {

    if (currentTheme === "dark") {

        document.documentElement.style.setProperty(
            "--bg1", "#ffffff"
        );

        document.documentElement.style.setProperty(
            "--bg2", "#e6b3ff"
        );

        themeToggle.textContent = "Light";

        currentTheme = "light";

    } else {

        document.documentElement.style.setProperty(
            "--bg1", "#1e003c"
        );

        document.documentElement.style.setProperty(
            "--bg2", "#ff4ffd"
        );

        themeToggle.textContent = "Dark";

        currentTheme = "dark";
    }
}


// ==========================================
// LOADING
// ==========================================

function showFetchLoading(show = true) {

    if (fetchLoader) {
        fetchLoader.classList.toggle("hidden", !show);
    }

    if (fetchBtn) {
        fetchBtn.disabled = show;
    }

    isFetching = show;
}


// ==========================================
// FETCH FACEBOOK VIDEO
// ==========================================

async function doFetch() {

    if (isFetching) return;

    const url = inputLink.value.trim();

    if (!url) {
        alert("Please paste a Facebook video link.");
        return;
    }

    // Basic URL validation
    try {

        const parsed = new URL(url);

        const host = parsed.hostname.toLowerCase();

        const validHost =
            host === "facebook.com" ||
            host.endsWith(".facebook.com") ||
            host === "fb.watch" ||
            host === "fb.com" ||
            host.endsWith(".fb.com");

        if (
            !["https:", "http:"].includes(parsed.protocol) ||
            !validHost
        ) {
            alert("Please enter a valid Facebook video link.");
            return;
        }

    } catch {
        alert("Invalid video URL.");
        return;
    }

    showFetchLoading(true);

    result?.classList.add("hidden");

    progressArea?.classList.add("hidden");

    if (progressBar) {
        progressBar.style.width = "0%";
    }

    if (progressPercent) {
        progressPercent.textContent = "0%";
    }

    sdUrl = null;
    hdUrl = null;

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 30000);

    try {

        console.log("[RAMBO FBDL] Fetching:", url);

        const response = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({ url }),

            signal: controller.signal

        });

        // Read response safely
        const rawResponse = await response.text();

        let json = null;

        try {
            json = JSON.parse(rawResponse);
        } catch {
            console.error(
                "[RAMBO FBDL] Invalid server response:",
                rawResponse
            );
        }

        console.log(
            "[RAMBO FBDL] Server status:",
            response.status
        );

        console.log(
            "[RAMBO FBDL] Server response:",
            json || rawResponse
        );

        // HTTP ERROR
        if (!response.ok) {

            const message =
                json?.error ||
                json?.message ||
                `Server responded with HTTP ${response.status}`;

            throw new Error(message);
        }

        // INVALID RESPONSE
        if (!json || typeof json !== "object") {

            throw new Error(
                "Server returned an invalid response. Check your API configuration."
            );
        }

        // BACKEND ERROR
        if (!json.success) {

            throw new Error(
                json.error ||
                json.message ||
                "Unable to retrieve video information."
            );
        }

        // CHECK VIDEO DATA
        if (!json.sd && !json.hd) {

            throw new Error(
                "Video found, but no downloadable quality is available."
            );
        }

        // VIDEO INFORMATION
        currentTitle = sanitizeFilename(
            json.title || "facebook-video"
        );

        titleEl.textContent =
            json.title || "Untitled video";

        thumb.src = json.thumbnail || "";

        thumb.alt = "Facebook video thumbnail";

        noteEl.textContent =
            "Choose your preferred video quality or copy the URL.";

        // VIDEO LINKS
        sdUrl = json.sd || null;
        hdUrl = json.hd || null;

        // UPDATE QUALITY
        updateQualityUI(
            "sd",
            sdUrl,
            sdInput,
            sdCopyBtn,
            sdDownloadBtn,
            sdStatus
        );

        updateQualityUI(
            "hd",
            hdUrl,
            hdInput,
            hdCopyBtn,
            hdDownloadBtn,
            hdStatus
        );

        result.classList.remove("hidden");

        console.log("[RAMBO FBDL] Video loaded successfully.");

    } catch (error) {

        console.error(
            "[RAMBO FBDL] Fetch error:",
            error
        );

        let message = error.message;

        if (error.name === "AbortError") {

            message =
                "Request timed out. Please try again.";

        } else if (
            error instanceof TypeError
        ) {

            message =
                "Network error. Check your internet connection and API deployment.";

        }

        alert("Failed to fetch: " + message);

    } finally {

        clearTimeout(timeout);

        showFetchLoading(false);
    }
}


// ==========================================
// UPDATE QUALITY UI
// ==========================================

function updateQualityUI(
    type,
    url,
    inputEl,
    copyBtn,
    downloadBtn,
    statusEl
) {

    const card = document.querySelector("." + type);

    if (url) {

        inputEl.value = url;

        copyBtn.disabled = false;
        downloadBtn.disabled = false;

        statusEl.textContent = "Available";

        statusEl.style.background =
            "rgba(46,224,106,0.12)";

        statusEl.style.color = "#b8ffcf";

        card?.classList.remove("disabled");

    } else {

        inputEl.value = "";

        copyBtn.disabled = true;
        downloadBtn.disabled = true;

        statusEl.textContent = "Unavailable";

        statusElemBackground(statusEl);

        card?.classList.add("disabled");
    }
}


// ==========================================
// STATUS BACKGROUND
// ==========================================

function statusElemBackground(element) {

    element.style.background =
        "rgba(255,82,82,0.08)";

    element.style.color = "#ffbebe";
}


// ==========================================
// COPY VIDEO URL
// ==========================================

async function copyToClipboard(txt) {

    if (!txt) {
        return flashMessage("Nothing to copy");
    }

    try {

        await navigator.clipboard.writeText(txt);

        flashMessage("Copied to clipboard");

    } catch (error) {

        console.error("Clipboard error:", error);

        flashMessage("Copy failed");
    }
}


// ==========================================
// FLASH MESSAGE
// ==========================================

function flashMessage(msg) {

    const el = document.createElement("div");

    el.className = "flash";

    el.textContent = msg;

    Object.assign(el.style, {

        position: "fixed",
        right: "20px",
        bottom: "20px",
        padding: "10px 14px",
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        borderRadius: "8px",
        zIndex: "9999"

    });

    document.body.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 2000);
}


// ==========================================
// DOWNLOAD VIDEO
// ==========================================

function startDownload(videoUrl) {

    if (!videoUrl) {

        alert("This quality is unavailable.");

        return;
    }

    const filename = currentTitle || "facebook-video";

    const downloadUrl =
        `${DOWNLOAD_API}?url=${encodeURIComponent(videoUrl)}` +
        `&filename=${encodeURIComponent(filename)}`;

    console.log(
        "[RAMBO FBDL] Download:",
        downloadUrl
    );

    window.open(downloadUrl, "_blank");
}


// ==========================================
// SANITIZE FILENAME
// ==========================================

function sanitizeFilename(name) {

    return String(name)

        .replace(/[\/\\?%*:|"<>]/g, "_")

        .replace(/[\x00-\x1f]/g, "")

        .trim()

        .slice(0, 100) || "facebook-video";
}


// ==========================================
// INITIALIZATION
// ==========================================

console.log(
    "%c RAMBO FBDL READY ",
    "background:#ff4ffd;color:#fff;padding:8px;font-weight:bold;"
);
