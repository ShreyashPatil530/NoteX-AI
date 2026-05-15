'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Sparkles, 
  Share2, 
  Trash2, 
  Save, 
  Tag, 
  X,
  Plus,
  Check,
  ExternalLink,
  ChevronRight,
  ListTodo
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '@/hooks/use-debounce';

export default function NoteEditor() {
  const { id } = useParams();
  const router = useRouter();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  
  const debouncedContent = useDebounce(content, 1000);
  const debouncedTitle = useDebounce(title, 1000);

  useEffect(() => {
    fetchNote();
  }, [id]);

  useEffect(() => {
    if (note && (debouncedContent !== note.content || debouncedTitle !== note.title)) {
      saveNote();
    }
  }, [debouncedContent, debouncedTitle]);

  const fetchNote = async () => {
    try {
      const res = await axios.get(`/api/notes/${id}`);
      setNote(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.error('Failed to fetch note', err);
      router.push('/notes');
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async (updates: any = {}) => {
    setSaving(true);
    try {
      const data = {
        title: updates.title !== undefined ? updates.title : title,
        content: updates.content !== undefined ? updates.content : content,
        ...updates
      };
      const res = await axios.patch(`/api/notes/${id}`, data);
      setNote(res.data);
    } catch (err) {
      console.error('Failed to save note', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`/api/notes/${id}`);
        router.push('/notes');
      } catch (err) {
        console.error('Failed to delete note', err);
      }
    }
  };

  const generateAI = async () => {
    if (!content) return alert('Add some content first!');
    setAiLoading(true);
    try {
      const res = await axios.post('/api/ai/generate', { noteId: id });
      setNote(res.data);
      setTitle(res.data.title);
      // If AI updated tags, we should reflect that locally if we want
      setShowAiModal(true);
    } catch (err) {
      console.error('AI generation failed', err);
      alert('AI generation failed. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag && !note.tags.includes(newTag)) {
      const updatedTags = [...note.tags, newTag];
      saveNote({ tags: updatedTags });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = note.tags.filter((t: string) => t !== tagToRemove);
    saveNote({ tags: updatedTags });
  };

  const togglePublic = () => {
    saveNote({ isPublic: !note?.isPublic });
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.push('/notes')}
          className="p-2 rounded-xl hover:bg-white/5 text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-xs text-text-secondary mr-2 flex items-center gap-1">
            {saving ? (
              <>
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                Saving...
              </>
            ) : (
              <>
                <Check size={14} className="text-emerald-500" />
                Saved
              </>
            )}
          </div>
          
          <Button 
            variant={note?.isPublic ? "secondary" : "outline"} 
            size="sm" 
            className="gap-2"
            onClick={togglePublic}
          >
            <Share2 size={16} />
            {note?.isPublic ? "Shared" : "Share"}
          </Button>

          <Button 
            variant="gradient" 
            size="sm" 
            className="gap-2"
            onClick={generateAI}
            isLoading={aiLoading}
          >
            <Sparkles size={16} />
            AI Insights
          </Button>

          <button 
            onClick={handleDelete}
            className="p-2 rounded-xl hover:bg-red-500/10 text-text-secondary hover:text-red-400 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Share ID Info */}
      {note?.isPublic && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-between"
        >
          <div className="flex items-center gap-3 text-secondary text-sm">
            <ExternalLink size={18} />
            <span>Public link active: <strong>/shared/{note.shareId}</strong></span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => window.open(`/shared/${note.shareId}`, '_blank')}>
            View Public Page
          </Button>
        </motion.div>
      )}

      {/* Editor Content */}
      <div className="glass-card p-10 min-h-[600px] flex flex-col gap-6">
        <input 
          type="text" 
          placeholder="Note Title"
          className="text-4xl font-bold bg-transparent border-none outline-none text-white placeholder:text-white/20 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex flex-wrap items-center gap-3 border-y border-white/5 py-4">
          <div className="flex items-center gap-2 text-text-secondary mr-2">
            <Tag size={16} />
            <span className="text-sm font-medium">Tags:</span>
          </div>
          {note.tags?.map((tag: string) => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              {tag}
              <button onClick={() => removeTag(tag)} className="hover:text-white transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
          <form onSubmit={addTag} className="relative">
            <input 
              type="text" 
              placeholder="Add tag..."
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs outline-none focus:border-primary/50 transition-all w-24 focus:w-32"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
          </form>
        </div>

        <textarea 
          placeholder="Start writing your thoughts here..."
          className="flex-1 bg-transparent border-none outline-none text-text-secondary leading-relaxed text-lg resize-none placeholder:text-white/10 w-full min-h-[400px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      {/* AI Insights Sidebar/Bottom (Animated) */}
      <AnimatePresence>
        {showAiModal && note.aiInsights && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-0 top-0 w-96 h-full bg-[#0B0F19]/90 backdrop-blur-2xl border-l border-white/10 p-8 z-[60] shadow-2xl overflow-y-auto"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-primary" />
                AI Insights
              </h2>
              <button onClick={() => setShowAiModal(false)} className="p-2 rounded-xl hover:bg-white/5">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Summary</h3>
                <p className="text-text-secondary leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  {note.aiInsights.summary}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Action Items</h3>
                <ul className="space-y-3">
                  {note.aiInsights.action_items?.length > 0 ? (
                    note.aiInsights.action_items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary bg-white/5 p-3 rounded-xl border border-white/5 hover:border-secondary/30 transition-colors">
                        <div className="mt-1 w-5 h-5 rounded bg-secondary/20 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-secondary" />
                        </div>
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-text-secondary italic bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                      No specific action items identified. Try expanding your note!
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">Suggested Title</h3>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-4">
                  <div className="text-center">
                    <p className="text-white font-medium italic mb-2">"{note.aiInsights.suggested_title}"</p>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full gap-2 h-9 text-xs" 
                      onClick={() => {
                        setTitle(note.aiInsights.suggested_title);
                      }}
                    >
                      <Check size={14} /> Apply Title
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">Suggested Tags</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.aiInsights.suggested_tags?.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2 border-cyan-500/20 hover:bg-cyan-500/10 text-xs h-9" 
                  onClick={() => {
                    const existingTags = note.tags || [];
                    const newTags = [...new Set([...existingTags, ...note.aiInsights.suggested_tags])];
                    saveNote({ tags: newTags });
                  }}
                >
                  <Plus size={14} /> Add All Suggested Tags
                </Button>
              </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5 space-y-6">
              <Button 
                variant="outline" 
                className="w-full gap-2 border-primary/20 hover:bg-primary/5"
                onClick={generateAI}
                isLoading={aiLoading}
              >
                <Sparkles size={16} className="text-primary" />
                Regenerate Insights
              </Button>
              <p className="text-[10px] text-text-secondary text-center uppercase tracking-widest">
                AI can make mistakes. Please verify important information.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
