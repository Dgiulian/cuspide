"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay in ms before the reveal transition starts */
  delay?: number;
}

/**
 * Fades and slides its children up the first time they enter the viewport.
 * Animation is opacity/transform only; disabled via prefers-reduced-motion.
 */
export function Reveal({
  delay = 0,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}

export default Reveal;
