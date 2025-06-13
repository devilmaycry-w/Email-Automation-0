/*
  # Fix user signup trigger

  1. Database Functions
    - Create or replace `handle_new_user` function to properly create user profiles
    - Function will insert into `user_profiles` table when new user is created
    - Uses `security definer` to bypass RLS policies during trigger execution

  2. Database Triggers  
    - Create trigger on `auth.users` table to call `handle_new_user` function
    - Triggers after INSERT to create corresponding user profile

  3. Security
    - Function runs with elevated privileges to bypass RLS
    - Ensures user profile is created even with strict RLS policies
*/

-- Create or replace the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer
AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id,
    email,
    full_name,
    company_name,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'company_name', ''),
    NOW(),
    NOW()
  );
  
  RETURN NEW;
END;
$$;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();