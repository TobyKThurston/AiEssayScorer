// File: src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const texts = ['Success', 'Essays', 'Feedback'];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setIndex(i => (i + 1) % texts.length), 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --header-height: 40px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; background:#000; color:#fff; }

        /* ---------- Hero ---------- */
        .hero {
          height: calc(85vh - var(--header-height));   /* slightly smaller */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 1rem;
        }

        .rotating-wrapper { display: flex; flex-direction: column; align-items: center; gap:.25rem; }
        .rotating-text,
        .mapped-out { font-size:4.5rem; line-height:1.1; font-weight:800; white-space:nowrap; }
        .rotating-text {
          background: linear-gradient(90deg,#93c5fd,#e0f2fe);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          transition:opacity .8s ease-in-out;
        }
        .description { margin-top:1rem; font-size:1.5rem; max-width:640px; color:#cbd5e1; }
        .review-btn {
          margin-top:2.5rem; padding:16px 32px; font-size:1.25rem; font-weight:600;
          background:#b3d9ff; color:#000; border:none; border-radius:10px; cursor:pointer;
          transition:background .25s, transform .15s, box-shadow .15s;
        }
        .review-btn:hover { background:#93c5fd; transform:translateY(-3px); box-shadow:0 14px 24px rgba(59,130,246,.2); }

        /* simple fade‑in */
        .fade-in-up { animation: fadeInUp .6s ease forwards; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(10px);} to { opacity:1; transform:translateY(0);} }

        @media (max-width:768px){
          .rotating-text,.mapped-out{font-size:3rem;}
          .description{font-size:1.125rem;}
        }
      `}</style>

      <section className="hero fade-in-up">
        <div className="rotating-wrapper">
          <span className="rotating-text">{texts[index]}</span>
          <span className="mapped-out">Mapped&nbsp;Out</span>
        </div>

        <p className="description">
          Admit smarter. The most strategic AI for getting in.
        </p>

        <Link href="/review">
          <button className="review-btn">Review your essay →</button>
        </Link>
      </section>
    </>
  );
}











