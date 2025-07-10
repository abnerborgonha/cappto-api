
import { createClient } from '@supabase/supabase-js'
import { env } from '@/env.ts';

const SUPABASE_URL = env.SUPABASE_URL
const SUPABSE_KEY = env.SUPABSE_KEY

export const supabase = createClient(SUPABASE_URL, SUPABSE_KEY)