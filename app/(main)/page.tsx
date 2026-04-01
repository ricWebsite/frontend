import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-7xl">
            Art That Tells
            <span className="block text-primary">Your Story</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Kenyan visual artist specializing in tattoos, digital art, and pen illustrations. 
            Each piece is a unique journey through culture, identity, and creativity.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/portfolio">
              <Button size="lg" className="gap-2">
                View Portfolio
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/bookings">
              <Button size="lg" variant="outline">
                Book a Session
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
