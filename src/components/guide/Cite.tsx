import { byId } from "./sources";

type Props = {
  /** One or more source ids from sources.ts */
  id: string | string[];
  dark?: boolean;
};

/**
 * Inline superscript citation that links down to the sources ledger.
 * Keeps every number on the guide traceable to a primary source.
 */
const Cite = ({ id, dark = false }: Props) => {
  const ids = Array.isArray(id) ? id : [id];
  const refs = ids.map(byId).filter(Boolean);

  if (!refs.length) return null;

  return (
    <sup className="relative -top-[0.35em] ml-[1px] inline-flex gap-[2px] whitespace-nowrap align-baseline text-[0.7em] leading-none">
      {refs.map((r, i) => (
        <a
          key={r!.id}
          href={`#source-${r!.id}`}
          title={`${r!.publisher}, ${r!.date}`}
          className={`font-mono text-[10px] leading-none no-underline transition-colors ${
            dark
              ? "text-primary/80 hover:text-primary"
              : "text-primary/75 hover:text-primary"
          }`}
        >
          {r!.n}
          {i < refs.length - 1 ? "," : ""}
        </a>
      ))}
    </sup>
  );
};

export default Cite;
