import { describe, expect, it } from "vitest";
import { cvEs, cvEn } from "@/content/cv";
import { education } from "@/content/profile";

describe("Confirmed CV requirements", () => {
  it("uses the requested identity and contact URLs in both versions", () => {
    for (const cv of [cvEs, cvEn]) {
      expect(cv.name).toBe("INGRID RÍOS ROMILLO");
      expect(cv.headline).toBe("SEMI SENIOR QA ANALYST | SOFTWARE QUALITY ASSURANCE");
      expect(cv.links.map(link => link.url)).toEqual([
        "https://www.linkedin.com/in/ingridriosromillo/", "https://qaingrid.lovable.app/",
      ]);
    }
  });
  it("preserves the confirmed employment periods and process-validation responsibility", () => {
    expect(cvEs.jobs.map(job => job.period)).toEqual(["Mar 2022 – Actualidad", "Jun 2020 – Mar 2022"]);
    expect(cvEn.jobs.map(job => job.period)).toEqual(["Mar 2022 – Present", "Jun 2020 – Mar 2022"]);
    expect(cvEs.jobs[0]?.responsibilities).toContain("Análisis y validación de procesos.");
    expect(cvEn.jobs[0]?.responsibilities).toContain("Business process analysis and validation.");
  });
  it("keeps API Testing and SQL in learning groups rather than established experience", () => {
    expect(cvEs.skills.find(group => group.name === "En desarrollo")?.items).toEqual([
      "API Testing (en aprendizaje)", "SQL y bases de datos (en aprendizaje)",
    ]);
    expect(cvEn.skills.find(group => group.name === "Currently Learning")?.items).toEqual([
      "API Testing (learning)", "SQL and databases (learning)",
    ]);
    for (const cv of [cvEs, cvEn]) {
      expect(cv.skills.filter(group => !["En desarrollo", "Currently Learning"].includes(group.name))
        .flatMap(group => group.items).join(" ")).not.toMatch(/API Testing|SQL/);
    }
  });
  it("keeps education newest first and excludes psychology", () => {
    expect(education.map(item => item.year)).toEqual(["2020 – 2022", "2018 – 2020", "2014 – 2016"]);
    expect(education).toHaveLength(3);
    for (const cv of [cvEs, cvEn]) {
      expect(cv.education.map(item => item.period)).toEqual(["2020 – 2022", "2018 – 2020", "2014 – 2016"]);
      expect(cv.education).toHaveLength(3);
      expect(JSON.stringify(cv.education)).not.toMatch(/Psicología|Psychology/);
    }
  });
  it("does not upgrade the requested initial language levels", () => {
    expect(cvEs.languages).toEqual([{ name: "Español", level: "Nativo" }, { name: "Inglés", level: "Básico" }]);
    expect(cvEn.languages).toEqual([{ name: "Spanish", level: "Native" }, { name: "English", level: "Basic professional proficiency" }]);
  });
});