import { PostCard } from "@/components/blog/post-card"
import type { BlogPost } from "@/lib/types"
import { blogApi, unwrapCollection } from "@/lib/api"

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const payload = await blogApi.getAll()
    return unwrapCollection<BlogPost>(payload)
  } catch {
    return []
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
