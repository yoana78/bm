// TEMP DEBUG ENDPOINT — remove after diagnosing product id mismatch bug
export async function onRequestGet(context) {
  const { env } = context;
  const rows = await env.DB.prepare('SELECT id, json_extract(data, "$.id") as jid FROM products LIMIT 5').all();
  const detail = rows.results.map(r => ({
    id: r.id,
    jid: r.jid,
    idLen: r.id.length,
    jidLen: (r.jid || '').length,
    idCodes: Array.from(r.id).map(c => c.codePointAt(0)),
    jidCodes: Array.from(r.jid || '').map(c => c.codePointAt(0)),
    equal: r.id === r.jid
  }));
  return Response.json(detail);
}
