import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Linkedin, Mail, Menu, X } from "lucide-react";
import {
  contact, experiences, expertise, projects, caseStudySections, education,
} from "@/content/profile";
import { QaCursorHalo } from "@/components/QaCursorHalo";

const TITLE = "Ingrid Ríos Romillo | QA Analyst Ssr | Functional Testing";
const DESC =
  "Ingrid Ríos Romillo, QA Analyst Ssr (Semi Senior QA Analyst) en Uruguay. Más de 4 años en Functional Testing, Integration Testing y Regression Testing.";
const URL = "https://qaingrid.vercel.app";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: URL },
      { property: "og:locale", content: "es_UY" },
      { property: "og:site_name", content: "Ingrid Ríos Romillo" },
      { property: "og:image", content: `${URL}/portfolio-share.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: "INGRID RIOS ROMILLO · SEMI SENIOR QA ANALYST" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: URL },
      { name: "twitter:image", content: `${URL}/portfolio-share.png` },
      { name: "twitter:image:alt", content: "INGRID RIOS ROMILLO · SEMI SENIOR QA ANALYST" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Ingrid Ríos Romillo",
        jobTitle: "Semi Senior QA Analyst",
        url: URL,
        email: "mailto:riosromilloingrid@gmail.com",
        sameAs: ["https://www.linkedin.com/in/ingridriosromillo/"],
        address: { "@type": "PostalAddress", addressLocality: "Ciudad de la Costa", addressCountry: "UY" },
      }),
    }],
  }),
  component: Index,
});

const NAV = [
  ["about", "Sobre mí"], ["experience", "Experiencia"], ["skills", "Competencias"],
  ["learning", "Formación"], ["projects", "Proyectos"], ["contact", "Contacto"],
] as const;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Section({ id, n, eyebrow, title, children, className = "" }: { id: string; n: string; eyebrow: string; title: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow"><span className="text-muted-foreground">{n} — </span>{eyebrow}</p>
          </div>
          <h2 className="text-3xl font-bold leading-tight text-primary md:col-span-8 md:text-4xl">{title}</h2>
        </div>
        <div className="mt-10 lg:mt-12">{children}</div>
      </div>
    </section>
  );
}

function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "health" | "dashed" }) {
  const t = {
    default: "border-border bg-card text-foreground",
    health: "border-health/25 bg-health-soft text-health",
    dashed: "border-dashed border-tech/40 text-tech",
  }[tone];
  return <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm ${t}`}>{children}</span>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? "border-b bg-background/90 backdrop-blur" : ""}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-display shrink-0 whitespace-nowrap text-sm font-extrabold tracking-[0.14em] text-primary">INGRID RIOS ROMILLO</a>
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map(([id, l]) => (
            <a key={id} href={`#${id}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">{l}</a>
          ))}
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>
        <Button variant="ghost" size="icon" className="lg:hidden text-primary [&_svg]:size-6" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-navigation">
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Navegación principal" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-background px-6 py-6 lg:hidden">
          <ul className="space-y-4">
            {NAV.map(([id, l]) => (
              <li key={id}><a onClick={() => setOpen(false)} href={`#${id}`} className="font-display text-2xl font-semibold text-primary">{l}</a></li>
            ))}
            <li><a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-tech">LinkedIn <ArrowUpRight className="h-4 w-4" /></a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16">
      <div className="hero-grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <h1 className="reveal font-display text-4xl font-bold leading-[1.05] text-primary min-[375px]:text-5xl sm:text-6xl lg:text-7xl">
            INGRID RIOS ROMILLO
          </h1>
          <span aria-hidden="true" className="reveal mt-5 block h-0.5 w-14 rounded-full bg-coral" />
          <p className="reveal mt-6 font-display text-sm font-bold tracking-[0.24em] text-foreground md:text-base">SEMI SENIOR QA ANALYST</p>
          <p aria-label="Calidad, procesos, tecnología" className="reveal mt-6 font-display text-lg font-medium tracking-[0.04em] text-tech sm:whitespace-nowrap sm:text-2xl lg:text-[1.75rem]">
            {["CALIDAD", "PROCESOS", "TECNOLOGÍA"].map((w, i) => (
              <span key={w} aria-hidden="true" className="whitespace-nowrap">
                {i > 0 && <span className="concept-sep mx-2 text-teal sm:mx-3" style={{ animationDelay: `${i * 0.35 + 0.1}s` }}>·</span>}
                <span className="concept-word" style={{ animationDelay: `${i * 0.35}s` }}>{w}</span>
              </span>
            ))}
          </p>
          <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-foreground">
            Trabajo hace más de cuatro años en testing de software, con foco en los requerimientos y los procesos
            de negocio. Mi formación y prácticas en Farmacia Hospitalaria me acercaron a los procesos sanitarios.
            Hoy quiero conectar esos conocimientos y orientar mi recorrido hacia HealthTech.
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center gap-3">
            <a href="#experience" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
              Ver mi experiencia <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-accent">
              Ver proyectos
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-2 text-sm text-muted-foreground hover:text-primary">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
        <div className="reveal min-w-0 lg:col-span-4 lg:flex lg:items-end">
          <dl className="grid w-full grid-cols-2 gap-6 border-t border-primary/15 pt-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            <div>
              <dt className="font-display text-3xl font-extrabold text-tech lg:text-4xl">4+</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">años de experiencia profesional en QA</dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-extrabold text-tech lg:text-4xl">3</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">sectores: retail, fintech y seguros</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="font-display text-lg font-bold text-health">Farmacia Hospitalaria</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">formación y prácticas en ASSE y Banco de Seguros del Estado</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" n="01" eyebrow="Sobre mí" title="Me interesa saber qué puede salir mal antes de que llegue a producción.">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4" />
        <div className="reveal space-y-6 text-lg leading-relaxed text-foreground/80 md:col-span-7">
          <p>
            Trabajo en QA porque me gusta entender cómo funciona un producto, qué necesita de verdad quien lo
            usa y dónde se puede romper. Casi nunca empiezo probando: primero leo el requerimiento, pregunto lo
            que no está claro y miro el proceso entero, porque muchos problemas aparecen en el paso anterior o
            en el siguiente.
          </p>
          <p>
            Después pienso los escenarios, preparo los datos y pruebo desde distintos lugares: el usuario que
            hace todo bien, el que se equivoca, el caso que nadie imaginó. Cuando algo no cierra, lo documento y
            lo explico de forma que se pueda analizar sin tener que adivinar.
          </p>
          <p>
            Para mí el trabajo no termina en encontrar errores. Lo que más valor tiene es la información que
            queda: qué tan listo está el producto, qué riesgos hay y qué conviene mirar antes de salir.
          </p>
        </div>
      </div>
    </Section>
  );
}

