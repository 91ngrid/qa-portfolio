// Contenido editable del portfolio. Agregá proyectos reales en `projects`.

export const contact = {
  linkedin: "https://www.linkedin.com/in/ingridriosromillo/",
  email: "riosromilloingrid@gmail.com",
};

export type Role = { title: string; period: string };
export type Experience = {
  company: string;
  location?: string;
  roles: Role[]; // muestra avance seniority
  summary?: string;
  responsibilities?: string[];
  kind: "it" | "health";
};

export const experiences: Experience[] = [
  {
    company: "THESE (The Software Evolution)",
    location: "Montevideo, Uruguay",
    kind: "it",
    roles: [{ title: "Semi Senior QA Analyst", period: "Mar 2022 – actualidad" }],
    summary:
      "Antes de probar, leo el requerimiento y trato de entender el proceso completo, no solo la pantalla que cambió. Con eso armo los escenarios y elijo los datos que pueden hacer aparecer un problema. Cuando encuentro algo, lo documento para que quien lo tenga que resolver entienda qué pasó y cómo reproducirlo, y le hago seguimiento hasta cerrarlo. En estos años trabajé en proyectos de retail, fintech y seguros.",
    responsibilities: [
      "Functional, integration y regression testing",
      "Exploratory y usability testing",
      "Pruebas de procesos batch",
      "Preparación de datos de prueba",
      "Reporte y seguimiento de incidencias",
      "Coordinación con otras áreas y sistemas",
    ],
  },
  {
    company: "uTest",
    kind: "it",
    roles: [{ title: "Software Tester", period: "" }],
  },
  {
    company: "ASSE",
    kind: "health",
    roles: [{ title: "Práctica en Farmacia Hospitalaria", period: "" }],
  },
  {
    company: "Banco de Seguros del Estado",
    kind: "health",
    roles: [{ title: "Práctica en Farmacia Hospitalaria", period: "" }],
  },
];

export const expertise = [
  {
    name: "Quality Assurance",
    items: [
      "Software Testing", "Functional Testing", "Integration Testing", "Regression Testing",
      "Exploratory Testing", "Usability Testing", "Diseño de casos de prueba", "Análisis de requerimientos",
      "Gestión de defectos", "Software Quality",
    ],
  },
  {
    name: "Procesos y negocio",
    items: [
      "Análisis de requerimientos", "Comprensión de procesos de negocio", "Validación de procesos",
      "Documentación", "Validación centrada en el usuario",
    ],
  },
  {
    name: "Dominio sanitario",
    items: [
      "Farmacia Hospitalaria", "Dispensación de medicamentos", "Gestión de medicación",
      "Gestión de stock e inventario", "Logística farmacéutica", "Procesos hospitalarios",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  category: "QA" | "Healthcare QA" | "Académico";
  description: string;
  objective?: string;
  context?: string;
  role?: string;
  tools?: string[];
  testing?: string[];
  decisions?: string[];
  results?: string[];
  learnings?: string[];
  screenshots?: string[];
  docsUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
};

// Sin proyectos inventados: agregar aquí cuando existan.
export const projects: Project[] = [];

export const caseStudySections = [
  "Contexto", "Problema", "Requerimientos", "Estrategia de pruebas", "Casos de prueba", "Datos de prueba",
  "Testing funcional", "API Testing", "Validaciones SQL", "Incidencias",
  "Resultados", "Aprendizajes",
];

export type EducationItem = { title: string; institution?: string; year?: string };
export const education: EducationItem[] = [
  { title: "Tester de Software", institution: "Ceibal – Jóvenes a Programar", year: "2020 – 2022" },
  { title: "Analista en TI", institution: "Cámara Uruguaya de Tecnologías de la Información (CUTI) – Programa b_IT", year: "2018 – 2020" },
  { title: "Auxiliar de Farmacia Hospitalaria", institution: "Universidad de la República (UdelaR) – Facultad de Química", year: "2014 – 2016" },
];
