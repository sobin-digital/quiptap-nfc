"use client";

import { useEffect, useMemo, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduced(Boolean(mq.matches));
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export default function StepMountTransition(props: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setEntered(true);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [prefersReduced]);

  const transitionClasses = useMemo(() => {
    if (entered) {
      return "opacity-100 translate-y-0 blur-0";
    }
    return "opacity-0 translate-y-4 blur-sm";
  }, [entered]);

  return (
    <div
      className={[
        "will-change-transform transition-all duration-700 ease-out",
        transitionClasses,
        props.className ?? "",
      ].join(" ")}
    >
      {props.children}
    </div>
  );
}

