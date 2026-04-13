import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'
import { Shield, ArrowLeft, LogOut } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  const adminEmail = process.env.ADMIN_EMAIL || 'coreypearsonemail@gmail.com'

  const userEmail = user?.emailAddresses?.[0]?.emailAddress
  if (userEmail !== adminEmail) {
    redirect('/training')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-brand" />
            <h1 className="font-heading text-lg font-bold uppercase text-gray-900">
              Admin Panel
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/training"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Training
            </Link>
            <SignOutButton>
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
