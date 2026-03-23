"use client";

import type { ReactNode } from "react";

export default function InlineAlert(props: {
  type: "error" | "success" | "info";
  children: ReactNode;
}) {
  const styles =
    props.type === "error"
      ? "border-red-400/25 bg-red-400/10 text-red-200"
      : props.type === "success"
        ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
        : "border-amber-400/25 bg-amber-400/10 text-amber-200";

  return (
    <div
      className={[
        "rounded-2xl border px-4 py-3 text-sm font-semibold",
        styles,
      ].join(" ")}
      role={props.type === "error" ? "alert" : "status"}
    >
      {props.children}
    </div>
  );
}

