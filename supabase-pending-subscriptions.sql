-- Pending subscriptions: written by Stripe webhook when a guest checks out.
-- On next sign-in/sign-up with the same email, claim into user_subscriptions.

CREATE TABLE IF NOT EXISTS pending_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL,
  price_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  calculation_id UUID,
  claimed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pending_subs_email ON pending_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_pending_subs_unclaimed ON pending_subscriptions(email) WHERE claimed_at IS NULL;

ALTER TABLE pending_subscriptions ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write — never expose pending sub list to anon.
