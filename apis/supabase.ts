import { createClient } from '@supabase/supabase-js'


// const supabase = createClient('https://fzjgljxomqpukuvmguay.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6amdsanhvbXFwdWt1dm1ndWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4MjAxMjgsImV4cCI6MjAwODM5NjEyOH0.b5jTFQF6QfFPzJ59ImVO4Icx8k9Gsd5kIcKMEIYzhbw')

// export default supabase;

// const supabaseUrl = 'https://hmhamdmmcfirtjzosdgy.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZWljdGVzbmdkZ2Fzc2hvcWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzMDI2MDcsImV4cCI6MjAwNzg3ODYwN30.Rsr0wz0W6ay_LhLAcxl1UxnAsZZdzusQJGyGB_Lcdc8'
// Create a single supabase client for interacting with your database
const supabase = createClient('https://ijeictesngdgasshoqly.supabase.co', SUPABASE_KEY, { db: { schema: 'sdc' } })


export default supabase