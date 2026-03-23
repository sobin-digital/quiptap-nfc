"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import SectionHeading from "@/components/landing/SectionHeading";
import LuxButton from "@/components/landing/LuxButton";
import ProfilePreviewCard from "@/components/flow/ProfilePreviewCard";
import type { ProfileDataDraft } from "@/context/types";
import {
  getCardById,
  getTemplateById,
  YEARLY_SUBSCRIPTION_CENTS,
} from "@/lib/catalog";
import { useNfcFlow } from "@/context/NfcFlowContext";
import { useEffect } from "react";
import StepLoadingState from "@/components/flow/StepLoadingState";
import StepMountTransition from "@/components/flow/StepMountTransition";
import StepProgress from "@/components/flow/StepProgress";

function FieldLabel(props: { label: string; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <label className="text-xs font-semibold tracking-[0.18em] text-white/45">
        {props.label}
      </label>
      {props.hint ? (
        <span className="text-xs font-semibold text-white/35">{props.hint}</span>
      ) : null}
    </div>
  );
}

function TextInput(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  type?: "text" | "url";
}) {
  return (
    <div className="flex flex-col gap-3">
      <FieldLabel label={props.label} hint={props.hint} />
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type ?? "text"}
        placeholder={props.placeholder}
        className="h-11 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-amber-400/35 focus:ring-1 focus:ring-amber-400/25"
      />
    </div>
  );
}

function TextArea(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <FieldLabel label={props.label} />
      <textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        rows={5}
        className="resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-amber-400/35 focus:ring-1 focus:ring-amber-400/25"
      />
    </div>
  );
}

export default function CustomizePage() {
  const router = useRouter();
  const { isHydrated, selectedCardId, selectedTemplateId, profile, updateProfile } =
    useNfcFlow();

  const card = getCardById(selectedCardId);
  const template = getTemplateById(selectedTemplateId);

  useEffect(() => {
    if (!isHydrated) return;
    if (!card) router.replace("/select-card");
    else if (!template) router.replace("/select-template");
  }, [card, isHydrated, router, template]);

  if (!isHydrated) return <StepLoadingState label="CUSTOMIZE" />;
  if (!card || !template) return <StepLoadingState label="REDIRECTING" />;

  return (
    <div className="min-h-screen bg-black lux-body-bg text-white">
      <StepMountTransition>
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => router.replace("/select-template")}
              className="text-xs font-semibold tracking-widest text-white/50 hover:text-amber-400"
            >
              BACK
            </button>
            <Link
              href="/checkout"
              className="text-xs font-semibold tracking-widest text-white/50 hover:text-amber-400"
            >
              SKIP TO CHECKOUT
            </Link>
          </div>

          <StepProgress currentStep={3} />

          <div className="mt-2">
            <SectionHeading
              eyebrow="CUSTOMIZE"
              title="Your profile, your voice."
              description="Edits update instantly. Your future public link never changes."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1">
              <form
                className="flex flex-col gap-6 rounded-[2.25rem] border border-white/10 bg-white/[0.02] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex flex-col gap-6">
                  <TextInput
                    label="NAME"
                    value={(profile as ProfileDataDraft).name}
                    onChange={(v) => updateProfile({ name: v })}
                    placeholder="e.g., Jane Sterling"
                  />

                  <TextArea
                    label="BIO"
                    value={(profile as ProfileDataDraft).bio}
                    onChange={(v) => updateProfile({ bio: v })}
                    placeholder="A short, elegant statement about you."
                  />

                  <TextInput
                    label="PROFILE IMAGE URL"
                    value={(profile as ProfileDataDraft).imageUrl}
                    onChange={(v) => updateProfile({ imageUrl: v })}
                    placeholder="https://example.com/your-photo.jpg"
                    type="url"
                    hint="Optional"
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextInput
                      label="WEBSITE"
                      value={(profile as ProfileDataDraft).website}
                      onChange={(v) => updateProfile({ website: v })}
                      placeholder="https://your-site.com"
                      type="url"
                      hint="Optional"
                    />
                    <TextInput
                      label="TWITTER"
                      value={(profile as ProfileDataDraft).twitter}
                      onChange={(v) => updateProfile({ twitter: v })}
                      placeholder="@handle or link"
                      hint="Optional"
                    />
                    <TextInput
                      label="INSTAGRAM"
                      value={(profile as ProfileDataDraft).instagram}
                      onChange={(v) => updateProfile({ instagram: v })}
                      placeholder="@handle or link"
                      hint="Optional"
                    />
                    <TextInput
                      label="LINKEDIN"
                      value={(profile as ProfileDataDraft).linkedin}
                      onChange={(v) => updateProfile({ linkedin: v })}
                      placeholder="Your profile link"
                      hint="Optional"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <LuxButton href="/checkout">Continue to Checkout</LuxButton>
                </div>

                <p className="text-xs font-semibold text-white/35">
                  Tip: Add a photo + 1 social link to instantly elevate your card.
                </p>
              </form>
            </div>

            <div className="order-1 lg:order-2">
              <div className="mb-4">
                <p className="text-xs font-semibold tracking-widest text-white/45">
                  SELECTED CARD + TEMPLATE
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/75">
                    {card.name}
                  </span>
                  <span
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/75"
                    style={{ color: template.accent }}
                  >
                    {template.name}
                  </span>
                </div>
              </div>

              <ProfilePreviewCard
                card={card}
                template={template}
                profile={profile}
                yearlySubscriptionCents={YEARLY_SUBSCRIPTION_CENTS}
              />
            </div>
          </div>
        </div>
      </StepMountTransition>
    </div>
  );
}

