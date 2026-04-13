import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-bold uppercase text-gray-900">
          The Problem Guide
        </h1>
        <p className="text-gray-500 mt-2 text-sm">Sign in to access your training</p>
      </div>
      <SignIn
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'shadow-lg rounded-xl',
            headerTitle: 'font-heading uppercase',
            formButtonPrimary: 'bg-brand hover:bg-brand-dark',
          },
        }}
        forceRedirectUrl="/training"
      />
    </div>
  )
}
