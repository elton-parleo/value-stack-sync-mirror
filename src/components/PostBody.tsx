import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { BarItem, Block, EraItem, FlowStep, GridItem, LadderItem, Leak, Pillar, RecordRow, Source } from "@/content/insights";
import { EASE } from "./primitives";
import "./post-body.css";

/** Inline markdown links: [label](url). Internal links stay in-app. */
export const RichText = ({ text }: { text: string }) => {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const href = m[2];
    parts.push(
      href.startsWith("/") ? (
        <Link key={m.index} to={href} className="pb__link">
          {m[1]}
        </Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noreferrer" className="pb__link">
          {m[1]}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
};

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, ease: EASE },
};

const Caption = ({ children }: { children: ReactNode }) => <figcaption className="pb__cap">{children}</figcaption>;

const FlowBlock = ({ steps, caption }: { steps: FlowStep[]; caption?: string }) => (
  <motion.figure {...reveal} className="pb__fig">
    <ol className="pb__flow">
      {steps.map((s, i) => (
        <li key={s.label}>
          <div className="pb__flow-top">
            <span className="pb__flow-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="pb__flow-label">{s.label}</span>
          </div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {s.drop && (
            <div className="pb__drop">
              <span>Drops out</span>
              <s>{s.drop}</s>
            </div>
          )}
        </li>
      ))}
    </ol>
    {caption && <Caption>{caption}</Caption>}
  </motion.figure>
);

