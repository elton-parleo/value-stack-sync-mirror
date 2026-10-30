/* One way to open the "Start with your top SKUs" panel from anywhere on the site. */
export const START_EVENT = "parleo:start";
export function openStart(e?: { preventDefault?: () => void }) {
  e?.preventDefault?.();
  window.dispatchEvent(new CustomEvent(START_EVENT));
}
