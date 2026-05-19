import TrainingSidebar from '@/components/training-sidebar'

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <TrainingSidebar />
      <main className="flex-1 lg:ml-0">
        <div className="max-w-4xl mx-auto pl-16 pr-4 pt-16 pb-8 sm:pl-16 sm:pr-6 sm:pt-14 lg:pl-10 lg:pr-10 lg:pt-12 lg:pb-12">
          {children}
        </div>
      </main>
    </div>
  )
}
