import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data/content";

export default function BlogIndexPage() {
  return (
    <div className="space-y-4">
      <div className="premium-surface rounded-3xl p-5 md:p-6">
        <p className="eyebrow">Editorial</p>
        <h1 className="text-4xl text-pink-900">The Sweet Life Blog</h1>
      </div>
      <section className="grid gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="premium-surface rounded-2xl p-4">
            <div className="relative h-48 w-full overflow-hidden rounded-xl">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
            <h2 className="mt-3 text-2xl text-pink-900">{post.title}</h2>
            <p className="mt-2 text-sm text-zinc-700">{post.excerpt}</p>
            <div className="mt-2 flex gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blogs/news/tagged/${tag}`} className="rounded-full border border-pink-200 bg-pink-50 px-2 py-0.5 text-xs font-semibold text-pink-700">
                  {tag}
                </Link>
              ))}
            </div>
            <Link href={`/blogs/news/${post.slug}`} className="mt-3 inline-block text-sm font-semibold text-pink-700 hover:text-pink-800">
              Read article
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
