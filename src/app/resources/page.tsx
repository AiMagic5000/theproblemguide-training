import { BookOpen, FileText, Download, ExternalLink } from 'lucide-react'

const resources = [
  {
    title: 'The Problem -- 2026 Report (PDF)',
    description: 'The original report. The argument behind everything in this training. Read it slow. 45 min.',
    icon: FileText,
    href: 'https://theproblemguide.com/the-problem-2026-report.pdf',
    external: true,
  },
  {
    title: 'The Problem -- Mobile-Readable PDF',
    description: 'Same report, sized for phone reading. Bigger fonts. Easier on the eyes.',
    icon: FileText,
    href: 'https://theproblemguide.com/the-problem-2026-report-mobile.pdf',
    external: true,
  },
  {
    title: 'Sample Voicedrop (MP3)',
    description: 'The actual ringless voicemail we send every new signup. Listen for the tone.',
    icon: Download,
    href: '/voicedrop-sample.mp3',
    external: false,
  },
]

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/15 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-brand" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand">Resource Library</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-gray-900 leading-tight mb-2">
          Everything in one place.
        </h1>
        <p className="text-gray-500 max-w-xl">
          The report, the templates, the prompt packs, and the sample assets we use to build automations for upgrade buyers. Bookmark this page.
        </p>
      </div>

      <div className="space-y-3">
        {resources.map((r, i) => {
          const Icon = r.icon
          return (
            <a
              key={i}
              href={r.href}
              target={r.external ? '_blank' : undefined}
              rel={r.external ? 'noopener' : undefined}
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-brand hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold uppercase text-gray-900 group-hover:text-brand transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mt-1">{r.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-brand transition-colors shrink-0 mt-1" />
            </a>
          )
        })}
      </div>

      <div className="mt-10 p-5 rounded-xl bg-amber-50 border border-amber-200">
        <p className="text-sm text-amber-900 leading-relaxed">
          <strong>More on the way.</strong> Done-for-you prompt packs, swipe files, the automation flow JSON, and Higgsfield image templates drop here as we build them. Check back after Day 3.
        </p>
      </div>
    </div>
  )
}
