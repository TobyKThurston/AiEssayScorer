// lib/firebaseAdmin.ts   ← same file, just a tiny tweak
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string, (_k, v) =>
        typeof v === 'string' ? v.replace(/\\n/g, '\n') : v,
      ),
    ),
  });
}

export const db = getFirestore();

