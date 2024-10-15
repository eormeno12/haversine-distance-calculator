import { nominatimUrls } from "@/services/nominatim/urls";
import { parse } from "csv-parse";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");
    const method = searchParams.get("method");

    if (!q || !method) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    if (method !== "api" && method !== "csv") {
      return NextResponse.json({ error: "Invalid method" }, { status: 400 });
    }

    const qSplit = q.split(",");

    if (qSplit.length !== 2) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const city = qSplit[0].trim().toLowerCase();
    const country = qSplit[1].trim().toLowerCase();

    if (method === "api") {
      const response = await fetch(nominatimUrls.getCoords(city, country));

      if (!response.ok) {
        return NextResponse.json(
          { error: "Location not found in API" },
          { status: 404 }
        );
      }

      const data = await response.json();
      const { lat, lon } = data[0];

      return NextResponse.json(
        { lat: parseFloat(lat), lon: parseFloat(lon) },
        { status: 200 }
      );
    } else {
      const csvFilePath = path.resolve(
        process.cwd(),
        "data",
        "worldcities.csv"
      );

      const fileStream = fs.createReadStream(csvFilePath);
      const csvParser = parse({ columns: true, skip_empty_lines: true });

      const searchInCsv = new Promise((resolve, reject) => {
        fileStream
          .pipe(csvParser)
          .on("data", (record) => {

            if (
              record.city_ascii.toLowerCase() === city &&
              record.country.toLowerCase() === country
            ) {
              fileStream.destroy();
              resolve({ lat: record.lat, lon: record.lng });
            }
          })
          .on("end", () => resolve(null))
          .on("error", (error) => reject(error));
      });

      const result = await searchInCsv;

      if (!result) {
        return NextResponse.json(
          { error: "Location not found in CSV" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { lat: parseFloat(result.lat), lon: parseFloat(result.lon) },
        { status: 200 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
