export const apiRoutesUrls = {
  cities: {
    getCoords: (city: string, country: string, method: string) =>
      `/api/cities/coords?q=${city},${country}&method=${method}`,
    calcDistance: (lat1: number, lon1: number, lat2: number, lon2: number) =>
      `/api/cities/distance?lat1=${lat1}&lon1=${lon1}&lat2=${lat2}&lon2=${lon2}`,
  },
};
