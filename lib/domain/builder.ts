import { flavors } from "@/lib/data/catalog";
import { isFlavorAvailableForDate } from "@/lib/domain/availability";
import type { BuilderSelection } from "@/lib/types";

export const TARGET_BOX_COUNT = 12;

export function selectionTotal(selection: BuilderSelection) {
  return Object.values(selection).reduce((sum, count) => sum + count, 0);
}

export function validateBuilderSelection(selection: BuilderSelection, dateISO: string) {
  const errors: string[] = [];

  for (const [flavorId, count] of Object.entries(selection)) {
    const flavor = flavors.find((item) => item.id === flavorId);
    if (!flavor) {
      errors.push(`Unknown flavor: ${flavorId}`);
      continue;
    }
    if (!isFlavorAvailableForDate(flavorId, dateISO)) {
      errors.push(`${flavor.name} is not available for selected date.`);
    }
    const maxPerOrder = flavor.maxPerOrder ?? TARGET_BOX_COUNT;
    if (count > maxPerOrder) {
      errors.push(`${flavor.name} exceeds max per order (${maxPerOrder}).`);
    }
  }

  const total = selectionTotal(selection);
  if (total !== TARGET_BOX_COUNT) {
    errors.push(`Custom dozen must include exactly ${TARGET_BOX_COUNT} cupcakes. Current: ${total}.`);
  }

  return {
    ok: errors.length === 0,
    errors,
    total,
  };
}
