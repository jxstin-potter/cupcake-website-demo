"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

/** Matches reference hero proportions: ~783px tall on large viewports */
const HERO_MIN_H = "min(48.9375rem, calc(100svh - 6rem))";

/** Background: 0.3–0.4× page scroll through hero — use midpoint */
const BG_SCROLL_RATE = 0.375;
/** Midground overlays */
const MID_SCROLL_RATE = 0.6;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function HeroParallax({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafPending = false;

    function applyParallax() {
      const section = sectionRef.current;
      const bg = bgLayerRef.current;
      const mid = midLayerRef.current;
      if (!section || !bg || !mid) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.innerWidth < 768;
      /** Mobile: 50% intensity per spec */
      const intensity = reduceMotion ? 0 : mobile ? 0.5 : 1;

      const rect = section.getBoundingClientRect();
      const h = section.offsetHeight;
      /** Pixels the section has moved past the top of the viewport (0 while hero top is at/below viewport top edge) */
      const passed = Math.max(0, -rect.top);
      /** Clamp range so layers cannot translate out of the overflow-hidden hero */
      const maxTranslate = h * 0.22;

      const bgY = clamp(-passed * BG_SCROLL_RATE * intensity, -maxTranslate, maxTranslate);
      const midY = clamp(-passed * MID_SCROLL_RATE * intensity, -maxTranslate, maxTranslate);

      bg.style.transform = `translate3d(0, ${bgY}px, 0)`;
      mid.style.transform = `translate3d(0, ${midY}px, 0)`;
    }

    function onScrollOrResize() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        applyParallax();
      });
    }

    applyParallax();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label={imageAlt}
      className="relative left-1/2 mb-2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden rounded-4xl shadow-sm shadow-pink-100/80"
      style={{ minHeight: HERO_MIN_H }}
    >
      {/* Background layer — 0.375× scroll speed (scaled by mobile intensity) */}
      <div
        ref={bgLayerRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <div className="absolute inset-0 h-[118%] w-full -top-[9%]">
          <Image src={imageSrc} alt="" fill priority className="object-cover" sizes="100vw" />
        </div>
      </div>

      {/* Midground — gradients at 0.6× scroll speed */}
      <div
        ref={midLayerRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-linear-to-b from-white/55 via-pink-50/35 to-rose-50/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(255,255,255,0.85),transparent_65%)]" />
      </div>

      {/* Foreground — max-w-7xl matches main column; copy stays centered */}
      <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center md:py-20">
        <h1 className="font-display text-3xl font-semibold lowercase tracking-tight text-pink-950 md:text-5xl lg:text-6xl">
          choose your flavors. share the love.
        </h1>
        <p className="mt-4 max-w-xl text-base font-medium text-pink-900/85 md:text-lg">
          build your own box (or a few) and send cupcakes near or far — locally or nationwide.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/pages/local-orders"
            className="rounded-full bg-pink-400 px-8 py-2.5 text-sm font-semibold lowercase text-white shadow-md shadow-pink-200/80 transition hover:bg-pink-500"
          >
            local orders
          </Link>
          <Link
            href="/pages/ship-nationwide"
            className="rounded-full bg-pink-400 px-8 py-2.5 text-sm font-semibold lowercase text-white shadow-md shadow-pink-200/80 transition hover:bg-pink-500"
          >
            ship nationwide
          </Link>
        </div>
      </div>
    </section>
  );
}
