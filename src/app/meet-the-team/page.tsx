import type { Metadata } from "next";
import HtmlPage from "@/components/HtmlPage";
import { html, css } from "@/generated/meet-the-team";

export const metadata: Metadata = {
  title: "Meet The Team | Wales Tax & Business Services",
};

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/swing.webp" type="image/webp" />
      <HtmlPage html={html} css={css} page="meet-the-team" />
    </>
  );
}
