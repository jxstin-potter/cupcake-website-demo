import { heroImage } from "@/lib/data/media";
import type { BlogPost } from "@/lib/types";

export const staticPages = {
  about: {
    title: "About Us",
    body: "Founded by two sisters, CakeCup celebrates daily-baked cupcakes and nationwide gifting.",
    image: heroImage,
  },
  contact: {
    title: "Contact Us",
    body: "CakeCup shops in Georgetown and Bethesda with local pickup and delivery options.",
    image: heroImage,
  },
  corporate: {
    title: "Corporate Gifting",
    body: "Upload recipient lists once and ship branded gifts nationwide with mock API-backed workflows.",
    image: heroImage,
  },
};

export const faqGroups = [
  {
    title: "Ordering + Shipping",
    items: [
      { q: "How are cupcakes shipped?", a: "Orders are mock-routed through overnight shipping and arrive in insulated packaging." },
      { q: "How far in advance can I order?", a: "Mock flow supports same-day local and up to 30-day advance scheduling." },
      { q: "Can I mix delivery methods?", a: "No. Cart validation blocks mixed local and nationwide line items." },
    ],
  },
  {
    title: "Dietary",
    items: [
      { q: "Do you offer vegan options?", a: "Yes. Selected products and flavors are marked vegan in filters." },
      { q: "Do you offer gluten-free options?", a: "Yes. Selected products and flavors are tagged gluten-free." },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "spring-flavor-preview",
    title: "Spring Flavor Preview",
    excerpt: "How seasonal flavors are rotated in the availability calendar.",
    content: "This mock article explains how flavor seasonality and day-level inventory interact.",
    tags: ["seasonal", "menu"],
    image: heroImage,
  },
  {
    slug: "cupcake-delivery-guide",
    title: "Cupcake Delivery Guide",
    excerpt: "Delivery windows, shipping cutoffs, and fulfillment rules.",
    content: "This mock article covers local delivery/pickup and nationwide shipping logic.",
    tags: ["shipping", "guide"],
    image: heroImage,
  },
];

