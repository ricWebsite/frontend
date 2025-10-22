/**
 * Reviews Page - Display customer reviews and testimonials
 */

"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import ReviewCard, { ReviewData } from '@/components/molecules/ReviewCard';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { COLORS } from '@/shared/const';

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    rating: 5,
    content: '',
  });

  useEffect(() => {
    // Simulate fetching reviews
    setTimeout(() => {
      setReviews([
        {
          id: '1',
          author: 'Sarah Johnson',
          rating: 5,
          content:
            'Nozah created an amazing tattoo design that perfectly captured my vision. Her attention to detail and professionalism are outstanding!',
          date: '2024-01-15',
          avatar: 'https://via.placeholder.com/48x48?text=SJ',
        },
        {
          id: '2',
          author: 'Michael Chen',
          rating: 5,
          content:
            'The digital art piece I commissioned is absolutely stunning. Nozah understood my requirements and delivered beyond expectations.',
          date: '2024-01-10',
          avatar: 'https://via.placeholder.com/48x48?text=MC',
        },
        {
          id: '3',
          author: 'Emma Williams',
          rating: 4,
          content:
            'Great experience working with Nozah. The pen art illustrations are beautiful and the communication was excellent throughout.',
          date: '2024-01-05',
          avatar: 'https://via.placeholder.com/48x48?text=EW',
        },
        {
          id: '4',
          author: 'David Okonkwo',
          rating: 5,
          content:
            'Nozah is a true professional. Her artistic skills are exceptional and she brings creativity to every project. Highly recommended!',
          date: '2023-12-28',
          avatar: 'https://via.placeholder.com/48x48?text=DO',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    const newReview: ReviewData = {
      id: String(reviews.length + 1),
      author: formData.author,
      rating: formData.rating,
      content: formData.content,
      date: new Date().toISOString(),
    };
    setReviews((prev) => [newReview, ...prev]);
    setFormData({ author: '', email: '', rating: 5, content: '' });
    setShowForm(false);
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div style={{ backgroundColor: COLORS.WHITE }}>
      {/* Navigation */}
      <nav
        className="sticky top-0 z-40 shadow-md"
        style={{ backgroundColor: COLORS.WHITE }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a
              className="text-2xl font-bold font-['Great_Vibes']"
              style={{ color: COLORS.PRIMARY }}
            >
              Nozah
            </a>
          </Link>
          <Link href="/">
            <a>
              <Button variant="ghost" size="sm">
                ← Back Home
              </Button>
            </a>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section
        className="py-12 md:py-20"
        style={{
          background: `linear-gradient(135deg, ${COLORS.PRIMARY}40 0%, ${COLORS.ACCENT}40 100%)`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1
            className="text-5xl md:text-6xl font-['Great_Vibes'] mb-4"
            style={{ color: COLORS.BLACK }}
          >
            Reviews & Testimonials
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{ color: COLORS.MEDIUM_GRAY }}
          >
            What clients say about my work
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div
              className="p-6 rounded-lg text-center"
              style={{
                backgroundColor: COLORS.LIGHT_GRAY,
                border: `2px solid ${COLORS.BORDER}`,
              }}
            >
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.PRIMARY }}
              >
                {reviews.length}
              </div>
              <p style={{ color: COLORS.MEDIUM_GRAY }}>Total Reviews</p>
            </div>

            <div
              className="p-6 rounded-lg text-center"
              style={{
                backgroundColor: COLORS.LIGHT_GRAY,
                border: `2px solid ${COLORS.BORDER}`,
              }}
            >
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.SECONDARY }}
              >
                {averageRating}
              </div>
              <p style={{ color: COLORS.MEDIUM_GRAY }}>Average Rating</p>
            </div>

            <div
              className="p-6 rounded-lg text-center"
              style={{
                backgroundColor: COLORS.LIGHT_GRAY,
                border: `2px solid ${COLORS.BORDER}`,
              }}
            >
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.ACCENT }}
              >
                100%
              </div>
              <p style={{ color: COLORS.MEDIUM_GRAY }}>Satisfaction Rate</p>
            </div>
          </div>

          {/* Review Form Toggle */}
          <div className="text-center mb-12">
            <Button
              variant={showForm ? 'secondary' : 'primary'}
              size="lg"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Leave a Review'}
            </Button>
          </div>

          {/* Review Form */}
          {showForm && (
            <div
              className="max-w-2xl mx-auto mb-12 p-6 rounded-lg"
              style={{
                backgroundColor: COLORS.LIGHT_GRAY,
                border: `2px solid ${COLORS.BORDER}`,
              }}
            >
              <h3
                className="text-2xl font-semibold mb-6"
                style={{ color: COLORS.BLACK }}
              >
                Share Your Experience
              </h3>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <Input
                  label="Your Name"
                  name="author"
                  value={formData.author}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="your@email.com"
                  required
                />

                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: COLORS.BLACK }}
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2.5 rounded-lg border-2 font-[Lato] focus:outline-none"
                    style={{
                      borderColor: COLORS.PRIMARY,
                      backgroundColor: COLORS.WHITE,
                      color: COLORS.BLACK,
                    }}
                  >
                    <option value="5">5 Stars - Excellent</option>
                    <option value="4">4 Stars - Good</option>
                    <option value="3">3 Stars - Average</option>
                    <option value="2">2 Stars - Fair</option>
                    <option value="1">1 Star - Poor</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: COLORS.BLACK }}
                  >
                    Your Review
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    placeholder="Share your experience..."
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg border-2 font-[Lato] focus:outline-none resize-none"
                    style={{
                      borderColor: COLORS.PRIMARY,
                      backgroundColor: COLORS.WHITE,
                      color: COLORS.BLACK,
                    }}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Submit Review
                </Button>
              </form>
            </div>
          )}

          {/* Reviews List */}
          <div>
            <h2
              className="text-3xl font-['Great_Vibes'] mb-8"
              style={{ color: COLORS.BLACK }}
            >
              Client Reviews
            </h2>

            {loading ? (
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg animate-pulse"
                    style={{
                      backgroundColor: COLORS.LIGHT_GRAY,
                      height: '150px',
                    }}
                  />
                ))}
              </div>
            ) : reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-12 rounded-lg"
                style={{
                  backgroundColor: COLORS.LIGHT_GRAY,
                  border: `2px dashed ${COLORS.BORDER}`,
                }}
              >
                <p
                  className="text-lg font-semibold"
                  style={{ color: COLORS.MEDIUM_GRAY }}
                >
                  No reviews yet. Be the first to leave one!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12"
        style={{ backgroundColor: COLORS.BLACK, color: COLORS.WHITE }}
      >
        <div className="container mx-auto px-4 text-center">
          <p style={{ color: COLORS.LIGHT_GRAY }}>
            © 2024 Nozah. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Reviews;