const BarsBlock = ({ title, items, max, caption }: { title?: string; items: BarItem[]; max?: number; caption?: string }) => {
  const top = max ?? Math.max(...items.map((i) => i.value));
  return (
    <motion.figure {...reveal} className="pb__fig">
      <div className="pb__frame pb__bars">
        {title && <div className="pb__frame-title">{title}</div>}
        {items.map((it) => (
          <div key={it.label} className="pb__bar">
            <div className="pb__bar-top">
              <span>{it.label}</span>
              <b className={it.highlight ? "is-blue" : ""}>{it.display}</b>
            </div>
            <div className="pb__bar-track">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.max((it.value / top) * 100, 0.8)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                className={it.highlight ? "is-blue" : ""}
              />
            </div>
            {it.note && <p>{it.note}</p>}
          </div>
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </motion.figure>
  );
};

const LadderBlock = ({ title, items, caption }: { title: string; items: LadderItem[]; caption?: string }) => (
  <motion.figure {...reveal} className="pb__fig">
    <div className="pb__frame pb__ladder">
      <div className="pb__frame-head">
        <span className="pb__frame-title">{title}</span>
        <span className="pb__legend">
          <i /> quoted by the agent
        </span>
      </div>
      <ol>
        {items.map((it, i) => (
          <li key={it.label} className={it.quoted ? "is-quoted" : ""}>
            <span className="pb__n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="pb__ladder-label">{it.label}</div>
              {it.note && <div className="pb__ladder-note">{it.note}</div>}
            </div>
            <b>{it.price}</b>
          </li>
        ))}
      </ol>
    </div>
    {caption && <Caption>{caption}</Caption>}
  </motion.figure>
);

const RecordBlock = ({ title, rows, caption, legend = ["Read by the agent", "In the data, never read"] }: { title: string; rows: RecordRow[]; caption?: string; legend?: [string, string] }) => (
  <motion.figure {...reveal} className="pb__fig">
    <div className="pb__record">
      <div className="pb__record-head">
        <span className="pb__record-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pb__record-title">{title}</span>
        <span className="pb__record-legend">
          <span>
            <i className="on" /> {legend[0]}
          </span>
          <span>
            <i /> {legend[1]}
          </span>
        </span>
      </div>
      <dl>
        {rows.map((r, i) => (
          <div key={`${r.key}-${i}`} className={r.unread ? "is-unread" : ""}>
            <dt>{r.key}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
    {caption && <Caption>{caption}</Caption>}
  </motion.figure>
);

const ErasBlock = ({ items, caption }: { items: EraItem[]; caption?: string }) => (
  <motion.figure {...reveal} className="pb__fig">
    <div className="pb__eras">
      {items.map((e, i) => (
        <div key={e.era} className={e.current ? "is-now" : ""}>
          <div className="pb__eras-top">
            <span className="pb__n">{String(i + 1).padStart(2, "0")}</span>
            <span>{e.period}</span>
          </div>
          <h3>{e.era}</h3>
          <p>{e.unit}</p>
          <b>{e.spend}</b>
          <em>{e.current ? "forecast, uncounted" : "measured"}</em>
        </div>
      ))}
    </div>
    {caption && <Caption>{caption}</Caption>}
  </motion.figure>
);

const GridBlock = ({ items, caption }: { items: GridItem[]; caption?: string }) => (
  <motion.figure {...reveal} className="pb__fig">
    <div className="pb__frame pb__grid">
      {items.map((g) => (
        <div key={g.label}>
          <b>{g.value}</b>
          <span>{g.label}</span>
          {g.source && <em>{g.source}</em>}
        </div>
      ))}
    </div>
    {caption && <Caption>{caption}</Caption>}
  </motion.figure>
);

const SourcesBlock = ({ items }: { items: Source[] }) => (
  <section className="pb__sources">
    <h2>Sources</h2>
    <ol>
      {items.map((s, i) => (
        <li key={i}>
          <span className="pb__n">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <span>{s.claim}</span>
            <div>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noreferrer" className="pb__link">
                  {s.source}
                </a>
              ) : (
                <span>{s.source}</span>
              )}
              , {s.date}
            </div>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

const PillarsBlock = ({ total, items }: { total: number; items: Pillar[] }) => (
  <figure className="pb__fig">
    <div className="pb__weight">
      {items.map((p) => (
        <div key={p.name} style={{ flexGrow: p.points }} className={p.highlight ? "is-blue" : ""}>
          <b>{p.points}</b>
          <span>{p.name}</span>
        </div>
      ))}
    </div>
    <div className="pb__pillars">
      {items.map((p) => (
        <div key={p.name} className={`pb__pillar ${p.highlight ? "is-key" : ""}`}>
          <div className="pb__pillar-top">
            <div>
              <h3>{p.name}</h3>
              <p>{p.question}</p>
            </div>
            <b>{p.points}</b>
          </div>
          <div className="pb__dims">
            {p.dimensions.map((d) => (
              <div key={d.label}>
                <span>{d.label}</span>
                <b>{d.points}</b>
              </div>
            ))}
          </div>
          {p.note && <p className="pb__pillar-note">{p.note}</p>}
        </div>
      ))}
    </div>
    <Caption>{total} points, one straight sum</Caption>
  </figure>
);

const LeaksBlock = ({ total, items }: { total: number; items: Leak[] }) => (
  <figure className="pb__fig">
    <div className="pb__leaks">
      <div className="pb__leaks-head">
        <span>True Value dimensions</span>
        <b>
          {total}
          <small> pts</small>
        </b>
      </div>
      {items.map((it, i) => (
        <div key={it.name} className="pb__leak">
          <div className="pb__leak-left">
            <span className="pb__n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{it.name}</h3>
              <div className="pb__leak-pts">
                <b>{it.points}</b>
                <span>
                  <i className={it.highlight ? "is-blue" : ""} style={{ width: `${(it.points / 16) * 100}%` }} />
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className="pb__leak-test">{it.test}</p>
            <p>{it.detail}</p>
          </div>
        </div>
      ))}
    </div>
  </figure>
);

export default function PostBody({ blocks }: { blocks: Block[] }) {
  let h = 0;
  let first = true;
  return (
    <div className="pb">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h": {
            h += 1;
            return (
              <div key={i} className="pb__h">
                <div className="pb__h-rule">
                  <span>{String(h).padStart(2, "0")}</span>
                  <i />
                </div>
                <h2>{b.text}</h2>
              </div>
            );
          }
          case "list":
            return (
              <ul key={i} className="pb__list">
                {b.items.map((it, idx) => (
                  <li key={it}>
                    <span className="pb__n">{String(idx + 1).padStart(2, "0")}</span>
                    <span>
                      <RichText text={it} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "stat":
            return (
              <figure key={i} className="pb__stat">
                <b>{b.value}</b>
                <figcaption>{b.label}</figcaption>
              </figure>
            );
          case "quote":
            return (
              <blockquote key={i} className="pb__quote">
                <p>{b.text}</p>
              </blockquote>
            );
          case "pillars":
            return <PillarsBlock key={i} total={b.total} items={b.items} />;
          case "leaks":
            return <LeaksBlock key={i} total={b.total} items={b.items} />;
          case "flow":
            return <FlowBlock key={i} steps={b.steps} caption={b.caption} />;
          case "bars":
            return <BarsBlock key={i} title={b.title} items={b.items} max={b.max} caption={b.caption} />;
          case "ladder":
            return <LadderBlock key={i} title={b.title} items={b.items} caption={b.caption} />;
          case "record":
            return <RecordBlock key={i} title={b.title} rows={b.rows} caption={b.caption} legend={b.legend} />;
          case "eras":
            return <ErasBlock key={i} items={b.items} caption={b.caption} />;
          case "grid":
            return <GridBlock key={i} items={b.items} caption={b.caption} />;
          case "sources":
            return <SourcesBlock key={i} items={b.items} />;
          case "p": {
            const lead = first;
            first = false;
            return (
              <p key={i} className={lead ? "pb__p pb__p--lead" : "pb__p"}>
                <RichText text={b.text} />
              </p>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
