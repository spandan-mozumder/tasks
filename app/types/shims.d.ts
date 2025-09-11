// Ambient shims to quiet TypeScript module/JSX errors while dependencies are installing
declare module 'next' {
  export type Metadata = Record<string, any>;
}
declare module 'next/font/google' {
  export function Geist(opts?: any): any;
  export function Geist_Mono(opts?: any): any;
}
// Rely on installed @types/react and @types/react-dom for proper typings.
// (Do not declare 'react' or 'react-dom' here to avoid shadowing real types.)
declare module 'lucide-react';
declare module '@radix-ui/react-tooltip';
declare module '@solana/wallet-adapter-react-ui';
declare module '@solana/wallet-adapter-react';
declare module '@solana/wallet-adapter-wallets';
declare module 'sonner';
declare module 'tw-animate-css';

// Allow JSX intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
