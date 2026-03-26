/**
 * Blog Page - Display blog posts
 */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { blogApi, unwrapCollection } from "@/lib/api";
import { COLORS } from "@/shared/const";

interface BlogPost {
  _id?: string;
  id?: string;
  title: string;
  excerpt?: string;
  content: string;
  author?: string;
  date?: string;
  createdAt?: string;
  category?: string;
  featured?: boolean;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await blogApi.getAll();
        setPosts(unwrapCollection<BlogPost>(response));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div style={{ backgroundColor: COLORS.WHITE }}>
      <nav className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: COLORS.WHITE }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold font-['Great_Vibes']" style={{ color: COLORS.PRIMARY }}>
            Nozah
          </Link>

          <Link href="/home" className="inline-block">
            <Button variant="ghost" size="sm">
              ← Back Home
            </Button>
          </Link>
        </div>
      </nav>

      <section
        className="py-12 md:py-20"
        style={{ background: `linear-gradient(135deg, ${COLORS.PRIMARY}40 0%, ${COLORS.ACCENT}40 100%)` }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-['Great_Vibes'] mb-4" style={{ color: COLORS.BLACK }}>
            Blog
          </h1>
          <p className="text-lg md:text-xl" style={{ color: COLORS.MEDIUM_GRAY }}>
            Insights, tips, and stories from my artistic journey
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {selectedPost ? (
            <div className="max-w-3xl mx-auto">
              <button onClick={() => setSelectedPost(null)} className="text-sm font-semibold mb-6" style={{ color: COLORS.PRIMARY }}>
                ← Back to Posts
              </button>

              <article>
                <h1 className="text-4xl md:text-5xl font-['Great_Vibes'] mb-4" style={{ color: COLORS.BLACK }}>
                  {selectedPost.title}
                </h1>

                <div className="flex gap-4 mb-8 flex-wrap">
                  {selectedPost.category && (
                    <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.PRIMARY, color: COLORS.BLACK }}>
                      {selectedPost.category}
                    </span>
                  )}
                  <span className="text-sm" style={{ color: COLORS.MEDIUM_GRAY }}>
                    By {selectedPost.author ?? "Nozah"}
                  </span>
                  <span className="text-sm" style={{ color: COLORS.MEDIUM_GRAY }}>
                    {formatDate(selectedPost.date ?? selectedPost.createdAt)}
                  </span>
                </div>

                <div className="prose prose-lg max-w-none mb-8" style={{ color: COLORS.BLACK }}>
                  <p>{selectedPost.content}</p>
                </div>
              </article>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-['Great_Vibes'] mb-8" style={{ color: COLORS.BLACK }}>
                Latest Posts
              </h2>

              {loading ? (
                <div className="space-y-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-lg animate-pulse" style={{ backgroundColor: COLORS.LIGHT_GRAY, height: "200px" }} />
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => {
                    const key = post._id ?? post.id ?? post.title;
                    return (
                      <div
                        key={key}
                        className="p-6 rounded-lg cursor-pointer transition-all hover:shadow-lg"
                        style={{ backgroundColor: COLORS.WHITE, border: `2px solid ${COLORS.BORDER}` }}
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex gap-3 mb-3 flex-wrap">
                              {post.category && (
                                <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: COLORS.PRIMARY, color: COLORS.BLACK }}>
                                  {post.category}
                                </span>
                              )}
                              {post.featured && (
                                <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: COLORS.SECONDARY, color: COLORS.BLACK }}>
                                  Featured
                                </span>
                              )}
                            </div>

                            <h3 className="text-2xl font-semibold mb-2" style={{ color: COLORS.BLACK }}>
                              {post.title}
                            </h3>

                            <p className="text-base mb-4" style={{ color: COLORS.MEDIUM_GRAY }}>
                              {post.excerpt ?? post.content.slice(0, 160)}
                            </p>

                            <div className="flex gap-4 text-sm">
                              <span style={{ color: COLORS.MEDIUM_GRAY }}>By {post.author ?? "Nozah"}</span>
                              <span style={{ color: COLORS.MEDIUM_GRAY }}>{formatDate(post.date ?? post.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <footer className="py-12" style={{ backgroundColor: COLORS.BLACK, color: COLORS.WHITE }}>
        <div className="container mx-auto px-4 text-center">
          <p style={{ color: COLORS.LIGHT_GRAY }}>© 2024 Nozah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
