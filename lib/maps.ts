export function getGoogleMapsEmbedUrl(mapUrl: string | null | undefined, fallbackAddress: string) {
  const fallback = (fallbackAddress || "Jaipur, India").trim();
  const fallbackQuery = encodeURIComponent(fallback);

  if (!mapUrl) {
    return `https://www.google.com/maps?q=${fallbackQuery}&output=embed`;
  }

  const trimmed = mapUrl.trim();

  if (!trimmed) {
    return `https://www.google.com/maps?q=${fallbackQuery}&output=embed`;
  }

  if (trimmed.includes("google.com/maps/embed")) {
    return trimmed;
  }

  const normalizedInput = /^(https?:)?\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  if (normalizedInput.includes("google.com/maps")) {
    try {
      const url = new URL(normalizedInput);

      if (!url.pathname.includes("/maps")) {
        return `https://www.google.com/maps?q=${fallbackQuery}&output=embed`;
      }

      const placeFromPath = decodeURIComponent(
        url.pathname
          .split("/")
          .filter(Boolean)
          .slice(2)
          .join(" ")
          .replace(/\+/g, " "),
      ).trim();

      const searchQuery =
        url.searchParams.get("q") ||
        url.searchParams.get("query") ||
        placeFromPath ||
        fallback;

      return `https://www.google.com/maps?q=${encodeURIComponent(searchQuery)}&output=embed`;
    } catch {
      // Fallback below.
    }
  }

  const latLng = trimmed.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);

  if (latLng) {
    return `https://www.google.com/maps?q=${encodeURIComponent(`${latLng[1]},${latLng[2]}`)}&output=embed`;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return `https://www.google.com/maps?q=${fallbackQuery}&output=embed`;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(trimmed || fallback)}&output=embed`;
}