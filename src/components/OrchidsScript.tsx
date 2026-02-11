"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Load Orchids browser-logs script only when in Orchids editor context,
 * so normal visits and PageSpeed don't request it (avoids cache TTL warning).
 */
export function OrchidsScript() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const inOrchids =
      document.referrer?.includes("orchids.page") ||
      window.location.search?.toLowerCase().includes("orchids");
    setShouldLoad(inOrchids);
  }, []);

  if (!shouldLoad) return null;
  return (
    <Script
      id="orchids-browser-logs"
      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
      strategy="lazyOnload"
      data-orchids-project-id="4333d292-4a82-4247-86b6-117a058e7bdd"
    />
  );
}
