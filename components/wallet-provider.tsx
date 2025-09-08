"use client"

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";;
import "@solana/wallet-adapter-react-ui/styles.css";

export function WalletConnectionProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const endpoint = "https://api.devnet.solana.com";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="px-50 py-10">{children}</div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
