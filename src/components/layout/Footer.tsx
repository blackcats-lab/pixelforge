"use client";

import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>All processing is done in your browser. No images are uploaded to any server.</span>
        </div>
        <span>PixelForge</span>
      </div>
    </footer>
  );
}
