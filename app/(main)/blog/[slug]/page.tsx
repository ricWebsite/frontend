import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { getBlogPost, getCommentsByPost, getBlogPosts } from "@/lib/data/blog-posts"
import { CommentSection } from "@/components/blog/comment-section"
import { PostCard } from "@/components/blog/post-card"
import { ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params)
  const post = getBlogPost(slug)
  
  if (!post) {
    notFound()
  }
  
  const comments = getCommentsByPost(post.id)
  const relatedPosts = getBlogPosts(true)
    .filter((p) => p.id !== post.id)
    .slice(0, 3)
  
  return (
    <article className="container mx-auto px-4 py-12">
      {/* Back link */}
      <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>
      
      {/* Header */}
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <span>{post.authorName}</span>
          <span>•</span>
          <time dateTime={post.createdAt}>
            {format(new Date(post.createdAt), "MMMM d, yyyy")}
          </time>
        </div>
      </header>
      
      {/* Featured image */}
      {post.imageUrl && (
        <div className="relative mx-auto mt-8 aspect-video max-w-4xl overflow-hidden rounded-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Content */}
      <div className="prose prose-invert mx-auto mt-12 max-w-3xl">
        {post.content.split("\n").map((paragraph, index) => {
          const trimmed = paragraph.trim()
          if (!trimmed) return null
          
          // Handle markdown headers
          if (trimmed.startsWith("## ")) {
            return (
              <h2 key={index} className="mt-8 mb-4 text-2xl font-bold">
                {trimmed.replace("## ", "")}
              </h2>
            )
          }
          
          // Handle list items
          if (trimmed.startsWith("- **")) {
            const match = trimmed.match(/- \*\*(.+?)\*\*(.*)/)
            if (match) {
              return (
                <p key={index} className="my-2">
                  <strong>{match[1]}</strong>{match[2]}
                </p>
              )
            }
          }
          
          if (trimmed.startsWith("- ") || trimmed.match(/^\d\./)) {
            return (
              <p key={index} className="my-2 ml-4">
                {trimmed}
              </p>
            )
          }
          
          return (
            <p key={index} className="my-4 leading-relaxed text-muted-foreground">
              {trimmed}
            </p>
          )
        })}
      </div>
      
      {/* Comments */}
      <div className="mx-auto mt-16 max-w-3xl">
        <CommentSection postId={post.id} initialComments={comments} />
      </div>
      
      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">More Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
