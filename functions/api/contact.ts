// Cloudflare Pages Function for handling contact form submissions
// This uses Cloudflare D1 database and sends notifications

interface Env {
  DB: D1Database
  KV: KVNamespace
  AI: any
  CONTACT_EMAIL: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  try {
    const body = await request.json() as {
      name: string
      email: string
      company?: string
      message: string
    }

    // Validate input
    if (!body.name || !body.email || !body.message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Store in D1 database
    const result = await env.DB.prepare(
      'INSERT INTO contacts (name, email, company, message, created_at) VALUES (?, ?, ?, ?, ?)'
    )
      .bind(body.name, body.email, body.company || null, body.message, new Date().toISOString())
      .run()

    // Rate limiting check using KV
    const rateKey = `rate_limit:${body.email}`
    const attempts = await env.KV.get(rateKey)

    if (attempts && parseInt(attempts) > 5) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    await env.KV.put(rateKey, String((parseInt(attempts || '0') + 1)), {
      expirationTtl: 3600, // 1 hour
    })

    // Use AI to analyze the message sentiment and urgency
    const aiResponse = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: [
        {
          role: 'system',
          content: 'Analyze this customer message and rate its urgency from 1-10 and sentiment (positive/neutral/negative). Respond in JSON format.',
        },
        {
          role: 'user',
          content: body.message,
        },
      ],
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for contacting us! We will get back to you shortly.',
        id: result.meta.last_row_id,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
