'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Ride {
  _id: string;
  pickup: string;
  drop: string;
  vehicleType: string;
  status: string;
  createdAt: string;
}

export default function PastRidesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status]);

  useEffect(() => {
    const fetchRides = async () => {
      const res = await fetch("/api/rides");
      const data = await res.json();
      if (data.success) setRides(data.rides);
    };
    fetchRides();
  }, []);

  if (status === "loading") {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow text-amber-950">
      <h2 className="text-2xl font-bold mb-4 text-amber-950">🧾 Your Past Rides</h2>
      {rides.length === 0 ? (
        <p className="text-gray-500 text-black">You haven’t booked any rides yet.</p>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <div key={ride._id} className="p-4 border rounded-lg bg-gray-50 text-amber-950">
              <p className="text-lg font-semibold text-amber-700">
                {ride.pickup} → {ride.drop}
              </p>
              <p>🚖 Vehicle: {ride.vehicleType}</p>
              <p>Status: <span className="font-medium">{ride.status}</span></p>
              <p className="text-sm text-gray-500 text-blue-950">
                Booked on: {new Date(ride.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
