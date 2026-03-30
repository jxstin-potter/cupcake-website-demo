import { ContentPage } from "@/components/layout/content-page";
import { staticPages } from "@/lib/data/content";

export default function AboutUsPage() {
  return <ContentPage title={staticPages.about.title} description={staticPages.about.body} image={staticPages.about.image} />;
}
