import { requireAdmin } from '../_auth.js';

// POST /api/translate — 한글 텍스트를 영어로 자동 번역 (관리자 전용).
// 어드민 폼에서 영문 항목을 비워두면, 저장 시 이 엔드포인트로 한글 값을 보내 영문을 채운다.
export async function onRequestPost(context) {
  const unauthorized = requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env } = context;
  const { text } = await context.request.json();
  if (!text || !text.trim()) {
    return Response.json({ translated: '' });
  }

  try {
    const result = await env.AI.run('@cf/meta/m2m100-1.2b', {
      text: text.trim(),
      source_lang: 'korean',
      target_lang: 'english'
    });
    return Response.json({ translated: (result.translated_text || '').trim(), _debug: result });
  } catch (err) {
    return Response.json({ error: '번역 실패', detail: String(err) }, { status: 500 });
  }
}
