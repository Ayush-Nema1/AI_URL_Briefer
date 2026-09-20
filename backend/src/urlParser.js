export function parseUrl(input) {
  const url = new URL(input);

  const hostname = url.hostname.toLowerCase();
  const hostParts = hostname.split(".");
  const tld = hostParts.length > 1 ? hostParts.at(-1) : "";

  // Simple registrable-domain extraction for common domains.
  // For production-grade public-suffix handling, a PSL library can be added.
  const domain =
    hostParts.length >= 2
      ? `${hostParts.at(-2)}.${hostParts.at(-1)}`
      : hostname;

  return {
    originalUrl: url.href,
    protocol: url.protocol.replace(":", ""),
    hostname,
    domain,
    tld,
    path: url.pathname || "/",
    query: url.search ? url.search.slice(1) : "",
    fragment: url.hash ? url.hash.slice(1) : ""
  };
}
