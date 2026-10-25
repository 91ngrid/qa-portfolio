// Datos centralizados del CV (español e inglés). Editar acá para actualizar la web y los PDF.

export type CvLang = "es" | "en";

export type CvJob = {
  company: string;
  title: string;
  period: string;
  description: string;
  sectors?: string;
  responsibilities: string[];
};

export type CvEducation = {
  institution: string;
  title: string;
  period: string;
  status: string;
  description?: string;
  details?: string[];
  detailsLabel?: string;
  extra?: { label: string; text: string }[];
};

export type CvSkillGroup = { name: string; items: string[] };

export type CvData = {
  lang: CvLang;
  name: string;
  headline: string;
  links: { label: string; url: string; display: string }[];
  labels: {
    profile: string;
    experience: string;
    skills: string;
    education: string;
    languages: string;
    download: string;
    switchTo: string;
    backToPortfolio: string;
  };
  profile: string[];
  jobs: CvJob[];
  skills: CvSkillGroup[];
  education: CvEducation[];
  languages: { name: string; level: string }[];
  fileName: string;
};

const LINKEDIN = "https://www.linkedin.com/in/ingridriosromillo/";
const PORTFOLIO = "https://qaingrid.lovable.app/";

// Nivel de inglés: editar acá cuando se confirme otro nivel.
const ENGLISH_LEVEL_ES = "Básico";
const ENGLISH_LEVEL_EN = "Basic professional proficiency";

