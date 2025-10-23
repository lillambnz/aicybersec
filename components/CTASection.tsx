'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with Cloudflare Workers to handle form submission
    setSubmitted(true)
    setTimeout(() => {
      setEmail('')
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-2xl border border-cyber-blue/30 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to <span className="gradient-text">Secure Your Business?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies protecting their digital assets with AI-powered cybersecurity
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full glass border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50"
                  />
                </div>
                <Button type="submit" variant="cyber" size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-4 rounded-lg border border-green-500/30 max-w-md mx-auto mb-8"
              >
                <p className="text-green-400">Thank you! We'll be in touch shortly.</p>
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-cyber-blue" />
                Schedule a demo
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-cyber-blue" />
                contact@aicybersec.com
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-gray-400 mb-4">Trusted by leading companies worldwide</p>
              <div className="flex flex-wrap justify-center gap-8 opacity-50">
                {['TechCorp', 'FinanceHub', 'CloudStart', 'HealthTech', 'RetailCo'].map((company) => (
                  <div key={company} className="text-gray-500 font-semibold">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
