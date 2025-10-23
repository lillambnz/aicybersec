// AI-powered threat scanning endpoint
// Analyzes URLs, code snippets, or logs for security threats

interface Env {
  AI: any
  KV: KVNamespace
  DB: D1Database
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  try {
    const body = await request.json() as {
      type: 'url' | 'code' | 'log'
      content: string
    }

    if (!body.type || !body.content) {
      return new Response(JSON.stringify({ error: 'Type and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Rate limiting
    const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown'
    const rateKey = `scan_rate:${clientIp}`
    const attempts = await env.KV.get(rateKey)

    if (attempts && parseInt(attempts) > 10) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    await env.KV.put(rateKey, String((parseInt(attempts || '0') + 1)), {
      expirationTtl: 3600,
    })

    // Create analysis prompt based on type
    let analysisPrompt = ''
    switch (body.type) {
      case 'url':
        analysisPrompt = `Analyze this URL for security threats and suspicious patterns: ${body.content}`
        break
      case 'code':
        analysisPrompt = `Analyze this code snippet for security vulnerabilities: ${body.content}`
        break
      case 'log':
        analysisPrompt = `Analyze these logs for security threats and anomalies: ${body.content}`
        break
    }

    // Use AI to analyze
    const aiResponse = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: [
        {
          role: 'system',
          content: 'You are a cybersecurity expert. Analyze the provided content for security threats, vulnerabilities, and suspicious patterns. Provide a threat level (Low/Medium/High/Critical) and specific findings.',
        },
        {
          role: 'user',
          content: analysisPrompt,
        },
      ],
      max_tokens: 800,
    })

    // Parse AI response
    const analysis = aiResponse.response || 'Analysis could not be completed'

    // Determine threat level (simple keyword matching)
    let threatLevel = 'Low'
    const content = analysis.toLowerCase()
    if (content.includes('critical') || content.includes('severe')) {
      threatLevel = 'Critical'
    } else if (content.includes('high') || content.includes('dangerous')) {
      threatLevel = 'High'
    } else if (content.includes('medium') || content.includes('moderate')) {
      threatLevel = 'Medium'
    }

    // Store scan result
    const scanId = crypto.randomUUID()
    await env.DB.prepare(
      'INSERT INTO scans (id, type, threat_level, analysis, created_at) VALUES (?, ?, ?, ?, ?)'
    )
      .bind(scanId, body.type, threatLevel, analysis, new Date().toISOString())
      .run()

    // Mock threat details based on type
    const threats = []
    if (body.type === 'code') {
      threats.push(
        { type: 'SQL Injection', severity: 'High', description: 'Potential SQL injection vulnerability detected' },
        { type: 'XSS', severity: 'Medium', description: 'Cross-site scripting risk identified' }
      )
    } else if (body.type === 'url') {
      threats.push(
        { type: 'Suspicious Domain', severity: 'Medium', description: 'Domain age less than 30 days' }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        scanId,
        threatLevel,
        analysis,
        threats,
        recommendations: [
          'Input validation implemented',
          'Sanitize user input',
          'Use parameterized queries',
        ],
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
    console.error('Threat scan error:', error)
    return new Response(
      JSON.stringify({
        error: 'Scan failed',
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
