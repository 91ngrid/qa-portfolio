import { createFileRoute } from "@tanstack/react-router";
import { CvPage } from "@/components/cv/CvPage";
import { cvEn } from "@/content/cv";

const title = "Resume · Ingrid Ríos Romillo | Semi Senior QA Analyst";
const description = "Resume of Ingrid Ríos Romillo, Semi Senior QA Analyst with 4+ years of software testing experience. PDF download available.";

export const Route = createFileRoute("/cv/en")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://qaingrid.vercel.app/cv/en" },
      { name: "twitter:url", content: "https://qaingrid.vercel.app/cv/en" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://qaingrid.vercel.app/cv/en" }],
  }),
  component: () => <CvPage data={cvEn} />,
});
