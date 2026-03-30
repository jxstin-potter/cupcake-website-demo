import { FulfillmentSelector } from "@/components/fulfillment/fulfillment-selector";
import { ContentPage } from "@/components/layout/content-page";

export default function ShipNationwidePage() {
  return (
    <div className="space-y-4">
      <ContentPage
        title="Ship Nationwide"
        description="Set your destination ZIP and arrival date for overnight shipping simulation."
      />
      <FulfillmentSelector />
    </div>
  );
}
