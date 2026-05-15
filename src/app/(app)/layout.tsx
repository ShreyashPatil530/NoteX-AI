'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleNewNote = async () => {
    try {
      const res = await axios.post('/api/notes', {
        title: 'Untitled Note',
        content: '',
        tags: []
      });
      if (res.status === 201) {
        router.push(`/notes/${res.data._id}`);
      }
    } catch (err) {
      console.error('Failed to create note', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F19]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar onNewNote={handleNewNote} />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
