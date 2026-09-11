// app/auth/actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // If email confirmation is disabled in Supabase, session is active immediately
  if (data?.session) {
    return { success: true, redirect: true };
  }

  // If email confirmation is still enabled in Supabase
  return { 
    success: true, 
    message: 'Account created! Please check your email to confirm your account.' 
  };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}