"use client";

import React from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 sm:px-8 border-b border-transparent/10 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-white/5">
            <Image
              src="/favicon.ico"
              alt="Tasks"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Tasks</h1>
            <p className="text-xs text-muted-foreground">
              Save your tasks on Solana
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
