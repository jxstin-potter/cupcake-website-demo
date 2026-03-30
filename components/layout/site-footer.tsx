import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-pink-100 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <section className="text-zinc-900">
          <h3 className="text-lg font-semibold text-pink-800">CakeCup</h3>
          <p className="mt-2 max-w-md text-[0.95rem] leading-7 text-zinc-800">
            Demo bakery storefront. Placeholder media and deterministic mock APIs for flows and checkout.
          </p>
        </section>
        <section className="text-zinc-800">
          <h3 className="text-lg font-semibold text-pink-800">Explore</h3>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <Link className="text-zinc-800 hover:text-pink-700" href="/collections/all">
              All cupcakes
            </Link>
            <Link className="text-zinc-800 hover:text-pink-700" href="/pages/corporate-gifting">
              Corporate gifting
            </Link>
            <Link className="text-zinc-800 hover:text-pink-700" href="/pages/special-events">
              Special events
            </Link>
            <Link className="text-zinc-800 hover:text-pink-700" href="/pages/employment">
              Employment
            </Link>
          </div>
        </section>
        <section className="text-zinc-800">
          <h3 className="text-lg font-semibold text-pink-800">Support</h3>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <Link className="text-zinc-800 hover:text-pink-700" href="/pages/contact">
              Contact
            </Link>
            <Link className="text-zinc-800 hover:text-pink-700" href="/pages/about-us">
              About
            </Link>
            <Link className="text-zinc-800 hover:text-pink-700" href="/pages/faq">
              FAQ
            </Link>
          </div>
        </section>
      </div>
      <div className="border-t border-pink-100 px-4 py-4 text-center text-xs text-zinc-500">
        © 2026 CakeCup — demo experience
      </div>
    </footer>
  );
}
