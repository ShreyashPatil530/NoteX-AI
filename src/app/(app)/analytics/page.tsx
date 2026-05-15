'use client';

import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  Activity, 
  Calendar,
  TrendingUp,
  Brain,
  Hash,
  StickyNote
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/notes');
        const notes = res.data;
        
        // Simple analytics logic
        const tagMap: any = {};
        notes.flatMap((n: any) => n.tags).forEach((t: string) => {
          tagMap[t] = (tagMap[t] || 0) + 1;
        });

        const topTags = Object.entries(tagMap)
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 5);

        setStats({
          totalNotes: notes.length,
          aiProcessed: notes.filter((n: any) => n.aiInsights).length,
          totalTags: Object.keys(tagMap).length,
          topTags,
          publicNotes: notes.filter((n: any) => n.isPublic).length,
        });
      } catch (err) {
        console.error('Failed to fetch analytics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Workspace Analytics</h1>
        <p className="text-text-secondary">Get insights into your productivity and AI usage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Notes', value: stats.totalNotes, icon: StickyNote, color: 'text-primary' },
          { label: 'AI Powered', value: stats.aiProcessed, icon: Brain, color: 'text-secondary' },
          { label: 'Total Tags', value: stats.totalTags, icon: Hash, color: 'text-emerald-400' },
          { label: 'Publicly Shared', value: stats.publicNotes, icon: Activity, color: 'text-orange-400' },
        ].map((item, idx) => (
          <div key={idx} className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div>
                <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">{item.label}</p>
                <h3 className="text-2xl font-bold text-white">{item.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tag Distribution */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <PieChart className="text-primary" size={20} />
            Top Tags
          </h3>
          <div className="space-y-4">
            {stats.topTags.map(([tag, count]: any, idx: number) => (
              <div key={tag} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">#{tag}</span>
                  <span className="text-white font-medium">{count} notes</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / stats.totalNotes) * 100}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity (Placeholder) */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="text-secondary" size={20} />
            Weekly Activity
          </h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {[40, 70, 45, 90, 65, 30, 50].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  className="w-full bg-gradient-to-t from-secondary/20 to-secondary rounded-t-lg"
                />
                <span className="text-[10px] text-text-secondary uppercase">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Efficiency Card */}
      <div className="glass-card p-10 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-primary/20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 text-primary">
            <TrendingUp size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">You're 45% more efficient!</h2>
          <p className="text-text-secondary leading-relaxed mb-8">
            Based on your AI usage and note organization, you've saved approximately <strong>12 hours</strong> this month 
            by using automated summaries and action items. Keep it up!
          </p>
          <div className="flex justify-center gap-4">
            <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-text-secondary mb-1">Time Saved</p>
              <p className="text-xl font-bold text-white">12.4 hrs</p>
            </div>
            <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-text-secondary mb-1">Insights Generated</p>
              <p className="text-xl font-bold text-white">{stats.aiProcessed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
