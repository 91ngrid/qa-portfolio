import { createFileRoute } from "@tanstack/react-router";
import { CvPage } from "@/components/cv/CvPage";
import { cvEs } from "@/content/cv";

const title = "CV · Ingrid Ríos Romillo | Semi Senior QA Analyst";
const description = "Currículum de Ingrid Ríos Romillo, Semi Senior QA Analyst con más de 4 años en testing de software. Descarga en PDF.";

export const Route = createFileRoute("/cv/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://qaingrid.vercel.app/cv" },
      { name: "twitter:url", content: "https://qaingrid.vercel.app/cv" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://qaingrid.vercel.app/cv" }],
  }),
  component: () => <CvPage data={cvEs} />,
});
