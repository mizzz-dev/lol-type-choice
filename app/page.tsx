import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="card space-y-4">
        <p className="text-sm text-accent">LoL Playstyle Type Finder</p>
        <h1 className="text-3xl font-bold">League of Legends向け MBTI風プレイスタイル診断</h1>
        <p className="text-muted">
          48問の質問に答えると、あなたのプレイ傾向を8軸で分析し、相性の良いロールとチャンピオンを提案します。
        </p>
        <div className="rounded-lg border border-amber-300/40 bg-amber-100/10 p-3 text-sm text-amber-200">
          所要時間目安: 4〜6分
        </div>
        <Link href="/diagnosis" className="btn-primary w-full sm:w-auto">
          診断をはじめる
        </Link>
      </section>

      <section className="card text-sm text-muted">
        <h2 className="mb-2 text-lg font-semibold text-text">注意書き</h2>
        <p>
          本サイトは Riot Games 公式サービスではない、非公式ファンプロジェクトです。Riot Games や League of Legends
          の著作物を誤認させる目的はありません。
        </p>
      </section>
    </div>
  );
}
