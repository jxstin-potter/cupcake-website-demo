import { ContentPage } from "@/components/layout/content-page";
import { EventInquiryForm } from "@/components/forms/event-inquiry-form";

export default function SpecialEventsPage() {
  return (
    <ContentPage
      title="Special Events"
      description="Wedding showers, baby showers, and corporate activations with custom cupcake styling."
    >
      <EventInquiryForm />
    </ContentPage>
  );
}
