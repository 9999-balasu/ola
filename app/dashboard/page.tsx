
// app/dashboard/page.tsx ✅
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";
import DriverMap from "@/components/DriverMap";

export default async function DashboardPage() {
  
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <Link href="/book-ride" className="p-4 bg-gray-100 rounded block hover:bg-gray-200 text-amber-950">🧭 Book a Ride</Link>

      <h1 className="text-2xl font-bold mb-4 text-black">Welcome to Your Dashboard</h1>
      <p className="text-lg text-amber-950">Hello, <span className="font-semibold">{session.user?.name}</span> 👋</p>
      <p className="text-gray-600">Email: {session.user?.email}</p>

     {/* <div className="mt-8 space-y-4">
        <div className="p-4 bg-gray-100 rounded text-amber-600">🧭 Book a Ride</div>
        <div className="p-4 bg-gray-100 rounded text-amber-700">📍 Track Driver</div>
        <div className="p-4 bg-gray-100 rounded text-amber-950">🧾 View Past Rides</div>
      </div>*/}

      <div className="p-6">
      <h1 className="text-xl font-semibold mb-4 text-lime-950">📍 Live Driver Tracking</h1>
      <DriverMap />
    </div>

    </div>
  );
}
