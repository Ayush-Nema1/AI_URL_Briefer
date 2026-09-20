import axios from "axios";
import * as cheerio from "cheerio";

export async function searchFallback(urlInfo) {
  const pathWords = decodeURIComponent(urlInfo.path)
    .replace(/^\/+|\/+$/g, "")
    .replace(/[-_\/]+/g, " ")
    .trim();
  const query = `${urlInfo.domain} ${pathWords}`.trim();

  try {
    const response = await axios.get("https://html.duckduckgo.com/html/", {
      params: { q: query },
      timeout: 8000,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; WebBrief/1.0)" }
    });
    const $ = cheerio.load(response.data);
    const results = $(".result").slice(0, 5).map((_, el) => ({
      title: $(el).find(".result__title").text().replace(/\s+/g, " ").trim(),
      snippet: $(el).find(".result__snippet").text().replace(/\s+/g, " ").trim(),
      href: $(el).find(".result__a").attr("href") || ""
    })).get();
    return { ok: true, query, results };
  } catch {
    return { ok: false, query, results: [], note: "Search fallback unavailable." };
  }
}
