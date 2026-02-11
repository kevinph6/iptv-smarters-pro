"use client";

import { useEffect, useState } from "react";
import VisualEditsMessenger from "./VisualEditsMessenger";

/**
 * Mounts VisualEditsMessenger only after load + idle so it doesn't cause
 * forced reflow during initial paint (saves ~149ms on PageSpeed).
 */
export default function VisualEditsMessengerDeferred() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const run = () => {
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(() => setMounted(true), { timeout: 2000 });
      } else {
        setTimeout(() => setMounted(true), 500);
      }
    };
    if (document.readyState === "complete") {
      run();
    } else {
      window.addEventListener("load", run);
      return () => window.removeEventListener("load", run);
    }
  }, []);

  if (!mounted) return null;
  return <VisualEditsMessenger />;
}
