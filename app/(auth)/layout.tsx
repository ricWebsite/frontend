import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Simple header */}
      <header className="flex h-16 items-center border-b border-border px-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
          NOZAH
        </Link>
      </header>
      
      {/* Auth content */}
      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>
    </div>
  )
}
