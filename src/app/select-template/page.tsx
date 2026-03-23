"use client";

import { useRouter } from "next/navigation";
import SectionHeading from "@/components/landing/SectionHeading";
import SelectableTemplateTile from "@/components/flow/SelectableTemplateTile";
import {
  TEMPLATES,
  getTemplatePreviewSrc,
  type TemplateId,
} from "@/lib/catalog";
import { useNfcFlow } from "@/context/NfcFlowContext";
import { useEffect } from "react";
import StepLoadingState from "@/components/flow/StepLoadingState";
import StepMountTransition from "@/components/flow/StepMountTransition";
import StepProgress from "@/components/flow/StepProgress";

export default function SelectTemplatePage() {
  const router = useRouter();
  const {
    isHydrated,
    selectedCardId,
    selectedTemplateId,
    selectTemplate,
  } = useNfcFlow();

  useEffect(() => {
    if (!isHydrated) return;
    if (!selectedCardId) router.replace("/select-card");
  }, [isHydrated, router, selectedCardId]);

  if (!isHydrated) return <StepLoadingState label="SELECT TEMPLATE" />;
  if (!selectedCardId) return <StepLoadingState label="REDIRECTING" />;

  return (
    <div className="min-h-screen bg-black lux-body-bg text-white">
      <StepMountTransition>
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => router.replace("/select-card")}
              className="text-xs font-semibold tracking-widest text-white/50 hover:text-amber-400"
            >
              BACK
            </button>
            <button
              type="button"
              onClick={() => router.replace("/customize")}
              className="text-xs font-semibold tracking-widest text-white/50 hover:text-amber-400"
              disabled={!selectedTemplateId}
            >
              NEXT
            </button>
          </div>

          <StepProgress currentStep={2} />

          <div className="mt-2">
            <SectionHeading
              eyebrow="STEP 2"
              title="Choose your template"
              description="Pick a luxury layout. You can swap later without changing your permanent public link."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TEMPLATES.map((t) => (
              <SelectableTemplateTile
                key={t.id}
                name={t.name}
                imageSrc={getTemplatePreviewSrc(t)}
                accent={t.accent}
                isSelected={selectedTemplateId === (t.id as TemplateId)}
                onSelect={() => {
                  selectTemplate(t.id as TemplateId);
                  router.push("/customize");
                }}
              />
            ))}
          </div>
        </div>
      </StepMountTransition>
    </div>
  );
}

