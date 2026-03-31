"use client"

import { useState } from "react"
import { format } from "date-fns"
import { useAuth } from "@/lib/auth/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner"
import type { Comment } from "@/lib/types"
import Link from "next/link"

interface CommentSectionProps {
  postId: string
  initialComments: Comment[]
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      userId: user.id,
      userName: user.fullName,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    }
    
    setComments((prev) => [comment, ...prev])
    setNewComment("")
    setIsLoading(false)
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment form */}
        {user ? (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback>
                  {user.fullName.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <Button type="submit" disabled={isLoading || !newComment.trim()}>
                  {isLoading ? <Spinner className="mr-2" /> : null}
                  Post Comment
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline">Sign in</Link>
              {" "}to leave a comment
            </p>
          </div>
        )}
        
        {/* Comments list */}
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback>
                    {comment.userName.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(comment.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </CardContent>
    </Card>
  )
}
