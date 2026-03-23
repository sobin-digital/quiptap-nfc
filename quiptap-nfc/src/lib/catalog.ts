import {
  makeLuxuryCardSvg,
  makeTemplatePreviewSvg,
} from "./svgDataUri";

export type NfcCardId = "black-metal" | "gold-luxury" | "white-minimal" | "transparent";
export type TemplateId = "noir-executive" | "gilded-profile" | "monochrome-minimal" | "aether-transparent";

export const YEARLY_SUBSCRIPTION_LABEL = "Yearly subscription";
export const YEARLY_SUBSCRIPTION_CENTS = 9900; // Basic: $99/year

export type NfcCard = {
  id: NfcCardId;
  name: string;
  priceLabel: string;
  priceCents: number;
  accent: string;
  bg1: string;
  bg2: string;
};

export type Template = {
  id: TemplateId;
  name: string;
  accent: string;
  bg1: string;
  bg2: string;
};

export const NFC_CARDS: NfcCard[] = [
  {
    id: "black-metal",
    name: "Black Metal Card",
    priceLabel: "$49",
    priceCents: 4900,
    accent: "#f5f5f5",
    bg1: "#08080a",
    bg2: "#0f1014",
  },
  {
    id: "gold-luxury",
    name: "Gold Luxury Card",
    priceLabel: "$69",
    priceCents: 6900,
    accent: "#d4af37",
    bg1: "#0a0a0a",
    bg2: "#17110a",
  },
  {
    id: "white-minimal",
    name: "White Minimal Card",
    priceLabel: "$59",
    priceCents: 5900,
    accent: "#e5e7eb",
    bg1: "#f8fafc",
    bg2: "#e7e9ee",
  },
  {
    id: "transparent",
    name: "Transparent Card",
    priceLabel: "$79",
    priceCents: 7900,
    accent: "#a7f3d0",
    bg1: "#0b1020",
    bg2: "#0b2a3a",
  },
] as const;

export const TEMPLATES: Template[] = [
  {
    id: "noir-executive",
    name: "Noir Executive",
    accent: "#d4af37",
    bg1: "#070709",
    bg2: "#15151a",
  },
  {
    id: "gilded-profile",
    name: "Gilded Profile",
    accent: "#fbbf24",
    bg1: "#120b03",
    bg2: "#1a1a1f",
  },
  {
    id: "monochrome-minimal",
    name: "Monochrome Minimal",
    accent: "#e5e7eb",
    bg1: "#0a0a0a",
    bg2: "#2a2a2a",
  },
  {
    id: "aether-transparent",
    name: "Aether Transparent",
    accent: "#a7f3d0",
    bg1: "#06131b",
    bg2: "#0f2330",
  },
] as const;

export function formatMoney(cents: number) {
  const dollars = cents / 100;
  return `$${dollars.toFixed(0)}`;
}

export function getCardById(id: NfcCardId | null | undefined) {
  if (!id) return null;
  return NFC_CARDS.find((c) => c.id === id) ?? null;
}

export function getTemplateById(id: TemplateId | null | undefined) {
  if (!id) return null;
  return TEMPLATES.find((t) => t.id === id) ?? null;
}

export function getCardImageSrc(card: NfcCard) {
  return makeLuxuryCardSvg({
    label: card.name.split(" ")[0],
    accent: card.accent,
    bg1: card.bg1,
    bg2: card.bg2,
  });
}

export function getTemplatePreviewSrc(t: Template) {
  return makeTemplatePreviewSvg({
    label: t.name,
    accent: t.accent,
    bg1: t.bg1,
    bg2: t.bg2,
  });
}

