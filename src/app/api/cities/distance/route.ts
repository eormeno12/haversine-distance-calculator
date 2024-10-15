import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat1Param = searchParams.get("lat1");
    const lon1Param = searchParams.get("lon1");
    const lat2Param = searchParams.get("lat2");
    const lon2Param = searchParams.get("lon2");

    if (!lat1Param || !lon1Param || !lat2Param || !lon2Param) {
      return new Response("Missing parameters", { status: 400 });
    }

    const lat1 = parseFloat(lat1Param);
    const lon1 = parseFloat(lon1Param);
    const lat2 = parseFloat(lat2Param);
    const lon2 = parseFloat(lon2Param);

    if (
      isNaN(lat1) ||
      isNaN(lon1) ||
      isNaN(lat2) ||
      isNaN(lon2) ||
      lat1 < -90 ||
      lat1 > 90 ||
      lon1 < -180 ||
      lon1 > 180 ||
      lat2 < -90 ||
      lat2 > 90 ||
      lon2 < -180 ||
      lon2 > 180
    ) {
      return new Response("Invalid parameters", { status: 400 });
    }

    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return NextResponse.json({ distance }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
