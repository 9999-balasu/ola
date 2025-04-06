import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import Ride from "@/models/Ride";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  // Check if the user is a driver (assuming driver role is saved in session)
  if (!session || session.user?.role !== 'driver') {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
  }

  const rides = await Ride.find({ status: 'Ongoing', driverEmail: session.user?.email }).sort({ createdAt: -1 });
  return new Response(JSON.stringify({ success: true, rides }), { status: 200 });
}
