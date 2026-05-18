'use client'

import { useState } from 'react'
import {
  Globe, Mail, MessageSquare, Phone, Bot, Shield, Camera,
  Zap, BarChart3, ArrowRight, CheckCircle2, Play,
  Smartphone, FileText, Users, TrendingUp,
  ChevronDown, Sparkles, Clock, DollarSign, Star, Info,
} from 'lucide-react'

type MediaSpec =
  | { mediaType: 'image'; src: string; label: string }
  | { mediaType: 'audio'; src: string; label: string }
  | { mediaType: 'video'; src: string; label: string }

interface Feature {
  icon: typeof Globe
  title: string
  tagline: string
  description: string
  details: string[]
  media: MediaSpec
}

const features: Feature[] = [
  {
    icon: Globe,
    title: 'Your Own Landing Page',
    tagline: 'On your own domain -- built to convert',
    description: 'We buy and configure your custom domain, design a high-converting landing page, and deploy it. Mobile-optimized. Fast. Professional. Your visitors see YOUR brand, not some generic template.',
    details: [
      'Custom domain purchased and configured',
      'Landing page designed around your offer',
      'Mobile-responsive, fast-loading design',
      'Thank-you page with instant delivery',
      'SSL certificate (security lock icon)',
    ],
    media: { mediaType: 'image', src: '/upgrade/landing.jpg', label: 'Landing page preview' },
  },
  {
    icon: Mail,
    title: 'Email Automation',
    tagline: 'Welcome emails that actually get delivered',
    description: 'We create your professional email address on your domain, set up all the behind-the-scenes settings (SPF, DKIM, DMARC) so your emails land in the inbox -- not spam. Then we build your entire welcome sequence.',
    details: [
      'Professional email (hello@yourdomain.com)',
      'Deliverability setup (inbox, not spam)',
      'Automated welcome email on signup',
      '7-day follow-up drip sequence',
      'Upsell email at the right moment',
    ],
    media: { mediaType: 'image', src: '/upgrade/email.jpg', label: 'Email automation flow' },
  },
  {
    icon: MessageSquare,
    title: 'SMS Drip Sequence',
    tagline: 'Text messages that keep them engaged',
    description: 'When someone signs up, they get an instant text with their download link. Then smart follow-ups on Day 3, Day 7, and Day 8 keep them moving through your funnel. All automated. All compliant.',
    details: [
      'Instant welcome text on signup',
      'Smart follow-up texts (Day 3, 7, 8)',
      'Personalized with their name',
      'STOP opt-out built in (compliant)',
      'Delivered through real phone numbers',
    ],
    media: { mediaType: 'image', src: '/upgrade/sms.jpg', label: 'SMS sequence preview' },
  },
  {
    icon: Phone,
    title: 'Ringless Voicemail Drops',
    tagline: 'A personal touch without the cold call',
    description: 'Your leads wake up to a voicemail from you -- without their phone ever ringing. It feels personal. It builds trust. And it works. We record the script (or use AI voice cloning) and automate the delivery.',
    details: [
      'Welcome voicemail on signup',
      'Congratulations voicemail on Day 7',
      'No cold calling -- their phone never rings',
      'Professional AI voice or your own recording',
      'Automated delivery through our system',
    ],
    media: { mediaType: 'audio', src: '/voicedrop-sample.mp3', label: 'Listen to the actual voicedrop we send TPG signups' },
  },
  {
    icon: Camera,
    title: '1 Month Social Media Management',
    tagline: 'Instagram + TikTok on autopilot with ManyChat',
    description: 'This is the money machine. We connect ManyChat to your Instagram and TikTok. When someone comments on your post or DMs you a keyword, they automatically get your offer link. One sponsored post can generate signups for days.',
    details: [
      'ManyChat connected to Instagram + TikTok',
      'Auto-reply to comments on your posts',
      'Auto-DM when someone sends a keyword',
      '30 days of content planned and scheduled',
      'Keyword triggers for common questions',
    ],
    media: { mediaType: 'image', src: '/upgrade/manychat.jpg', label: 'ManyChat automation preview' },
  },
  {
    icon: Bot,
    title: 'AI Chatbot On Your Site',
    tagline: 'Answers questions and books calls 24/7',
    description: 'We train an AI chatbot on your offer. It sits on your landing page and answers questions, handles objections, and books Calendly meetings -- even at 3 AM. Plus, it is white-label. You can resell this exact chatbot to YOUR clients.',
    details: [
      'Trained on your specific offer and FAQ',
      'Answers visitor questions in real time',
      'Books Calendly or Zoom meetings for you',
      'White-label -- resell to your own clients',
      'Works 24/7, never takes a day off',
    ],
    media: { mediaType: 'image', src: '/upgrade/chatbot.jpg', label: 'Chatbot conversation preview' },
  },
  {
    icon: Shield,
    title: 'Legal Pages & Compliance',
    tagline: 'Terms, Privacy, E-Sign -- done right',
    description: 'Every business needs these. We create your Terms of Service, Privacy Policy, and E-Sign Consent pages customized to your business. Proper opt-in language, TCPA compliance, and CAN-SPAM compliance built in.',
    details: [
      'Terms of Service page',
      'Privacy Policy page',
      'E-Sign Consent page',
      'TCPA-compliant opt-in language',
      'All linked from your landing page',
    ],
    media: { mediaType: 'image', src: '/upgrade/legal.jpg', label: 'Legal pages example' },
  },
  {
    icon: Smartphone,
    title: 'Phone Number Setup',
    tagline: 'A real number for your business',
    description: 'We set up a free business phone number that forwards to your personal cell. Your leads call your business number. You answer on your phone. Professional from day one.',
    details: [
      'Free business phone number',
      'Forwards to your personal phone',
      'Use for SMS, calls, and voicemail',
      'Separate from your personal number',
      'Set up and ready to use',
    ],
    media: { mediaType: 'image', src: '/upgrade/phone.jpg', label: 'Phone setup overview' },
  },
]

