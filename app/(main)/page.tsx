import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Palette, PenTool, Sparkles, Star } from "lucide-react"
import { portfolioItems } from "@/lib/data/portfolio"
import { getApprovedReviews } from "@/lib/data/reviews"

const services = [
  {
    icon: PenTool,
    title: "Custom Tattoos",
    description: "Unique designs blending African heritage with modern aesthetics",
  },
  {
    icon: Palette,
    title: "Digital Art",
    description: "Vibrant digital pieces exploring urban identity and culture",
  },
  {
    icon: Sparkles,
    title: "Pen & Ink",
    description: "Detailed hand-drawn portraits and illustrations",
  },
]

export default function HomePage() {
  const featuredWorks = portfolioItems.slice(0, 6)
  const reviews = getApprovedReviews().slice(0, 3)
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1920&q=80"
            alt="Artistic background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>
        
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
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">What I Create</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From permanent body art to digital masterpieces, every creation is infused with 
              African heritage and contemporary vision.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="border-border bg-card transition-colors hover:border-primary/50">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Work Section */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Featured Work</h2>
              <p className="text-muted-foreground">A glimpse into my latest creations</p>
            </div>
            <Link href="/portfolio">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorks.map((item) => (
              <Link key={item.id} href={`/portfolio?highlight=${item.id}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{item.category.replace("-", " ")}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">What Clients Say</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Real experiences from people who trusted me with their art.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <Card key={review.id} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground italic">&quot;{review.content}&quot;</p>
                  <p className="font-semibold">{review.userName}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/reviews">
              <Button variant="outline" className="gap-2">
                Read More Reviews
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Create Something Amazing?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl opacity-90">
            Whether you&apos;re looking for a custom tattoo, a commissioned piece, or want to 
            explore my shop, I&apos;d love to hear from you.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/bookings">
              <Button size="lg" variant="secondary" className="gap-2">
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Browse Shop
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
