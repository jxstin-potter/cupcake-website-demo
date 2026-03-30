import { notFound } from "next/navigation";
import Image from "next/image";
import { blogPosts } from "@/lib/data/content";

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="premium-surface space-y-4 rounded-3xl p-6">
      <div className="relative h-72 w-full overflow-hidden rounded-2xl">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>
      <h1 className="text-4xl text-pink-900">{post.title}</h1>
      <p className="text-zinc-700">{post.content}</p>
    </article>
  );
}
