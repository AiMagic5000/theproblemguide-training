'use client'

import { SignIn } from '@clerk/nextjs'
import { CheckCircle2, Clock, Lock, Sparkles } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">

      {/* LEFT: branded hero -- desktop only */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-[#3a0d14]" />
        <div className="absolute inset-0 opacity-30"
             style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(207,1,29,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(207,1,29,0.25), transparent 50%)' }} />

        {/* Mascot photo bottom-right, large, transparent bg blends w/ gradient */}
        <img
          src="/tpg-mascot.png"
          alt=""
          aria-hidden="true"
          className="absolute right-0 bottom-0 w-[70%] max-w-[520px] object-contain drop-shadow-2xl pointer-events-none select-none"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">The Problem Guide</span>
            </div>
            <h1 className="font-heading text-5xl xl:text-6xl font-bold uppercase leading-[1.02] mb-6">
              Welcome to your<br />
              <span className="text-brand">7-Day AI</span> training.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-md">
              You did the hard part already -- you started. Sign in to unlock Day 1.
            </p>
          </div>

          <div className="space-y-3 max-w-md">
            <Benefit icon={Clock} text="45 minutes a day. Real action, not theory." />
            <Benefit icon={Lock} text="One section unlocks daily. Designed for habit." />
            <Benefit icon={CheckCircle2} text="Day 7: you have something real that you built." />
          </div>

          <div className="text-xs text-white/40 uppercase tracking-wider">
            theproblemguide.com
          </div>
        </div>
      </div>

      {/* RIGHT: sign-in card */}
      <div className="flex-1 lg:w-1/2 flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-50 to-white">

        {/* Mobile-only mini hero w/ mascot */}
        <div className="lg:hidden text-center mb-6 max-w-sm">
          <img
            src="/tpg-mascot.png"
            alt="The Problem Guide"
            className="w-32 h-32 object-contain mx-auto mb-3 drop-shadow-md"
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 mb-3">
            <Sparkles className="w-3 h-3 text-brand" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">The Problem Guide</span>
          </div>
          <h1 className="font-heading text-3xl font-bold uppercase text-gray-900 leading-tight mb-2">
            Welcome to your<br /><span className="text-brand">7-Day Training</span>
          </h1>
          <p className="text-sm text-gray-500">Sign in to unlock Day 1.</p>
        </div>

        {/* Clerk component */}
        <div className="w-full max-w-md">
          <SignIn
            appearance={{
              variables: {
                colorPrimary: '#cf011d',
                colorText: '#111',
                colorTextSecondary: '#555',
                colorBackground: '#ffffff',
                colorInputBackground: '#fafafa',
                borderRadius: '12px',
                fontFamily: 'Inter, system-ui, sans-serif',
              },
              elements: {
                rootBox: 'w-full',
                card: 'shadow-xl rounded-2xl border border-gray-200 p-8',
                headerTitle: 'font-heading uppercase tracking-wide text-gray-900',
                headerSubtitle: 'text-gray-500',
                socialButtonsBlockButton: 'border border-gray-200 hover:bg-gray-50 transition-colors',
                socialButtonsBlockButtonText: 'font-semibold',
                formButtonPrimary: 'bg-brand hover:bg-brand-dark transition-colors font-bold uppercase tracking-wide',
                footerActionLink: 'text-brand hover:text-brand-dark',
                identityPreviewEditButton: 'text-brand',
              },
            }}
            forceRedirectUrl="/training"
          />

          <p className="text-center text-xs text-gray-400 mt-6 max-w-sm mx-auto leading-relaxed">
            By signing in you agree to our{' '}
            <a href="https://theproblemguide.com/terms" className="text-gray-500 underline" target="_blank">Terms</a>{' '}
            and{' '}
            <a href="https://theproblemguide.com/privacy" className="text-gray-500 underline" target="_blank">Privacy Policy</a>.
            One section unlocks per day. That's the deal.
          </p>
        </div>
      </div>
    </div>
  )
}

function Benefit({ icon: Icon, text }: { icon: typeof Clock; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
        <Icon className="w-4 h-4 text-brand" />
      </div>
      <p className="text-sm text-white/85 leading-relaxed pt-1">{text}</p>
    </div>
  )
}
