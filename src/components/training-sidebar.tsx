'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'
import { defaultDays } from '@/lib/training-data'

interface SidebarProps {
  completedVideos?: Set<string>
}

export default function TrainingSidebar({ completedVideos = new Set() }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedDays, setExpandedDays] = useState<Set<number>>(() => {
    const match = pathname.match(/\/day\/(\d+)/)
    const currentDay = match ? parseInt(match[1]) : 1
    return new Set([currentDay])
  })

  const currentDay = (() => {
    const match = pathname.match(/\/day\/(\d+)/)
    return match ? parseInt(match[1]) : 1
  })()

  const currentVideo = (() => {
    const match = pathname.match(/\/video\/(\d+)/)
    return match ? parseInt(match[1]) : 1
  })()

  function toggleDay(day: number) {
    setExpandedDays(prev => {
      const next = new Set(prev)
      if (next.has(day)) {
        next.delete(day)
      } else {
        next.add(day)
      }
      return next
    })
  }

  function getDayProgress(day: number): number {
    const videos = defaultDays.find(d => d.day === day)?.videos || []
    const completed = videos.filter(v =>
      completedVideos.has(`${day}-${v.position}`)
    ).length
    return videos.length > 0 ? Math.round((completed / videos.length) * 100) : 0
  }

  function isDayComplete(day: number): boolean {
    return getDayProgress(day) === 100
  }

  const sidebarContent = (
    <>
      {/* Logo / Title */}
      <div className="px-5 pt-6 pb-4 border-b border-gray-200">
        <Link href="/training" className="block">
          <h1 className="font-heading text-xl font-bold uppercase tracking-wide text-gray-900">
            The Problem Guide
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-sans">7-Day AI Training</p>
        </Link>
      </div>

      {/* Day Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-2 mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          Your Training
        </p>

        <ul className="space-y-1">
          {defaultDays.map(dayData => {
            const isExpanded = expandedDays.has(dayData.day)
            const isActive = currentDay === dayData.day
            const dayComplete = isDayComplete(dayData.day)
            const progress = getDayProgress(dayData.day)

            return (
              <li key={dayData.day}>
                {/* Day Header */}
                <button
                  onClick={() => toggleDay(dayData.day)}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left
                    transition-all duration-150
                    ${isActive
                      ? 'bg-brand/5 text-brand font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {dayComplete ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-green-500 shrink-0" />
                  ) : (
                    <div className={`
                      w-4.5 h-4.5 rounded-full border-2 shrink-0 flex items-center justify-center text-[9px] font-bold
                      ${isActive ? 'border-brand text-brand' : 'border-gray-300 text-gray-400'}
                    `}>
                      {dayData.day}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <span className="text-sm block truncate">
                      Day {dayData.day}: {dayData.title}
                    </span>
                    {progress > 0 && progress < 100 && (
                      <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  )}
                </button>

                {/* Video List */}
                {isExpanded && (
                  <ul className="ml-5 mt-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
                    {dayData.videos.map(video => {
                      const videoKey = `${dayData.day}-${video.position}`
                      const isVideoActive = isActive && currentVideo === video.position
                      const isCompleted = completedVideos.has(videoKey)

                      return (
                        <li key={video.position}>
                          <Link
                            href={`/training/day/${dayData.day}/video/${video.position}`}
                            onClick={() => setMobileOpen(false)}
                            className={`
                              flex items-center gap-2 px-2.5 py-2 rounded-md text-[13px]
                              transition-all duration-150
                              ${isVideoActive
                                ? 'bg-brand text-white font-medium'
                                : isCompleted
                                  ? 'text-green-600 hover:bg-green-50'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }
                            `}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            ) : isVideoActive ? (
                              <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 shrink-0" />
                            )}
                            <span className="truncate">{video.title}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Upgrade Card */}
      <div className="px-3 pb-3">
        <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-wide text-yellow-400">
              Upgrade
            </span>
          </div>
          <h3 className="font-heading text-base font-bold uppercase leading-tight mb-1">
            Let Us Do 95% For You
          </h3>
          <p className="text-[11px] text-gray-300 leading-relaxed mb-3">
            We build your AI business -- landing page, automations, emails, everything. You just show up.
          </p>
          <div className="mb-3">
            <span className="text-2xl font-bold">$495</span>
            <span className="text-xs text-gray-400 ml-1">one-time</span>
          </div>
          <p className="text-[10px] text-gray-400 mb-3">
            Or 2 payments of $275
          </p>
          <a
            href="https://theproblemguide.com/upgrade"
            className="block w-full py-2.5 bg-brand hover:bg-brand-dark text-white text-center text-sm font-bold rounded-lg transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Sign Out */}
      <div className="px-3 pb-4 pt-1 border-t border-gray-100">
        <SignOutButton>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors w-full">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-3 left-3 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 lg:hidden"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200
          flex flex-col z-40
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
