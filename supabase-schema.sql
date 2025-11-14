-- Create user_tokens table to track user tokens
CREATE TABLE IF NOT EXISTS user_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  tokens INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own tokens
CREATE POLICY "Users can view their own tokens"
  ON user_tokens FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can update their own tokens
CREATE POLICY "Users can update their own tokens"
  ON user_tokens FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: System can insert tokens for users
CREATE POLICY "System can insert tokens"
  ON user_tokens FOR INSERT
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_tokens_updated_at
  BEFORE UPDATE ON user_tokens
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

