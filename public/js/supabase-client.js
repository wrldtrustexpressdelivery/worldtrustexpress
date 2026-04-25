// public/js/supabase-client.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm';

const supabaseUrl = 'https://bwcudsoetefzbwtjaemo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3Y3Vkc29ldGVmemJ3dGphZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4ODE1MTYsImV4cCI6MjA5MjQ1NzUxNn0.KAJbFl0CNxaOAEb87ZHjb_4ILfHa_BaXnjFjmIT5OZc';

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