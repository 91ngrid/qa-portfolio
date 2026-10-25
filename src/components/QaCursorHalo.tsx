import { useEffect, useRef } from "react";

/**
 * "QA Precision Halo": un halo circular coral que sigue el mouse con suavidad.
 * Se desactiva en dispositivos táctiles y con prefers-reduced-motion.
 * No oculta el cursor nativo: es solo un acento visual.
 */
export function QaCursorHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let x = -100, y = -100, tx = -100, ty = -100;
    let active = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        active = true;
        x = tx;
        y = ty;
        el.classList.add("is-on");
      }
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest("a, button, [role='button'], input, textarea, select, article");
      el.classList.toggle("is-active", Boolean(interactive));
    };

    const onLeave = () => {
      active = false;
      el.classList.remove("is-on");
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="qa-halo" />;
}
