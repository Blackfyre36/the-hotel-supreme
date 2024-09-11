
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://ysmqmzpghfyhtpqkizti.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbXFtenBnaGZ5aHRwcWtpenRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMDYxNzMsImV4cCI6MjAzNjY4MjE3M30.Jmm5ixMG8_hYcK9rZ46Xsd8P3urloer72MPqLjBSIb0";

//process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;