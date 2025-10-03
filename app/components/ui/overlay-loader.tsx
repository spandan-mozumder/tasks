"use client";

import React from "react";

export default function OverlayLoader({
  visible = false,
}: {
  visible?: boolean;
}) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm px-4 py-3 rounded-lg border">
        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" aria-hidden>
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span className="text-sm">Processing transaction…</span>
      </div>
    </div>
  );
}