export const cvEs: CvData = {
  lang: "es",
  name: "INGRID RÍOS ROMILLO",
  headline: "SEMI SENIOR QA ANALYST | SOFTWARE QUALITY ASSURANCE",
  links: [
    { label: "LinkedIn", url: LINKEDIN, display: "linkedin.com/in/ingridriosromillo" },
    { label: "Portfolio", url: PORTFOLIO, display: "qaingrid.lovable.app" },
  ],
  labels: {
    profile: "Perfil profesional",
    experience: "Experiencia profesional",
    skills: "Competencias técnicas y profesionales",
    education: "Formación académica",
    languages: "Idiomas",
    download: "Descargar PDF",
    switchTo: "English version",
    backToPortfolio: "Volver al portfolio",
  },
  profile: [
    "Analista de Calidad de Software con más de cuatro años de experiencia en testing, participando en el análisis, la planificación y la ejecución de pruebas funcionales, exploratorias, de usabilidad, integración y regresión, así como en la validación de procesos batch. Experiencia en análisis de requerimientos, diseño de casos de prueba, preparación de datos, gestión de incidencias, documentación y coordinación con distintas áreas de Sistemas.",
    "He trabajado en proyectos de los sectores retail, fintech y seguros, desarrollando una perspectiva orientada tanto a la calidad del producto como a los procesos de negocio y las necesidades de sus usuarios. Además, cuento con formación en Farmacia Hospitalaria y experiencia práctica en procesos sanitarios. Actualmente estoy ampliando mis conocimientos en API Testing y SQL.",
  ],
  jobs: [
    {
      company: "THESE (The Software Evolution)",
      title: "Semi Senior QA Analyst",
      period: "Mar 2022 – Actualidad",
      description:
        "Participo en el análisis, la planificación y la ejecución de actividades de testing, contribuyendo a la identificación temprana de riesgos y a la calidad del producto.",
      sectors: "Sectores: retail, fintech y seguros.",
      responsibilities: [
        "Análisis de requerimientos funcionales y necesidades de negocio.",
        "Diseño y ejecución de casos de prueba.",
        "Selección y preparación de datos de prueba.",
        "Pruebas funcionales, exploratorias y de usabilidad.",
        "Pruebas de regresión e integración.",
        "Validación de procesos batch.",
        "Identificación, reporte, seguimiento y validación de incidencias.",
        "Análisis y validación de procesos.",
        "Comunicación y coordinación con diferentes áreas de Sistemas.",
        "Documentación de pruebas y resultados.",
        "Identificación y propuesta de mejoras.",
      ],
    },
    {
      company: "uTest",
      title: "Software Tester | Crowdtesting",
      period: "Jun 2020 – Mar 2022",
      description: "Participación en proyectos de testing de software mediante plataformas de crowdtesting.",
      responsibilities: [
        "Ejecución de casos de prueba.",
        "Identificación y reporte de errores.",
        "Pruebas de usabilidad y validación funcional.",
      ],
    },
  ],
  skills: [
    {
      name: "QA y testing",
      items: [
        "Testing funcional", "Testing exploratorio", "Pruebas de usabilidad", "Pruebas de regresión",
        "Pruebas de integración", "Validación de procesos batch", "Diseño y ejecución de casos de prueba",
        "Análisis de requerimientos", "Preparación de datos de prueba",
        "Identificación, documentación y seguimiento de defectos", "Documentación de pruebas y resultados",
      ],
    },
    {
      name: "Análisis y procesos",
      items: [
        "Análisis de procesos de negocio", "Identificación de riesgos funcionales", "Validación de requerimientos",
        "Comunicación y coordinación con equipos de Sistemas", "Identificación de oportunidades de mejora",
        "Atención al detalle",
      ],
    },
    {
      name: "Conocimiento del dominio sanitario",
      items: [
        "Procesos de farmacia hospitalaria", "Dispensación y logística de medicamentos",
        "Gestión de stock y vencimientos", "Interacciones medicamentosas",
        "Abastecimiento y preparación de medicación",
      ],
    },
    { name: "En desarrollo", items: ["API Testing (en aprendizaje)", "SQL y bases de datos (en aprendizaje)"] },
  ],
  education: [
    {
      institution: "Ceibal – Jóvenes a Programar",
      title: "Tester de Software",
      period: "2020 – 2022",
      status: "Título obtenido",
      description:
        "Fundamentos de programación imperativa y orientada a objetos, testing de software y capacitación técnica complementaria.",
    },
    {
      institution: "Cámara Uruguaya de Tecnologías de la Información (CUTI) – Programa b_IT",
      title: "Analista en TI",
      period: "2018 – 2020",
      status: "Título obtenido",
      detailsLabel: "Contenidos",
      details: [
        "Programación con Python", "Acceso a bases de datos y conceptos de Big Data",
        "Especificación de requerimientos para desarrollo de software",
        "Sistemas de información y Business Intelligence", "Fundamentos de gestión de proyectos",
        "Introducción a Machine Learning, inteligencia artificial y robótica",
      ],
    },
    {
      institution: "Universidad de la República (UdelaR) – Facultad de Química",
      title: "Auxiliar de Farmacia Hospitalaria",
      period: "2014 – 2016",
      status: "Formación completada · Título avalado por el Ministerio de Salud Pública (MSP) y el Ministerio de Educación y Cultura (MEC)",
      detailsLabel: "Contenidos",
      details: [
        "Medicamentos, formas farmacéuticas y vías de administración", "Interacciones medicamentosas",
        "Legislación farmacéutica", "Logística del medicamento en servicios de salud",
      ],
      extra: [
        { label: "Prácticas", text: "ASSE y Banco de Seguros del Estado (BSE)" },
        {
          label: "Áreas",
          text: "Dispensación, abastecimiento, gestión de stock y vencimientos, unidosis y preparación de medicación.",
        },
      ],
    },
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: ENGLISH_LEVEL_ES },
  ],
  fileName: "CV-Ingrid-Rios-Romillo-QA-Analyst-ES.pdf",
};

