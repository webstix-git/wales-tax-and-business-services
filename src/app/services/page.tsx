import type { Metadata } from "next";
import HtmlPage from "@/components/HtmlPage";
import { html, css } from "@/generated/services";

export const metadata: Metadata = {
  title: "Services | Wales Tax & Business Services",
};

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/channel.webp" type="image/webp" />
      <HtmlPage html={html} css={css} page="services" />
    </>
  );
}
