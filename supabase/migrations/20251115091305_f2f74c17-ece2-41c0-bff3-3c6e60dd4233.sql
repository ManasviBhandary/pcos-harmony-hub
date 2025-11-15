-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  weight DECIMAL(5, 2),
  height DECIMAL(5, 2),
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'very_active', 'extra_active')),
  diet_preference TEXT CHECK (diet_preference IN ('vegetarian', 'non_vegetarian')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create symptoms table
CREATE TABLE public.symptoms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood TEXT,
  acne_level INTEGER CHECK (acne_level >= 0 AND acne_level <= 10),
  hair_fall_level INTEGER CHECK (hair_fall_level >= 0 AND hair_fall_level <= 10),
  cramps INTEGER CHECK (cramps >= 0 AND cramps <= 10),
  sleep_hours DECIMAL(3, 1),
  weight DECIMAL(5, 2),
  energy_level INTEGER CHECK (energy_level >= 0 AND energy_level <= 10),
  period_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create diet plans table
CREATE TABLE public.diet_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  breakfast TEXT NOT NULL,
  lunch TEXT NOT NULL,
  dinner TEXT NOT NULL,
  snacks TEXT,
  foods_to_include TEXT[],
  foods_to_avoid TEXT[],
  hydration_guidance TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exercise plans table
CREATE TABLE public.exercise_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_plan TEXT NOT NULL,
  weekly_plan TEXT NOT NULL,
  routines JSONB,
  step_count_recommendation INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Symptoms policies
CREATE POLICY "Users can view own symptoms" ON public.symptoms
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own symptoms" ON public.symptoms
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own symptoms" ON public.symptoms
  FOR DELETE USING (auth.uid() = user_id);

-- Diet plans policies
CREATE POLICY "Users can view own diet plans" ON public.diet_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diet plans" ON public.diet_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Exercise plans policies
CREATE POLICY "Users can view own exercise plans" ON public.exercise_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercise plans" ON public.exercise_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Contact messages policies (anyone can insert)
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX idx_symptoms_user_id ON public.symptoms(user_id);
CREATE INDEX idx_symptoms_created_at ON public.symptoms(created_at DESC);
CREATE INDEX idx_diet_plans_user_id ON public.diet_plans(user_id);
CREATE INDEX idx_exercise_plans_user_id ON public.exercise_plans(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();