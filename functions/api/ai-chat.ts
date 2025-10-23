// Cloudflare AI Worker for security chatbot
// Uses Cloudflare Workers AI to answer cybersecurity questions

interface Env {
  AI: any
  KV: KVNamespace
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  try {
    const body = await request.json() as {
      message: string
      conversationId?: string
    }

    if (!body.message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Rate limiting
    const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown'
    const rateKey = `chat_rate:${clientIp}`
    const attempts = await env.KV.get(rateKey)

    if (attempts && parseInt(attempts) > 20) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    await env.KV.put(rateKey, String((parseInt(attempts || '0') + 1)), {
      expirationTtl: 3600,
    })

    // Load conversation history if available
    let conversationHistory = []
    if (body.conversationId) {
      const history = await env.KV.get(`conversation:${body.conversationId}`)
      if (history) {
        conversationHistory = JSON.parse(history)
      }
    }

    // System prompt for cybersecurity assistant
    const systemPrompt = `You are an expert AI cybersecurity assistant. You help users understand security concepts, best practices, and potential threats. Provide accurate, helpful, and actionable advice. Keep responses concise but informative.`

    // Build messages array
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: body.message },
    ]

    // Call Cloudflare AI
    const aiResponse = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
      messages,
      max_tokens: 500,
    })

    const assistantMessage = aiResponse.response || 'I apologize, but I could not generate a response. Please try again.'

    // Update conversation history
    const newConversationId = body.conversationId || crypto.randomUUID()
    conversationHistory.push(
      { role: 'user', content: body.message },
      { role: 'assistant', content: assistantMessage }
    )

    // Keep only last 10 messages
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10)
    }

    await env.KV.put(
      `conversation:${newConversationId}`,
      JSON.stringify(conversationHistory),
      { expirationTtl: 3600 }
    )

    return new Response(
      JSON.stringify({
        success: true,
        message: assistantMessage,
        conversationId: newConversationId,
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
    console.error('AI chat error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to process your message',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
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
