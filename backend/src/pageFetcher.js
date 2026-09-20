import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchPublicPage(url) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      maxRedirects: 5,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; WebBrief/1.0)"
      },
      validateStatus: (status) => status >= 200 && status < 400
    });

    const contentType = String(response.headers["content-type"] || "");
    if (!contentType.includes("text/html")) {
      return {
        status: "limited",
        text: "",
        title: "",
        finalUrl: response.request?.res?.responseUrl || url,
        note: "The URL did not return normal HTML content."
      };
    }

    const $ = cheerio.load(response.data);
    $("script, style, noscript, svg").remove();

    const title = $("title").first().text().trim();
    const text = $("body").text().replace(/\s+/g, " ").trim();

    return {
      status: "success",
      title,
      text: text.slice(0, 18000),
      finalUrl: response.request?.res?.responseUrl || url,
      note: "Public HTML was fetched successfully."
    };
  } catch (error) {
    return {
      status: "limited",
      text: "",
      title: "",
      finalUrl: url,
      note: "The page could not be fetched publicly. It may require login, JavaScript rendering, cookies, or may block automated requests."
    };
  }
}
