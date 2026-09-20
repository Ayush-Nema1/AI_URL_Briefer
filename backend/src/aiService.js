import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const key = process.env.GEMINI_API_KEY;
if (!key) throw new Error("GEMINI_API_KEY is missing.");
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({
  model: "gemini-3.7-flash"
});
export async function analyzeWebsite(urlInfo, page, search) {
  const prompt = `
Analyze this website URL for a concise website brief.

IMPORTANT: Do not treat the raw URL as the website name. First identify the main website from the domain, then interpret the path as the requested page/section.

URL: ${urlInfo.originalUrl}
Protocol: ${urlInfo.protocol}
Hostname: ${urlInfo.hostname}
Domain: ${urlInfo.domain}
TLD: ${urlInfo.tld}
Path: ${urlInfo.path}
Query: ${urlInfo.query || "(none)"}

DIRECT PAGE DATA:
${JSON.stringify(page)}

SEARCH FALLBACK DATA (only used when direct fetch failed):
${JSON.stringify(search)}

Rules:
- Website Overview first.
- Website Purpose second.
- Requested Page/Section separately.
- Never replace the requested page with a login page.
- Use direct page content when available.
- If direct fetch failed, search results are only supporting public context.
- Do not invent private or personalized content.
- Check the full URL for HTTPS, spelling, domain consistency, lookalike domains, unusual subdomains/path/query.
- HTTPS alone does not prove genuine or safe.
- If exact page content cannot be verified, say so.

Return ONLY JSON:
{
  "websiteOverview":"",
  "websitePurpose":"",
  "requestedPage":{"name":"","purpose":"","summary":""},
  "keyPoints":[],
  "contentType":"",
  "targetAudience":[],
  "topics":[],
  "trust":{"label":"","positiveSignals":[],"cautions":[]},
  "advice":[],
  "limitations":[]
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const cleaned = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned);
}
