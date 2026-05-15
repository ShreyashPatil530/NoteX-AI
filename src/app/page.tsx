'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  StickyNote, 
  Sparkles, 
  Share2, 
  Shield, 
  Zap, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-nav px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <StickyNote className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">NoteX <span className="text-primary">AI</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="gradient" size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none opacity-50"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary mb-8"
          >
            <Sparkles size={16} />
            <span>AI-Powered Workspace is here</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight"
          >
            Your Second Brain, <br />
            <span className="gradient-text">Enhanced by AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-12"
          >
            NoteX AI is a modern workspace where your thoughts meet intelligence. 
            Organize, summarize, and collaborate like never before.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto gap-2">
                Start Writing Free <ArrowRight size={20} />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Demo
            </Button>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 relative"
          >
            <div className="glass-card p-4 max-w-5xl mx-auto overflow-hidden">
              <div className="bg-[#0B0F19] rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                  alt="Dashboard Preview" 
                  className="w-full opacity-80"
                />
              </div>
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-t from-[#0B0F19] to-transparent z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Supercharge your workflow</h2>
            <p className="text-text-secondary">Everything you need to manage your notes at scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Insights",
                desc: "Automatically summarize notes and extract action items using state-of-the-art AI.",
                icon: Sparkles,
                color: "text-purple-400"
              },
              {
                title: "Public Sharing",
                desc: "Share your notes with the world via unique links. Perfect for collaboration.",
                icon: Share2,
                color: "text-cyan-400"
              },
              {
                title: "Secure by Default",
                desc: "Your data is encrypted and secure. Only you have access to your private notes.",
                icon: Shield,
                color: "text-emerald-400"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="glass-card p-8 text-left"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-br from-primary/20 to-secondary/20 p-12 text-center border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to upgrade your notes?</h2>
            <p className="text-text-secondary mb-10 max-w-xl mx-auto">
              Join 10,000+ users who are already using NoteX AI to organize their thoughts.
            </p>
            <Link href="/signup">
              <Button variant="gradient" size="lg">Get Started for Free</Button>
            </Link>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <StickyNote className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">NoteX AI</span>
          </div>
          
          <div className="text-text-secondary text-sm">
            © 2026 NoteX AI. All rights reserved. Built for the future of productivity.
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-text-secondary hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-text-secondary hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-text-secondary hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
