'use client'

import { Zap, Shield, Eye, RefreshCw, TrendingUp, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Real-Time Protection',
      description: 'AI models process millions of events per second to detect and block threats instantly.',
    },
    {
      icon: Eye,
      title: 'Predictive Intelligence',
      description: 'Machine learning predicts attack patterns before they materialize.',
    },
    {
      icon: Shield,
      title: 'Zero Trust Architecture',
      description: 'Never trust, always verify with continuous authentication and authorization.',
    },
    {
      icon: RefreshCw,
      title: 'Automated Response',
      description: 'AI-driven playbooks automatically contain and remediate security incidents.',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Our AI models evolve and improve with every threat encountered.',
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'Military-grade encryption protecting data at rest and in transit.',
    },
  ]

  return (
    <section id="features" className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">AI CyberSec</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Advanced features powered by cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg border border-white/10 hover:border-cyber-blue/50 transition-all group"
            >
              <div className="flex items-start space-x-4">
                <div className="glass p-3 rounded-lg border border-cyber-blue/30 group-hover:border-cyber-blue/70 transition-all">
                  <feature.icon className="h-6 w-6 text-cyber-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
