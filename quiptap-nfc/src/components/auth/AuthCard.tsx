import type { ReactNode } from "react";

export default function AuthCard(props: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 sm:px-6 lg:px-8">
      <div className="mt-14 rounded-[2.25rem] border border-white/10 bg-white/[0.02] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <h1 className="text-balance text-2xl font-semibold text-white">
          {props.title}
        </h1>
        <div className="mt-6">{props.children}</div>
      </div>
    </div>
  );
}

