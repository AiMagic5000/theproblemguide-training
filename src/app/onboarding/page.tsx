'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight, Building2, Target, Palette, Globe, Phone, AtSign, Image as ImageIcon, NotebookPen, Sparkles } from 'lucide-react'

interface FormData {
  // 1. Buyer + business
  buyerName: string
  buyerEmail: string
  gumroadOrderId: string
  businessName: string
  businessNiche: string
  existingWebsite: string
  // 2. Offer
  offerName: string
  offerPrice: string
  offerDescription: string
  leadMagnet: string
  // 3. Brand
  brandColors: string
  brandVoice: string
  keyMessages: string
  dontsList: string
  // 4. Domain
  domainPref1: string
  domainPref2: string
  domainPref3: string
  // 5. Phone
  forwardPhone: string
  businessHours: string
  // 6. Social
  instagramHandle: string
  instagramAccessPlan: 'login' | 'collab' | 'have_manychat' | 'none'
  tiktokHandle: string
  hasManyChat: boolean
  // 7. Existing accounts
  existingMailbox: string
  existingTools: string
  // 8. Notes
  freeNotes: string
}

const SECTIONS = [
  { key: 'business', title: 'Your business', icon: Building2 },
  { key: 'offer', title: 'Your offer', icon: Target },
  { key: 'brand', title: 'Your brand voice', icon: Palette },
  { key: 'domain', title: 'Domain preferences', icon: Globe },
  { key: 'phone', title: 'Phone forwarding', icon: Phone },
  { key: 'social', title: 'Social media', icon: AtSign },
  { key: 'accounts', title: 'Existing tools', icon: NotebookPen },
  { key: 'review', title: 'Final notes', icon: Sparkles },
] as const

