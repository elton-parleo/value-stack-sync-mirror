import { useEffect, useState } from "react";

/* The product's chapters, pinned under the nav. The current chapter follows the scroll. */
const CH = [
  ["measure", "Measure"],
  ["truesync", "TrueSync"],
  ["value", "Value"],
  ["fix", "Fix"],
  ["prove", "Prove"],
] as const;

export default function PNav() {
  const [cur, setCur] = useState<string>("");
  useEffect(() => {
    const els = CH.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) setCur(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  const i = CH.findIndex(([id]) => id === cur);
  return (
    <nav className="pn" aria-label="Product chapters">
      <div className="wrap pn__in">
        <b className="pn__k">Parleo</b>
        <div className="pn__links">
          {CH.map(([id, k], n) => (
            <a key={id} href={`#${id}`} className={id === cur ? "is-on" : n < i ? "is-past" : ""} onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(id);
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
            }}>
              <span>{n + 1}</span>
              {k}
            </a>
          ))}
        </div>
        <a className="pn__cta" href="#audit" onClick={(e) => {
          e.preventDefault();
          document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" });
        }}>
          Get your report
        </a>
      </div>
    </nav>
  );
}
