import { PostCard } from "@/components/blog/post-card"
import { Spinner } from "@/components/ui/spinner"
import type { BlogPost } from "@/lib/types"

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(process.env.API_URL ? `${process.env.API_URL}/api/blog` : "/api/blog", {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    if (!response.ok) throw new Error("Failed to fetch blog posts")
    const data = await response.json()
    return data.items || data || []
  } catch (err) {
    console.warn("Using fallback mock data for blog posts")
    // Fallback to mock data
    const { getBlogPosts: getMockPosts } = await import("@/lib/data/blog-posts")
    return getMockPosts(true)
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const [featuredPost, ...otherPosts] = posts
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Thoughts on art, creativity, and the journey of a Kenyan visual artist. 
          Updates on exhibitions, new work, and behind-the-scenes insights.
        </p>
      </div>
      
      {/* Featured post */}
      {featuredPost && (
        <div className="mb-12">
          <PostCard post={featuredPost} featured />
        </div>
      )}
      
      {/* Other posts */}
      {otherPosts.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      
      {posts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
