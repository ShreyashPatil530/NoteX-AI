'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Plus, 
  MoreVertical,
  Calendar,
  Hash,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import NoteCard from '@/components/notes/NoteCard';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [view, setView] = useState('grid');
  
  const allTags = Array.from(new Set(notes.flatMap((n: any) => n.tags || [])));

  useEffect(() => {
    fetchNotes();
  }, [selectedTag]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      let url = '/api/notes';
      if (selectedTag) url += `?tag=${selectedTag}`;
      const res = await axios.get(url);
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter((note: any) => 
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Notes</h1>
          <p className="text-text-secondary">Manage and organize all your thoughts in one place.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
            >
              <List size={18} />
            </button>
          </div>
          <Button variant="gradient" className="gap-2" onClick={() => {/* Shared logic in layout */}}>
            <Plus size={20} />
            <span>New Note</span>
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search notes..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${!selectedTag ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-text-secondary hover:border-white/20'}`}
          >
            All Notes
          </button>
          {allTags.map((tag: string) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${selectedTag === tag ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-text-secondary hover:border-white/20'}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card p-6 h-56 animate-pulse bg-white/5"></div>
          ))}
        </div>
      ) : filteredNotes.length > 0 ? (
        <div className={view === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "flex flex-col gap-4"
        }>
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note: any) => (
              <NoteCard 
                key={note._id} 
                note={note} 
                onClick={() => router.push(`/notes/${note._id}`)}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="glass-card p-20 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Search className="text-text-secondary" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No notes found</h3>
          <p className="text-text-secondary max-w-md">
            {search || selectedTag 
              ? "We couldn't find any notes matching your current filters. Try clearing them or search for something else."
              : "You haven't created any notes yet. Click the 'New Note' button to get started!"
            }
          </p>
          {(search || selectedTag) && (
            <Button 
              variant="outline" 
              className="mt-6 gap-2"
              onClick={() => { setSearch(''); setSelectedTag(null); }}
            >
              <X size={18} /> Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
