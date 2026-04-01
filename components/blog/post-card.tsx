import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import type { BlogPost } from "@/lib/types"

interface PostCardProps {
  post: BlogPost
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <Card className="group overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto">
              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <CardContent className="flex flex-col justify-center p-6 md:p-8">
              <span className="mb-2 text-sm text-primary">Featured</span>
              <h2 className="mb-3 text-2xl font-bold transition-colors group-hover:text-primary md:text-3xl">
                {post.title}
              </h2>
              <p className="mb-4 line-clamp-3 text-muted-foreground">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{post.authorName}</span>
                <span>•</span>
                <time dateTime={post.createdAt}>
                  {format(new Date(post.createdAt), "MMMM d, yyyy")}
                </time>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    )
  }
  
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group h-full overflow-hidden">
        {post.imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-5">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{post.authorName}</span>
            <span>•</span>
            <time dateTime={post.createdAt}>
              {format(new Date(post.createdAt), "MMM d, yyyy")}
            </time>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
