import Link from 'next/link'
import { Shield, Twitter, Linkedin, Github, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-slate-950/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <span className="text-xl font-bold gradient-text">AI CyberSec</span>
            </div>
            <p className="text-sm text-gray-400">
              Next-generation AI-powered cybersecurity solutions protecting businesses worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">AI Threat Detection</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Penetration Testing</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Security Audits</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Incident Response</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Compliance</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Press Kit</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-cyber-blue transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-gray-400">
            © {currentYear} AI CyberSec. All rights reserved. Powered by Cloudflare.
          </p>
        </div>
      </div>
    </footer>
  )
}
