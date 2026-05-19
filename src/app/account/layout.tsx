import TrainingSidebar from '@/components/training-sidebar'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <TrainingSidebar />
      <main className="flex-1 lg:ml-72 p-6 pt-16 lg:pt-6">{children}</main>
    </div>
  )
}
