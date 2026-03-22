"use client";

import { useEffect, useRef, useState } from "react";

interface InlineAdBannerProps {
  className?: string;
}

export default function InlineAdBanner({ className }: InlineAdBannerProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT;
  const insRef = useRef<HTMLModElement>(null);
  const [adFailed, setAdFailed] = useState(false);
  const pushed = useRef(false);

  // Dynamically load AdSense script if not already loaded
  useEffect(() => {
    if (!adClient) return;
    if (document.querySelector(`script[src*="pagead2.googlesyndication.com"]`)) return;

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, [adClient]);

  // Push ad after script is available
  useEffect(() => {
    if (!adClient || !adSlot || adFailed || pushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      setAdFailed(true);
    }
  }, [adClient, adSlot, adFailed]);

  if (!adClient || !adSlot || adFailed) {
    return null;
  }

  return (
    <div className={className}>
      <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
        Sponsored
      </div>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: "90px" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
