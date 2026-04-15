import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "LoL Playstyle Type Finder β",
  description: "League of Legends向けの非公式MBTI風プレイスタイル診断。48問・8軸分析で向いているロールとチャンプを提案。",
  keywords: ["LoL", "League of Legends", "診断", "プレイスタイル", "ロール", "チャンピオン"],
  openGraph: {
    title: "LoL Playstyle Type Finder β",
    description: "48問でLoLのプレイ傾向を8軸分析する非公式ファン診断サイト。",
    type: "website",
    siteName: "LoL Playstyle Type Finder"
  },
  twitter: {
    card: "summary",
    title: "LoL Playstyle Type Finder β",
    description: "48問でLoLのプレイ傾向を8軸分析する非公式ファン診断サイト。"
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
