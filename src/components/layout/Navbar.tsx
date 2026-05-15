'use client';

import React from 'react';
import { Search, Bell, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Navbar = ({ onNewNote }: { onNewNote?: () => void }) => {
  return (
    <nav className="glass-nav sticky top-0 z-50 px-8 py-4 flex items-center justify-between">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search your notes..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          variant="gradient" 
          size="sm" 
          className="rounded-full gap-2"
          onClick={onNewNote}
        >
          <Plus size={18} />
          <span>New Note</span>
        </Button>

        <button className="p-2 rounded-xl hover:bg-white/5 text-text-secondary transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Shreyash Patil</p>
            <p className="text-xs text-text-secondary">Free Plan</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
            S
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
