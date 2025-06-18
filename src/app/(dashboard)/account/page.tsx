'use client';

import { useEffect, useState, useCallback } from 'react';
import { SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface SubscriptionResponse {
  planName: string;
  renewDateISO: string;
  price: string;
  isActive: boolean;
}

export default function AccountPage() {
  const router = useRouter();
  const [sub, setSub] = useState<SubscriptionResponse | null>(null);
  const [loadingSub, setLoadingSub] = useState(true);
  const [billingLoading, setBillingLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  /* ---------- GET CURRENT SUBSCRIPTION ---------- */
  const fetchSubscription = useCallback(async () => {
    try {
      setLoadingSub(true);
      const res = await fetch('/api/check-subscription');

      // 404 = user has no paid plan → mark as “Free”
      if (res.status === 404) {
        setSub({
          planName: 'Free plan',
          renewDateISO: '',
          price: '$0',
          isActive: false,
        });
        return;
      }

      if (!res.ok) throw new Error('Unexpected response');
      const data: SubscriptionResponse = await res.json();
      setSub(data);
    } catch (e) {
      console.error('fetchSubscription error:', e);
      setSub({
        planName: 'Free plan',
        renewDateISO: '',
        price: '$0',
        isActive: false,
      });
    } finally {
      setLoadingSub(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  /* ---------- MANAGE BILLING (Stripe portal handles cancel) ---------- */
  const openBillingPortal = async () => {
    try {
      setBillingLoading(true);
      const res = await fetch('/api/stripe/billing-portal', { method: 'POST' });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      window.location.href = url; // portal allows cancel / payment method updates
    } catch (e) {
      console.error('openBillingPortal error:', e);
    } finally {
      setBillingLoading(false);
    }
  };

  /* ---------- DELETE ACCOUNT ---------- */
  const deleteAccount = async () => {
    if (!confirm('This will delete your account permanently. Continue?')) return;
    try {
      setDeleteLoading(true);
      const res = await fetch('/api/delete-account', { method: 'DELETE' });
      if (!res.ok) throw new Error();
      router.push('/');
    } catch (e) {
      console.error('deleteAccount error:', e);
    } finally {
      setDeleteLoading(false);
    }
  };

  const formattedDate =
    sub?.renewDateISO &&
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(sub.renewDateISO));

  /* ---------- RENDER ---------- */
  return (
    <>
      <div className="container">
        <h1>Account Settings</h1>

        {/* Sign-Out */}
        <div className="card signout-card">
          <SignOutButton redirectUrl="/">
            <button className="btn btn-neutral btn-block">Sign&nbsp;Out</button>
          </SignOutButton>
        </div>

        {/* Subscription */}
        <div className="card">
          <h2>Subscription</h2>
          {loadingSub ? (
            <p>Loading subscription…</p>
          ) : sub?.isActive ? (
            <p>
              Plan:&nbsp;<strong>{sub.planName}</strong>
              <br />
              Renews on&nbsp;<span>{formattedDate}</span>
              <br />
              Price:&nbsp;<span>{sub.price}</span>
            </p>
          ) : (
            <p>Free plan – upgrade in Review page</p>
          )}

          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={openBillingPortal}
              disabled={billingLoading}
            >
              {billingLoading ? 'Loading…' : 'Manage Subscription'}
            </button>
          </div>
        </div>

        {/* Delete Account */}
        <div className="card">
          <h2>Delete Account</h2>
          <p>Permanently remove your data and essays. This action cannot be undone.</p>
          <button
            className="btn btn-danger"
            onClick={deleteAccount}
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting…' : 'Delete Account'}
          </button>
        </div>
      </div>

      {/* ---------- STYLES (unchanged) ---------- */}
      <style jsx global>{`
        :root {
          --bg: #000000;
          --card-start: #1f2937;
          --card-end: #111827;
          --card-border: #3b82f6;
          --text-main: #ffffff;
          --text-sub: #b3d9ff;
          --primary: #3b82f6;
          --primary-hover: #60a5fa;
          --neutral: #374151;
          --neutral-hover: #4b5563;
          --danger: #ef4444;
          --danger-hover: #dc2626;
        }
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--bg);
          color: var(--text-main);
          -webkit-font-smoothing: antialiased;
        }
        h1 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 0 0 1.75rem;
          text-align: center;
        }
        .container {
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 1.25rem 3rem;
        }
        .card {
          background: linear-gradient(145deg, var(--card-start), var(--card-end));
          border: 1px solid var(--card-border);
          border-radius: 14px;
          padding: 1.75rem 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 22px rgba(59, 130, 246, 0.15);
        }
        .card h2 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0 0 0.65rem;
          color: var(--text-main);
        }
        .card p {
          margin: 0 0 1.25rem;
          color: var(--text-sub);
          font-size: 0.95rem;
          line-height: 1.45;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.75rem 1.6rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.22s ease, transform 0.22s ease;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        .btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
        }
        .btn-primary {
          background: var(--primary);
          color: #fff;
        }
        .btn-primary:hover {
          background: var(--primary-hover);
        }
        .btn-neutral {
          background: var(--neutral);
          color: #fff;
        }
        .btn-neutral:hover {
          background: var(--neutral-hover);
        }
        .btn-danger {
          background: var(--danger);
          color: #fff;
        }
        .btn-danger:hover {
          background: var(--danger-hover);
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .signout-card {
          text-align: center;
        }
        .btn-block {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </>
  );
}


