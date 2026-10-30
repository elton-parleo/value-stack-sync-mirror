import type { MouseEvent } from "react";

/** In-page jump that works under both BrowserRouter and the preview's HashRouter. */
export const jump = (id: string) => (e?: MouseEvent) => {
  e?.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};
