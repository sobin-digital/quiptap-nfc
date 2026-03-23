import SectionHeading from "./SectionHeading";
import TemplateTile from "./TemplateTile";
import { makeTemplatePreviewSvg } from "@/lib/svgDataUri";

export default function TemplatePreviewSection() {
  const templates = [
    { name: "Noir Executive", accent: "#d4af37", bg1: "#070709", bg2: "#15151a" },
    { name: "Gilded Profile", accent: "#fbbf24", bg1: "#120b03", bg2: "#1a1a1f" },
    { name: "Monochrome Minimal", accent: "#e5e7eb", bg1: "#0a0a0a", bg2: "#2a2a2a" },
    { name: "Aether Transparent", accent: "#a7f3d0", bg1: "#06131b", bg2: "#0f2330" },
  ] as const;

  return (
    <section
      id="templates"
      className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <SectionHeading
        eyebrow="TEMPLATE PREVIEW"
        title="Pick a luxury layout"
        description="Hover to explore. Your selection comes alive when you customize your profile."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map((t, idx) => {
          const img = makeTemplatePreviewSvg({
            label: t.name,
            accent: t.accent,
            bg1: t.bg1,
            bg2: t.bg2,
          });

          return (
            <TemplateTile
              key={`${t.name}-${idx}`}
              name={t.name}
              imageSrc={img}
              accent={t.accent}
              href="#how-it-works"
            />
          );
        })}
      </div>
    </section>
  );
}

