import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ptouenuiisejjcrjqtlc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0b3VlbnVpaXNlampjcmpxdGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MzkwNzIsImV4cCI6MjA5MjAxNTA3Mn0.TlBGJytNOaA9EUIaHnDxB_1MCesMJ86wBlfou9EhPjk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);