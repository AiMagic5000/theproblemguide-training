'use client'

import { useUser, SignOutButton } from '@clerk/nextjs'
import { User, Mail, Calendar, LogOut, ExternalLink, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="max-w-2xl mx-auto"><p className="text-gray-400">Loading...</p></div>
  }

  const email = user?.primaryEmailAddress?.emailAddress || '--'
  const name = user?.fullName || user?.firstName || '--'
  const joined = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '--'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/15 mb-3">
          <User className="w-3.5 h-3.5 text-brand" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand">My Account</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-gray-900 leading-tight">
          Your training profile.
        </h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt={name} className="w-14 h-14 rounded-full border border-gray-200" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center">
              <User className="w-6 h-6 text-brand" />
            </div>
          )}
          <div className="min-w-0">
            <h2 className="font-heading text-xl font-bold uppercase text-gray-900 truncate">{name}</h2>
            <p className="text-sm text-gray-500 truncate">{email}</p>
          </div>
        </div>

        <dl className="space-y-3">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</dt>
              <dd className="text-sm text-gray-800 truncate">{email}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined</dt>
              <dd className="text-sm text-gray-800">{joined}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            <div>
              <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Plan</dt>
              <dd className="text-sm text-gray-800">7-Day Training (Free)</dd>
            </div>
          </div>
        </dl>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 mb-6">
        <h3 className="font-heading text-lg font-bold uppercase mb-2">Upgrade your account</h3>
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          Done-with-you package: we build your landing page, automations, voicemail drops, ManyChat -- everything. You show up.
        </p>
        <Link
          href="/upgrade"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-lg transition-colors"
        >
          See the upgrade
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <SignOutButton>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-red-600 transition-colors">
            <LogOut className="w-4 h-4" />
            Sign out of all devices
          </button>
        </SignOutButton>
      </div>
    </div>
  )
}
