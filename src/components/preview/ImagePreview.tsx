"use client";

interface ImagePreviewProps {
  src: string;
  alt?: string;
}

export default function ImagePreview({ src, alt = "Preview" }: ImagePreviewProps) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Checkerboard background for transparency */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
            linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        }}
      />
      <div className="dark:hidden absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
          linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
          linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
        `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
      }} />
      <div className="hidden dark:block absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(45deg, #374151 25%, transparent 25%),
          linear-gradient(-45deg, #374151 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #374151 75%),
          linear-gradient(-45deg, transparent 75%, #374151 75%)
        `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
      }} />
      <img
        src={src}
        alt={alt}
        className="relative max-w-full max-h-[50vh] object-contain mx-auto block"
      />
    </div>
  );
}