const faqs = [
  {
    q: 'How long does setup take?',
    a: '5-7 business days after payment. We handle everything. You just answer a few questions about your offer and we build it all.',
  },
  {
    q: 'Do I need any tech skills?',
    a: 'Zero. That is literally the point. We build everything for you. We hand you the keys when it is done.',
  },
  {
    q: 'What do I need to provide?',
    a: 'Your offer details (what you sell or what you want to promote), your preferred domain name, and access to your Instagram account for ManyChat setup. That is it.',
  },
  {
    q: 'Can I really make money from 1-3 sponsored posts?',
    a: 'Yes. Here is how it works: you sponsor a post on Instagram or TikTok. ManyChat auto-replies to every comment and DM. Those people get sent to your landing page. They sign up. They get your email, text, and voicemail automatically. The system does the follow-up for you. One good post can generate signups for days.',
  },
  {
    q: 'What if I do not have an Instagram or TikTok?',
    a: 'We will help you set one up. Or we can focus the automation on other channels like email and direct traffic. The system works either way.',
  },
  {
    q: 'What is the 2-payment option?',
    a: '2 payments of $275 ($550 total) instead of one payment of $495. After payment 1, we build your landing page, legal pages, phone number, AI chatbot, and write your email sequences. After payment 2, we activate everything: ManyChat automation, SMS drip, voicemail drops, email sequences go live, and the chatbot goes on your landing page. Pay in full to save $55.',
  },
  {
    q: 'Can I use this for any type of business?',
    a: 'Yes. Coaching, consulting, digital products, local services, online courses -- this system works for anyone who wants automated lead capture and follow-up.',
  },
]

