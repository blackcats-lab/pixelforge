import Script from "next/script";

export default function AdScript() {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!adClient) return null;

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
