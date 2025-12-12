
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
