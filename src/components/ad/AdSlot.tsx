"use client";

import { useEffect, useRef, useState } from "react";
import { ImageDown } from "lucide-react";

export default function AdSlot() {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT;
  const insRef = useRef<HTMLModElement>(null);
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    if (!adClient || !adSlot || adFailed) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      setAdFailed(true);
    }
  }, [adClient, adSlot, adFailed]);

  // Placeholder when AdSense is not configured or blocked
  if (!adClient || !adSlot || adFailed) {
    return (
      <div className="w-full h-[250px] rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
        <ImageDown className="w-8 h-8" />
        <span className="text-sm font-medium">広告スペース</span>
        <span className="text-xs">AD</span>
      </div>
    );
  }

  return (
    <ins
      ref={insRef}
      className="adsbygoogle"
      style={{ display: "block", width: "100%", height: "250px" }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
