import { requireAdmin } from '../../_auth.js';

// TEMP DEBUG — remove after diagnosing id mismatch
export async function onRequestGet(context) {
  const { env, params } = context;
  const existing = await env.DB.prepare('SELECT id FROM products WHERE id = ?').bind(params.id).first();
  return Response.json({
    paramsId: params.id,
    paramsIdCodes: Array.from(params.id).map(c => c.codePointAt(0)),
    found: !!existing
  });
}

// PUT /api/products/:id — 기존 제품 수정 (부분 업데이트, 관리자 전용)
export async function onRequestPut(context) {
  const unauthorized = requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env, params } = context;
  const updates = await context.request.json();

  const existing = await env.DB.prepare('SELECT data FROM products WHERE id = ?').bind(params.id).first();
  if (!existing) return Response.json({ error: 'Not found' }, { status: 404 });

  const merged = { ...JSON.parse(existing.data), ...updates };
  await env.DB.prepare('UPDATE products SET data = ?, updated_at = datetime(\'now\') WHERE id = ?')
    .bind(JSON.stringify(merged), params.id)
    .run();

  return Response.json({ ok: true, product: merged });
}

// DELETE /api/products/:id — 제품 삭제 (관리자 전용)
export async function onRequestDelete(context) {
  const unauthorized = requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env, params } = context;
  await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(params.id).run();
  return Response.json({ ok: true });
}
