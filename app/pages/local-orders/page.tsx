import { FulfillmentSelector } from "@/components/fulfillment/fulfillment-selector";
import { ContentPage } from "@/components/layout/content-page";

export default function LocalOrdersPage() {
  return (
    <div className="space-y-4">
      <ContentPage
        title="Local Orders"
        description="Enter your ZIP code, choose delivery or pickup, and select your preferred date and location."
      />
      <FulfillmentSelector />
    </div>
  );
}
