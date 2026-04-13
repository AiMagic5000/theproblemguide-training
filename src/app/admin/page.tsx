'use client'

import { useState } from 'react'
import {
  Save,
  Plus,
  Trash2,
  Video,
  FileText,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'
import { defaultDays } from '@/lib/training-data'

interface VideoData {
  position: number
  title: string
  description: string
  video_url: string
  duration_minutes: number
}

interface ResourceData {
  id: string
  title: string
  url: string
  type: 'pdf' | 'link' | 'download' | 'guide'
}

interface DayState {
  day: number
  title: string
  tagline: string
  videos: VideoData[]
  resources: Map<number, ResourceData[]>
}

export default function AdminPage() {
  const [days, setDays] = useState<DayState[]>(() =>
    defaultDays.map(d => ({
      ...d,
      resources: new Map(d.videos.map(v => [v.position, [] as ResourceData[]])),
    }))
  )
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  function toggleDay(day: number) {
    setExpandedDays(prev => {
      const next = new Set(prev)
      if (next.has(day)) next.delete(day)
      else next.add(day)
      return next
    })
  }

  function updateVideo(dayIndex: number, videoIndex: number, field: keyof VideoData, value: string | number) {
    setDays(prev => prev.map((d, di) => {
      if (di !== dayIndex) return d
      return {
        ...d,
        videos: d.videos.map((v, vi) => {
          if (vi !== videoIndex) return v
          return { ...v, [field]: value }
        }),
      }
    }))
  }

  function addResource(dayIndex: number, videoPosition: number) {
    setDays(prev => prev.map((d, di) => {
      if (di !== dayIndex) return d
      const resources = new Map(d.resources)
      const existing = resources.get(videoPosition) || []
      resources.set(videoPosition, [
        ...existing,
        { id: crypto.randomUUID(), title: '', url: '', type: 'link' },
      ])
      return { ...d, resources }
    }))
  }

  function updateResource(
    dayIndex: number,
    videoPosition: number,
    resourceIndex: number,
    field: keyof ResourceData,
    value: string
  ) {
    setDays(prev => prev.map((d, di) => {
      if (di !== dayIndex) return d
      const resources = new Map(d.resources)
      const existing = [...(resources.get(videoPosition) || [])]
      existing[resourceIndex] = { ...existing[resourceIndex], [field]: value }
      resources.set(videoPosition, existing)
      return { ...d, resources }
    }))
  }

  function removeResource(dayIndex: number, videoPosition: number, resourceIndex: number) {
    setDays(prev => prev.map((d, di) => {
      if (di !== dayIndex) return d
      const resources = new Map(d.resources)
      const existing = [...(resources.get(videoPosition) || [])]
      existing.splice(resourceIndex, 1)
      resources.set(videoPosition, existing)
      return { ...d, resources }
    }))
  }

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    try {
      const payload = days.map(d => ({
        day: d.day,
        title: d.title,
        tagline: d.tagline,
        videos: d.videos.map(v => ({
          ...v,
          resources: d.resources.get(v.position) || [],
        })),
      }))

      const res = await fetch('/api/admin/training', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days: payload }),
      })

      if (!res.ok) throw new Error('Save failed')
      setMessage({ type: 'success', text: 'All changes saved.' })
    } catch {
      setMessage({ type: 'error', text: 'Could not save. Try again.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-heading text-2xl font-bold uppercase text-gray-900">
            Manage Training Content
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Edit video URLs, descriptions, and resources for each day.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.type === 'error' && <AlertCircle className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      {/* Days */}
      <div className="space-y-4">
        {days.map((dayData, dayIndex) => (
          <div
            key={dayData.day}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            {/* Day Header */}
            <button
              onClick={() => toggleDay(dayData.day)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              {expandedDays.has(dayData.day) ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              <div className="flex-1">
                <span className="font-heading text-lg font-bold uppercase text-gray-900">
                  Day {dayData.day}: {dayData.title}
                </span>
                <span className="ml-3 text-sm text-gray-400">{dayData.tagline}</span>
              </div>
              <span className="text-xs text-gray-400">
                {dayData.videos.filter(v => v.video_url).length}/{dayData.videos.length} videos set
              </span>
            </button>

            {/* Day Content */}
            {expandedDays.has(dayData.day) && (
              <div className="px-5 pb-5 space-y-6 border-t border-gray-100 pt-4">
                {dayData.videos.map((video, videoIndex) => (
                  <div key={video.position} className="space-y-3">
                    {/* Video Header */}
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-brand" />
                      <span className="text-sm font-semibold text-gray-700">
                        Video {video.position}
                      </span>
                    </div>

                    {/* Video Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Title</label>
                        <input
                          type="text"
                          value={video.title}
                          onChange={e => updateVideo(dayIndex, videoIndex, 'title', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Video URL (YouTube, Vimeo, or Loom)
                        </label>
                        <input
                          type="url"
                          value={video.video_url}
                          onChange={e => updateVideo(dayIndex, videoIndex, 'video_url', e.target.value)}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">Description</label>
                        <textarea
                          value={video.description}
                          onChange={e => updateVideo(dayIndex, videoIndex, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Duration (minutes)</label>
                        <input
                          type="number"
                          value={video.duration_minutes}
                          onChange={e => updateVideo(dayIndex, videoIndex, 'duration_minutes', parseInt(e.target.value) || 0)}
                          min={0}
                          className="w-24 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none"
                        />
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="ml-6 mt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                          <FileText className="w-3 h-3" />
                          Resources
                        </span>
                        <button
                          onClick={() => addResource(dayIndex, video.position)}
                          className="flex items-center gap-1 text-xs text-brand hover:text-brand-dark transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          Add Resource
                        </button>
                      </div>

                      {(dayData.resources.get(video.position) || []).map((resource, ri) => (
                        <div key={resource.id} className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            value={resource.title}
                            onChange={e => updateResource(dayIndex, video.position, ri, 'title', e.target.value)}
                            placeholder="Resource name"
                            className="flex-1 px-2.5 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none"
                          />
                          <input
                            type="url"
                            value={resource.url}
                            onChange={e => updateResource(dayIndex, video.position, ri, 'url', e.target.value)}
                            placeholder="URL"
                            className="flex-1 px-2.5 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none"
                          />
                          <select
                            value={resource.type}
                            onChange={e => updateResource(dayIndex, video.position, ri, 'type', e.target.value)}
                            className="px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none"
                          >
                            <option value="link">Link</option>
                            <option value="pdf">PDF</option>
                            <option value="download">Download</option>
                            <option value="guide">Guide</option>
                          </select>
                          <button
                            onClick={() => removeResource(dayIndex, video.position, ri)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {videoIndex < dayData.videos.length - 1 && (
                      <div className="border-b border-gray-100 ml-6" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Preview Link */}
      <div className="mt-8 text-center">
        <a
          href="/training"
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Preview Training Dashboard
        </a>
      </div>
    </div>
  )
}
