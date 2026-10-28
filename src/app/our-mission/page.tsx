import type { Metadata } from "next";
import HtmlPage from "@/components/HtmlPage";
import { html, css } from "@/generated/our-mission";

export const metadata: Metadata = {
  title: "Our Mission | Wales Tax & Business Services",
};

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/lighthouse-sunset.webp" type="image/webp" />
      <HtmlPage html={html} css={css} page="our-mission" />
    </>
  );
}
