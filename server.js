// Full working FB Fetch & Downloader

/*
// ------------------ BACKEND ------------------
// backend/server.js
import express from "express";
import cors from "cors";
import getFBInfo from "@xaviabot/fb-downloader";
import axios from "axios";



const app = express();
app.use(cors());
app.use(express.json());




// Fetch FB video info
app.post("/api/fetch", async (req, res) => {
const { url } = req.body;
if (!url) return res.json({ success: false, error: "No URL provided." });


try {
const result = await getFBInfo(url);
res.json({
success: true,
title: result.title || "video",
thumbnail: result.thumbnail || "",
sd: result.sd || null,
hd: result.hd || null
});
} catch (err) {
console.error("Fetch error:", err);
res.json({ success: false, error: err?.message || "Fetch failed." });
}
});


// Download via backend proxy (avoids CORS)
app.get("/api/download", async (req, res) => {
const { url, filename } = req.query;
if (!url) return res.status(400).send("Missing video URL");


try {
const response = await axios({
url,
method: "GET",
responseType: "stream",
});


res.setHeader("Content-Disposition", `attachment; filename="${filename || "video.mp4"}"`);
res.setHeader("Content-Type", "video/mp4");


response.data.pipe(res);
} catch (err) {
console.error("Download error:", err);
res.status(500).send("Download failed");
}
});


app.listen(3000, () => console.log("✔ Backend running on port 3000"));
*/
/*

// server.js (minimal Replit-ready)
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import getFBInfo from "@xaviabot/fb-downloader";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// serve static from same dir as server.js
const staticFolder = __dirname;
app.use(express.static(staticFolder));

// API routes (same as you had)
app.post("/api/fetch", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ success: false, error: "No URL provided." });
  try {
    const result = await getFBInfo(url);
    res.json({
      success: true,
      title: result.title || "video",
      thumbnail: result.thumbnail || "",
      sd: result.sd || null,
      hd: result.hd || null
    });
  } catch (err) {
    console.error("Fetch error:", err);
    res.json({ success: false, error: err?.message || "Fetch failed." });
  }
});

app.get("/api/download", async (req, res) => {
  const { url, filename } = req.query;
  if (!url) return res.status(400).send("Missing video URL");
  try {
    const response = await axios({ url, method: "GET", responseType: "stream" });
    res.setHeader("Content-Disposition", `attachment; filename="${filename || "video.mp4"}"`);
    res.setHeader("Content-Type", "video/mp4");
    response.data.pipe(res);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("Download failed");
  }
});

// fallback serve index.html
/*app.get("/:path(.*)", (req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).send("Not found");
  res.sendFile(path.join(staticFolder, "index.html"));
});

// Serve index.html fallback (Express 5 / Node 22 compatible)
app.get('/:path(.*)', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).send('Not found');
  res.sendFile(path.join(staticFolder, 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`✔ Server running on port ${PORT}`));
*/



// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import getFBInfo from "@xaviabot/fb-downloader";
import axios from "axios";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// serve static files from current dir (where index.html is)
const staticFolder = __dirname;
app.use(express.static(staticFolder));

// API: fetch FB video info
app.post("/api/fetch", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ success: false, error: "No URL provided." });
  try {
    const result = await getFBInfo(url);
    res.json({
      success: true,
      title: result.title || "video",
      thumbnail: result.thumbnail || "",
      sd: result.sd || null,
      hd: result.hd || null
    });
  } catch (err) {
    console.error("Fetch error:", err);
    res.json({ success: false, error: err?.message || "Fetch failed." });
  }
});

// API: download proxy
app.get("/api/download", async (req, res) => {
  const { url, filename } = req.query;
  if (!url) return res.status(400).send("Missing video URL");
  try {
    const response = await axios({ url, method: "GET", responseType: "stream" });
    res.setHeader("Content-Disposition", `attachment; filename="${filename || "video.mp4"}"`);
    res.setHeader("Content-Type", "video/mp4");
    response.data.pipe(res);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("Download failed");
  }
});

/*
  SPA fallback WITHOUT using path-to-regexp route patterns.
  This middleware will serve index.html for any GET request that:
  - is not for /api/...
  - was not already handled by express.static (static files)
*/
const indexFile = path.join(staticFolder, "index.html");
app.use((req, res, next) => {
  // only handle GET (so API POST/PUT/etc still works)
  if (req.method !== "GET") return next();

  // skip API routes
  if (req.path.startsWith("/api/")) return next();

  // if requested path seems to be a file (has extension), let static or next middleware handle it
  if (path.extname(req.path)) return next();

  // serve index.html if it exists
  if (fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }

  // fallback
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`✔ Server running on port ${PORT}`));
