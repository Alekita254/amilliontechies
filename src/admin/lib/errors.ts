// The API helpers throw Error(JSON.stringify(response)) on failures; turn that into a readable line.
export function errorText(err: unknown, fallback = "Something went wrong"): string {
  const raw = err instanceof Error ? err.message : String(err ?? "");
  try {
    const body = JSON.parse(raw);
    const parts = Object.entries(body.errors ?? body)
      .filter(([k]) => !["success", "status"].includes(k))
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(" ") : typeof v === "string" ? v : ""}`.trim())
      .filter((s) => !s.endsWith(":"));
    if (parts.length) return parts.join(" · ");
    if (body.message) return String(body.message);
  } catch {
    /* not JSON */
  }
  return raw || fallback;
}
