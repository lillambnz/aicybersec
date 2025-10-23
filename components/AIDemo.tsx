'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, Terminal, Shield, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export function AIDemo() {
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const runThreatAnalysis = async () => {
    setAnalyzing(true)
    setResult(null)

    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        threatLevel: 'High',
        threats: [
          { type: 'SQL Injection', severity: 'Critical', blocked: true },
          { type: 'XSS Attack', severity: 'High', blocked: true },
          { type: 'CSRF Token Missing', severity: 'Medium', blocked: true },
        ],
        recommendations: [
          'Input validation implemented',
          'Content Security Policy enforced',
          'Rate limiting activated',
        ],
      })
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <section id="demo" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See AI in <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience our AI-powered security tools live
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="threat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass">
              <TabsTrigger value="threat">Threat Analysis</TabsTrigger>
              <TabsTrigger value="chat">Security Assistant</TabsTrigger>
              <TabsTrigger value="scan">Vulnerability Scan</TabsTrigger>
            </TabsList>

            <TabsContent value="threat" className="mt-6">
              <Card className="glass border-cyber-blue/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-6 w-6 text-cyber-blue mr-2" />
                    AI Threat Analysis
                  </CardTitle>
                  <CardDescription>
                    Our AI analyzes incoming traffic for malicious patterns and threats
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="glass p-4 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Sample Traffic Log</span>
                      <Terminal className="h-4 w-4 text-cyber-blue" />
                    </div>
                    <pre className="text-xs text-green-400 font-mono overflow-x-auto">
{`POST /api/users HTTP/1.1
Content-Type: application/json
{"username": "admin' OR '1'='1", "password": "test"}

GET /search?q=<script>alert('XSS')</script>
Cookie: session=abc123; admin=true`}
                    </pre>
                  </div>

                  <Button
                    variant="cyber"
                    className="w-full"
                    onClick={runThreatAnalysis}
                    disabled={analyzing}
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      'Run AI Analysis'
                    )}
                  </Button>

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="glass p-4 rounded-lg border border-red-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-semibold text-red-400">Threat Level: {result.threatLevel}</span>
                          <Shield className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="space-y-2">
                          {result.threats.map((threat: any, i: number) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                              <span className="text-gray-300">{threat.type}</span>
                              <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                                {threat.severity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="glass p-4 rounded-lg border border-green-500/30">
                        <div className="font-semibold text-green-400 mb-2">AI Recommendations</div>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec: string, i: number) => (
                            <li key={i} className="text-sm text-gray-400 flex items-center">
                              <div className="h-1.5 w-1.5 bg-green-400 rounded-full mr-2"></div>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="mt-6">
              <Card className="glass border-cyber-blue/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-6 w-6 text-cyber-purple mr-2" />
                    AI Security Assistant
                  </CardTitle>
                  <CardDescription>
                    Ask our AI assistant about cybersecurity best practices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="glass p-4 rounded-lg border border-white/10 min-h-[300px] flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <Brain className="h-12 w-12 mx-auto mb-4 text-cyber-purple animate-pulse" />
                        <p>AI Chat Assistant</p>
                        <p className="text-sm mt-2">Coming soon with Cloudflare AI Workers</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Ask about security best practices..."
                        className="flex-1 glass border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyber-purple/50"
                      />
                      <Button variant="cyber">Send</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scan" className="mt-6">
              <Card className="glass border-cyber-blue/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-6 w-6 text-cyber-pink mr-2" />
                    Vulnerability Scanner
                  </CardTitle>
                  <CardDescription>
                    Scan your website for security vulnerabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="url"
                      placeholder="https://example.com"
                      className="w-full glass border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyber-pink/50"
                    />
                    <Button variant="cyber" className="w-full">
                      Start Security Scan
                    </Button>
                    <div className="glass p-4 rounded-lg border border-white/10 min-h-[200px] flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <Shield className="h-12 w-12 mx-auto mb-4 text-cyber-pink animate-pulse" />
                        <p>Enter a URL to scan for vulnerabilities</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
