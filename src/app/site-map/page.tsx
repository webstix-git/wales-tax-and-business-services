import type { Metadata } from "next";
import HtmlPage from "@/components/HtmlPage";
import { html, css } from "@/generated/site-map";

export const metadata: Metadata = {
  title: "Site Map | Wales Tax & Business Services",
};

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/dune-path.webp" type="image/webp" />
      <HtmlPage html={html} css={css} page="site-map" />
    </>
  );
}
