type PagesFunction<Env = unknown> = (context: {
  request: Request;
  env: Env;
}) => Response | Promise<Response>;

interface Env {
  BOT_TOKEN: string;
  CHAT_ID: string;
}

const jsonResponse = (status: number, payload: Record<string, unknown>) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json',
    },
  });

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.BOT_TOKEN || !env.CHAT_ID) {
    return jsonResponse(500, { ok: false, error: 'Missing Telegram env vars.' });
  }

  const contentType = request.headers.get('content-type') || '';
  let body: { name?: string; email?: string; message?: string } | undefined;

  if (contentType.includes('application/json')) {
    const raw = await request.text();
    if (raw.trim().length === 0) {
      body = {};
    } else {
      try {
        body = JSON.parse(raw);
      } catch {
        return jsonResponse(400, { ok: false, error: 'Invalid JSON.' });
      }
    }
  } else if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const form = await request.formData();
    const data: Record<string, string> = {};
    form.forEach((value, key) => {
      data[key] = typeof value === 'string' ? value : value.name;
    });
    body = data;
  } else {
    const raw = await request.text();
    if (raw.trim().length === 0) {
      body = {};
    } else {
      try {
        body = JSON.parse(raw);
      } catch {
        const params = new URLSearchParams(raw);
        const data: Record<string, string> = {};
        params.forEach((value, key) => {
          data[key] = value;
        });
        body = data;
      }
    }
  }

  const name = (body?.name || '').toString().trim();
  const email = (body?.email || '').toString().trim();
  const message = (body?.message || '').toString().trim();

  if (!name || !email || !message) {
    return jsonResponse(400, { ok: false, error: 'All fields are required.' });
  }

  const text =
    `📧 New message from contact form\n\n` +
    `👤 Name: ${name}\n` +
    `📬 Email: ${email}\n` +
    `💬 Message: ${message}`;

  const telegramRes = await fetch(
    `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.CHAT_ID,
        text,
      }),
    },
  );

  if (!telegramRes.ok) {
    const errorText = await telegramRes.text();
    return jsonResponse(502, {
      ok: false,
      error: 'Telegram API error.',
      details: errorText,
    });
  }

  return jsonResponse(200, { ok: true });
};

export const onRequest: PagesFunction<Env> = () =>
  jsonResponse(405, { ok: false, error: 'Method not allowed.' });
