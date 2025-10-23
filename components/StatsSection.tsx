'use client'

import { Shield, Users, Globe, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export function StatsSection() {
  const stats = [
    { icon: Shield, label: 'Threats Blocked', value: '10M+', color: 'text-cyber-blue' },
    { icon: Users, label: 'Protected Users', value: '500K+', color: 'text-cyber-purple' },
    { icon: Globe, label: 'Countries Served', value: '150+', color: 'text-cyber-pink' },
    { icon: Award, label: 'Industry Awards', value: '25+', color: 'text-cyan-400' },
  ]

  return (
    <section className="py-16 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-2"
            >
              <stat.icon className={`h-8 w-8 mx-auto ${stat.color}`} />
              <div className={`text-4xl md:text-5xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
