// public/js/supabase-client.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm';

const supabaseUrl = 'https://sifflfxggacpmkymdawv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpZmZsZnhnZ2FjcG1reW1kYXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNDU3NTQsImV4cCI6MjA5MjYyMTc1NH0.f2gAJE9xp1l18eMMUsEUArX7YPt7YQICFcoG8KK97rw';

let supabaseInstance = null;

// Initialize Supabase with error handling
function initializeSupabase() {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
    console.log('✅ Supabase initialized successfully');
    return supabaseInstance;
  } catch (error) {
    console.error('❌ Failed to initialize Supabase:', error);
    throw error;
  }
}

// Get the Supabase client (singleton pattern)
export function getSupabaseClient() {
  if (!supabaseInstance) {
    return initializeSupabase();
  }
  return supabaseInstance;
}

// Also expose the client globally for legacy code
window.supabase = getSupabaseClient();