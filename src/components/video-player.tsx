'use client'

import { useState } from 'react'
import { Play, Clock, CheckCircle2, Lock, Calendar } from 'lucide-react'

interface VideoPlayerProps {
  title: string
  description: string
  videoUrl: string
  durationMinutes: number
  posterUrl?: string
  isCompleted?: boolean
  onComplete?: () => void
}

const LOCKED_POSTER = '/posters/locked.png'
const PACING_MESSAGES = [
  "One section per day. By design. If you binge the whole week tonight, the only thing you trained is your scroll thumb.",
  "Marathon mode? That is the same loop that got you stuck. We unlock one section daily so the habit actually sticks.",
  "The video opens tomorrow. Your future self will thank present-you for not trying to cram seven days into seven minutes.",
]

export default function VideoPlayer({
  title,
  description,
  videoUrl,
  durationMinutes,
  posterUrl,
  isCompleted = false,
  onComplete,
}: VideoPlayerProps) {
  const [completed, setCompleted] = useState(isCompleted)

  function handleMarkComplete() {
    setCompleted(true)
    onComplete?.()
  }

  function getEmbedUrl(url: string): string | null {
    if (!url) return null
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
    if (loomMatch) return `https://www.loom.com/embed/${loomMatch[1]}`
    if (url.includes('embed')) return url
    return null
  }

  function isDirectVideo(url: string): boolean {
    if (!url) return false
    return /\.(mp4|webm|m4v|mov)(\?|$)/i.test(url)
  }

  const locked = !videoUrl
  const embedUrl = !locked ? getEmbedUrl(videoUrl) : null
  const directVideo = !embedUrl && isDirectVideo(videoUrl) ? videoUrl : null

  // Derive poster:
  //   1. Explicit posterUrl prop wins
  //   2. Locked → fallback locked poster
  //   3. Direct .mp4 → derived `-poster.jpg`
  const resolvedPoster =
    posterUrl ||
    (locked ? LOCKED_POSTER :
      directVideo ? directVideo.replace(/\.(mp4|webm|m4v|mov)(\?|$)/i, '-poster.jpg$2') : undefined)

  // Stable per-video pacing message (deterministic from title)
  const msgIndex = title.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % PACING_MESSAGES.length
  const pacingMsg = PACING_MESSAGES[msgIndex]

  return (
    <div>
      <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        {locked ? (
          <>
            {resolvedPoster && (
              <img
                src={resolvedPoster}
                alt="Unlocks soon"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-white/70 mb-2">
                Unlocks Soon
              </p>
              <h3 className="font-heading text-2xl font-bold uppercase mb-2 max-w-md">
                {title}
              </h3>
            </div>
          </>
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : directVideo ? (
          <video
            controls
            preload="metadata"
            playsInline
            className="absolute inset-0 w-full h-full object-contain bg-black"
            poster={resolvedPoster}
          >
            <source src={directVideo} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
              <Play className="w-8 h-8 ml-1" />
            </div>
            <p className="text-sm text-gray-400">Video coming soon</p>
          </div>
        )}
      </div>

      {locked && (
        <div className="mt-3 flex items-start gap-3 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
          <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
          <p className="text-sm leading-relaxed">{pacingMsg}</p>
        </div>
      )}

      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold uppercase text-gray-900 leading-tight">
              {title}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                {durationMinutes} min
              </span>
              {locked && (
                <span className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
                  <Lock className="w-3 h-3" />
                  Locked
                </span>
              )}
            </div>
          </div>

          {!locked && (
            <button
              onClick={handleMarkComplete}
              disabled={completed}
              className={`
                shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold
                transition-all duration-200
                ${completed
                  ? 'bg-green-50 text-green-600 cursor-default'
                  : 'bg-brand text-white hover:bg-brand-dark active:scale-95'
                }
              `}
            >
              <CheckCircle2 className="w-4 h-4" />
              {completed ? 'Done' : 'Mark Complete'}
            </button>
          )}
        </div>

        <p className="mt-4 text-gray-600 leading-relaxed text-[15px]">
          {description}
        </p>
      </div>
    </div>
  )
}