function FeatureMedia({ media }: { media: MediaSpec }) {
  if (media.mediaType === 'audio') {
    return (
      <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 rounded-full bg-brand/15 border-2 border-brand/40 flex items-center justify-center shadow-lg mx-auto mb-4">
            <Play className="w-6 h-6 text-brand ml-1" />
          </div>
          <p className="text-xs text-gray-300 font-medium uppercase tracking-wider mb-3">
            {media.label}
          </p>
          <audio
            controls
            preload="metadata"
            className="w-full max-w-xs mx-auto"
            style={{ filter: 'invert(0.85)' }}
          >
            <source src={media.src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    )
  }
  if (media.mediaType === 'video') {
    return (
      <div className="relative w-full aspect-video bg-black rounded-xl border border-gray-200 overflow-hidden">
        <video
          controls
          preload="metadata"
          playsInline
          poster="/voicedrop-sample-poster.jpg"
          className="w-full h-full object-contain"
        >
          <source src={media.src} type="video/mp4" />
        </video>
      </div>
    )
  }
  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
      <img
        src={media.src}
        alt={media.label}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )
}

function FlowMedia() {
  return (
    <div className="relative w-full aspect-video bg-black rounded-xl border border-gray-200 overflow-hidden shadow-lg">
      <video
        controls
        preload="metadata"
        playsInline
        poster="/flow-video-poster.jpg"
        className="absolute inset-0 w-full h-full object-contain"
      >
        <source src="/flow-video.mp4" type="video/mp4" />
        Your browser does not support embedded video.
      </video>
    </div>
  )
}

