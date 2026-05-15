import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';
import { getAuthUser } from '@/lib/auth';
import { generateAIInsights } from '@/services/ai.service';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { noteId } = await req.json();

    if (!noteId) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }

    const note = await Note.findOne({ _id: noteId, userId: user.id });

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    if (!note.content) {
      return NextResponse.json({ error: 'Note content is empty' }, { status: 400 });
    }

    const insights = await generateAIInsights(note.content);

    // Update note with AI insights
    note.aiInsights = {
      ...insights,
      lastGenerated: new Date(),
    };
    
    // Auto-apply title if generic
    if (insights.suggested_title && (note.title === 'Untitled Note' || !note.title)) {
      note.title = insights.suggested_title;
    }

    // Auto-apply tags if none exist
    if (insights.suggested_tags && insights.suggested_tags.length > 0 && note.tags.length === 0) {
      note.tags = insights.suggested_tags;
    }

    await note.save();

    return NextResponse.json(note);
  } catch (error: any) {
    console.error('AI Route error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