function ExperienceSection() {
  const it = experiences.filter((e) => e.kind === "it");
  const health = experiences.filter((e) => e.kind === "health");
  return (
    <Section id="experience" n="02" eyebrow="Experiencia" title="Un recorrido entre el software y el hospital." className="bg-card">
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
        <div className="reveal md:col-span-4">
          <p className="eyebrow">Sectores de experiencia</p>
        </div>
        <div className="reveal md:col-span-8">
          <p className="font-display text-xl font-bold tracking-[0.04em] text-primary sm:text-2xl lg:text-3xl">
            RETAIL <span className="text-teal">·</span> FINTECH <span className="text-teal">·</span> SEGUROS
          </p>
        </div>

        <div className="md:col-span-4">
          <p className="reveal text-sm text-muted-foreground">Quality Assurance / IT</p>
        </div>
        <ol className="relative space-y-14 border-l border-primary/15 md:col-span-8">
          {it.map((e) => (
            <li key={e.company} className="reveal relative pl-8">
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-tech" />
              <h3 className="text-xl font-bold text-primary">{e.company}</h3>
              {e.roles.map((r) => (
                <p key={r.title} className="mt-1 text-foreground">
                  {r.title}{r.period && <span className="text-muted-foreground"> · {r.period}</span>}
                </p>
              ))}
              {e.location && <p className="text-sm text-muted-foreground">{e.location}</p>}
              {e.summary && <p className="mt-6 max-w-2xl leading-relaxed text-foreground/80">{e.summary}</p>}
              {e.responsibilities && (
                <ul className="mt-6 grid gap-x-8 gap-y-2.5 text-sm text-foreground/80 sm:grid-cols-2">
                  {e.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3"><span className="mt-2 h-px w-3 shrink-0 bg-tech" />{r}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>

        <div className="md:col-span-4">
          <p className="reveal text-sm text-health">Farmacia Hospitalaria</p>
        </div>
        <ol className="relative space-y-10 border-l border-health/25 md:col-span-8">
          {health.map((e) => (
            <li key={e.company} className="reveal relative pl-8">
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-health bg-card" />
              <h3 className="text-lg font-bold text-health">{e.company}</h3>
              <p className="mt-1 text-foreground/80">{e.roles[0]?.title}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" n="03" eyebrow="Competencias" title="Experiencia y conocimientos adquiridos.">
      <div className="divide-y border-y">
        {expertise.map((g) => (
          <div key={g.name} className="reveal grid gap-6 py-10 md:grid-cols-12">
            <h3 className={`font-display text-sm font-bold uppercase tracking-[0.14em] md:col-span-4 ${g.name.startsWith("Dominio") ? "text-health" : "text-primary"}`}>{g.name}</h3>
            <div className="flex flex-wrap gap-2.5 md:col-span-8">
              {g.items.map((i) => <Tag key={i} tone={g.name.startsWith("Dominio") ? "health" : "default"}>{i}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Pharmacy() {
  const items = [
    ["Medicamentos", "Qué son, cómo se guardan y cómo se manejan."],
    ["Dispensación", "Del pedido médico a la entrega."],
    ["Stock y abastecimiento", "Inventarios, reposición y control de vencimientos."],
    ["Unidosis", "Preparación y fraccionamiento por paciente."],
    ["Preparación de medicación", "Donde un error de dosis no es un detalle."],
    ["Atención al paciente", "La persona que está del otro lado."],
    ["Procesos hospitalarios", "Cómo se mueve la información entre áreas."],
  ];
  return (
    <section className="bg-deep py-24 text-deep-foreground md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal grid gap-6 md:grid-cols-12">
          <p className="eyebrow text-tech-on-deep md:col-span-4"><span className="text-deep-foreground/85">04 — </span>Farmacia Hospitalaria</p>
          <div className="md:col-span-8">
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">Lo que aprendí antes del software.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-deep-foreground/85">
              Antes de dedicarme al software me formé en Farmacia Hospitalaria, con prácticas en ASSE y en el
              Banco de Seguros del Estado. Ahí vi de cerca cómo llega un medicamento desde el pedido hasta el
              paciente, y todo lo que pasa en el medio: stock, vencimientos, unidosis, preparación. Aprendí que
              detrás de cada registro hay una persona y alguien responsable de que esté bien.
            </p>
          </div>
        </div>
        <div className="mt-10 lg:mt-12 grid gap-px overflow-hidden rounded-lg bg-deep-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([t, d], i) => (
            <div key={t} className="reveal bg-deep p-7">
              <p className="font-display text-sm text-teal-on-deep">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-deep-foreground/85">{d}</p>
            </div>
          ))}
          <div className="reveal flex items-end bg-deep p-7">
            <p className="text-sm leading-relaxed text-teal-on-deep">Durante años fueron caminos separados. Ahora estoy empezando a conectarlos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Learning() {
  const cols = [
    { k: "Consolidado", d: "Experiencia profesional en testing de software", items: ["QA", "Functional Testing", "Software Quality"], tone: "default" as const },
    { k: "En desarrollo", d: "Lo estoy incorporando para validar también las APIs y los datos, no solo la interfaz", items: ["API Testing", "Postman", "SQL", "Databases"], tone: "dashed" as const },
    { k: "Dirección futura", d: "Lo que me interesa conocer mejor. Todavía no es experiencia", items: ["Healthcare IT", "HealthTech", "Software médico", "Interoperabilidad en salud", "Datos y sistemas de salud"], tone: "health" as const },
  ];
  return (
    <Section id="learning" n="05" eyebrow="Formación y aprendizaje" title="Lo que sé, lo que estoy aprendiendo y hacia dónde voy." className="bg-card">
      <div className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
        {cols.map((c, i) => (
          <div key={c.k} className="reveal bg-card p-8">
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-primary" : i === 1 ? "border border-tech" : "bg-health/40"}`} />
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-primary">{c.k}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            <div className="mt-8 flex flex-wrap gap-2">{c.items.map((x) => <Tag key={x} tone={c.tone}>{x}</Tag>)}</div>
          </div>
        ))}
      </div>
      <div className="reveal mt-12 grid gap-6 md:grid-cols-12">
        <p className="eyebrow md:col-span-4">Educación y formación</p>
        <ul className="divide-y border-y md:col-span-8">
          {education.map((e) => (
            <li key={e.title} className="py-4">
              <span className="text-foreground">{e.institution}{e.title === "Auxiliar de Farmacia Hospitalaria" ? ": " : " - "}{e.title}{e.year && ` (${e.year})`}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" n="06" eyebrow="Proyectos" title="Casos de estudio en construcción.">
      {projects.length > 0 ? (
        <div className="divide-y border-y">
          {projects.map((p) => (
            <article key={p.slug} className="reveal grid gap-6 py-10 md:grid-cols-12">
              <p className="text-sm text-muted-foreground md:col-span-4">{p.category}</p>
              <div className="md:col-span-8">
                <h3 className="text-2xl font-bold text-primary">{p.name}</h3>
                <p className="mt-3 text-foreground/80">{p.description}</p>
                {p.tools && <div className="mt-5 flex flex-wrap gap-2">{p.tools.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <p className="leading-relaxed text-muted-foreground">Todavía no hay proyectos publicados. Los iré sumando a medida que estén listos.</p>
          </div>
          <div className="reveal rounded-lg border border-dashed border-tech/40 p-8 md:col-span-8 md:p-10">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Próximamente</p>
              
            </div>
            <p className="mt-6 font-display text-xl font-semibold text-primary">Estructura de cada case study</p>
            <ol className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
              {caseStudySections.map((s, i) => (
                <li key={s} className="flex gap-2 text-muted-foreground">
                  <span className="font-display text-tech">{String(i + 1).padStart(2, "0")}</span>{s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </Section>
  );
}

function Direction() {
  return (
    <section className="py-16 lg:py-24">
      <div className="reveal mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow">07 — Dirección profesional</p>
        <p className="mt-8 font-display text-2xl font-semibold leading-snug text-primary md:text-4xl">
          QA consolidado <span className="text-tech">+</span> farmacia hospitalaria <span className="text-tech">+</span> desarrollo
          técnico continuo <span className="text-muted-foreground">→</span> <span className="text-health">tecnología aplicada a la salud.</span>
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-muted-foreground">
          Después de varios años en QA, y con la farmacia como punto de partida, estoy empezando a orientarme
          hacia el cruce entre software y salud. Me interesa entender mejor los sistemas sanitarios, el software
          médico, la información clínica y la interoperabilidad. Es una etapa que recién empieza.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-6">
        <p className="reveal mb-6 text-center text-sm font-semibold text-health">Ejemplos hipotéticos de aplicación de QA al sector salud</p>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ["01", "Gestión de medicamentos", "Validación de funcionalidades de stock, vencimientos, dispensación y registro de cantidades.", "procesos farmacéuticos + testing funcional."],
            ["02", "Receta electrónica e historia clínica", "Pruebas de integridad de datos, consistencia de la información y comunicación entre sistemas.", "QA + calidad de datos + interoperabilidad."],
            ["03", "Administración de medicación", "Verificación de asociaciones correctas entre paciente, medicamento y datos de administración.", "testing + trazabilidad + seguridad del proceso."],
          ].map(([n, t, d, c]) => (
            <article key={n} className="direction-card reveal flex flex-col rounded-lg border border-t-2 border-t-teal bg-card p-8 text-left">
              <p className="font-display text-sm font-bold tracking-[0.14em] text-teal">{n}</p>
              <h3 className="mt-4 text-lg font-bold text-primary">{t}</h3>
              <p className="mt-3 leading-relaxed text-foreground/80">{d}</p>
              <p className="mt-6 border-t border-teal/30 pt-4 text-sm italic text-muted-foreground">Conexión: {c}</p>
            </article>
          ))}
        </div>
        <p className="reveal mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Ejemplos ilustrativos de aplicación de conocimientos de QA en tecnología sanitaria. No representan proyectos ejecutados ni experiencia específica en sistemas clínicos.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-12">
        <div className="reveal md:col-span-6">
          <p className="eyebrow">08 — Contacto</p>
          <h2 className="mt-6 text-4xl font-extrabold text-primary md:text-5xl">Hablemos.</h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">Si trabajás en QA, en sistemas de salud o en algo que cruce los dos, me gustaría conversar.</p>
        </div>
        <div className="reveal flex flex-col justify-end gap-2 md:col-span-6">
          {[
            [contact.linkedin, "LinkedIn", <Linkedin key="l" className="h-5 w-5" />],
            [`mailto:${contact.email}`, contact.email, <Mail key="m" className="h-5 w-5" />],
          ].map(([href, label, icon]) => {
            const isMail = (href as string).startsWith("mailto:");
            return (
              <a key={href as string} href={href as string}
                {...(isMail ? {} : { target: "_blank", rel: "noreferrer" })}
                className="group flex items-center justify-between gap-3 border-b py-5 text-sm sm:text-lg text-foreground transition-colors hover:text-primary">
                <span className="flex min-w-0 items-center gap-3 text-tech [&_svg]:shrink-0">{icon}<span className="min-w-0 break-words text-foreground group-hover:text-primary">{label}</span></span>
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            );
          })}
        </div>
      </div>
      <p className="mx-auto mt-16 max-w-6xl px-6 text-sm text-muted-foreground">© {new Date().getFullYear()} INGRID RIOS ROMILLO · URUGUAY</p>
    </section>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen">
      <QaCursorHalo />
      <Nav />
      <main>
        <Hero />
        <About />
        <ExperienceSection />
        <Skills />
        <Pharmacy />
        <Learning />
        <Projects />
        <Direction />
        <Contact />
      </main>
    </div>
  );
}
