import Link from "next/link";
import { ContentPage } from "@/components/layout/content-page";
import { staticPages } from "@/lib/data/content";

export default function CorporateGiftingPage() {
  return (
    <ContentPage title={staticPages.corporate.title} description={staticPages.corporate.body} image={staticPages.corporate.image}>
      <ul className="list-inside list-disc text-sm text-zinc-700">
        <li>Upload recipient lists once and ship to many addresses.</li>
        <li>Attach mock logo/image metadata to branded gifts.</li>
        <li>Route by local or nationwide serviceability rules.</li>
      </ul>
      <Link className="inline-block rounded-full bg-pink-700 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-800" href="/collections/curated-collection">
        Explore corporate-ready assortments
      </Link>
    </ContentPage>
  );
}
