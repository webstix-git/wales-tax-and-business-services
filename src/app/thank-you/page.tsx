import type { Metadata } from "next";
import HtmlPage from "@/components/HtmlPage";
import { html, css } from "@/generated/thank-you";

export const metadata: Metadata = {
  title: "Thank You | Wales Tax & Business Services",
};

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/pier-catwalk.webp" type="image/webp" />
      <HtmlPage html={html} css={css} page="thank-you" />
    </>
  );
}
