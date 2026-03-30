import Image from "next/image";

export function ContentPage({
  title,
  description,
  image,
  children,
}: {
  title: string;
  description: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="premium-surface space-y-4 rounded-3xl p-6 md:p-8">
      <h1 className="text-4xl text-pink-900">{title}</h1>
      <p className="max-w-3xl text-zinc-700">{description}</p>
      {image && (
        <div className="relative h-72 w-full overflow-hidden rounded-2xl">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      )}
      {children}
    </article>
  );
}
