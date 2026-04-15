export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

const canUseBrowser = typeof window !== "undefined";

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
  if (!canUseBrowser) return;

  // Google Analytics / gtag を想定。未導入環境では dataLayer にだけ積む。
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: "event", eventName: string, params?: Record<string, unknown>) => void;
  }
}
