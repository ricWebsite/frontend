"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/components/atoms/Button";
import { blogApi, unwrapSingle } from "@/lib/api";

interface BlogPost {
  _id?: string;
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  author?: string;
  createdAt?: string;
}

export default function BlogDetailsPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await blogApi.getById(String(slug));
        const resolved = unwrapSingle<BlogPost>(response);
        setPost(resolved);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    void fetchPost();
  }, [slug]);

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center">Loading post...</main>;
  }

  if (error || !post) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-red-600">{error || "Post not found"}</p>
        <Link href="/blog">
          <Button variant="ghost">← Back to Blog</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10 md:px-8">
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm underline">
          ← Back to Blog
        </Link>
        <h1 className="text-4xl mt-4 mb-3">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {post.author ?? "Nozah"} {post.createdAt ? `- ${new Date(post.createdAt).toLocaleDateString()}` : ""}
        </p>
        <p className="leading-8 whitespace-pre-wrap">{post.content}</p>
      </article>
    </main>
  );
}
