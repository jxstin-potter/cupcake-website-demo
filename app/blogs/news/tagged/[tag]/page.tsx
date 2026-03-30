import Link from "next/link";
import { blogPosts } from "@/lib/data/content";

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const tagged = blogPosts.filter((post) => post.tags.includes(tag));

  return (
    <div className="space-y-4">
      <div className="premium-surface rounded-3xl p-5 md:p-6">
        <p className="eyebrow">Blog Tag</p>
        <h1 className="text-4xl text-pink-900">Tag: {tag}</h1>
      </div>
      {tagged.length === 0 && <p className="text-zinc-700">No posts available for this tag.</p>}
      {tagged.map((post) => (
        <article key={post.slug} className="premium-surface rounded-2xl p-4">
          <h2 className="text-2xl text-pink-900">{post.title}</h2>
          <p className="mt-2 text-sm text-zinc-700">{post.excerpt}</p>
          <Link href={`/blogs/news/${post.slug}`} className="mt-2 inline-block text-sm font-semibold text-pink-700 hover:text-pink-800">
            Read article
          </Link>
        </article>
      ))}
    </div>
  );
}
