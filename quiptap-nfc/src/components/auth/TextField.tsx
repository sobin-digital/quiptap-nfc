"use client";

import type { InputHTMLAttributes } from "react";

export default function TextField(
  props: InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    hint?: string;
  }
) {
  const { label, hint, className, ...rest } = props;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-xs font-semibold tracking-[0.18em] text-white/45">
          {label}
        </label>
        {hint ? (
          <span className="text-xs font-semibold text-white/35">{hint}</span>
        ) : null}
      </div>
      <input
        {...rest}
        className={[
          "h-11 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-amber-400/35 focus:ring-1 focus:ring-amber-400/25",
          className ?? "",
        ].join(" ")}
      />
    </div>
  );
}

