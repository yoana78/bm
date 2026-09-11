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
    const result = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: [
        {
          role: 'system',
          content: 'You are a translation engine, not a copywriter. You only ever output a direct, literal English translation of the exact Korean text given to you. You never invent slogans, taglines, or marketing copy that is not a translation of the input. You never add information that is not present in the source text.'
        },
        { role: 'user', content: '프리미엄 펫 케어 전문브랜드' },
        { role: 'assistant', content: 'Premium pet care specialty brand' },
        { role: 'user', content: '30년 이상 축적된 정직한 기술과 신뢰' },
        { role: 'assistant', content: 'Honest technology and trust accumulated over 30 years' },
        { role: 'user', content: text.trim() }
      ],
      max_tokens: 300,
      temperature: 0
    });
    return Response.json({ translated: (result.response || '').trim() });
  } catch (err) {
    return Response.json({ error: '번역 실패', detail: String(err) }, { status: 500 });
  }
}
