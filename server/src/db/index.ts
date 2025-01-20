import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.URL_PROJECT || ''
const supabaseKey = process.env.API_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or API key')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
