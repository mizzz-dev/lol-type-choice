export function OfficialDisclaimerFaq() {
  return (
    <section className="card space-y-4 text-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-text">注意書き（非公式）</h2>
        <p className="text-muted">
          本サイトは Riot Games の公式サービスではない、非公式ファンプロジェクトです。League of Legends
          および関連名称・アセットの権利は Riot Games に帰属します。
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-text">FAQ</h3>
        <details className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2">
          <summary className="cursor-pointer font-medium text-text">この診断結果はランクや勝率を保証しますか？</summary>
          <p className="mt-2 text-muted">
            いいえ。診断はプレイ傾向の可視化を目的とした参考情報であり、勝率やレート上昇を保証するものではありません。
          </p>
        </details>

        <details className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2">
          <summary className="cursor-pointer font-medium text-text">結果がおかしいと感じた場合は？</summary>
          <p className="mt-2 text-muted">
            回答時の気分や想定レーンで結果が変わる場合があります。時間をおいて再診断し、複数回の傾向を比較してください。
          </p>
        </details>

        <details className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2">
          <summary className="cursor-pointer font-medium text-text">公式データを使っていますか？</summary>
          <p className="mt-2 text-muted">
            いいえ。公開情報をもとに構築した独自ロジックです。パッチ更新やメタ変化に応じて継続的に見直します。
          </p>
        </details>
      </div>
    </section>
  );
}
