import type { Metadata } from "next";
import HtmlPage from "@/components/HtmlPage";
import { html, css } from "@/generated/about-us";

export const metadata: Metadata = {
  title: "About Us | Wales Tax & Business Services",
};

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/lighthouses-sail.webp" type="image/webp" />
      <HtmlPage html={html} css={css} page="about-us" />
    </>
  );
}
