import { ContentPage } from "@/components/layout/content-page";

export default function EmploymentPage() {
  return (
    <ContentPage title="Employment" description="We are always hiring bakers, decorators, and customer experience staff.">
      <ul className="list-inside list-disc text-sm text-zinc-700">
        <li>Lead baker (full-time)</li>
        <li>Decorating specialist (part-time)</li>
        <li>Store associate (full-time)</li>
      </ul>
      <p className="text-sm text-zinc-600">Send applications to jobs@mockcupcakes.local</p>
    </ContentPage>
  );
}
