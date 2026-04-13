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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  )
}
