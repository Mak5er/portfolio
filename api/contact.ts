import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const text = `
📩 New Contact Message from mak5er | Portfolio

👤 Name: ${name}
📧 Email: ${email}

💬 Message:
${message}
`;

  const tgRes = await fetch(
    `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text,
      }),
    }
  );

  if (!tgRes.ok) {
    return res.status(500).json({ error: 'Failed to send message' });
  }

  res.status(200).json({ ok: true });
}
