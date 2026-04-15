import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoL Playstyle Type Finder",
  description: "League of Legends向けMBTI風プレイスタイル診断",
  openGraph: {
    title: "LoL Playstyle Type Finder",
    description: "LoL向けの非公式ファン診断サイト",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "LoL Playstyle Type Finder",
    description: "LoL向けの非公式ファン診断サイト"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <main className="mx-auto w-full max-w-3xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
