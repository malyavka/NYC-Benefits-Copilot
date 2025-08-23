import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NYC Benefits Copilot",
  description: "Unlock Hidden Income with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-neutral-50 text-neutral-900`}>
        <header className="border-b bg-white">
          <div className="mx-auto max-w-5xl px-4 py-5 flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-yellow-300" />
            <div className="font-semibold">NYC Benefits Copilot</div>
            <div className="ml-auto text-sm text-neutral-500">AI-powered personal finance assistant</div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 pb-24">{children}</main>
        <footer className="mt-16 py-8 text-center text-xs text-neutral-500">
          For demo only. Sources: NYC.gov, benefits.gov.
        </footer>
      </body>
    </html>
  );
}