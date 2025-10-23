'use client'

import { Button } from '@/components/ui/button'
import { Shield, Zap, Lock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute h-1 w-1 bg-cyber-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-cyber-blue/30">
              <Zap className="h-4 w-4 text-cyber-blue" />
              <span className="text-sm text-gray-300">AI-Powered Security Solutions</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Protect Your Digital
              <span className="block gradient-text cyber-glow">Assets with AI</span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed">
              Next-generation cybersecurity powered by advanced AI and machine learning.
              Detect threats before they strike, automate incident response, and stay ahead
              of evolving cyber threats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cyber" size="xl" className="group">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="border-cyber-blue/50 hover:bg-cyber-blue/10">
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-cyber-blue" />
                <span className="text-sm text-gray-400">SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-cyber-blue" />
                <span className="text-sm text-gray-400">ISO 27001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-cyber-blue" />
                <span className="text-sm text-gray-400">Real-time AI</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Concentric circles */}
              <div className="absolute inset-0 rounded-full border border-cyber-blue/30 animate-pulse"></div>
              <div className="absolute inset-8 rounded-full border border-cyber-purple/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-16 rounded-full border border-cyber-pink/30 animate-pulse" style={{ animationDelay: '1s' }}></div>

              {/* Center shield */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass rounded-full p-12 border border-cyber-blue/50">
                  <Shield className="h-32 w-32 text-cyber-blue animate-float" />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-0 right-0 glass p-4 rounded-lg border border-cyber-blue/30 animate-float">
                <div className="text-cyber-blue text-2xl font-bold">99.9%</div>
                <div className="text-xs text-gray-400">Threat Detection</div>
              </div>

              <div className="absolute bottom-0 left-0 glass p-4 rounded-lg border border-cyber-purple/30 animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-cyber-purple text-2xl font-bold">&lt;1ms</div>
                <div className="text-xs text-gray-400">Response Time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
