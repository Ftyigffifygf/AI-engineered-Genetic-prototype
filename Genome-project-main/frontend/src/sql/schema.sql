-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  ethnicity TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Genetic data table
CREATE TABLE genetic_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  raw_data JSONB, -- Raw genetic sequence data
  analyzed_traits JSONB, -- Analyzed trait data
  risk_scores JSONB, -- Disease risk scores
  ancestry JSONB, -- Ancestry information
  processing_status TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  analyzed_at TIMESTAMPTZ
);

-- Partners table (for couples analysis)
CREATE TABLE partners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  partner_name TEXT NOT NULL,
  partner_genetic_data JSONB,
  partner_traits JSONB,
  relationship_status TEXT DEFAULT 'active',
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Traits reference table
CREATE TABLE traits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  inheritance_pattern TEXT,
  genetic_markers JSONB,
  icon TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Simulations table
CREATE TABLE simulations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  simulation_name TEXT,
  selected_traits JSONB NOT NULL,
  parent1_data JSONB NOT NULL,
  parent2_data JSONB,
  results JSONB NOT NULL,
  accuracy_score DECIMAL(5,2),
  simulation_type TEXT DEFAULT 'offspring' CHECK (simulation_type IN ('offspring', 'risk_analysis', 'trait_prediction')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Genetic algorithms reference
CREATE TABLE genetic_algorithms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  algorithm_name TEXT NOT NULL,
  version TEXT NOT NULL,
  description TEXT,
  accuracy_rate DECIMAL(5,2),
  reference_papers JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Genome references table
CREATE TABLE genome_references (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  database_name TEXT NOT NULL,
  version TEXT NOT NULL,
  description TEXT,
  url TEXT,
  last_updated TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX idx_genetic_data_user_id ON genetic_data(user_id);
CREATE INDEX idx_simulations_user_id ON simulations(user_id);
CREATE INDEX idx_simulations_created_at ON simulations(created_at);
CREATE INDEX idx_partners_user_id ON partners(user_id);
CREATE INDEX idx_traits_category ON traits(category);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE genetic_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Genetic data policies
CREATE POLICY "Users can view own genetic data" ON genetic_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own genetic data" ON genetic_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own genetic data" ON genetic_data
  FOR UPDATE USING (auth.uid() = user_id);

-- Partners policies
CREATE POLICY "Users can view own partners" ON partners
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own partners" ON partners
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own partners" ON partners
  FOR UPDATE USING (auth.uid() = user_id);

-- Simulations policies
CREATE POLICY "Users can view own simulations" ON simulations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own simulations" ON simulations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for reference tables
CREATE POLICY "Anyone can read traits" ON traits
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read genetic algorithms" ON genetic_algorithms
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read genome references" ON genome_references
  FOR SELECT USING (true);

-- Insert sample data
INSERT INTO traits (name, category, description, inheritance_pattern, icon) VALUES
  ('Eye Color', 'Physical', 'Determination of eye color from genetic markers', 'Complex', '👁️'),
  ('Height', 'Physical', 'Predicted adult height based on genetic factors', 'Polygenic', '📏'),
  ('Hair Color', 'Physical', 'Natural hair color prediction', 'Complex', '💇'),
  ('Intelligence', 'Cognitive', 'Cognitive ability indicators', 'Polygenic', '🧠'),
  ('Disease Risk', 'Health', 'Genetic predisposition to various diseases', 'Various', '🏥'),
  ('Athletic Ability', 'Physical', 'Genetic markers for athletic performance', 'Polygenic', '🏃');

INSERT INTO genetic_algorithms (algorithm_name, version, description, accuracy_rate) VALUES
  ('Deep Neural Network', 'v2.1', 'Advanced deep learning model for genetic prediction', 98.30),
  ('Bayesian Network', 'v1.8', 'Probabilistic model for inheritance patterns', 96.50),
  ('Random Forest', 'v3.0', 'Ensemble method for trait prediction', 94.80),
  ('Support Vector Machine', 'v2.3', 'Classification algorithm for genetic markers', 93.20);

INSERT INTO genome_references (database_name, version, description, url, last_updated) VALUES
  ('GenBank RefSeq', '2025.1', 'NCBI Reference Sequence Database', 'https://www.ncbi.nlm.nih.gov/refseq/', NOW()),
  ('Ensembl', '111', 'Genome browser for vertebrate genomes', 'https://ensembl.org/', NOW()),
  ('1000 Genomes Project', 'Phase 3', 'Large-scale sequencing project', 'https://www.internationalgenome.org/', NOW()),
  ('HapMap', 'Release 3', 'Catalog of human genetic variation', 'https://hapmap.ncbi.nlm.nih.gov/', NOW()),
  ('UCSC Genome Browser', '2025', 'Genome browser and annotation database', 'https://genome.ucsc.edu/', NOW());