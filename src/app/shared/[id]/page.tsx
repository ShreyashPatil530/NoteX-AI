'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StickyNote, Calendar, User, Tag, Sparkles } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

export default function PublicNotePage() {
  const { id } = useParams();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSharedNote = async () => {
      try {
        const res = await axios.get(`/api/shared/${id}`);
        setNote(res.data);
      } catch (err) {
        setError('Note not found or no longer public.');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedNote();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (error || !note) return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <StickyNote className="text-red-500" size={40} />
      </div>
      <h1 className="text-3xl font-bold mb-2">404 - Note Not Found</h1>
      <p className="text-text-secondary max-w-md mb-8">{error || 'The note you are looking for does not exist or has been made private.'}</p>
      <a href="/" className="text-primary hover:underline font-medium">Go back to NoteX AI</a>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <StickyNote className="text-white w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Public Shared Note</span>
              <h1 className="text-2xl font-bold tracking-tight">NoteX <span className="text-primary">AI</span></h1>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>By {note.userId?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{format(new Date(note.createdAt), 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="glass-card p-8 md:p-12 mb-12">
          <h2 className="text-4xl font-bold mb-8 text-white">{note.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-10">
            {note.tags?.map((tag: string) => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 text-text-secondary text-xs border border-white/10">
                #{tag}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none text-text-secondary text-lg leading-relaxed whitespace-pre-wrap">
            {note.content}
          </div>
        </article>

        {/* AI Insights (if public) */}
        {note.aiInsights && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-primary" size={20} />
              AI Generated Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 bg-primary/5">
                <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Executive Summary</h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {note.aiInsights.summary}
                </p>
              </div>
              <div className="glass-card p-6 bg-secondary/5">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Action Items</h4>
                <ul className="space-y-2">
                  {note.aiInsights.action_items?.map((item: string, idx: number) => (
                    <li key={idx} className="text-text-secondary text-sm flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-text-secondary text-sm mb-4">Want to create your own AI-powered notes?</p>
          <a href="/signup">
            <button className="gradient-button px-8 py-3 rounded-xl font-bold">
              Join NoteX AI for Free
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