export default function UpgradePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'split'>('full')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="relative max-w-3xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 border border-brand/15 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span className="text-xs font-semibold text-brand uppercase tracking-wider">
              Done-With-You Package
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-[3.5rem] font-bold uppercase text-gray-900 leading-[1.05] mb-4">
            We Build Your Entire<br />
            <span className="text-brand">AI Business System</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-3 leading-relaxed">
            Landing page. Email automations. SMS. Voicemail drops. Social media with ManyChat.
            AI chatbot. Legal pages. Phone number. All of it -- done for you.
          </p>

          <p className="text-sm text-gray-400 mb-8">
            You just show up. We build the machine that keeps the money rolling.
          </p>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setPaymentPlan('full')}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                  paymentPlan === 'full'
                    ? 'text-brand border-b-2 border-brand bg-brand/5'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Pay in Full
              </button>
              <button
                onClick={() => setPaymentPlan('split')}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                  paymentPlan === 'split'
                    ? 'text-brand border-b-2 border-brand bg-brand/5'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                2 Payments
              </button>
            </div>

            <div className="p-6">
              {paymentPlan === 'full' ? (
                <div>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-5xl font-bold text-gray-900">$495</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 mb-4">
                    <DollarSign className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">Save $55 vs. payment plan</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-5">One payment. Everything built and activated immediately.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-5xl font-bold text-gray-900">$275</span>
                    <span className="text-lg text-gray-400">x 2</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">$550 total. We start building after payment 1.</p>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3 text-left">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="text-xs font-semibold text-blue-700">After Payment 1 -- We Build:</span>
                    </div>
                    <ul className="space-y-1 ml-5">
                      <li className="text-xs text-blue-600 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />Landing page on your domain</li>
                      <li className="text-xs text-blue-600 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />Legal pages (Terms, Privacy, E-Sign)</li>
                      <li className="text-xs text-blue-600 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />Business phone number</li>
                      <li className="text-xs text-blue-600 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />AI chatbot trained on your offer</li>
                      <li className="text-xs text-blue-600 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />Email sequences written (drafts ready)</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-4 text-left">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-xs font-semibold text-amber-700">After Payment 2 -- We Activate:</span>
                    </div>
                    <ul className="space-y-1 ml-5">
                      <li className="text-xs text-amber-600 flex items-center gap-1.5"><Zap className="w-3 h-3 text-amber-400 shrink-0" />ManyChat automation (Instagram + TikTok)</li>
                      <li className="text-xs text-amber-600 flex items-center gap-1.5"><Zap className="w-3 h-3 text-amber-400 shrink-0" />SMS drip sequences go live</li>
                      <li className="text-xs text-amber-600 flex items-center gap-1.5"><Zap className="w-3 h-3 text-amber-400 shrink-0" />Voicemail drops activated</li>
                      <li className="text-xs text-amber-600 flex items-center gap-1.5"><Zap className="w-3 h-3 text-amber-400 shrink-0" />Email automation turned on</li>
                      <li className="text-xs text-amber-600 flex items-center gap-1.5"><Zap className="w-3 h-3 text-amber-400 shrink-0" />Chatbot embedded on landing page</li>
                    </ul>
                  </div>
                </div>
              )}

              <a
                href={paymentPlan === 'full' ? 'https://coreypearson.gumroad.com/l/hhgqmv' : 'https://coreypearson.gumroad.com/l/tjgumb'}
                className="block w-full py-4 bg-brand hover:bg-brand-dark text-white font-heading text-lg font-bold uppercase tracking-wide rounded-xl transition-all hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98]"
              >
                {paymentPlan === 'full' ? 'Get My System Built' : 'Start With Payment 1'}
              </a>

              {paymentPlan === 'full' && (
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />5-7 day delivery</span>
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" />Secure checkout</span>
                </div>
              )}
              {paymentPlan === 'split' && (
                <p className="text-[11px] text-gray-400 mt-3 text-center leading-relaxed">
                  Payment 2 due within 14 days. All automations activate after final payment.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The Math Section */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-5">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand text-center mb-2">
            Here is the math
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-gray-900 text-center mb-8">
            1-3 Sponsored Posts. The System Does The Rest.
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center mx-auto mb-3">
                <Camera className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-heading text-sm font-bold uppercase text-gray-900 mb-1">You Post</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Sponsor 1-3 posts on Instagram or TikTok. People comment or DM you.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-heading text-sm font-bold uppercase text-gray-900 mb-1">ManyChat Replies</h3>
              <p className="text-sm text-gray-500 leading-relaxed">ManyChat auto-replies to every comment and DM. Sends them to your landing page.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-heading text-sm font-bold uppercase text-gray-900 mb-1">System Follows Up</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Email, SMS, voicemail -- all fire automatically. You collect leads while you sleep.</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="flash-banner text-center font-heading font-bold uppercase text-brand tracking-wide text-sm sm:text-base px-4 py-3 mb-3">
              No offer to sell? We have 20 done-for-you offers ready, serviced digitally 24/7.
            </p>
            <FlowMedia />
            <p className="flash-banner text-center font-heading font-bold uppercase text-brand tracking-wide text-sm sm:text-base px-4 py-3 mt-3">
              No offer to sell? We have 20 done-for-you offers ready, serviced digitally 24/7.
            </p>
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes tpg-flash {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.985); }
        }
        .flash-banner {
          animation: tpg-flash 1.4s ease-in-out infinite;
          border: 1.5px dashed rgba(207, 1, 29, 0.4);
          border-radius: 10px;
          background: rgba(207, 1, 29, 0.04);
        }
      `}</style>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-5">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand text-center mb-2">
            Everything We Build For You
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-gray-900 text-center mb-12">
            8 Systems. Fully Automated. Yours Forever.
          </h2>

          <div className="space-y-16">
            {features.map((feature, i) => {
              const Icon = feature.icon
              const isEven = i % 2 === 0

              return (
                <div key={i} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-start`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-brand" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold uppercase text-gray-900 leading-tight">{feature.title}</h3>
                        <p className="text-sm text-gray-400">{feature.tagline}</p>
                      </div>
                    </div>
                    <p className="text-[15px] text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 w-full lg:max-w-sm">
                    <FeatureMedia media={feature.media} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-5">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand text-center mb-2">How It Works</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-gray-900 text-center mb-10">3 Steps. We Handle The Hard Part.</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'You Pay & Answer 5 Questions', desc: 'Tell us your offer, your domain preference, and give us Instagram access. That takes about 10 minutes.', icon: FileText },
              { step: '2', title: 'We Build Everything', desc: 'In 5-7 days, we set up your domain, landing page, email, SMS, voicemail, ManyChat, chatbot, legal pages, and phone number.', icon: Zap },
              { step: '3', title: 'You Post & Collect Leads', desc: 'We hand you the keys. You sponsor 1-3 posts. The system does the rest. Leads roll in on autopilot.', icon: DollarSign },
            ].map((item, i) => {
              const StepIcon = item.icon
              return (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 text-center relative">
                  <div className="w-8 h-8 rounded-full bg-brand text-white font-heading font-bold text-sm flex items-center justify-center mx-auto mb-4">{item.step}</div>
                  <StepIcon className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-heading text-sm font-bold uppercase text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-heading text-2xl font-bold uppercase text-gray-900 text-center mb-8">Do It Yourself vs. We Do It For You</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-3 text-center border-b border-gray-100 bg-gray-50">
              <div className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</div>
              <div className="py-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">DIY</div>
              <div className="py-3 px-2 text-xs font-semibold text-brand uppercase tracking-wider">We Do It</div>
            </div>
            {[
              ['Buy & configure domain', '2-4 hours', ''],
              ['Build landing page', '8-20 hours', ''],
              ['Email setup + deliverability', '3-5 hours', ''],
              ['SMS automation', '2-3 hours', ''],
              ['Voicemail drops', '1-2 hours', ''],
              ['ManyChat + Instagram', '4-6 hours', ''],
              ['AI chatbot training', '3-5 hours', ''],
              ['Legal pages', '2-3 hours', ''],
              ['Phone number', '1 hour', ''],
            ].map(([task, diy], i) => (
              <div key={i} className={`grid grid-cols-3 text-center ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                <div className="py-3 px-3 text-sm text-gray-700 text-left">{task}</div>
                <div className="py-3 px-2 text-sm text-gray-400">{diy}</div>
                <div className="py-3 px-2"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></div>
              </div>
            ))}
            <div className="grid grid-cols-3 text-center border-t border-gray-200 bg-gray-50">
              <div className="py-3 px-3 text-sm font-bold text-gray-900 text-left">Total</div>
              <div className="py-3 px-2 text-sm font-bold text-gray-400">26-49 hours</div>
              <div className="py-3 px-2 text-sm font-bold text-brand">10 minutes from you</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-2xl mx-auto px-5">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand text-center mb-2">Questions</p>
          <h2 className="font-heading text-2xl font-bold uppercase text-gray-900 text-center mb-8">Common Questions</h2>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 first:border-t">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className="text-[15px] font-semibold text-gray-800 group-hover:text-brand transition-colors pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="text-sm text-gray-500 leading-relaxed pb-4 pr-8">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-xl mx-auto px-5 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-white leading-tight mb-3">
            Stop Building.<br /><span className="text-brand">Start Collecting.</span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            You did the 7-day training. You know what AI can do. Now let us build the system that turns your knowledge into leads, followers, and revenue.
          </p>

          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={() => setPaymentPlan('full')}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${paymentPlan === 'full' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'}`}
              >$495 Best Value</button>
              <button
                onClick={() => setPaymentPlan('split')}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${paymentPlan === 'split' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'}`}
              >2x $275</button>
            </div>

            <a
              href={paymentPlan === 'full' ? 'https://coreypearson.gumroad.com/l/hhgqmv' : 'https://coreypearson.gumroad.com/l/tjgumb'}
              className="block w-full py-4 bg-brand hover:bg-brand-dark text-white font-heading text-xl font-bold uppercase tracking-wide rounded-xl transition-all hover:shadow-lg hover:shadow-brand/30 active:scale-[0.98] mb-4"
            >
              {paymentPlan === 'full' ? 'Get My System Built' : 'Start With Payment 1'}
              <ArrowRight className="inline w-5 h-5 ml-2" />
            </a>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />5-7 day delivery</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" />Secure payment</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />Real humans build it</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-6">
            Questions? Email <a href="mailto:get@theproblemguide.com" className="text-gray-400 underline underline-offset-2">get@theproblemguide.com</a>
          </p>
        </div>
      </section>

      <footer className="py-6 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-400">&copy; 2026 theproblemguide.com</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://theproblemguide.com/privacy.html" className="text-xs text-gray-400 hover:text-brand transition-colors">Privacy</a>
          <a href="https://theproblemguide.com/terms.html" className="text-xs text-gray-400 hover:text-brand transition-colors">Terms</a>
          <a href="mailto:get@theproblemguide.com" className="text-xs text-gray-400 hover:text-brand transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  )
}
