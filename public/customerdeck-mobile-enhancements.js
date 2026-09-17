(() => {
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
    #s01 h1 {
      font-family: "Inter Tight", Inter, sans-serif !important;
      font-weight: 700 !important;
      font-size: clamp(44px, 12.75vw, 52px) !important;
      line-height: 1.01 !important;
      letter-spacing: 0 !important;
      text-wrap: balance;
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
})();