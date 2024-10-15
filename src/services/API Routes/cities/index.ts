import { apiRoutesUrls } from "../urls";
import {
  CalcDistanceResponseSchema,
  GetCoordsResponseSchema,
} from "./cities.model";

export const getCoords = async (
  city: string,
  country: string,
  method: string
) => {
  try {
    const response = await fetch(
      apiRoutesUrls.cities.getCoords(city, country, method)
    );

    if (response.status === 404) {
      throw new Error(`Coordenadas de ${city}, ${country} no encontradas`);
    }

    if (!response.ok) {
      throw new Error("Ocurrió un error al obtener las coordenadas");
    }

    const data = await response.json();
    const coords = GetCoordsResponseSchema.parse(data);

    return coords;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ocurrió un error al obtener las coordenadas");
    }
  }
};

export const calcDistance = async (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  try {
    const response = await fetch(
      apiRoutesUrls.cities.calcDistance(lat1, lon1, lat2, lon2)
    );

    if (!response.ok) {
      throw new Error("Ocurrió un error al calcular la distancia");
    }

    const data = await response.json();
    const dataParsed = CalcDistanceResponseSchema.parse(data);
    const distance = dataParsed.distance;

    return distance;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ocurrió un error al calcular la distancia");
    }
  }
};
