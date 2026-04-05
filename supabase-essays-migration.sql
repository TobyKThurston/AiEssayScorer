-- essays table
CREATE TABLE IF NOT EXISTS essays (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL DEFAULT 'Untitled Essay',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_essays_user_id ON essays(user_id);

ALTER TABLE essays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own essays"
  ON essays FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own essays"
  ON essays FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own essays"
  ON essays FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own essays"
  ON essays FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_essays_updated_at
  BEFORE UPDATE ON essays
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- essay_versions table
CREATE TABLE IF NOT EXISTS essay_versions (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  essay_id       UUID NOT NULL REFERENCES essays(id) ON DELETE CASCADE,
  content        TEXT NOT NULL,
  target_schools TEXT[] DEFAULT '{}',
  essay_prompt   TEXT DEFAULT '',
  essay_type     TEXT DEFAULT '',
  analysis       JSONB,
  version_number INTEGER NOT NULL,
  label          TEXT,
  created_at     TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_essay_versions_essay_id ON essay_versions(essay_id);

ALTER TABLE essay_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own versions"
  ON essay_versions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM essays
    WHERE essays.id = essay_versions.essay_id
    AND essays.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own versions"
  ON essay_versions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM essays
    WHERE essays.id = essay_versions.essay_id
    AND essays.user_id = auth.uid()
  ));
