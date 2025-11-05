/**
 * Blog Page - Display blog posts
 */
"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Button from "@/components/atoms/Button";
import { COLORS } from "@/shared/const";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  featured?: boolean;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Simulate fetching blog posts
    setTimeout(() => {
      setPosts([
        {
          id: "1",
          title: "The Art of Tattoo Design",
          excerpt:
            "Exploring the creative process behind meaningful tattoo designs",
          content:
            "Tattoo design is a unique blend of art, culture, and personal expression...",
          author: "Nozah",
          date: "2024-01-20",
          category: "Tattoos",
          featured: true,
        },
        {
          id: "2",
          title: "Digital Art Trends in 2024",
          excerpt: "Latest trends and techniques in digital art creation",
          content:
            "The digital art landscape continues to evolve with new tools and techniques...",
          author: "Nozah",
          date: "2024-01-15",
          category: "Digital Art",
        },
        {
          id: "3",
          title: "Pen Art Mastery",
          excerpt:
            "Tips and techniques for creating stunning pen illustrations",
          content:
            "Pen art requires precision, patience, and a deep understanding of light and shadow...",
          author: "Nozah",
          date: "2024-01-10",
          category: "Pen Art",
        },
        {
          id: "4",
          title: "Finding Your Artistic Voice",
          excerpt: "A journey to discovering your unique artistic style",
          content:
            "Every artist has a unique voice waiting to be discovered. This journey is personal...",
          author: "Nozah",
          date: "2024-01-05",
          category: "General",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div style={{ backgroundColor: COLORS.WHITE }}>
      {/* Navigation */}
      <nav
        className="sticky top-0 z-40 shadow-md"
        style={{ backgroundColor: COLORS.WHITE }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold font-['Great_Vibes']"
            style={{ color: COLORS.PRIMARY }}
          >
            Nozah
          </Link>

          <Link href="/home" className="inline-block">
            <Button variant="ghost" size="sm">
              ← Back Home
            </Button>
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
            Blog
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{ color: COLORS.MEDIUM_GRAY }}
          >
            Insights, tips, and stories from my artistic journey
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {selectedPost ? (
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-sm font-semibold mb-6"
                style={{ color: COLORS.PRIMARY }}
              >
                ← Back to Posts
              </button>

              <article>
                <h1
                  className="text-4xl md:text-5xl font-['Great_Vibes'] mb-4"
                  style={{ color: COLORS.BLACK }}
                >
                  {selectedPost.title}
                </h1>

                <div className="flex gap-4 mb-8 flex-wrap">
                  <span
                    className="text-sm font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: COLORS.PRIMARY,
                      color: COLORS.BLACK,
                    }}
                  >
                    {selectedPost.category}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: COLORS.MEDIUM_GRAY }}
                  >
                    By {selectedPost.author}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: COLORS.MEDIUM_GRAY }}
                  >
                    {formatDate(selectedPost.date)}
                  </span>
                </div>

                <div
                  className="prose prose-lg max-w-none mb-8"
                  style={{ color: COLORS.BLACK }}
                >
                  <p>{selectedPost.content}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                <div
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: COLORS.LIGHT_GRAY,
                    border: `2px solid ${COLORS.BORDER}`,
                  }}
                >
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: COLORS.BLACK }}
                  >
                    About the Author
                  </h3>
                  <p style={{ color: COLORS.MEDIUM_GRAY }}>
                    Nozah is a Kenyan visual artist specializing in tattoos,
                    digital art, pen art, and contemporary pieces. With years of
                    experience, she creates meaningful artwork that resonates
                    with her clients.
                  </p>
                </div>
              </article>
            </div>
          ) : (
            <div>
              <h2
                className="text-3xl font-['Great_Vibes'] mb-8"
                style={{ color: COLORS.BLACK }}
              >
                Latest Posts
              </h2>

              {loading ? (
                <div className="space-y-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg animate-pulse"
                      style={{
                        backgroundColor: COLORS.LIGHT_GRAY,
                        height: "200px",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-6 rounded-lg cursor-pointer transition-all hover:shadow-lg"
                      style={{
                        backgroundColor: COLORS.WHITE,
                        border: `2px solid ${COLORS.BORDER}`,
                      }}
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex gap-3 mb-3 flex-wrap">
                            <span
                              className="text-xs font-semibold px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: COLORS.PRIMARY,
                                color: COLORS.BLACK,
                              }}
                            >
                              {post.category}
                            </span>
                            {post.featured && (
                              <span
                                className="text-xs font-semibold px-2 py-1 rounded-full"
                                style={{
                                  backgroundColor: COLORS.SECONDARY,
                                  color: COLORS.BLACK,
                                }}
                              >
                                Featured
                              </span>
                            )}
                          </div>

                          <h3
                            className="text-2xl font-semibold mb-2"
                            style={{ color: COLORS.BLACK }}
                          >
                            {post.title}
                          </h3>

                          <p
                            className="text-base mb-4"
                            style={{ color: COLORS.MEDIUM_GRAY }}
                          >
                            {post.excerpt}
                          </p>

                          <div className="flex gap-4 text-sm">
                            <span style={{ color: COLORS.MEDIUM_GRAY }}>
                              By {post.author}
                            </span>
                            <span style={{ color: COLORS.MEDIUM_GRAY }}>
                              {formatDate(post.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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

export default Blog;
