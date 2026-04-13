import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface TrainingVideo {
  id: string
  day: number
  position: number
  title: string
  description: string
  video_url: string
  duration_minutes: number
  created_at: string
  updated_at: string
}

export interface TrainingResource {
  id: string
  video_id: string
  title: string
  url: string
  type: string
  position: number
}

export interface UserProgress {
  id: string
  user_id: string
  video_id: string
  completed: boolean
  completed_at: string | null
}
