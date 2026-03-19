export async function fetchAvatarBase64(url: string): Promise<string> {
  try {
    const res = await fetch(`${url}&s=96`, { next: { revalidate: 86400 } });
    if (!res.ok) return "";

    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = res.headers.get("content-type") ?? "image/png";

    return `data:${contentType};base64,${base64}`;
  } catch {
    return "";
  }
}
