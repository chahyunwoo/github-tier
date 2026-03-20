export async function fetchAvatarBase64(url: string): Promise<string> {
  try {
    const avatarUrl = new URL(url);
    avatarUrl.searchParams.set("s", "96");

    const res = await fetch(avatarUrl.toString(), {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return "";

    const buffer = await res.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    const contentType = res.headers.get("content-type") ?? "image/png";

    return `data:${contentType};base64,${base64}`;
  } catch {
    return "";
  }
}
