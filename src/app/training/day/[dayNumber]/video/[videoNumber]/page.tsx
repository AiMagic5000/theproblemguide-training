'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { defaultDays } from '@/lib/training-data'
import VideoPlayer from '@/components/video-player'
import ResourceList, { type Resource } from '@/components/resource-list'

interface PageProps {
  params: Promise<{
    dayNumber: string
    videoNumber: string
  }>
}

export default function VideoPage({ params }: PageProps) {
  const { dayNumber, videoNumber } = use(params)
  const day = parseInt(dayNumber)
  const videoPos = parseInt(videoNumber)

  const dayData = defaultDays.find(d => d.day === day)
  if (!dayData) notFound()

  const video = dayData.videos.find(v => v.position === videoPos)
  if (!video) notFound()

  // Navigation links
  const prevVideo = videoPos > 1
    ? { day, video: videoPos - 1 }
    : day > 1
      ? { day: day - 1, video: 3 }
      : null

  const nextVideo = videoPos < 3
    ? { day, video: videoPos + 1 }
    : day < 7
      ? { day: day + 1, video: 1 }
      : null

  // Placeholder resources (admin fills these via Supabase)
  const resources: Resource[] = []

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/training" className="text-gray-400 hover:text-gray-600 transition-colors">
          Training
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-300" />
        <span className="text-gray-400">Day {day}</span>
        <ChevronRight className="w-3 h-3 text-gray-300" />
        <span className="text-gray-800 font-medium">Video {videoPos}</span>
      </div>

      {/* Day Title */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-brand uppercase tracking-wide mb-1">
          Day {day}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-gray-900">
          {dayData.title}
        </h1>
        <p className="text-gray-500 mt-1">{dayData.tagline}</p>
      </div>

      {/* Video Player */}
      <VideoPlayer
        title={video.title}
        description={video.description}
        videoUrl={video.video_url}
        durationMinutes={video.duration_minutes}
      />

      {/* Resources */}
      <ResourceList resources={resources} />

      {/* Navigation */}
      <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between">
        {prevVideo ? (
          <Link
            href={`/training/day/${prevVideo.day}/video/${prevVideo.video}`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Link>
        ) : (
          <div />
        )}

        {nextVideo ? (
          <Link
            href={`/training/day/${nextVideo.day}/video/${nextVideo.video}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors"
          >
            Next Video
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-lg">
            <span>Training Complete!</span>
          </div>
        )}
      </div>
    </div>
  )
}
