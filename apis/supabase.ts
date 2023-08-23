import { createClient } from '@supabase/supabase-js'


const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZWljdGVzbmdkZ2Fzc2hvcWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzMDI2MDcsImV4cCI6MjAwNzg3ODYwN30.Rsr0wz0W6ay_LhLAcxl1UxnAsZZdzusQJGyGB_Lcdc8'
// Create a single supabase client for interacting with your database
const supabase = createClient('https://ijeictesngdgasshoqly.supabase.co', SUPABASE_KEY, { db: { schema: 'sdc' } })


export default supabase