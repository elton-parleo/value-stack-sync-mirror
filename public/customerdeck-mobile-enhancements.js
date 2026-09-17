(() => {
  const layers = {
    s03: {
      src: "/__l5e/assets-v1/04e90e0d-b7b4-45d8-a0ae-1ad45fa3f305/mobile-skincare.jpg",
      position: "76% 50%",
      side: "right",
    },
    s05: {
      src: "/__l5e/assets-v1/1e41ccf1-0ef6-4a01-89a1-b227ab129c1e/mobile-fragrance.jpg",
      position: "44% 50%",
      side: "left",
    },
    s07: {
      src: "/__l5e/assets-v1/fe1836ca-ffd7-4467-8378-e59c73f2811a/mobile-fashion.jpg",
      position: "68% 42%",
      side: "right",
    },
    s09: {
      src: "/__l5e/assets-v1/04e90e0d-b7b4-45d8-a0ae-1ad45fa3f305/mobile-skincare.jpg",
      position: "34% 55%",
      side: "left",
    },
    s11: {
      src: "/__l5e/assets-v1/1e41ccf1-0ef6-4a01-89a1-b227ab129c1e/mobile-fragrance.jpg",
      position: "72% 50%",
      side: "right",
    },
    sA1: {
      src: "/__l5e/assets-v1/fe1836ca-ffd7-4467-8378-e59c73f2811a/mobile-fashion.jpg",
      position: "38% 48%",
      side: "left",
    },
  };

  const style = document.createElement("style");
  style.textContent = `
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

    const image = document.createElement("img");
    image.src = config.src;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.style.objectPosition = config.position;
    depth.appendChild(image);
    section.prepend(depth);
  });
})();