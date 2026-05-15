'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  StickyNote, 
  Hash, 
  Settings, 
  LogOut,
  PlusCircle,
  Search
} from 'lucide-react';
import { cn } from '@/components/ui/Button';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'My Notes', icon: StickyNote, href: '/notes' },
    { name: 'Tags', icon: Hash, href: '/tags' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <aside className="w-64 border-r border-white/5 bg-background/50 backdrop-blur-xl h-screen sticky top-0 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <StickyNote className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight">NoteX <span className="text-primary">AI</span></span>
      </div>

      <div className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'sidebar-link',
                isActive && 'active'
              )}
            >
              <Icon size={20} className={isActive ? 'text-primary' : 'text-text-secondary'} />
              <span className={isActive ? 'font-semibold' : 'text-text-secondary'}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="pt-6 border-t border-white/5 space-y-4">
        <button className="sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
