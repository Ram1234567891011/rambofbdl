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

// --- Serve static frontend files ---
// Put your built frontend (index.html, bundle.js, css, assets) in backend/public
// or change 'public' to the correct folder (e.g., ../client/build)
const staticFolder = path.join(__dirname, "public");
app.use(express.static(staticFolder));

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

// SPA fallback: serve index.html for any non-API route (useful for client-side routing)
app.get("*", (req, res) => {
  // If the request is for an API path, skip fallback
  if (req.path.startsWith("/api/")) return res.status(404).send("Not found");
  res.sendFile(path.join(staticFolder, "index.html"));
});

// Use PORT from environment (Render, Heroku, etc.) or 3000 for local dev
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✔ Backend running on port ${PORT}`));
