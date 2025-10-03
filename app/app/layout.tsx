import React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-providers";
import { WalletConnectionProvider } from "@/components/wallet-provider";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/header";
import Footer from "@/components/footer";

// Font variables are defined via global CSS; next/font imports removed to avoid env issues

export const metadata = {
  title: "Tasks — Save your tasks on Solana",
  description:
    "Save your tasks on the Solana blockchain — private, verifiable task storage.",
  keywords: ["tasks", "solana", "todo", "blockchain", "web3", "productivity"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Tasks",
              url: "https://example.com",
              description:
                "Save your tasks on the Solana blockchain — private, verifiable task storage.",
            }),
          }}
        />
      </head>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WalletConnectionProvider>
            <>
              <Toaster />
              <div className="bg-gradient-hero min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </>
          </WalletConnectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
