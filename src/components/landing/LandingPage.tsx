import HeroSection from "./HeroSection";
import NfcCardShowcase from "./NfcCardShowcase";
import TemplatePreviewSection from "./TemplatePreviewSection";
import HowItWorks from "./HowItWorks";
import PricingSection from "./PricingSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen lux-body-bg text-white">
      <HeroSection />
      <NfcCardShowcase />
      <TemplatePreviewSection />
      <HowItWorks />
      <PricingSection />

      <footer className="mx-auto w-full max-w-7xl px-4 pb-10 pt-2 sm:px-6 lg:px-8">
        <div className="mt-6 flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold text-white/90">
              QuipTap NFC
            </p>
            <p className="mt-1 text-xs font-medium text-white/55">
              Premium digital business cards via one tap.
            </p>
          </div>
          <a
            href="#cards"
            className="text-xs font-semibold tracking-widest text-amber-400/80 hover:text-amber-400"
          >
            BACK TO TOP
          </a>
        </div>
      </footer>
    </div>
  );
}

