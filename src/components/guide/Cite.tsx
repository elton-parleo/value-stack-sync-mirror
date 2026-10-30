import { byId } from "./sources";

/**
 * Inline superscript citation that links down to the sources ledger.
 * Keeps every number on the guide traceable to a primary source.
 */
export default function Cite({ id }: { id: string | string[] }) {
  const ids = Array.isArray(id) ? id : [id];
  const refs = ids.map(byId).filter((r): r is NonNullable<typeof r> => Boolean(r));
  if (!refs.length) return null;
  return (
    <sup className="cite">
      {refs.map((r, i) => (
        <a key={r.id} href={`#source-${r.id}`} title={`${r.publisher}, ${r.date}`}>
          {r.n}
          {i < refs.length - 1 ? "," : ""}
        </a>
      ))}
    </sup>
  );
}
