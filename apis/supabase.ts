import { createClient } from '@supabase/supabase-js'


const supabase = createClient('https://fzjgljxomqpukuvmguay.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6amdsanhvbXFwdWt1dm1ndWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4MjAxMjgsImV4cCI6MjAwODM5NjEyOH0.b5jTFQF6QfFPzJ59ImVO4Icx8k9Gsd5kIcKMEIYzhbw')

export default supabase;