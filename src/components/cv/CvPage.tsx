import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CvData } from "@/content/cv";

async function downloadPdf(data: CvData) {
  const [{ pdf }, { CvPdfDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("./CvPdfDocument"),
  ]);
  const blob = await pdf(<CvPdfDocument data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = data.fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-3 border-b border-primary pb-1 font-display text-sm font-bold uppercase tracking-[0.12em] text-primary">
      {children}
    </h2>
  );
}

export function CvPage({ data }: { data: CvData }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const L = data.labels;
  const other = data.lang === "es" ? "/cv/en" : "/cv";

  return (
    <main className="cv-page min-h-screen bg-secondary py-6 sm:py-10" lang={data.lang}>
      <div className="cv-controls mx-auto flex max-w-[210mm] flex-wrap items-center justify-between gap-3 px-4 pb-4 sm:px-0">
        <Link to="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
          ← {L.backToPortfolio}
        </Link>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={other}>{L.switchTo}</Link>
          </Button>
          <Button
            size="sm"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setError(null);
              try {
                await downloadPdf(data);
              } catch {
                setError(data.lang === "es" ? "No se pudo descargar el PDF. Intentá nuevamente." : "The PDF could not be downloaded. Please try again.");
              } finally { setBusy(false); }
            }}
          >
            <Download className="size-4" aria-hidden />
            {busy ? "…" : L.download}
          </Button>
        </div>
      </div>
      {error ? <p role="alert" className="cv-controls mx-auto mb-4 max-w-[210mm] px-4 text-sm text-destructive">{error}</p> : null}

      <article
        lang={data.lang}
        className="cv-document mx-auto max-w-[210mm] bg-card px-6 py-8 text-[15px] leading-relaxed text-card-foreground shadow-sm sm:px-14 sm:py-12"
      >
        <header>
          <h1 className="font-display text-3xl font-bold tracking-wide">{data.name}</h1>
          <p className="mt-1 font-display text-sm font-bold tracking-[0.08em] text-primary">{data.headline}</p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {data.links.map((l) => (
              <span key={l.url}>
                {l.label}:{" "}
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                  {l.display}
                </a>
              </span>
            ))}
          </p>
        </header>

        <section className="mt-7">
          <SectionTitle>{L.profile}</SectionTitle>
          {data.profile.map((p) => <p key={p.slice(0, 20)} className="mb-2">{p}</p>)}
        </section>

        <section className="mt-7">
          <SectionTitle>{L.experience}</SectionTitle>
          {data.jobs.map((j) => (
            <div key={j.company} className="mb-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-base font-bold">{j.title}</h3>
                <span className="text-sm text-muted-foreground">{j.period}</span>
              </div>
              <p className="text-muted-foreground">{j.company}</p>
              <p className="mt-1">{j.description}</p>
              {j.sectors ? <p className="mt-1 font-semibold">{j.sectors}</p> : null}
              <ul className="mt-1 list-disc pl-5">
                {j.responsibilities.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section className="cv-skills mt-7">
          <SectionTitle>{L.skills}</SectionTitle>
          {data.skills.map((g) => (
            <p key={g.name} className="mb-2"><strong>{g.name}:</strong> {g.items.join(" · ")}.</p>
          ))}
        </section>

        <section className="mt-7">
          <SectionTitle>{L.education}</SectionTitle>
          {data.education.map((e) => (
            <div key={e.title} className="mb-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-base font-bold">{e.title}</h3>
                <span className="text-sm text-muted-foreground">{e.period}</span>
              </div>
              <p className="text-muted-foreground">{e.institution}</p>
              <p className="text-sm text-muted-foreground">{e.status}</p>
              {e.description ? <p className="mt-1">{e.description}</p> : null}
              {e.details ? <p className="mt-1"><strong>{e.detailsLabel}:</strong> {e.details.join(" · ")}.</p> : null}
              {e.extra?.map((x) => <p key={x.label}><strong>{x.label}:</strong> {x.text}</p>)}
            </div>
          ))}
        </section>

        <section className="mt-7">
          <SectionTitle>{L.languages}</SectionTitle>
          {data.languages.map((l) => <p key={l.name}><strong>{l.name}:</strong> {l.level}</p>)}
        </section>
      </article>
    </main>
  );
}
