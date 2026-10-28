"use client";

import { useEffect } from "react";

export default function ScrollTop() {
  useEffect(() => {
    if ((window as unknown as { __wtbsScrollTop?: boolean }).__wtbsScrollTop) return;
    (window as unknown as { __wtbsScrollTop?: boolean }).__wtbsScrollTop = true;

    const style = document.createElement("style");
    style.textContent =
      ".scroll-top{position:fixed;right:clamp(16px,3vw,28px);bottom:clamp(16px,3vw,28px);z-index:90;" +
      "width:48px;height:48px;padding:0;border:0;cursor:pointer;" +
      "display:inline-flex;align-items:center;justify-content:center;" +
      "background:#003F6B;color:#FFFFFF;" +
      "box-shadow:0 10px 28px rgba(0,42,75,.22);" +
      "opacity:0;visibility:hidden;transform:translateY(10px);" +
      "transition:opacity .25s ease,visibility .25s ease,transform .25s ease,background .2s ease;}" +
      ".scroll-top.is-visible{opacity:1;visibility:visible;transform:translateY(0);}" +
      ".scroll-top:hover{background:#025B97;}" +
      ".scroll-top:focus-visible{outline:2px solid #B59F61;outline-offset:3px;}" +
      ".scroll-top svg{display:block;width:22px;height:22px;}";
    document.head.appendChild(style);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "scroll-top";
    btn.setAttribute("aria-label", "Scroll to top");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 14l6-6 6 6"/></svg>';
    document.body.appendChild(btn);

    const update = () => {
      btn.classList.toggle("is-visible", (window.scrollY || 0) > 420);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();

    const onClick = () => {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        window.scrollTo(0, 0);
      }
    };
    btn.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", update);
      btn.removeEventListener("click", onClick);
      btn.remove();
      style.remove();
      (window as unknown as { __wtbsScrollTop?: boolean }).__wtbsScrollTop = false;
    };
  }, []);

  return null;
}
