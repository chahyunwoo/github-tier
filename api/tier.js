export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const username = url.searchParams.get("user");

  if (!username) {
    return new Response(JSON.stringify({ error: "Missing user" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, username }), {
    headers: { "Content-Type": "application/json" },
  });
}
