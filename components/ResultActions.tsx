"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function ResultActions({ shareUrl, shareText }: { shareUrl: string; shareText: string }) {
  return (
    <section className="card flex flex-wrap gap-2">
      <Link
        href="/diagnosis"
        className="btn-secondary"
        onClick={() => {
          trackEvent("retake_clicked", { source: "result" });
        }}
      >
        再診断する
      </Link>
      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noreferrer"
        className="btn-primary"
        onClick={() => {
          trackEvent("result_shared", { channel: "x" });
        }}
      >
        Xで共有
      </a>
    </section>
  );
}
