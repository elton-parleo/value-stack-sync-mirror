(() => {
  const BLUE = "#0166FF";

  const mount = () => {
    const deck = document.querySelector("deck-stage");
    if (!deck || !deck.shadowRoot || deck.dataset.parleoEnhanced === "true") return false;
    deck.dataset.parleoEnhanced = "true";

    const shadow = deck.shadowRoot;
    const style = document.createElement("style");
    style.textContent = `
      .stage {
        background: #090b10;
      }
      .canvas {
        box-shadow: 0 0 0 1px rgba(242,240,239,.18), 0 26px 80px rgba(0,0,0,.42);
      }
      section[data-screen-label^="01"] h1 {
        font-family: "Inter Tight", Inter, sans-serif !important;
        font-weight: 700 !important;
        font-size: 104px !important;
        line-height: .98 !important;
        letter-spacing: 0 !important;
        text-wrap: balance;
      }
      .rail {
        background: #0d0f14;
        border-right-color: rgba(242,240,239,.1);
        padding-top: 18px;
        gap: 14px;
        scroll-snap-type: y proximity;
      }
      .thumb {
        scroll-snap-align: center;
      }
      .thumb .num {
        color: rgba(242,240,239,.38);
        font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
        letter-spacing: 0;
      }
      .thumb .frame {
        border-radius: 2px;
        outline-width: 1px;
        filter: saturate(.72) brightness(.82);
        transition: outline-color 180ms ease, filter 180ms ease, transform 180ms ease;
      }
      .thumb:hover .frame {
        outline-color: rgba(242,240,239,.42);
        filter: saturate(1) brightness(1);
        transform: translateX(2px);
      }
      .thumb[data-selected] .frame,
      .thumb[data-current] .frame {
        outline-color: ${BLUE};
        box-shadow: 0 0 0 3px rgba(1,102,255,.18);
        filter: saturate(1) brightness(1);
      }
      .thumb[data-selected] .num,
      .thumb[data-current] .num { color: #f2f0ef; }
      .overlay { display: none !important; }
      .parleo-progress {
        position: fixed;
        left: var(--deck-rail-w, 188px);
        right: 0;
        top: 0;
        height: 2px;
        z-index: 2147483100;
        background: rgba(242,240,239,.09);
        pointer-events: none;
      }
      .parleo-progress > span {
        display: block;
        width: var(--parleo-progress, 7.69%);
        height: 100%;
        background: ${BLUE};
        transition: width 480ms cubic-bezier(.22,.8,.22,1);
      }
      .parleo-controls {
        position: fixed;
        right: 24px;
        bottom: 22px;
        z-index: 2147483100;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .parleo-control {
        appearance: none;
        border: 1px solid rgba(242,240,239,.16);
        border-radius: 999px;
        background: rgba(10,14,26,.88);
        color: #f2f0ef;
        min-height: 42px;
        padding: 0 8px 0 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        font: 600 11px/1 ui-monospace, "SFMono-Regular", Menlo, monospace;
        letter-spacing: .1em;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: 0 12px 34px rgba(0,0,0,.28);
        backdrop-filter: blur(14px);
        transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
      }
      .parleo-control:hover:not(:disabled) {
        border-color: rgba(242,240,239,.36);
        background: #0a0e1a;
        transform: translateY(-2px);
      }
      .parleo-control:disabled { opacity: .38; cursor: default; }
      .parleo-control:focus-visible { outline: 2px solid ${BLUE}; outline-offset: 3px; }
      .parleo-control .label { color: rgba(242,240,239,.62); }
      .parleo-control .number { color: #f2f0ef; }
      .parleo-control .arrow {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: #f2f0ef;
        background: ${BLUE};
        font-size: 17px;
        letter-spacing: 0;
        transition: transform 180ms ease;
      }
      .parleo-next:hover .arrow { transform: translateX(2px); }
      .parleo-prev:hover .arrow { transform: translateX(-2px); }
      .parleo-next[data-last] .arrow { transform: rotate(-90deg); }
      @media (max-width: 760px) {
        .parleo-progress { left: 0; }
        .parleo-controls { right: 12px; bottom: 12px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .thumb .frame, .parleo-control, .parleo-control .arrow, .parleo-progress > span { transition: none; }
      }
    `;
    shadow.appendChild(style);

    const progress = document.createElement("div");
    progress.className = "parleo-progress";
    progress.setAttribute("aria-hidden", "true");
    progress.innerHTML = "<span></span>";
    shadow.appendChild(progress);

    const controls = document.createElement("div");
    controls.className = "parleo-controls";
    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "parleo-control parleo-prev";
    const next = document.createElement("button");
    next.type = "button";
    next.className = "parleo-control parleo-next";
    controls.append(previous, next);
    shadow.appendChild(controls);

    const slides = Array.from(deck.querySelectorAll(":scope > [data-screen-label]"));
    const count = slides.length;
    const title = slides[0]?.querySelector("h1");
    if (title instanceof HTMLElement) {
      title.style.setProperty("font-family", '"Inter Tight", Inter, sans-serif');
      title.style.setProperty("font-weight", "700");
      title.style.setProperty("font-size", "104px");
      title.style.setProperty("line-height", ".98");
      title.style.setProperty("letter-spacing", "0");
      title.style.setProperty("text-wrap", "balance");
    }

    const animateSlide = (slide) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const elements = Array.from(slide.children).filter((element) => {
        const style = getComputedStyle(element);
        return style.display !== "none" && !element.classList.contains("deck-atmosphere");
      });
      elements.slice(0, 10).forEach((element, index) => {
        const hasAuthoredTransform = getComputedStyle(element).transform !== "none";
        element.animate(
          hasAuthoredTransform
            ? [{ opacity: 0 }, { opacity: 1 }]
            : [
                { opacity: 0, transform: "translateY(16px)" },
                { opacity: 1, transform: "translateY(0)" }
              ],
          {
            duration: 560,
            delay: 80 + Math.min(index, 7) * 62,
            easing: "cubic-bezier(.22,.8,.22,1)",
            fill: "both"
          }
        );
      });
    };

    const sync = (shouldAnimate = false) => {
      const index = Math.max(0, slides.findIndex((slide) => slide.hasAttribute("data-deck-active")));
      const isLast = index === count - 1;
      progress.style.setProperty("--parleo-progress", `${((index + 1) / count) * 100}%`);
      previous.disabled = index === 0;
      previous.setAttribute("aria-label", index === 0 ? "Already on first slide" : `Go to slide ${index}`);
      previous.innerHTML = `
        <span class="arrow" aria-hidden="true">←</span>
        <span class="label">Previous</span>
        <span class="number">${String(Math.max(1, index)).padStart(2, "0")}</span>
      `;
      next.toggleAttribute("data-last", isLast);
      next.setAttribute("aria-label", isLast ? "Return to first slide" : `Go to slide ${index + 2}`);
      next.innerHTML = `
        <span class="label">${isLast ? "Restart" : "Next"}</span>
        <span class="number">${isLast ? "01" : String(index + 2).padStart(2, "0")}</span>
        <span class="arrow" aria-hidden="true">${isLast ? "↥" : "→"}</span>
      `;
      const currentThumb = shadow.querySelector(`.thumb:nth-child(${index + 1})`);
      currentThumb?.scrollIntoView({ block: "nearest", behavior: shouldAnimate ? "smooth" : "auto" });
      if (shouldAnimate) animateSlide(slides[index]);
    };

    next.addEventListener("click", () => {
      if (deck.index >= count - 1) deck.goTo(0);
      else deck.next();
    });
    previous.addEventListener("click", () => {
      if (deck.index > 0) deck.goTo(deck.index - 1);
    });

    const observer = new MutationObserver((records) => {
      if (records.some((record) => record.attributeName === "data-deck-active")) sync(true);
    });
    slides.forEach((slide) => observer.observe(slide, { attributes: true, attributeFilter: ["data-deck-active"] }));
    sync(true);
    return true;
  };

  if (!mount()) {
    const timer = window.setInterval(() => {
      if (mount()) window.clearInterval(timer);
    }, 50);
    window.setTimeout(() => window.clearInterval(timer), 10000);
  }
})();