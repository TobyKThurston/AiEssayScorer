import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET() {
    const { userId } = await auth();


  if (!userId) return NextResponse.json({ isActive: false });

  const doc = await db.doc(`users/${userId}`).get();
  const isActive = Boolean(doc.exists && doc.data()?.premium);

  return NextResponse.json({ isActive });
}
