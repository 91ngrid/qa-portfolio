// Documento PDF del CV (texto real, A4). Se carga solo en el navegador al descargar.
import { Document, Page, Text, View, Link, StyleSheet } from "@react-pdf/renderer";
import type { CvData } from "@/content/cv";

const ACCENT = "#1F3A8A";
const INK = "#1E2430";
const SOFT = "#4A5263";

const s = StyleSheet.create({
  page: { paddingTop: 42, paddingBottom: 44, paddingHorizontal: 48, fontFamily: "Helvetica", fontSize: 10.5, color: INK, lineHeight: 1.4 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 21, lineHeight: 1.2, letterSpacing: 0, color: INK },
  headline: { marginTop: 4, fontFamily: "Helvetica-Bold", fontSize: 10, letterSpacing: 0, color: ACCENT },
  links: { marginTop: 6, flexDirection: "row", fontSize: 9.5, color: SOFT },
  link: { color: ACCENT, textDecoration: "none" },
  section: { marginTop: 14 },
  h2: { fontFamily: "Helvetica-Bold", fontSize: 10.5, letterSpacing: 0, color: ACCENT, textTransform: "uppercase", paddingBottom: 3, borderBottomWidth: 0.75, borderBottomColor: ACCENT, marginBottom: 7 },
  p: { marginBottom: 5, textAlign: "left" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  strong: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  muted: { color: SOFT, fontSize: 9.5 },
  bullet: { flexDirection: "row", marginBottom: 1.5, paddingLeft: 4 },
  dot: { width: 10 },
  item: { marginBottom: 10 },
  label: { fontFamily: "Helvetica-Bold" },
});

function Bullet({ children }: { children: string }) {
  return (
    <View style={s.bullet} wrap={false}>
      <Text style={s.dot}>•</Text>
      <Text style={{ flex: 1 }}>{children}</Text>
    </View>
  );
}

export function CvPdfDocument({ data }: { data: CvData }) {
  const L = data.labels;
  return (
    <Document title={`CV — Ingrid Ríos Romillo (${data.lang.toUpperCase()})`} author="Ingrid Ríos Romillo" subject={data.headline} language={data.lang}>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.headline}>{data.headline}</Text>
        <View style={s.links}>
          {data.links.map((l, i) => (
            <Text key={l.url}>
              {i > 0 ? "   ·   " : ""}
              {l.label}: <Link src={l.url} style={s.link}>{l.display}</Link>
            </Text>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.h2}>{L.profile}</Text>
          {data.profile.map((p) => <Text key={p.slice(0, 20)} style={s.p}>{p}</Text>)}
        </View>

        <View style={s.section}>
          <Text style={s.h2} minPresenceAhead={80}>{L.experience}</Text>
          {data.jobs.map((j) => (
            <View key={j.company} style={s.item}>
              <View wrap={false} minPresenceAhead={28}>
                <View style={s.row}>
                  <Text style={s.strong}>{j.title}</Text>
                  <Text style={s.muted}>{j.period}</Text>
                </View>
                <Text style={{ color: SOFT }}>{j.company}</Text>
                <Text style={{ marginTop: 3, marginBottom: 2 }}>{j.description}</Text>
                {j.sectors ? <Text style={[s.label, { marginBottom: 3 }]}>{j.sectors}</Text> : null}
              </View>
              {j.responsibilities.map((r) => <Bullet key={r}>{r}</Bullet>)}
            </View>
          ))}
        </View>
      </Page>
      <Page size="A4" style={s.page}>
        <View style={s.section}>
          <Text style={s.h2} minPresenceAhead={80}>{L.skills}</Text>
          {data.skills.map((g) => (
            <View key={g.name} wrap={false} style={{ marginBottom: 5 }}>
              <Text><Text style={s.label}>{g.name}: </Text>{g.items.join(" · ")}.</Text>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.h2} minPresenceAhead={80}>{L.education}</Text>
          {data.education.map((e) => (
            <View key={e.title} wrap={false} style={s.item}>
              <View style={s.row}>
                <Text style={[s.strong, { flex: 1, paddingRight: 10 }]}>{e.title}</Text>
                <Text style={s.muted}>{e.period}</Text>
              </View>
              <Text style={{ color: SOFT }}>{e.institution}</Text>
              <Text style={s.muted}>{e.status}</Text>
              {e.description ? <Text style={{ marginTop: 2 }}>{e.description}</Text> : null}
              {e.details ? (
                <Text style={{ marginTop: 2 }}><Text style={s.label}>{e.detailsLabel}: </Text>{e.details.join(" · ")}.</Text>
              ) : null}
              {e.extra?.map((x) => (
                <Text key={x.label}><Text style={s.label}>{x.label}: </Text>{x.text}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={s.section} wrap={false}>
          <Text style={s.h2}>{L.languages}</Text>
          {data.languages.map((l) => (
            <Text key={l.name}><Text style={s.label}>{l.name}: </Text>{l.level}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
