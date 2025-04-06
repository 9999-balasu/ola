'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const DriverDashboardPage = () => {
  const { data: session } = useSession();
  const [rides, setRides] = useState<any[]>([]);

  useEffect(() => {
    const fetchRides = async () => {
      if (!session?.user?.email) return;

      const response = await fetch(`/api/driver/rides`);
      const data = await response.json();

      if (data.success) {
        setRides(data.rides);
      } else {
        console.error("Error fetching rides");
      }
    };

    fetchRides();
  }, [session]);

  const completeRide = async (rideId: string) => {
    const response = await fetch(`/api/driver/complete-ride`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rideId }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Ride marked as completed");
      window.location.reload();
    } else {
      alert("Failed to complete the ride");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>
      <p className="text-lg">Hello, <span className="font-semibold">{session?.user?.name}</span> 👋</p>

      <div className="mt-8 space-y-4">
        {rides.length === 0 ? (
          <p>No ongoing rides. Please wait for new ride requests.</p>
        ) : (
          rides.map((ride: any) => (
            <div key={ride._id} className="p-4 bg-gray-100 rounded">
              <p>Pickup: {ride.pickup}</p>
              <p>Drop: {ride.drop}</p>
              <p>Vehicle: {ride.vehicle}</p>
              <p>Status: <span className="font-bold text-blue-500">{ride.status}</span></p>
              <button
                className="bg-green-500 text-cyan-950 p-2 rounded mt-2"
                onClick={() => completeRide(ride._id)}
              >
                Complete Ride
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DriverDashboardPage;
