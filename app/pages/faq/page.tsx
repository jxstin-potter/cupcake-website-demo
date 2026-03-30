import { ContentPage } from "@/components/layout/content-page";
import { faqGroups } from "@/lib/data/content";

export default function FaqPage() {
  return (
    <ContentPage title="FAQs" description="Ordering, shipping, customization, and dietary information.">
      <div className="space-y-4">
        {faqGroups.map((group) => (
          <section key={group.title} className="rounded-xl border border-pink-100 bg-white p-4">
            <h2 className="text-2xl text-pink-900">{group.title}</h2>
            <div className="mt-2 space-y-2">
              {group.items.map((item) => (
                <details key={item.q} className="rounded-xl border border-pink-100 bg-pink-50/40 p-3">
                  <summary className="cursor-pointer font-semibold text-zinc-900">{item.q}</summary>
                  <p className="mt-2 text-sm text-zinc-700">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ContentPage>
  );
}
