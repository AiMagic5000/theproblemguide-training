import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'coreypearsonemail@gmail.com'

async function isAdmin(): Promise<boolean> {
  const user = await currentUser()
  const email = user?.emailAddresses?.[0]?.emailAddress
  return email === ADMIN_EMAIL
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { data: videos, error: videosErr } = await supabaseAdmin
    .from('training_videos')
    .select('*')
    .order('day', { ascending: true })
    .order('position', { ascending: true })

  if (videosErr) {
    return NextResponse.json({ error: videosErr.message }, { status: 500 })
  }

  const { data: resources, error: resourcesErr } = await supabaseAdmin
    .from('training_resources')
    .select('*')
    .order('position', { ascending: true })

  if (resourcesErr) {
    return NextResponse.json({ error: resourcesErr.message }, { status: 500 })
  }

  return NextResponse.json({ videos: videos || [], resources: resources || [] })
}

export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const body = await request.json()
  const { days } = body

  if (!days || !Array.isArray(days)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  // Upsert each video
  for (const day of days) {
    for (const video of day.videos) {
      const { error: videoErr } = await supabaseAdmin
        .from('training_videos')
        .upsert(
          {
            day: day.day,
            position: video.position,
            title: video.title,
            description: video.description,
            video_url: video.video_url || '',
            duration_minutes: video.duration_minutes || 0,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'day,position' }
        )

      if (videoErr) {
        return NextResponse.json({ error: videoErr.message }, { status: 500 })
      }

      // Handle resources for this video
      if (video.resources && Array.isArray(video.resources)) {
        // Delete existing resources for this video
        const { data: existingVideo } = await supabaseAdmin
          .from('training_videos')
          .select('id')
          .eq('day', day.day)
          .eq('position', video.position)
          .single()

        if (existingVideo) {
          await supabaseAdmin
            .from('training_resources')
            .delete()
            .eq('video_id', existingVideo.id)

          // Insert new resources
          if (video.resources.length > 0) {
            const resourceRows = video.resources.map((r: { title: string; url: string; type: string }, idx: number) => ({
              video_id: existingVideo.id,
              title: r.title,
              url: r.url,
              type: r.type || 'link',
              position: idx + 1,
            }))

            const { error: resErr } = await supabaseAdmin
              .from('training_resources')
              .insert(resourceRows)

            if (resErr) {
              return NextResponse.json({ error: resErr.message }, { status: 500 })
            }
          }
        }
      }
    }
  }

  return NextResponse.json({ success: true })
}
