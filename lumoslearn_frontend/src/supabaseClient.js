import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mcimmxqluaeaatfvtltal.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jaW1teHFsdWFlYWF0ZnZ0dGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5Mzk1NjMsImV4cCI6MjA2MzUxNTU2M30.j-Mq6SVHzrTs0fxg2C4FEzqAMky_MeLpwVFZW0-plf4';
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 