const INITIAL: FormData = {
  buyerName: '',
  buyerEmail: '',
  gumroadOrderId: '',
  businessName: '',
  businessNiche: '',
  existingWebsite: '',
  offerName: '',
  offerPrice: '',
  offerDescription: '',
  leadMagnet: '',
  brandColors: '',
  brandVoice: '',
  keyMessages: '',
  dontsList: '',
  domainPref1: '',
  domainPref2: '',
  domainPref3: '',
  forwardPhone: '',
  businessHours: '',
  instagramHandle: '',
  instagramAccessPlan: 'collab',
  tiktokHandle: '',
  hasManyChat: false,
  existingMailbox: '',
  existingTools: '',
  freeNotes: '',
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData(d => ({ ...d, [key]: value }))
  }

  async function submit() {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Submission failed')
      }
      setDone(true)
    } catch (e: any) {
      setError(e.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-heading text-3xl font-bold uppercase text-gray-900 mb-3">You're In.</h1>
          <p className="text-gray-600 mb-2">We received everything. Our team starts building your system today.</p>
          <p className="text-sm text-gray-500 mb-8">Expect your first check-in email within 24 hours from <a className="text-brand" href="mailto:get@theproblemguide.com">get@theproblemguide.com</a>. Full delivery in 5-7 business days.</p>
          <a href="/training" className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-heading font-bold uppercase tracking-wide rounded-xl hover:bg-brand-dark transition-colors">
            Continue Training <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    )
  }

  const sec = SECTIONS[step]
  const SectionIcon = sec.icon
  const isLast = step === SECTIONS.length - 1

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/15 mb-4">
            <Sparkles className="w-3 h-3 text-brand" />
            <span className="text-xs font-semibold text-brand uppercase tracking-wider">Business Onboarding</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-gray-900 mb-2">Tell Us About Your Business</h1>
          <p className="text-gray-500 max-w-md mx-auto">10 minutes from you. 5-7 days for us. You're handed the keys to a complete AI business system.</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Step {step + 1} of {SECTIONS.length}</span>
            <span>{Math.round(((step + 1) / SECTIONS.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand transition-all duration-300"
              style={{ width: `${((step + 1) / SECTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Section card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center shrink-0">
              <SectionIcon className="w-5 h-5 text-brand" />
            </div>
            <h2 className="font-heading text-xl font-bold uppercase text-gray-900">{sec.title}</h2>
          </div>

          {/* SECTION CONTENT */}
          {sec.key === 'business' && (
            <div className="space-y-4">
              <Field label="Your full name" required>
                <input value={data.buyerName} onChange={e => update('buyerName', e.target.value)} className={inputCls} placeholder="Jordan Smith" />
              </Field>
              <Field label="Your email (the one tied to your Gumroad purchase)" required>
                <input type="email" value={data.buyerEmail} onChange={e => update('buyerEmail', e.target.value)} className={inputCls} placeholder="you@yourdomain.com" />
              </Field>
              <Field label="Gumroad order ID (from your receipt)" hint="Find this in the Gumroad receipt email. Optional but helps us match you fast.">
                <input value={data.gumroadOrderId} onChange={e => update('gumroadOrderId', e.target.value)} className={inputCls} placeholder="ord_abc123" />
              </Field>
              <Field label="Business name" required>
                <input value={data.businessName} onChange={e => update('businessName', e.target.value)} className={inputCls} placeholder="Empire Builders Co." />
              </Field>
              <Field label="What does your business do? (one sentence)" required>
                <textarea value={data.businessNiche} onChange={e => update('businessNiche', e.target.value)} rows={2} className={inputCls} placeholder="We help new entrepreneurs launch profitable AI side businesses without tech experience." />
              </Field>
              <Field label="Existing website URL (leave blank if none)">
                <input value={data.existingWebsite} onChange={e => update('existingWebsite', e.target.value)} className={inputCls} placeholder="https://example.com" />
              </Field>
            </div>
          )}

          {sec.key === 'offer' && (
            <div className="space-y-4">
              <Field label="What are you selling or promoting?" required>
                <input value={data.offerName} onChange={e => update('offerName', e.target.value)} className={inputCls} placeholder="AI Side Hustle Bootcamp" />
              </Field>
              <Field label="Price (or 'free lead magnet')">
                <input value={data.offerPrice} onChange={e => update('offerPrice', e.target.value)} className={inputCls} placeholder="$97 / free guide / $497 program" />
              </Field>
              <Field label="Describe the offer in 2-3 sentences" required>
                <textarea value={data.offerDescription} onChange={e => update('offerDescription', e.target.value)} rows={4} className={inputCls} placeholder="What they get. Who it is for. What changes after they buy." />
              </Field>
              <Field label="Free lead magnet (what we'll give away to capture emails)" hint="A free PDF, mini-course, checklist, quiz... whatever you offer in exchange for an email + phone number.">
                <textarea value={data.leadMagnet} onChange={e => update('leadMagnet', e.target.value)} rows={2} className={inputCls} placeholder="Free 7-day AI starter guide" />
              </Field>
            </div>
          )}

          {sec.key === 'brand' && (
            <div className="space-y-4">
              <Field label="Brand colors (hex or describe)" hint="If you don't have any, leave blank -- we'll pick.">
                <input value={data.brandColors} onChange={e => update('brandColors', e.target.value)} className={inputCls} placeholder="#cf011d, black, white -- or 'warm + premium'" />
              </Field>
              <Field label="Brand voice / tone" required>
                <textarea value={data.brandVoice} onChange={e => update('brandVoice', e.target.value)} rows={3} className={inputCls} placeholder="Bold + direct. No fluff. Talks to entrepreneurs like a mentor, not a salesperson." />
              </Field>
              <Field label="3-5 key messages you want repeated everywhere" hint="Hooks, taglines, promises. Comma-separated or one per line.">
                <textarea value={data.keyMessages} onChange={e => update('keyMessages', e.target.value)} rows={3} className={inputCls} placeholder="Stop waiting. Start ugly. Action over information. Foundation in 7 days." />
              </Field>
              <Field label="Things to NEVER do or say">
                <textarea value={data.dontsList} onChange={e => update('dontsList', e.target.value)} rows={2} className={inputCls} placeholder="No emojis. No 'gurus'. No fake scarcity." />
              </Field>
            </div>
          )}

          {sec.key === 'domain' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed">Give us 3 domain options ranked by preference. We'll register the first one that's available.</p>
              <Field label="Domain choice #1" required>
                <input value={data.domainPref1} onChange={e => update('domainPref1', e.target.value)} className={inputCls} placeholder="empirebuilders.co" />
              </Field>
              <Field label="Domain choice #2" required>
                <input value={data.domainPref2} onChange={e => update('domainPref2', e.target.value)} className={inputCls} placeholder="empirebuilders.com" />
              </Field>
              <Field label="Domain choice #3" required>
                <input value={data.domainPref3} onChange={e => update('domainPref3', e.target.value)} className={inputCls} placeholder="getempirebuilders.com" />
              </Field>
            </div>
          )}

          {sec.key === 'phone' && (
            <div className="space-y-4">
              <Field label="Personal phone we'll forward business calls to" required>
                <input type="tel" value={data.forwardPhone} onChange={e => update('forwardPhone', e.target.value)} className={inputCls} placeholder="+1 555 123 4567" />
              </Field>
              <Field label="Business hours" hint="When you want calls to ring through. Outside these we'll voicemail.">
                <input value={data.businessHours} onChange={e => update('businessHours', e.target.value)} className={inputCls} placeholder="Mon-Fri 9am-6pm CT" />
              </Field>
            </div>
          )}

          {sec.key === 'social' && (
            <div className="space-y-4">
              <Field label="Instagram handle">
                <input value={data.instagramHandle} onChange={e => update('instagramHandle', e.target.value)} className={inputCls} placeholder="@yourhandle" />
              </Field>
              <Field label="How will we get Instagram access for ManyChat?" required>
                <select value={data.instagramAccessPlan} onChange={e => update('instagramAccessPlan', e.target.value as FormData['instagramAccessPlan'])} className={inputCls}>
                  <option value="collab">Add @theproblemguide as a Collaborator/Editor</option>
                  <option value="login">I'll send a temporary login (separate secure message)</option>
                  <option value="have_manychat">I already have ManyChat connected</option>
                  <option value="none">I don't have Instagram yet -- help me set one up</option>
                </select>
              </Field>
              <Field label="TikTok handle (optional)">
                <input value={data.tiktokHandle} onChange={e => update('tiktokHandle', e.target.value)} className={inputCls} placeholder="@yourhandle" />
              </Field>
              <Field label="Do you already have a ManyChat account?" hint="If yes we'll send you a connection request. If no we'll create one under your business email.">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={data.hasManyChat} onChange={e => update('hasManyChat', e.target.checked)} className="rounded" />
                  Yes, I already have ManyChat
                </label>
              </Field>
            </div>
          )}

          {sec.key === 'accounts' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed">Help us avoid creating duplicate accounts. List anything you already use.</p>
              <Field label="Existing business email (if any)" hint="If you have a hello@ or info@ already, tell us. Otherwise we'll create one for you on your new domain.">
                <input value={data.existingMailbox} onChange={e => update('existingMailbox', e.target.value)} className={inputCls} placeholder="hello@empirebuilders.com" />
              </Field>
              <Field label="Other tools you already pay for" hint="Calendly, ConvertKit, Klaviyo, Carrd, Wix, etc. We'll wire into them or migrate.">
                <textarea value={data.existingTools} onChange={e => update('existingTools', e.target.value)} rows={3} className={inputCls} placeholder="Calendly Pro account, MailerLite free plan, Carrd basic site" />
              </Field>
            </div>
          )}

          {sec.key === 'review' && (
            <div className="space-y-4">
              <Field label="Anything else we should know?" hint="Logo file, brand guidelines, audience research, anything that helps us build it the right way the first time. You can also reply to our welcome email with attachments.">
                <textarea value={data.freeNotes} onChange={e => update('freeNotes', e.target.value)} rows={6} className={inputCls} placeholder="Logo file is attached to our welcome email. Audience is mostly 30-50 year-olds in Texas. Want a Southern + premium feel." />
              </Field>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <strong>One more thing:</strong> Send any logo files, brand guidelines, or reference websites to <a href="mailto:get@theproblemguide.com" className="underline">get@theproblemguide.com</a> after you submit. We'll match it to your record.
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
              )}
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 disabled:opacity-40"
          >Back</button>

          {!isLast ? (
            <button
              onClick={() => setStep(s => Math.min(SECTIONS.length - 1, s + 1))}
              className="px-6 py-2.5 bg-brand hover:bg-brand-dark text-white font-heading font-bold uppercase tracking-wide rounded-xl transition-colors text-sm flex items-center gap-2"
            >Continue<ArrowRight className="w-4 h-4" /></button>
          ) : (
            <button
              onClick={submit}
              disabled={submitting}
              className="px-6 py-2.5 bg-brand hover:bg-brand-dark text-white font-heading font-bold uppercase tracking-wide rounded-xl transition-colors text-sm flex items-center gap-2 disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : (<>Submit & Build My System<ArrowRight className="w-4 h-4" /></>)}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const inputCls = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white placeholder:text-gray-400"

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
        {label}{required && <span className="text-brand ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-500 mb-2 leading-relaxed">{hint}</p>}
      {children}
    </div>
  )
}
