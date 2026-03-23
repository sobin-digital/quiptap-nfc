export function normalizeLinkUrl(input: string, network: string) {
  const v = input.trim();
  if (!v) return null;

  // If they provided a URL, keep it.
  if (v.startsWith("http://") || v.startsWith("https://")) return v;

  // If they provided "@handle", convert to a profile URL.
  if (v.startsWith("@")) {
    const handle = v.slice(1);
    return network === "twitter"
      ? `https://twitter.com/${encodeURIComponent(handle)}`
      : network === "instagram"
        ? `https://instagram.com/${encodeURIComponent(handle)}`
        : network === "linkedin"
          ? `https://www.linkedin.com/in/${encodeURIComponent(handle)}`
          : null;
  }

  // Otherwise treat it as a handle or path segment.
  return network === "twitter"
    ? `https://twitter.com/${encodeURIComponent(v)}`
    : network === "instagram"
      ? `https://instagram.com/${encodeURIComponent(v)}`
      : network === "linkedin"
        ? `https://www.linkedin.com/in/${encodeURIComponent(v)}`
        : null;
}

