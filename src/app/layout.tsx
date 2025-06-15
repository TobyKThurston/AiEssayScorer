'use client';
export const dynamic = 'force-dynamic';

import './globals.css';
import Link from 'next/link';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState, Suspense } from 'react';


// 1️⃣ RootLayout only does the Provider
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <Suspense fallback={<div>Loading…</div>}>
        <InnerLayout>{children}</InnerLayout>
      </Suspense>
    </ClerkProvider>
  );
}

// 2️⃣ InnerLayout is rendered _inside_ the ClerkProvider
function InnerLayout({ children }: { children: ReactNode }) {
  /* ── premium status for navbar ───────────────────────── */
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);

  const { user } = useUser();             // NOW valid: you're inside ClerkProvider
  const searchParams = useSearchParams(); // OK inside client

  // helper so we don’t duplicate fetch logic
  const refreshPremium = () => {
    fetch('/api/check-subscription')
      .then((r) => r.ok && r.json())
      .then((d) => setPremiumUnlocked(Boolean(d?.isActive)))
      .catch(() => {});
  };

  // 1) on first render
  useEffect(() => {
    refreshPremium();
  }, []);

  // 2) when user logs in or out
  useEffect(() => {
    if (user) {
      refreshPremium();
    } else {
      setPremiumUnlocked(false);
    }
  }, [user?.id]);

  // 3) after returning from Stripe (?checkout=success)
  useEffect(() => {
    if (searchParams?.get('checkout') === 'success') {
      refreshPremium();
    }
  }, [searchParams]);


return (
    <html lang="en">
     

      <body>
        {/*— Original header CSS —*/}
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Poppins', sans-serif;
            background-color: #000;
            color: #fff;
          }

          /* Banner + nav layout */
          .top-tag {
            text-align: center;
            padding: 12px;
            background-color: #111827;
            font-weight: 600;
            color: #93c5fd;
            letter-spacing: 0.5px;
          }
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 60px;
            background-color: #000;
          }

          /* Logo */
          nav a,
          nav a:visited {
            text-decoration: none;
            color: inherit;
          }
          nav .logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: #b3d9ff;
          }
          nav ul {
            list-style: none;
            display: flex;
            align-items: center;
            gap: 30px;
          }
          nav ul li {
            display: flex;
            align-items: center;
          }

          /* Nav buttons */
          nav ul li button {
            background: none;
            border: none;
            font-family: inherit;
            font-size: inherit;
            color: #b3d9ff;
            font-weight: 600;
            position: relative;
            cursor: pointer;
            transition: color 0.3s ease;
            padding: 0;
            line-height: 1;
          }
          nav ul li button::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            background-color: #b3d9ff;
            bottom: -5px;
            left: 0;
            right: 0;
            margin: 0 auto;
            transition: width 0.3s ease;
          }
          nav ul li button:hover {
            color: #93c5fd;
          }
          nav ul li button:hover::after {
            width: 100%;
          }

          .site-footer {
            margin-top: 2rem;
            padding: 1.5rem 0;
            color: #6b7280;           /* gray-500 */
            font-size: 0.875rem;      /* small text */
            text-align: center;
            background: #111827;      /* match your dark theme (optional) */
          }

          .site-footer a {
            color: #9ca3af;           /* gray-400 */
            text-decoration: none;
            margin: 0 0.5rem;
            transition: color 0.2s ease;
          }

          .site-footer a:hover {
            color: #ffffff;           /* brighten on hover */
          }

          .site-footer .sep {
            margin: 0 0.5rem;
            color: #6b7280;
          }

        `}</style>


          {/*— Header HTML —*/}
          <div className="top-tag">Developed at the Ivy League 🌿</div>
          <nav>
            {/* Logo links back to home */}
            <Link href="/">
              <div
                className="logo"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '30px',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '32px',
                    height: '60px',
                    transform: 'translateX(-60px)',
                  }}
                >
                  <svg
                    width="32"
                    height="60"
                    viewBox="0 0 180 150"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    fill="none"
                  >
                    <polygon points="90,10 40,140 140,140" fill="#2563eb" />
                    <polygon points="90,10 60,140 90,140" fill="#3b82f6" />
                    <polygon points="90,10 90,140 120,140" fill="#60a5fa" />
                    <polygon points="90,10 75,110 105,110" fill="#93c5fd" />
                    <polygon points="90,10 82,90 98,90" fill="#bfdbfe" />
                    <polygon points="90,10 86,70 94,70" fill="#dbeafe" />
                  </svg>
                </span>
                <span style={{ marginLeft: '-30px' }}>Ivy Admit</span>
              </div>
            </Link>

            <ul>
              <SignedOut>
                <li>
                  <SignInButton mode="modal">
                    <button>Login</button>
                  </SignInButton>
                </li>
              </SignedOut>

              <SignedIn>
                {/* Upgrade button – only for free users */}
                {!premiumUnlocked && (
                  <li>
                    <button
                      onClick={() =>
                        document.dispatchEvent(
                          new CustomEvent('open-premium-popup')
                        )
                      }
                      style={{
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        borderRadius: '8px',
                        padding: '6px 14px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        marginRight: '18px',
                        cursor: 'pointer',
                      }}
                    >
                      Upgrade
                    </button>
                  </li>
                )}

                <li>
                  <SignOutButton>
                    <button>Sign Out</button>
                  </SignOutButton>
                </li>
              </SignedIn>
            </ul>
          </nav>

          {/*— Page content —*/}
          <main>{children}</main>

          <footer className="site-footer">
            <Link href="/terms">Terms of Service</Link>
            <span className="sep">•</span>
            <Link href="/privacy">Privacy Policy</Link>
            <p>© {new Date().getFullYear()} Ivy Admit AI. All rights reserved.</p>
          </footer>

        </body>
      </html>
  );
}











