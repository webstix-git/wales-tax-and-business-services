import type { Metadata } from "next";
import HtmlPage from "@/components/HtmlPage";
import { html, css } from "@/generated/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy | Wales Tax & Business Services",
};

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/lighthouse-window.webp" type="image/webp" />
      <HtmlPage html={html} css={css} page="privacy-policy" />
    </>
  );
}
