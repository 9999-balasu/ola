import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import Ride from "@/models/Ride";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  const { rideId } = await req.json();
  await connectDB();
  
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
  }

  const ride = await Ride.findById(rideId);
  if (!ride) {
    return new Response(JSON.stringify({ success: false, message: "Ride not found" }), { status: 404 });
  }

  // Check if the ride is ongoing and mark it as completed
  if (ride.status === "Ongoing" && ride.driverEmail === session.user?.email) {
    ride.status = "Completed";
    await ride.save();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ success: false, message: "Ride cannot be completed" }), { status: 400 });
}
