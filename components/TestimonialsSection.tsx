'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, TechCorp',
      content: 'AI CyberSec detected and prevented a major ransomware attack before it could spread. Their AI-powered threat detection is incredible!',
      rating: 5,
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      role: 'Security Director, FinanceHub',
      content: 'We\'ve reduced security incidents by 95% since implementing their solution. The AI learns and adapts to new threats continuously.',
      rating: 5,
      avatar: 'MC',
    },
    {
      name: 'Emily Rodriguez',
      role: 'CEO, StartupXYZ',
      content: 'As a startup, we needed enterprise-grade security at a reasonable price. AI CyberSec delivered exactly that with exceptional support.',
      rating: 5,
      avatar: 'ER',
    },
    {
      name: 'David Park',
      role: 'CISO, Global Retail Inc',
      content: 'The automated incident response has saved us countless hours. Their AI handles most threats without requiring manual intervention.',
      rating: 5,
      avatar: 'DP',
    },
    {
      name: 'Lisa Thompson',
      role: 'IT Manager, HealthTech',
      content: 'Compliance management is so much easier now. The automated reporting and audit trails have streamlined our SOC 2 certification process.',
      rating: 5,
      avatar: 'LT',
    },
    {
      name: 'James Wilson',
      role: 'Founder, CloudStart',
      content: 'Best security investment we\'ve made. The penetration testing alone would cost more than their entire annual subscription.',
      rating: 5,
      avatar: 'JW',
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our clients say about our AI-powered security solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glass border-white/10 hover:border-cyber-blue/30 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6">{testimonial.content}</p>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
