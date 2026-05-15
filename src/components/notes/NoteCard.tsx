'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, MoreVertical, Sparkles, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/components/ui/Button';

interface NoteCardProps {
  note: {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    updatedAt: string;
    aiInsights?: any;
    isPublic?: boolean;
  };
  onClick?: () => void;
  onShare?: (e: React.MouseEvent) => void;
}

const NoteCard = ({ note, onClick, onShare }: NoteCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="glass-card p-6 cursor-pointer group relative flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
          {note.title || 'Untitled Note'}
        </h3>
        <button className="p-1 rounded-lg hover:bg-white/5 text-text-secondary">
          <MoreVertical size={18} />
        </button>
      </div>

      <p className="text-text-secondary text-sm line-clamp-3 flex-1 mb-4">
        {note.content || 'No content yet...'}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {note.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[10px] uppercase tracking-wider text-text-secondary border border-white/5">
            {tag}
          </span>
        ))}
        {note.tags?.length > 3 && (
          <span className="text-[10px] text-text-secondary self-center">+{note.tags.length - 3} more</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Calendar size={14} />
          <span>{formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}</span>
        </div>

        <div className="flex items-center gap-2">
          {note.aiInsights && (
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary" title="AI Insights Available">
              <Sparkles size={14} />
            </div>
          )}
          {note.isPublic && (
            <div className="p-1.5 rounded-lg bg-secondary/10 text-secondary" title="Publicly Shared">
              <Share2 size={14} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;
