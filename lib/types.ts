export type FulfillmentMode = "local" | "nationwide";
export type LocalMethod = "delivery" | "pickup";

export interface FulfillmentState {
  mode: FulfillmentMode | null;
  zipCode: string;
  date: string;
  localMethod: LocalMethod;
  locationId: "georgetown" | "bethesda";
}

export interface Flavor {
  id: string;
  name: string;
  profile: "chocolate" | "vanilla" | "fruit" | "specialty";
  isVegan?: boolean;
  isGlutenFree?: boolean;
  seasonalMonth?: number;
  maxPerOrder?: number;
  image: string;
}

export interface Product {
  id: string;
  handle: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  badges: string[];
  category: "dozen" | "single" | "builder" | "gift-card" | "merch" | "workshop";
  collectionSlugs: string[];
  flavors: string[];
  popularity: number;
  image: string;
}

export interface CollectionDef {
  slug: string;
  title: string;
  description: string;
}

export interface BuilderSelection {
  [flavorId: string]: number;
}

export interface CartItem {
  id: string;
  productHandle: string;
  quantity: number;
  unitPrice: number;
  title: string;
  image: string;
  builderSelection?: BuilderSelection;
  giftMessage?: string;
  logoFileName?: string;
}

export interface CartState {
  items: CartItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  image: string;
}

