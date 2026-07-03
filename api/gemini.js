// /api/gemini.js
// Serverless function (runs on Vercel, not in the browser).
// Holds the real Gemini API key as a secret env var so no user ever sees it.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    return res.status(500).json({ error: 'Server missing GEMINI_API_KEY' });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing "prompt" string in request body' });
  }

  // Basic abuse guard: cap prompt size
  if (prompt.length > 8000) {
    return res.status(400).json({ error: 'Prompt too long' });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    // Read as raw text first so we never crash on a non-JSON response (e.g. HTML error pages)
    const rawBody = await geminiRes.text();

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (parseErr) {
      console.error('Gemini returned non-JSON response. Status:', geminiRes.status, 'Body (first 500 chars):', rawBody.slice(0, 500));
      return res.status(502).json({
        error: `Gemini returned a non-JSON response (status ${geminiRes.status}). This usually means the API key or endpoint is invalid.`,
      });
    }

    if (!geminiRes.ok) {
      console.error('Gemini API error:', JSON.stringify(data));
      return res.status(geminiRes.status).json({ error: data?.error?.message || 'Gemini request failed' });
    }

    const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
    return res.status(200).json({ text });
  } catch (err) {
    console.error('Unhandled error calling Gemini:', err?.message || err);
    return res.status(500).json({ error: 'Server error calling Gemini: ' + (err?.message || 'unknown') });
  }
}
