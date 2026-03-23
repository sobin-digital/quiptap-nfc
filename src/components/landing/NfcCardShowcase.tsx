import SectionHeading from "./SectionHeading";
import NfcCardTile from "./NfcCardTile";
import { makeLuxuryCardSvg } from "@/lib/svgDataUri";

export default function NfcCardShowcase() {
  const cards = [
    {
      name: "Black Metal Card",
      priceLabel: "$49",
      accent: "#f5f5f5",
      bg1: "#08080a",
      bg2: "#0f1014",
    },
    {
      name: "Gold Luxury Card",
      priceLabel: "$69",
      accent: "#d4af37",
      bg1: "#0a0a0a",
      bg2: "#17110a",
    },
    {
      name: "White Minimal Card",
      priceLabel: "$59",
      accent: "#e5e7eb",
      bg1: "#f8fafc",
      bg2: "#e7e9ee",
    },
    {
      name: "Transparent Card",
      priceLabel: "$79",
      accent: "#a7f3d0",
      bg1: "#0b1020",
      bg2: "#0b2a3a",
    },
  ] as const;

  return (
    <section id="cards" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        eyebrow="NFC CARD SELECTION"
        title="Choose your card type"
        description="Four luxury finishes. Your profile updates anytime—your link stays permanent."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const img = makeLuxuryCardSvg({
            label: card.name.split(" ")[0],
            accent: card.accent,
            bg1: card.bg1,
            bg2: card.bg2,
          });

          return (
            <NfcCardTile
              key={card.name}
              name={card.name}
              priceLabel={card.priceLabel}
              imageSrc={img}
              accent={card.accent}
              selectHref="/select-template"
            />
          );
        })}
      </div>
    </section>
  );
}

