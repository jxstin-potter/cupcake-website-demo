import { flavors } from "@/lib/data/catalog";

export function isFlavorAvailableForDate(flavorId: string, dateISO: string) {
  const flavor = flavors.find((item) => item.id === flavorId);
  if (!flavor) {
    return false;
  }

  if (!flavor.seasonalMonth) {
    return true;
  }

  const month = new Date(dateISO).getUTCMonth() + 1;
  return month === flavor.seasonalMonth;
}

export function getUnavailableFlavors(dateISO: string) {
  return flavors.filter((flavor) => !isFlavorAvailableForDate(flavor.id, dateISO));
}

export function getDateAvailabilityMessage(dateISO: string) {
  const unavailableCount = getUnavailableFlavors(dateISO).length;
  if (unavailableCount === 0) {
    return "All listed flavors are available for this date.";
  }
  return `Some flavors are not available for ${dateISO}. Choose a new day for broader selection.`;
}
