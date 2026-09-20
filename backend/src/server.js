import "dotenv/config";
import express from "express";
import cors from "cors";
import { parseUrl } from "./urlParser.js";
import { fetchPublicPage } from "./pageFetcher.js";
import { analyzeWebsite } from "./aiService.js";
import { searchFallback } from "./searchFallback.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required." });
    }

    let urlInfo;
    try {
      urlInfo = parseUrl(url);
    } catch {
      return res.status(400).json({ message: "Please enter a valid URL." });
    }

    const page = await fetchPublicPage(urlInfo.originalUrl);
    // Search is used only when direct public fetching fails.
    const search = page.ok ? { used: false, results: [] } : { used: true, ...(await searchFallback(urlInfo)) };
    const report = await analyzeWebsite(urlInfo, page, search);

    res.json({
      url: urlInfo.originalUrl,
      urlInfo,
      report
    });
} catch (error) {
  console.error(error);

  if (error?.status === 503) {
    return res.status(503).json({
      message: "AI service is currently busy. Please try again after some time.",
      busy: true
    });
  }

  res.status(500).json({
    message: error.message || "Analysis failed."
  });
}
});

app.listen(PORT, () => {
  console.log(`WebBrief backend running on http://localhost:${PORT}`);
});
