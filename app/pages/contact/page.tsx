import { ContentPage } from "@/components/layout/content-page";
import { staticPages } from "@/lib/data/content";

export default function ContactPage() {
  return (
    <ContentPage title={staticPages.contact.title} description={staticPages.contact.body} image={staticPages.contact.image}>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-pink-100 bg-white p-4">
          <h2 className="text-xl text-pink-900">CakeCup Georgetown</h2>
          <p className="text-sm text-zinc-700">3301 M Street NW, Washington, DC</p>
        </div>
        <div className="rounded-xl border border-pink-100 bg-white p-4">
          <h2 className="text-xl text-pink-900">CakeCup Bethesda</h2>
          <p className="text-sm text-zinc-700">4834 Bethesda Ave, Bethesda, MD</p>
        </div>
      </div>
    </ContentPage>
  );
}
