'use client'

import { useState } from 'react'
import { Play, Clock, CheckCircle2 } from 'lucide-react'

interface VideoPlayerProps {
  title: string
  description: string
  videoUrl: string
  durationMinutes: number
  isCompleted?: boolean
  onComplete?: () => void
}

export default function VideoPlayer({
  title,
  description,
  videoUrl,
  durationMinutes,
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

    // YouTube
    const ytMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

    // Loom
    const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
    if (loomMatch) return `https://www.loom.com/embed/${loomMatch[1]}`

    // Direct embed URL
    if (url.includes('embed')) return url

    return null
  }

  const embedUrl = getEmbedUrl(videoUrl)

  return (
    <div>
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
              <Play className="w-8 h-8 ml-1" />
            </div>
            <p className="text-sm text-gray-400">Video coming soon</p>
          </div>
        )}
      </div>

      {/* Video Info */}
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
            </div>
          </div>

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
        </div>

        <p className="mt-4 text-gray-600 leading-relaxed text-[15px]">
          {description}
        </p>
      </div>
    </div>
  )
}