export const cvEn: CvData = {
  lang: "en",
  name: "INGRID RÍOS ROMILLO",
  headline: "SEMI SENIOR QA ANALYST | SOFTWARE QUALITY ASSURANCE",
  links: cvEs.links,
  labels: {
    profile: "Professional Summary",
    experience: "Professional Experience",
    skills: "Technical and Professional Skills",
    education: "Education",
    languages: "Languages",
    download: "Download PDF",
    switchTo: "Versión en español",
    backToPortfolio: "Back to portfolio",
  },
  profile: [
    "Software Quality Analyst with over four years of testing experience, involved in the analysis, planning and execution of functional, exploratory, usability, integration and regression testing, as well as batch process validation. Experienced in requirements analysis, test case design, test data preparation, defect management, documentation and coordination with different IT teams.",
    "I have worked on projects in the retail, fintech and insurance sectors, building a perspective focused on both product quality and the underlying business processes and user needs. I also hold a qualification in Hospital Pharmacy with hands-on experience in healthcare processes. I am currently expanding my knowledge of API Testing and SQL.",
  ],
  jobs: [
    {
      company: "THESE (The Software Evolution)",
      title: "Semi Senior QA Analyst",
      period: "Mar 2022 – Present",
      description:
        "I take part in the analysis, planning and execution of testing activities, helping identify risks early and improve product quality.",
      sectors: "Sectors: retail, fintech and insurance.",
      responsibilities: [
        "Analysis of functional requirements and business needs.",
        "Test case design and execution.",
        "Test data selection and preparation.",
        "Functional, exploratory and usability testing.",
        "Regression and integration testing.",
        "Batch process validation.",
        "Defect identification, reporting, tracking and retesting.",
        "Business process analysis and validation.",
        "Communication and coordination with different IT teams.",
        "Documentation of tests and results.",
        "Identifying and proposing improvements.",
      ],
    },
    {
      company: "uTest",
      title: "Software Tester | Crowdtesting",
      period: "Jun 2020 – Mar 2022",
      description: "Software testing projects through crowdtesting platforms.",
      responsibilities: [
        "Test case execution.",
        "Bug identification and reporting.",
        "Usability testing and functional validation.",
      ],
    },
  ],
  skills: [
    {
      name: "QA and Testing",
      items: [
        "Functional testing", "Exploratory testing", "Usability testing", "Regression testing",
        "Integration testing", "Batch process validation", "Test case design and execution",
        "Requirements analysis", "Test data preparation", "Defect identification, documentation and tracking",
        "Test documentation and reporting",
      ],
    },
    {
      name: "Analysis and Processes",
      items: [
        "Business process analysis", "Functional risk identification", "Requirements validation",
        "Communication and coordination with IT teams", "Identifying improvement opportunities", "Attention to detail",
      ],
    },
    {
      name: "Healthcare Domain Knowledge",
      items: [
        "Hospital pharmacy processes", "Medication dispensing and logistics", "Stock and expiry date management",
        "Drug interactions", "Medication supply and preparation",
      ],
    },
    { name: "Currently Learning", items: ["API Testing (learning)", "SQL and databases (learning)"] },
  ],
  education: [
    {
      institution: "Ceibal – Jóvenes a Programar (national tech training program, Uruguay)",
      title: "Software Tester",
      period: "2020 – 2022",
      status: "Certificate obtained",
      description:
        "Fundamentals of imperative and object-oriented programming, software testing and complementary technical training.",
    },
    {
      institution: "Cámara Uruguaya de Tecnologías de la Información (CUTI — Uruguayan IT Chamber) – Programa b_IT",
      title: "IT Analyst",
      period: "2018 – 2020",
      status: "Degree obtained",
      detailsLabel: "Coursework",
      details: [
        "Programming with Python", "Database access and Big Data concepts",
        "Requirements specification for software development", "Information systems and Business Intelligence",
        "Project management fundamentals", "Introduction to Machine Learning, AI and robotics",
      ],
    },
    {
      institution: "Universidad de la República (UdelaR) – Facultad de Química (School of Chemistry)",
      title: "Hospital Pharmacy Assistant",
      period: "2014 – 2016",
      status: "Completed · Endorsed by the Ministry of Public Health (MSP) and Ministry of Education and Culture (MEC)",
      detailsLabel: "Coursework",
      details: [
        "Medicines, dosage forms and routes of administration", "Drug interactions", "Pharmaceutical legislation",
        "Medication logistics in healthcare services",
      ],
      extra: [
        { label: "Internships", text: "ASSE (national public health provider) and Banco de Seguros del Estado (BSE)" },
        {
          label: "Areas",
          text: "Dispensing, supply, stock and expiry date management, unit-dose systems and medication preparation.",
        },
      ],
    },
  ],
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "English", level: ENGLISH_LEVEL_EN },
  ],
  fileName: "CV-Ingrid-Rios-Romillo-QA-Analyst-EN.pdf",
};

export const cvByLang: Record<CvLang, CvData> = { es: cvEs, en: cvEn };
