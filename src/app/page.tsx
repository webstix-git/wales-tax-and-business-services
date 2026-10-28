import type { Metadata } from "next";
import HtmlPage from "@/components/HtmlPage";
import { html, css } from "@/generated/home";

export const metadata: Metadata = {
  title: "Wales Tax & Business Services",
  description:
    "Tax strategy for confident decisions. Advanced tax planning, preparation, and consulting in St. Joseph, Michigan.",
};

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero-lighthouse.jpg"
        type="image/jpeg"
      />
      <HtmlPage html={html} css={css} page="home" />
    </>
  );
}
