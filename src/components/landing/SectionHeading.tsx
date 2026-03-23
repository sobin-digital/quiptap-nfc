import type { ReactNode } from "react";

export default function SectionHeading(props: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}) {
  const { eyebrow, title, description } = props;

  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-amber-400/90">
          <span className="h-px w-7 bg-amber-400/60" />
          {eyebrow}
          <span className="h-px w-7 bg-amber-400/60" />
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

