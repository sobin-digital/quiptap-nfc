import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export default function LuxButton(props: Props) {
  const { children, variant = "primary", href = "#", ...rest } = props;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-b from-amber-400/95 to-amber-600/80 text-black shadow-[0_10px_30px_rgba(217,164,64,0.28)] hover:from-amber-300/95 hover:to-amber-500/85 hover:shadow-[0_14px_40px_rgba(217,164,64,0.35)]"
      : "border border-white/15 bg-white/5 text-white/90 hover:border-amber-400/35 hover:bg-white/8";

  return (
    <a href={href} className={`${base} ${styles}`} {...rest}>
      {children}
    </a>
  );
}

