export const nominatimUrls = {
  getCoords: (city: string, country: string) =>
    `https://nominatim.openstreetmap.org/search?q=${city},${country}&format=json`,
};
