export type AboutImagesData = {
  homeAboutImageUrl: string | null;
  aboutPageHeroImageUrl: string | null;
};

const FALLBACK_DATA: AboutImagesData = {
  homeAboutImageUrl: null,
  aboutPageHeroImageUrl: null,
};

let cache: AboutImagesData | null = null;
let cacheAt = 0;
let pending: Promise<AboutImagesData> | null = null;

const CACHE_MS = 5 * 60 * 1000;

export async function getAboutImages(force = false): Promise<AboutImagesData> {
  const now = Date.now();

  if (!force && cache && now - cacheAt < CACHE_MS) {
    return cache;
  }

  if (pending && !force) {
    return pending;
  }

  pending = fetch("/api/about-images", { cache: "no-store" })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch about images");
      }

      const data = (await res.json()) as Partial<AboutImagesData>;
      const normalized: AboutImagesData = {
        homeAboutImageUrl: data.homeAboutImageUrl || null,
        aboutPageHeroImageUrl: data.aboutPageHeroImageUrl || null,
      };

      cache = normalized;
      cacheAt = Date.now();
      return normalized;
    })
    .catch(() => FALLBACK_DATA)
    .finally(() => {
      pending = null;
    });

  return pending;
}

export function invalidateAboutImagesCache() {
  cache = null;
  cacheAt = 0;
}
