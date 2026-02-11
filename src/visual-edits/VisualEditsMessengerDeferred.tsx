"use client";

import { useEffect, useState, useRef } from "react";
import VisualEditsMessenger from "./VisualEditsMessenger";

/**
 * Mounts VisualEditsMessenger only after first user interaction (click, scroll, touch)
 * so it never runs during PageSpeed's passive trace — eliminates forced reflow (~92ms).
 */
export default function VisualEditsMessengerDeferred() {
  const [mounted, setMounted] = useState(false);
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    const mount = () => {
      if (once.current) return;
      once.current = true;
      setMounted(true);
      window.removeEventListener("click", mount, true);
      window.removeEventListener("scroll", mount, true);
      window.removeEventListener("touchstart", mount, true);
      window.removeEventListener("keydown", mount, true);
    };
    window.addEventListener("click", mount, { capture: true, passive: true });
    window.addEventListener("scroll", mount, { capture: true, passive: true });
    window.addEventListener("touchstart", mount, { capture: true, passive: true });
    window.addEventListener("keydown", mount, { capture: true, passive: true });
    return () => {
      window.removeEventListener("click", mount, true);
      window.removeEventListener("scroll", mount, true);
      window.removeEventListener("touchstart", mount, true);
      window.removeEventListener("keydown", mount, true);
    };
  }, []);

  if (!mounted) return null;
  return <VisualEditsMessenger />;
}
