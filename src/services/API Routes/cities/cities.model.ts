import { z } from "zod";

export const GetCoordsResponseSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export type GetCoordsResponse = z.infer<typeof GetCoordsResponseSchema>;

export const CalcDistanceResponseSchema = z.object({
  distance: z.number(),
});

export type CalcDistanceResponse = z.infer<typeof CalcDistanceResponseSchema>;
