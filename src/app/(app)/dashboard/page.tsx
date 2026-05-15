'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  StickyNote, 
  Sparkles, 
  TrendingUp, 
  Clock,
  Plus,
  ChevronRight,
  Hash
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import NoteCard from '@/components/notes/NoteCard';
import axios from 'axios';
import Link from 'next/link';

export default function DashboardPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    aiGenerated: 0,
    tags: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/api/notes');
        setNotes(res.data.slice(0, 3)); // Only show latest 3
        setStats({
          total: res.data.length,
          aiGenerated: res.data.filter((n: any) => n.aiInsights).length,
          tags: new Set(res.data.flatMap((n: any) => n.tags)).size,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-text-secondary text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-xs text-emerald-400 font-medium">
        <TrendingUp size={14} />
        <span>+12% from last month</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Shreyash</h1>
          <p className="text-text-secondary">Here's what's happening with your workspace today.</p>
        </div>
        <Link href="/notes">
          <Button variant="gradient" className="gap-2">
            <Plus size={20} />
            <span>Create New Note</span>
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Notes" value={stats.total} icon={StickyNote} color="text-primary" />
        <StatCard title="AI Insights" value={stats.aiGenerated} icon={Sparkles} color="text-secondary" />
        <StatCard title="Total Tags" value={stats.tags} icon={Hash} color="text-emerald-400" />
      </div>

      {/* Recent Notes */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            Recent Notes
          </h2>
          <Link href="/notes" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
            View all notes <ChevronRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 h-48 animate-pulse bg-white/5"></div>
            ))}
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notes.map((note: any) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center border-dashed border-white/10">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <StickyNote className="text-text-secondary" size={32} />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No notes yet</h3>
            <p className="text-text-secondary mb-6">Start your journey by creating your first AI-powered note.</p>
            <Link href="/notes">
              <Button variant="outline">Create your first note</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Pro Tip Card */}
      <div className="glass-card p-8 bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
        <div className="flex items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <Sparkles size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Unlock AI Superpowers</h3>
            <p className="text-text-secondary mb-4 max-w-2xl">
              Did you know you can summarize long meetings or articles in seconds? 
              Just paste your content and click "Generate AI Insights" to get summaries and action items.
            </p>
            <Button variant="secondary" size="sm">Try it now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
