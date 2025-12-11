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


//////// add


// Serve static files (HTML, CSS, JS) from root folder
app.use(express.static(__dirname));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/////// add




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


// server.js (ES module)
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

// Serve static files (HTML, CSS, JS) from repo root
app.use(express.static(path.join(__dirname)));

// Homepage (useful for SPA or direct index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

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
      headers: {
        // optional: set a user-agent to reduce chance of blocking
        "User-Agent": "Mozilla/5.0 (compatible; Node.js server)"
      },
    });

    res.setHeader("Content-Disposition", `attachment; filename="${filename || "video.mp4"}"`);
    res.setHeader("Content-Type", "video/mp4");

    response.data.pipe(res);
  } catch (err) {
    console.error("Download error:", err?.message || err);
    res.status(500).send("Download failed");
  }
});

// Use Render or environment port if provided
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✔ Backend running on port ${PORT}`));
