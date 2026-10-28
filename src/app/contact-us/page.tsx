import type { Metadata } from "next";
import HtmlPage from "@/components/HtmlPage";
import { html, css } from "@/generated/contact-us";

export const metadata: Metadata = {
  title: "Contact Us | Wales Tax & Business Services",
};

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/pier-catwalk.webp" type="image/webp" />
      <HtmlPage html={html} css={css} page="contact-us" />
    </>
  );
}
