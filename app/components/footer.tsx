"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 sm:px-8 border-t border-transparent/10">
      <div className="mx-auto max-w-5xl text-sm text-muted-foreground flex items-center justify-between">
        <div>© {new Date().getFullYear()} Tasks</div>
        <div className="opacity-80">Built on Solana • Privacy-focused</div>
      </div>
    </footer>
  );
}
