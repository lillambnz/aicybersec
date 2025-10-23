'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$499',
      description: 'Perfect for small businesses and startups',
      features: [
        'AI Threat Detection',
        'Basic Security Monitoring',
        'Email Support',
        'Monthly Security Reports',
        'Up to 10 Users',
        'Basic Compliance Tools',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$1,999',
      description: 'Ideal for growing companies',
      features: [
        'Everything in Starter',
        '24/7 Security Operations',
        'Advanced Threat Intelligence',
        'Incident Response',
        'Penetration Testing (Quarterly)',
        'Up to 100 Users',
        'Priority Support',
        'Custom Integrations',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Dedicated Security Team',
        'Custom AI Models',
        'White-Glove Support',
        'Unlimited Users',
        'On-Premise Deployment',
        'SLA Guarantees',
        'Compliance Certification Support',
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your security needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full flex flex-col ${
                plan.popular
                  ? 'glass border-cyber-blue/50 shadow-lg shadow-cyber-blue/20 scale-105'
                  : 'glass border-white/10'
              }`}>
                {plan.popular && (
                  <div className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white text-center py-1 text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-gray-400">/month</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-cyber-blue mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.popular ? 'cyber' : 'outline'}
                    className={`w-full ${!plan.popular && 'border-cyber-blue/50'}`}
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">All plans include 30-day money-back guarantee</p>
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <Zap className="h-4 w-4 text-cyber-blue" />
            <span>Powered by Cloudflare Edge Network</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
