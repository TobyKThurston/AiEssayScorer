-- Odds calculations: stores user-submitted profile + LLM-generated odds result.
-- Reveal is gated server-side by paid_session_id (guest) or user_id+active sub (logged-in).

CREATE TABLE IF NOT EXISTS odds_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT,
  profile JSONB NOT NULL,
  result JSONB NOT NULL,
  paid_session_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_odds_calc_user_id ON odds_calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_odds_calc_email ON odds_calculations(email);
CREATE INDEX IF NOT EXISTS idx_odds_calc_paid_session ON odds_calculations(paid_session_id);

ALTER TABLE odds_calculations ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a calculation (guest creates -> reveal gated server-side).
CREATE POLICY "Anyone can insert calculations"
  ON odds_calculations FOR INSERT
  WITH CHECK (true);

-- Users can read their own calculations.
CREATE POLICY "Users read own calculations"
  ON odds_calculations FOR SELECT
  USING (auth.uid() = user_id);

-- Service role bypasses RLS for webhook-driven updates (claim by email).
