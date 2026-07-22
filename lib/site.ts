const LOCAL_SITE_URL = "http://localhost:3000";

export const normalizeSiteUrl = (value: string | null | undefined): string => {
  const candidate = value?.trim();
  if (!candidate) {
    return LOCAL_SITE_URL;
  }

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return LOCAL_SITE_URL;
    }

    return url.origin;
  } catch {
    return LOCAL_SITE_URL;
  }
};

export const getSiteUrl = (): string => normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const buildSiteUrl = (pathname: string, searchParams?: Record<string, string>): string => {
  const url = new URL(pathname, `${getSiteUrl()}/`);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return url.toString();
};
