'use client'

import { FileText, Link as LinkIcon, Download, ExternalLink, Image as ImageIcon, ListChecks, Sparkles, Clock, ArrowRight, Lightbulb } from 'lucide-react'

export interface Resource {
  id: string
  title: string
  url: string
  type: 'pdf' | 'link' | 'download' | 'guide' | 'infographic' | 'sop' | 'action'
  description?: string
}

interface ResourceListProps {
  resources: Resource[]
}

const typeMeta: Record<Resource['type'], { icon: typeof FileText; label: string }> = {
  pdf:          { icon: FileText,    label: 'PDF Guide' },
  link:         { icon: LinkIcon,    label: 'Link' },
  download:     { icon: Download,    label: 'Download' },
  guide:        { icon: FileText,    label: 'Guide' },
  infographic:  { icon: ImageIcon,   label: 'Infographic' },
  sop:          { icon: ListChecks,  label: 'SOP / Action Steps' },
  action:       { icon: Lightbulb,   label: 'Action Step' },
}

export default function ResourceList({ resources }: ResourceListProps) {
  return (
    <div className="mt-10 space-y-6">

      {/* Resource cards */}
      {resources.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-gray-200" />
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-gray-500">
              Resources for this video
            </h3>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {resources.map(r => {
              const meta = typeMeta[r.type] || typeMeta.link
              const Icon = meta.icon
              const isInternal = r.url.startsWith('/') || r.url.includes('theproblemguide.com')
              return (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 bg-white border border-gray-200 hover:border-brand hover:shadow-sm rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand mb-0.5">{meta.label}</p>
                    <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-brand transition-colors">
                      {r.title}
                    </p>
                    {r.description && (
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{r.description}</p>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-brand transition-colors shrink-0 mt-1" />
                </a>
              )
            })}
          </div>
        </section>
      )}

      {/* SMB $125 credit CTA -- shown under every video */}
      <section>
        <a
          href="https://startmybusiness.us/?ref=tpg&utm_source=training&utm_medium=video"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl overflow-hidden border border-brand/20 shadow-sm hover:shadow-lg transition-all group"
        >
          <img
            src="/smb-125-credit.png"
            alt="Get $125 credit when you sign up at StartMyBusiness.us"
            className="w-full h-auto block"
          />
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">Members-Only Bonus</span>
            </div>
            <h3 className="font-heading text-xl font-bold uppercase leading-tight mb-2">
              Get $125 Free Credit at Start My Business
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Every Problem Guide member gets a $125 sign-up credit. Stack it toward your $495 Done-With-You upgrade -- but it expires fast.
            </p>
            <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
              <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
              <p className="text-xs text-yellow-200 leading-tight">
                <strong>Must claim within 24 hours of signup.</strong> No card needed.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand-dark text-white text-sm font-bold uppercase tracking-wide rounded-lg transition-colors">
              Claim My $125 Credit
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </a>
      </section>

      {/* Disclosure: we only recommend Claude */}
      <section className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 leading-relaxed">
        <strong>Note:</strong> The Problem Guide only recommends <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-amber-900 underline font-semibold">Claude.ai</a> as your AI assistant. We do not endorse or recommend ChatGPT or other models. Claude is the tool every example in this training is built around.
      </section>
    </div>
  )
}
