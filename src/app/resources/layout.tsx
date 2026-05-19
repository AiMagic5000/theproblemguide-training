import TrainingSidebar from '@/components/training-sidebar'

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <TrainingSidebar />
      <main className="flex-1 lg:ml-0 pl-16 pr-4 pt-16 pb-8 sm:px-6 sm:pt-16 lg:p-10">{children}</main>
    </div>
  )
}
