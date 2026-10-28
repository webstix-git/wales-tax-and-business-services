"use client";

import { useEffect, useMemo, useRef } from "react";
import { responsiveCss } from "@/styles/responsive";

type Props = {
  html: string;
  css?: string;
  page?: string;
};

const NAV_TOGGLE_HTML =
  '<button type="button" class="nav-toggle" aria-controls="siteNav" aria-expanded="false" aria-label="Open menu"><span class="nav-toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span></button>';

function parseStyleHover(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  raw.split(";").forEach((part) => {
    const i = part.indexOf(":");
    if (i === -1) return;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (k) out[k] = v;
  });
  return out;
}

/** Inject hamburger control + nav id without rewriting every generated page. */
function enhanceHeaderHtml(source: string): string {
  let out = source;
  if (!out.includes('id="siteNav"') && !out.includes("id='siteNav'")) {
    out = out.replace(
      /<nav class="site-nav"/g,
      '<nav class="site-nav" id="siteNav"'
    );
  }
  if (!out.includes("nav-toggle")) {
    out = out.replace(
      /(<a href="\/" class="site-logo">[\s\S]*?<\/a>)/,
      `$1${NAV_TOGGLE_HTML}`
    );
  }
  return out;
}

export default function HtmlPage({ html, css = "", page = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const enhancedHtml = useMemo(() => enhanceHeaderHtml(html), [html]);
  const combinedCss = useMemo(
    () => `${css}\n${responsiveCss}`,
    [css]
  );

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // style-hover parity with original DC runtime
    const cleanups: Array<() => void> = [];

    // Mobile / tablet nav toggle
    const setNavOpen = (open: boolean) => {
      document.documentElement.classList.toggle("nav-open", open);
      root.querySelectorAll<HTMLButtonElement>(".nav-toggle").forEach((btn) => {
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
    };
    setNavOpen(false);
    const onToggleClick = (e: MouseEvent) => {
      const btn = (e.target as Element | null)?.closest?.(".nav-toggle");
      if (!btn || !root.contains(btn)) return;
      e.preventDefault();
      setNavOpen(!document.documentElement.classList.contains("nav-open"));
    };
    const onNavLinkClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.(".site-nav a, .header-cta");
      if (!a || !root.contains(a)) return;
      setNavOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1024) setNavOpen(false);
    };
    document.addEventListener("click", onToggleClick, true);
    document.addEventListener("click", onNavLinkClick, true);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    cleanups.push(() => {
      document.removeEventListener("click", onToggleClick, true);
      document.removeEventListener("click", onNavLinkClick, true);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("nav-open");
    });
    root.querySelectorAll<HTMLElement>("[data-style-hover]").forEach((el) => {
      const hoverRaw = el.getAttribute("data-style-hover") || "";
      const hover = parseStyleHover(hoverRaw);
      const base: Record<string, string> = {};
      Object.keys(hover).forEach((k) => {
        base[k] = el.style.getPropertyValue(k) || "";
      });
      const enter = () => {
        Object.entries(hover).forEach(([k, v]) => el.style.setProperty(k, v));
      };
      const leave = () => {
        Object.entries(base).forEach(([k, v]) => {
          if (v) el.style.setProperty(k, v);
          else el.style.removeProperty(k);
        });
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    });

    // header scroll state + logo swap (white on transparent hero, blue when scrolled)
    const onScroll = () => {
      const scrolled = (window.scrollY || 0) > (page === "home" ? 40 : 24);
      document.documentElement.classList.toggle("is-scrolled", scrolled);
      document.body.classList.toggle("is-scrolled", scrolled);
      root.querySelectorAll(".site-header").forEach((header) => {
        header.classList.toggle("is-scrolled", scrolled);
      });
      const logo = document.getElementById("siteLogo") as HTMLImageElement | null;
      if (logo) {
        logo.src = scrolled
          ? "/images/web/logo-blue.png"
          : "/images/web/logo-white.png";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("is-scrolled");
      document.body.classList.remove("is-scrolled");
      root.querySelectorAll(".site-header").forEach((header) => {
        header.classList.remove("is-scrolled");
      });
    });

    // FAQs open on home
    if (page === "home") {
      const openFaqs = () => {
        document.querySelectorAll<HTMLDetailsElement>(".faq-item details").forEach((d) => {
          d.open = true;
        });
      };
      openFaqs();
      const t = window.setTimeout(openFaqs, 300);
      cleanups.push(() => window.clearTimeout(t));
    }

    // service section sessionStorage from homepage rows
    const onSvcClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const a = t?.closest?.("a.svc-row[data-svc-section]");
      if (!a) return;
      try {
        sessionStorage.setItem(
          "wtbsServiceSection",
          a.getAttribute("data-svc-section") || ""
        );
      } catch {
        /* ignore */
      }
    };
    document.addEventListener("click", onSvcClick, true);
    cleanups.push(() => document.removeEventListener("click", onSvcClick, true));

    // contact form validation (original behavior)
    const wtbsContactSubmit = (form: HTMLFormElement) => {
      const names = ["fullname", "email", "phone", "interest"];
      let ok = true;
      let firstBad: HTMLElement | null = null;
      for (let i = 0; i < names.length; i++) {
        const el = form.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
          `[name="${names[i]}"]`
        );
        if (!el) {
          ok = false;
          continue;
        }
        const val = el.value == null ? "" : String(el.value).trim();
        const empty = !val;
        const badEmail =
          names[i] === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (empty || badEmail) {
          ok = false;
          el.classList.add("is-invalid");
          if (!firstBad) firstBad = el;
        } else {
          el.classList.remove("is-invalid");
        }
      }
      if (!ok) {
        firstBad?.focus();
        return false;
      }
      window.location.assign("/thank-you");
      return false;
    };

    const onBtnClick = (e: MouseEvent) => {
      let t = e.target as Node | null;
      if (t && t.nodeType === 3) t = t.parentElement;
      const el = t as Element | null;
      const btn = el?.closest?.(".js-contact-submit");
      if (!btn) return;
      const form = btn.closest?.("form.contact-form") as HTMLFormElement | null;
      if (!form) return;
      e.preventDefault();
      e.stopPropagation();
      wtbsContactSubmit(form);
    };
    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form?.classList?.contains("contact-form")) return;
      e.preventDefault();
      e.stopPropagation();
      wtbsContactSubmit(form);
    };
    document.addEventListener("click", onBtnClick, true);
    document.addEventListener("submit", onSubmit, true);
    cleanups.push(() => {
      document.removeEventListener("click", onBtnClick, true);
      document.removeEventListener("submit", onSubmit, true);
    });

    // services deep-link / in-page smooth scroll (from original services.html)
    if (page === "services") {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      const SECTION_IDS: Record<string, number> = {
        preparation: 1,
        implementation: 1,
        planning: 1,
        business: 1,
      };
      let deepLinkTimer: ReturnType<typeof setTimeout> | null = null;
      let deepLinkRaf = 0;

      const sectionIdFromUrl = () => {
        const q = new URLSearchParams(window.location.search).get("s");
        if (q && SECTION_IDS[q]) return q;
        const h = (window.location.hash || "").replace(/^#/, "");
        if (h && SECTION_IDS[h]) return h;
        try {
          const s = sessionStorage.getItem("wtbsServiceSection") || "";
          return SECTION_IDS[s] ? s : "";
        } catch {
          return "";
        }
      };

      const headerOffset = () => {
        const header = document.querySelector(".site-header");
        if (header) return Math.round(header.getBoundingClientRect().height) + 16;
        return 110;
      };

      const scrollToId = (id: string, smooth: boolean) => {
        if (!id) return false;
        const el = document.getElementById(id);
        if (!el) return false;
        const top = Math.max(
          0,
          el.getBoundingClientRect().top + window.pageYOffset - headerOffset()
        );
        try {
          window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
        } catch {
          window.scrollTo(0, top);
        }
        return true;
      };

      const idFromHref = (href: string | null) => {
        if (!href) return "";
        let hash = "";
        if (href.charAt(0) === "#") hash = href.slice(1);
        else {
          const m = href.match(
            /(?:^|\/)services(?:\.html)?(?:\?[^#]*)?(?:#([a-z0-9-]+)|$)/i
          );
          if (m?.[1]) hash = m[1];
          else {
            try {
              const u = new URL(href, window.location.origin);
              const s = u.searchParams.get("s");
              if (s) hash = s;
            } catch {
              /* ignore */
            }
          }
        }
        hash = (hash || "").split("&")[0];
        return SECTION_IDS[hash] ? hash : "";
      };

      const onHashClick = (e: MouseEvent) => {
        const a = (e.target as Element | null)?.closest?.("a[href]");
        if (!a) return;
        const id =
          a.getAttribute("data-svc-section") || idFromHref(a.getAttribute("href"));
        if (!id || !document.getElementById(id)) return;
        e.preventDefault();
        e.stopPropagation();
        if (history.replaceState) history.replaceState(null, "", "#" + id);
        else window.location.hash = id;
        // Double rAF lets layout settle so smooth scroll doesn't stutter
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToId(id, true));
        });
      };
      document.addEventListener("click", onHashClick, true);
      cleanups.push(() => document.removeEventListener("click", onHashClick, true));

      const initialId = sectionIdFromUrl();
      if (initialId) {
        // Snap once after layout — avoid top-flash then jump (felt draggy)
        let attempts = 0;
        const tryJump = () => {
          attempts += 1;
          const el = document.getElementById(initialId);
          if (el) {
            deepLinkRaf = requestAnimationFrame(() => {
              scrollToId(initialId, false);
              if (history.replaceState) {
                history.replaceState(null, "", `/services?s=${initialId}`);
              }
              try {
                sessionStorage.removeItem("wtbsServiceSection");
              } catch {
                /* ignore */
              }
            });
            return;
          }
          if (attempts < 40) deepLinkTimer = setTimeout(tryJump, 50);
        };
        // Prevent browser hash auto-scroll fighting us
        if (window.location.hash) {
          window.scrollTo(0, 0);
        }
        deepLinkTimer = setTimeout(tryJump, 0);
        cleanups.push(() => {
          if (deepLinkTimer) clearTimeout(deepLinkTimer);
          if (deepLinkRaf) cancelAnimationFrame(deepLinkRaf);
        });
      }
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [html, page]);

  return (
    <>
      <style
        data-wtbs-page-style={page || "page"}
        dangerouslySetInnerHTML={{ __html: combinedCss }}
      />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: enhancedHtml }} />
    </>
  );
}
