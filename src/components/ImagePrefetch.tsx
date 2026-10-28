"use client";

import { useEffect } from "react";

const MAP: Record<string, string> = {
  "/": "/images/hero-lighthouse.jpg",
  "/services": "/images/services-overview.jpg",
  "/contact-us": "/images/pier-catwalk.webp",
  "/our-mission": "/images/mission-statement.jpg",
  "/about-us": "/images/lighthouses-sail.webp",
  "/meet-the-team": "/images/swing.webp",
};

export default function ImagePrefetch() {
  useEffect(() => {
    const done: Record<string, number> = {};
    const warm = (url?: string | null) => {
      if (!url || done[url]) return;
      done[url] = 1;
      const img = new Image();
      img.decoding = "async";
      img.src = url;
    };
    const fromHref = (href: string | null) => {
      if (!href) return null;
      try {
        const u = new URL(href, window.location.origin);
        return MAP[u.pathname] || null;
      } catch {
        return null;
      }
    };
    const onEnter = (e: PointerEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      warm(fromHref(a.getAttribute("href")));
    };
    document.addEventListener("pointerenter", onEnter, true);
    const run = () => Object.values(MAP).forEach((u) => warm(u));
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(run, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(run, 1200);
    }
    return () => {
      document.removeEventListener("pointerenter", onEnter, true);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
