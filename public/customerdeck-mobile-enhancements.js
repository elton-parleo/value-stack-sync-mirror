(() => {
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300..800;1,300..800&display=swap";
  document.head.appendChild(fontLink);

  const layers = {
    s03: {
      source: '#s08 img[alt="Patagonia Down Sweater Hoody"]',
      position: "76% 50%",
      side: "right",
    },
    s05: {
      source: '#s06 img[alt="Greenies Original, Large, 12 ct"]',
      position: "44% 50%",
      side: "left",
    },
    s07: {
      source: '#s02 img[alt="ASICS GT-2000 13"]',
      position: "68% 42%",
      side: "right",
    },
    s09: {
      source: '#s02 img[alt="Brooks Adrenaline GTS 24"]',
      position: "34% 55%",
      side: "left",
    },
    s11: {
      source: '#s08 img[alt="Patagonia Down Sweater Hoody"]',
      position: "72% 50%",
      side: "right",
    },
    sA1: {
      source: '#s02 img[alt="Saucony Guide 17"]',
      position: "38% 48%",
      side: "left",
    },
  };

  const style = document.createElement("style");
  style.textContent = `
    :root {
      --parleo-ink: #0E0F18;
      --parleo-paper: #F2F0EF;
      --parleo-blue: #0166FF;
      --parleo-muted: #8A8996;
    }
    html {
      scroll-snap-type: y proximity;
      scroll-padding-top: 54px;
    }
    section[data-screen-label] {
      scroll-snap-align: start;
      scroll-snap-stop: always;
      scroll-margin-top: 54px !important;
    }
    section[data-screen-label]:not(#s01) {
      border-top: 2px solid var(--parleo-blue);
    }
    .parleo-chapter-threshold {
      position: relative !important;
      z-index: 3 !important;
      min-height: 142px;
      margin: -56px -22px 34px;
      padding: 25px 54px 22px 24px;
      overflow: hidden;
      display: grid;
      grid-template-columns: 74px minmax(0, 1fr);
      align-items: end;
      gap: 15px;
      color: var(--parleo-paper);
      background: var(--parleo-ink);
      border-bottom: 1px solid rgba(242,240,239,.14);
    }
    .parleo-chapter-threshold::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--parleo-blue);
    }
    .parleo-chapter-number {
      font-family: "Inter Tight", Inter, sans-serif;
      font-size: 58px;
      font-weight: 760;
      line-height: .78;
      letter-spacing: -0.04em;
      font-variant-numeric: tabular-nums;
      color: rgba(242,240,239,.42);
    }

    .parleo-chapter-meta {
      min-width: 0;
      padding-bottom: 1px;
    }
    .parleo-chapter-kicker {
      display: block;
      margin-bottom: 7px;
      font-family: "JetBrains Mono", monospace;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: #7FB0FF;
    }
    .parleo-chapter-title {
      display: block;
      font-family: "Inter Tight", sans-serif;
      font-size: 18px;
      font-weight: 680;
      line-height: 1.08;
      color: var(--parleo-paper);
      text-wrap: balance;
    }
    .parleo-chapter-end {
      position: relative !important;
      z-index: 3 !important;
      margin: 46px -22px -60px;
      padding: 28px 24px calc(82px + env(safe-area-inset-bottom));
      color: var(--parleo-paper);
      background: var(--parleo-ink);
      border-top: 1px solid rgba(242,240,239,.14);
    }
    .parleo-chapter-end button {
      width: 100%;
      padding: 0;
      border: 0;
      background: transparent;
      color: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: minmax(0,1fr) 44px;
      align-items: center;
      gap: 18px;
      cursor: pointer;
    }
    .parleo-chapter-end-kicker {
      display: block;
      margin-bottom: 7px;
      font-family: "JetBrains Mono", monospace;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: #7FB0FF;
    }
    .parleo-chapter-end-title {
      display: block;
      font-family: "Inter Tight", Inter, sans-serif;
      font-size: 25px;
      font-weight: 720;
      line-height: 1.04;
      letter-spacing: -0.028em;
    }

    .parleo-chapter-end-arrow {
      width: 42px;
      height: 42px;
      border: 1px solid rgba(242,240,239,.25);
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 21px;
    }
    [data-rail] {
      right: 3px !important;
      gap: 3px !important;
      padding: 8px 0 !important;
      border-right: 1px solid rgba(138,137,150,.28);
    }
    [data-rail] .railtick {
      height: 17px !important;
      padding-right: 0 !important;
    }
    [data-rail] .railtick span {
      display: block;
      width: 8px !important;
      height: 1px !important;
      background: currentColor !important;
      opacity: .36;
      transition: width .2s ease, opacity .2s ease, background .2s ease;
    }
    [data-rail] .railtick[data-on] span {
      width: 25px !important;
      height: 2px !important;
      background: var(--parleo-blue) !important;
      opacity: 1;
    }
    [data-slideno] {
      min-width: 58px;
      padding: 5px 8px;
      border: 1px solid rgba(127,176,255,.35);
      border-radius: 999px;
      background: rgba(1,102,255,.13);
      font-size: 12px !important;
      text-align: center;
    }
    .parleo-mobile-controls {
      justify-content: space-between !important;
      gap: 8px !important;
    }
    .parleo-mobile-controls > a {
      padding: 8px 12px !important;
    }
    .parleo-deck-control {
      width: 42px;
      height: 42px;
      flex: 0 0 42px;
      border: 1px solid rgba(242,240,239,.22);
      background: rgba(242,240,239,.06);
      border-radius: 50%;
      color: var(--parleo-paper);
      display: grid;
      place-items: center;
      cursor: pointer;
      font-size: 20px;
      line-height: 1;
    }
    .parleo-deck-control:disabled {
      opacity: .24;
      cursor: default;
    }
    #s01 h1 {
      font-family: "Inter Tight", Inter, -apple-system, sans-serif !important;
      font-weight: 300 !important;
      font-size: clamp(38px, 10.6vw, 48px) !important;
      line-height: 1.06 !important;
      letter-spacing: -0.03em !important;
      color: #F6F4F2 !important;
      font-feature-settings: "ss01","cv11","cv06";
    }
    #s01 h1 .parleo-title-accent {
      display: block !important;
      font-weight: 600 !important;
      letter-spacing: -0.038em !important;
    }
    .parleo-cover-scrim {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background:
        linear-gradient(180deg, rgba(8,10,16,.8) 0%, rgba(8,10,16,.52) 22%, rgba(8,10,16,.22) 40%, rgba(14,19,34,.72) 52%, #0E1322 58%, #0E1322 100%),
        linear-gradient(90deg, rgba(8,10,16,.9) 0%, rgba(8,10,16,.62) 46%, rgba(8,10,16,.1) 100%);
    }



    .parleo-mobile-depth {
      position: absolute !important;
      inset: 0 !important;
      z-index: 0 !important;
      overflow: hidden;
      pointer-events: none;
    }
    .parleo-mobile-depth-section {
      position: relative !important;
      isolation: isolate;
    }
    .parleo-mobile-depth-section > *:not(.parleo-mobile-depth) {
      position: relative;
      z-index: 1;
    }
    .parleo-mobile-depth img {
      position: absolute;
      top: 8%;
      width: 78%;
      height: 84%;
      object-fit: cover;
      opacity: .13;
      filter: blur(7px) saturate(.72) contrast(1.04);
      transform: scale(1.035);
    }
    .parleo-mobile-depth[data-side="right"] img { right: -28%; }
    .parleo-mobile-depth[data-side="left"] img { left: -30%; }
    .parleo-mobile-depth::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, #F2F0EF 0%, transparent 18%, transparent 74%, #F2F0EF 100%);
    }
    .parleo-mobile-depth[data-side="right"]::after {
      background: linear-gradient(90deg, #F2F0EF 18%, rgba(242,240,239,.32) 62%, #F2F0EF 100%), linear-gradient(180deg, #F2F0EF 0%, transparent 18%, transparent 76%, #F2F0EF 100%);
    }
    .parleo-mobile-depth[data-side="left"]::after {
      background: linear-gradient(270deg, #F2F0EF 18%, rgba(242,240,239,.32) 62%, #F2F0EF 100%), linear-gradient(180deg, #F2F0EF 0%, transparent 18%, transparent 76%, #F2F0EF 100%);
    }
    @media (prefers-reduced-motion: no-preference) {
      .parleo-chapter-threshold {
        animation: parleo-chapter-enter .2s ease-out both;
      }
      @keyframes parleo-chapter-enter {
        from { opacity: .78; }
        to { opacity: 1; }
      }
      .parleo-mobile-depth img {
        animation: parleo-depth-drift 18s ease-in-out infinite alternate;
      }
      @keyframes parleo-depth-drift {
        from { transform: scale(1.035) translate3d(0, 0, 0); }
        to { transform: scale(1.065) translate3d(0, -1.2%, 0); }
      }
    }
  `;
  document.head.appendChild(style);

  const title = document.querySelector("#s01 h1");
  if (title instanceof HTMLElement) {
    title.innerHTML = 'Your next<br>customer just<br>asked an AI<br><span class="parleo-title-accent">what to buy.</span>';
  }

  const applyCover = () => {
    const cover = document.querySelector("#s01 > img");
    if (!(cover instanceof HTMLImageElement)) return;
    if (!cover.src.includes("customerdeck-title-mobile")) cover.src = "/customerdeck-title-mobile.jpg";
    Object.entries({
      position: "absolute",
      inset: "auto",
      left: "0",
      right: "0",
      top: "0",
      height: "56%",
      width: "100%",
      "object-fit": "cover",
      "object-position": "66% 64%",
      opacity: "1",
      filter: "saturate(.95) contrast(1.16) brightness(1.12)",
      "mix-blend-mode": "normal",
      "mask-image": "none",
      "-webkit-mask-image": "none"
    }).forEach(([property, value]) => cover.style.setProperty(property, value, "important"));
    const glow = cover.nextElementSibling;
    if (glow instanceof HTMLElement && !glow.classList.contains("parleo-cover-scrim")) {
      glow.style.setProperty("opacity", ".1");
      glow.after(cover);
    }
    if (!document.querySelector(".parleo-cover-scrim")) {
      const scrim = document.createElement("div");
      scrim.className = "parleo-cover-scrim";
      scrim.setAttribute("aria-hidden", "true");
      cover.after(scrim);
    }
  };
  applyCover();
  const coverTimer = window.setInterval(applyCover, 250);
  window.setTimeout(() => window.clearInterval(coverTimer), 12000);



  const exposeForCapture = () => {
    document.documentElement.style.backgroundColor = "#F2F0EF";
  };
  exposeForCapture();

  Object.entries(layers).forEach(([id, config]) => {
    const section = document.getElementById(id);
    if (!section || section.querySelector(":scope > .parleo-mobile-depth")) return;
    section.classList.add("parleo-mobile-depth-section");

    const depth = document.createElement("div");
    depth.className = "parleo-mobile-depth";
    depth.dataset.side = config.side;
    depth.setAttribute("aria-hidden", "true");

    const source = document.querySelector(config.source);
    if (!(source instanceof HTMLImageElement)) return;

    const image = document.createElement("img");
    image.src = source.src;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.style.objectPosition = config.position;
    depth.appendChild(image);
    section.prepend(depth);
  });

  const chapters = [
    "Your next customer",
    "The funnel collapses",
    "Share of Algorithm",
    "Waiting has a price",
    "One platform",
    "Your real offer",
    "For brands",
    "For retailers",
    "One console",
    "TrueSync",
    "Four products",
    "Own the answer",
    "The founders",
  ];
  const sections = Array.from(document.querySelectorAll("section[data-screen-label]"));

  sections.forEach((section, index) => {
    if (!(section instanceof HTMLElement)) return;
    if (index > 0 && !section.querySelector(":scope > .parleo-chapter-threshold")) {
      const threshold = document.createElement("div");
      threshold.className = "parleo-chapter-threshold";
      threshold.setAttribute("aria-label", `Chapter ${index + 1} of ${sections.length}: ${chapters[index]}`);
      threshold.innerHTML = `
        <span class="parleo-chapter-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="parleo-chapter-meta">
          <span class="parleo-chapter-kicker">Chapter ${String(index + 1).padStart(2, "0")} of ${sections.length}</span>
          <span class="parleo-chapter-title">${chapters[index]}</span>
        </span>`;
      const depth = section.querySelector(":scope > .parleo-mobile-depth");
      depth?.after(threshold) ?? section.prepend(threshold);
    }

    if (index < sections.length - 1 && !section.querySelector(":scope > .parleo-chapter-end")) {
      const end = document.createElement("div");
      end.className = "parleo-chapter-end";
      end.innerHTML = `
        <button type="button" aria-label="Continue to chapter ${index + 2}: ${chapters[index + 1]}">
          <span>
            <span class="parleo-chapter-end-kicker">Next · ${String(index + 2).padStart(2, "0")} / ${sections.length}</span>
            <span class="parleo-chapter-end-title">${chapters[index + 1]}</span>
          </span>
          <span class="parleo-chapter-end-arrow" aria-hidden="true">↓</span>
        </button>`;
      end.querySelector("button")?.addEventListener("click", () => {
        sections[index + 1]?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      section.appendChild(end);
    }
  });

  const nextButton = document.querySelector("[data-next]");
  const controls = nextButton?.parentElement;
  if (nextButton instanceof HTMLButtonElement && controls instanceof HTMLElement) {
    controls.classList.add("parleo-mobile-controls");

    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "parleo-deck-control";
    previous.setAttribute("aria-label", "Previous chapter");
    previous.textContent = "↑";

    controls.prepend(previous);

    const currentIndex = () => {
      return sections.reduce((closest, section, index) => {
        const distance = Math.abs(section.getBoundingClientRect().top - 54);
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;
    };
    const syncControls = () => {
      const index = currentIndex();
      previous.disabled = index === 0;
      previous.setAttribute("aria-label", index === 0 ? "Already on first chapter" : `Previous chapter: ${chapters[index - 1]}`);
    };
    previous.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const displayed = Number(document.querySelector("[data-slideno]")?.textContent?.split("/")[0]);
      const index = Number.isFinite(displayed) && displayed > 0 ? displayed - 1 : currentIndex();
      const target = sections[index - 1];
      if (!(target instanceof HTMLElement)) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const visibleNumber = document.querySelector("[data-slideno]");
    if (visibleNumber) new MutationObserver(syncControls).observe(visibleNumber, { characterData: true, childList: true, subtree: true });
    window.addEventListener("scroll", syncControls, { passive: true });
    syncControls();
  }
})();