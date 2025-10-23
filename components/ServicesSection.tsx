'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, Shield, Lock, Search, AlertTriangle, Server, Code, FileSearch } from 'lucide-react'
import { motion } from 'framer-motion'

export function ServicesSection() {
  const services = [
    {
      icon: Brain,
      title: 'AI Threat Detection',
      description: 'Machine learning algorithms that identify and neutralize threats in real-time with 99.9% accuracy.',
      features: ['Real-time monitoring', 'Behavioral analysis', 'Zero-day detection'],
    },
    {
      icon: Shield,
      title: 'Managed Security',
      description: '24/7 security operations center protecting your infrastructure with AI-powered automation.',
      features: ['24/7 SOC monitoring', 'Incident response', 'Threat hunting'],
    },
    {
      icon: Search,
      title: 'Penetration Testing',
      description: 'AI-enhanced penetration testing to discover vulnerabilities before attackers do.',
      features: ['Web app testing', 'Network scanning', 'Social engineering'],
    },
    {
      icon: Lock,
      title: 'Security Audits',
      description: 'Comprehensive security assessments using AI to analyze your entire digital footprint.',
      features: ['Compliance audits', 'Risk assessment', 'Security posture'],
    },
    {
      icon: AlertTriangle,
      title: 'Incident Response',
      description: 'Rapid incident response team with AI-assisted forensics and remediation.',
      features: ['Forensic analysis', 'Malware removal', 'Recovery planning'],
    },
    {
      icon: Server,
      title: 'Cloud Security',
      description: 'Secure your cloud infrastructure across AWS, Azure, GCP with AI-powered monitoring.',
      features: ['Cloud config audit', 'Container security', 'IAM management'],
    },
    {
      icon: Code,
      title: 'Secure Code Review',
      description: 'AI-powered static and dynamic code analysis to identify security vulnerabilities.',
      features: ['SAST/DAST scanning', 'Dependency checks', 'Code recommendations'],
    },
    {
      icon: FileSearch,
      title: 'Compliance Management',
      description: 'Automated compliance monitoring for SOC 2, ISO 27001, GDPR, and more.',
      features: ['Automated reporting', 'Policy enforcement', 'Audit trails'],
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive AI-powered cybersecurity solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glass border-cyber-blue/20 hover:border-cyber-blue/50 transition-all group">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-cyber-blue mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-400">
                        <div className="h-1.5 w-1.5 bg-cyber-blue rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full mt-4 text-cyber-blue hover:text-cyber-blue">
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
