// Full working FB Fetch & Downloader

/*
// ------------------ BACKEND ------------------
// backend/server.js
import express from "express";
import cors from "cors";
import getFBInfo from "@xaviabot/fb-downloader";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

// backend/server.js
import express from "express";
import cors from "cors";
import getFBInfo from "@xaviabot/fb-downloader";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// If your index.html and static files are in the repo root (one folder above backend/),
// serve files from parent directory. If your static files are inside backend/, change '..' to '.' or 'public'.
const STATIC_ROOT = path.join(__dirname, ".."); // <-- serves repo root
// const STATIC_ROOT = path.join(__dirname, "public"); // <-- alternative if files are in backend/public

console.log("Static root:", STATIC_ROOT);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS) from STATIC_ROOT
app.use(express.static(STATIC_ROOT));

// Homepage — serve the index.html from STATIC_ROOT
app.get("/", (req, res) => {
  res.sendFile(path.join(STATIC_ROOT, "index.html"));
});

// (Optional) SPA fallback so client-side routing won't return 404 on refresh
app.get("*", (req, res, next) => {
  // if the request accepts html, send index.html, otherwise pass to next (so API routes still work)
  if (req.accepts && req.accepts("html")) {
    return res.sendFile(path.join(STATIC_ROOT, "index.html"));
  }
  next();
});

// Fetch FB video info
app.post("/api/fetch", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ success: false, error: "No URL provided." });

  try {
    const result = await getFBInfo(String(url).trim());
    if (!result) return res.json({ success: false, error: "No video info found." });

    res.json({
      success: true,
      title: result.title || "video",
      thumbnail: result.thumbnail || "",
      sd: result.sd || null,
      hd: result.hd || null
    });
  } catch (err) {
    console.error("Fetch error:", err?.message || err);
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
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Node.js server)"
      },
      timeout: 30000
    });

    res.setHeader("Content-Disposition", `attachment; filename="${filename || "video.mp4"}"`);
    res.setHeader("Content-Type", "video/mp4");

    response.data.pipe(res);
  } catch (err) {
    console.error("Download error:", err?.message || err);
    res.status(500).send("Download failed");
  }
});

// Use Render / environment port if provided
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✔ Backend running on port ${PORT}`));
