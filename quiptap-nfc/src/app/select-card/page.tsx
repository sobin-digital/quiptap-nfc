"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import SectionHeading from "@/components/landing/SectionHeading";
import SelectableNfcCardTile from "@/components/flow/SelectableNfcCardTile";
import { NFC_CARDS, getCardImageSrc, type NfcCardId } from "@/lib/catalog";
import { useNfcFlow } from "@/context/NfcFlowContext";
import StepLoadingState from "@/components/flow/StepLoadingState";
import StepMountTransition from "@/components/flow/StepMountTransition";
import StepProgress from "@/components/flow/StepProgress";

export default function SelectCardPage() {
  const router = useRouter();
  const { isHydrated, selectedCardId, selectCard } = useNfcFlow();

  if (!isHydrated) return <StepLoadingState label="SELECT CARD" />;

  return (
    <div className="min-h-screen bg-black lux-body-bg text-white">
      <StepMountTransition>
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="text-xs font-semibold tracking-widest text-white/50 hover:text-amber-400"
            >
              BACK TO HOME
            </Link>
            <button
              type="button"
              onClick={() => router.replace("/select-template")}
              className="text-xs font-semibold tracking-widest text-white/50 hover:text-amber-400"
              disabled={!selectedCardId}
            >
              NEXT
            </button>
          </div>

          <StepProgress currentStep={1} />

          <div className="mt-2">
            <SectionHeading
              eyebrow="STEP 1"
              title="Select your NFC card"
              description="Choose a finish. You can customize everything else later - your link stays permanent."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {NFC_CARDS.map((card) => (
              <SelectableNfcCardTile
                key={card.id}
                name={card.name}
                priceLabel={card.priceLabel}
                imageSrc={getCardImageSrc(card)}
                accent={card.accent}
                isSelected={selectedCardId === (card.id as NfcCardId)}
                onSelect={() => {
                  selectCard(card.id as NfcCardId);
                  router.push("/select-template");
                }}
              />
            ))}
          </div>
        </div>
      </StepMountTransition>
    </div>
  );
}

