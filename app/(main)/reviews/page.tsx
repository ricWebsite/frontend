"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/lib/auth/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Star, CheckCircle } from "lucide-react"
import { reviewApi, unwrapCollection } from "@/lib/api"
import type { Review } from "@/lib/types"
import { format } from "date-fns"
import Link from "next/link"

export default function ReviewsPage() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isFetchingReviews, setIsFetchingReviews] = useState(true)
  
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const payload = await reviewApi.getAll()
        const allReviews = unwrapCollection<Review>(payload)
        const approvedOnly = allReviews.filter((review) => review.approved !== false)
        setReviews(approvedOnly)
      } catch {
        setReviews([])
      } finally {
        setIsFetchingReviews(false)
      }
    }

    void loadReviews()
  }, [])

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    return total / reviews.length
  }, [reviews])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !user) return
    
    setIsLoading(true)
    try {
      await reviewApi.create({
        author: user.fullName,
        email: user.email,
        rating,
        content,
      })
      setIsSuccess(true)
      setContent("")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Reviews</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          What clients say about working with me. Real experiences, real stories.
        </p>
        
        {/* Rating summary */}
        <div className="mt-8 flex flex-col items-center">
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${i < Math.round(averageRating || 0) ? "fill-primary text-primary" : "text-muted"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-lg font-semibold">{averageRating.toFixed(1)} out of 5</p>
          <p className="text-sm text-muted-foreground">Based on {reviews.length} reviews</p>
        </div>
      </div>
      
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
        {/* Reviews list */}
        <div className="space-y-4 lg:col-span-2">
          {isFetchingReviews ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : reviews.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">No reviews yet.</CardContent>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <time className="text-xs text-muted-foreground">
                      {format(new Date(review.createdAt), "MMM d, yyyy")}
                    </time>
                  </div>
                  <p className="mb-4 text-muted-foreground">{review.content}</p>
                  <p className="font-medium">{review.userName}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        {/* Review form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Leave a Review</CardTitle>
              <CardDescription>
                Share your experience with others
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user ? (
                <div className="text-center">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Sign in to leave a review
                  </p>
                  <Link href="/login">
                    <Button>Sign In</Button>
                  </Link>
                </div>
              ) : isSuccess ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold">Thank You!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your review has been submitted and is pending approval.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Rating</FieldLabel>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setRating(i + 1)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 transition-colors ${
                                i < rating ? "fill-primary text-primary" : "text-muted hover:text-primary/50"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </Field>
                    
                    <Field>
                      <FieldLabel>Your Review</FieldLabel>
                      <Textarea
                        placeholder="Share your experience..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        required
                      />
                    </Field>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Spinner className="mr-2" /> : null}
                      Submit Review
                    </Button>
                  </FieldGroup>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
