import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const note = await Note.findOne({ shareId: id, isPublic: true })
      .populate('userId', 'name');

    if (!note) {
      return NextResponse.json({ error: 'Note not found or not public' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
