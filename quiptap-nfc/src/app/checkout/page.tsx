"use client";

import { useRouter } from "next/navigation";
import SectionHeading from "@/components/landing/SectionHeading";
import ProfilePreviewCard from "@/components/flow/ProfilePreviewCard";
import { useNfcFlow } from "@/context/NfcFlowContext";
import { useEffect } from "react";
import StepLoadingState from "@/components/flow/StepLoadingState";
import StepMountTransition from "@/components/flow/StepMountTransition";
import StepProgress from "@/components/flow/StepProgress";
import {
  formatMoney,
  getCardById,
  getCardImageSrc,
  getTemplateById,
  getTemplatePreviewSrc,
  YEARLY_SUBSCRIPTION_CENTS,
  YEARLY_SUBSCRIPTION_LABEL,
} from "@/lib/catalog";

function SummaryPill(props: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-white/45">
        {props.label}
      </p>
      <p
        className="mt-1 text-sm font-semibold"
        style={props.accent ? { color: props.accent } : undefined}
      >
        {props.value}
      </p>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { isHydrated, selectedCardId, selectedTemplateId, profile } = useNfcFlow();

  const card = getCardById(selectedCardId);
  const template = getTemplateById(selectedTemplateId);

  useEffect(() => {
    if (!isHydrated) return;
    if (!card) router.replace("/select-card");
    else if (!template) router.replace("/select-template");
  }, [card, isHydrated, router, template]);

  if (!isHydrated) return <StepLoadingState label="CHECKOUT" />;
  if (!card || !template) return <StepLoadingState label="REDIRECTING" />;

  const cardCents = card.priceCents;
  const yearlyCents = YEARLY_SUBSCRIPTION_CENTS;
  const totalCents = cardCents + yearlyCents;

  return (
    <div className="min-h-screen bg-black lux-body-bg text-white">
      <StepMountTransition>
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => router.replace("/customize")}
              className="text-xs font-semibold tracking-widest text-white/50 hover:text-amber-400"
            >
              BACK
            </button>
            <button
              type="button"
              onClick={() => router.replace("/select-card")}
              className="text-xs font-semibold tracking-widest text-white/50 hover:text-amber-400"
            >
              CHANGE CARD
            </button>
          </div>

          <StepProgress currentStep={3} />

          <div className="mt-2">
            <SectionHeading
              eyebrow="CHECKOUT"
              title="Your setup is ready."
              description="Review your card, template, and subscription before payment."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-white/45">
                        SELECTED CARD
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white/90">
                        {card.name}
                      </p>
                    </div>
                    <span
                      className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold"
                      style={{ color: card.accent }}
                    >
                      {card.priceLabel}
                    </span>
                  </div>
                  <div className="mt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getCardImageSrc(card)}
                      alt={card.name}
                      className="h-[190px] w-full object-contain"
                    />
                  </div>
                </div>

                <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-white/45">
                        SELECTED TEMPLATE
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white/90">
                        {template.name}
                      </p>
                    </div>
                    <span
                      className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold"
                      style={{ color: template.accent }}
                    >
                      Preview
                    </span>
                  </div>
                  <div className="mt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getTemplatePreviewSrc(template)}
                      alt={template.name}
                      className="h-[190px] w-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.02] p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <SummaryPill
                    label="Card price"
                    value={formatMoney(cardCents)}
                    accent={card.accent}
                  />
                  <SummaryPill
                    label={YEARLY_SUBSCRIPTION_LABEL}
                    value={formatMoney(yearlyCents)}
                    accent={template.accent}
                  />
                  <SummaryPill
                    label="Total"
                    value={formatMoney(totalCents)}
                    accent="#d4af37"
                  />
                </div>

                <div className="mt-4 h-px w-full bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0" />

                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      // Stripe integration comes later; this is a UI stub for the step flow.
                      alert(
                        "Proceeding to payment is coming next (Stripe flow not wired yet)."
                      );
                    }}
                    className="h-12 rounded-full bg-gradient-to-b from-amber-400/95 to-amber-600/80 px-6 text-sm font-semibold tracking-wide text-black shadow-[0_10px_30px_rgba(217,164,64,0.28)] transition-all duration-300 hover:from-amber-300/95 hover:to-amber-500/85 hover:shadow-[0_14px_40px_rgba(217,164,64,0.35)]"
                  >
                    Proceed to Payment
                  </button>
                  <p className="text-xs font-semibold text-white/40">
                    You can edit your profile later without changing your public
                    link.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <p className="text-xs font-semibold tracking-widest text-white/45">
                  LIVE PREVIEW
                </p>
                <div className="mt-4">
                  <ProfilePreviewCard
                    card={card}
                    template={template}
                    profile={profile}
                    yearlySubscriptionCents={YEARLY_SUBSCRIPTION_CENTS}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </StepMountTransition>
    </div>
  );
}

