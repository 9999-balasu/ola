// app/api/book-ride/route.ts
// app/api/book-ride/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/lib/mongodb";
import Ride from "@/models/Ride";

// POST /api/book-ride - Book a ride
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { pickup, drop, vehicle } = await req.json();

  try {
    await connectDB();

    const ride = await Ride.create({
      userEmail: session.user?.email,
      pickup,
      drop,
      vehicle,
      status: "Pending",
    });

    return NextResponse.json({ success: true, ride });
  } catch (error) {
    return NextResponse.json({ error: "Ride booking failed" }, { status: 500 });
  }
}

// Optional: GET /api/book-ride - Debug or fetch all rides
export async function GET() {
  try {
    await connectDB();
    const rides = await Ride.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, rides });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch rides" }, { status: 500 });
  }
}
