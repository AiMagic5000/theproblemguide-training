'use client'

import { FileText, Link as LinkIcon, Download, ExternalLink } from 'lucide-react'

export interface Resource {
  id: string
  title: string
  url: string
  type: 'pdf' | 'link' | 'download' | 'guide'
}

interface ResourceListProps {
  resources: Resource[]
}

const typeIcons = {
  pdf: FileText,
  link: LinkIcon,
  download: Download,
  guide: FileText,
}

const typeLabels = {
  pdf: 'PDF',
  link: 'Link',
  download: 'Download',
  guide: 'Guide',
}

export default function ResourceList({ resources }: ResourceListProps) {
  if (resources.length === 0) return null

  return (
    <div className="mt-8">
      <h3 className="font-heading text-lg font-bold uppercase text-gray-900 mb-3">
        Resources
      </h3>
      <div className="space-y-2">
        {resources.map(resource => {
          const Icon = typeIcons[resource.type] || LinkIcon

          return (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {resource.title}
                </p>
                <p className="text-xs text-gray-400">{typeLabels[resource.type]}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </a>
          )
        })}
      </div>
    </div>
  )
}
