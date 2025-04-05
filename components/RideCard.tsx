import React from "react";

type RideCardProps = {
  pickup: string;
  drop: string;
  driverName: string;
  carType: string;
  fare: number;
  status?: "Booked" | "Completed" | "Cancelled";
  onBook?: () => void;
};

export default function RideCard({
  pickup,
  drop,
  driverName,
  carType,
  fare,
  status,
  onBook,
}: RideCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-4 flex flex-col gap-3 w-full max-w-xl">
      <div>
        <h3 className="text-lg font-bold text-gray-800">Driver: {driverName}</h3>
        <p className="text-gray-600">Car: {carType}</p>
        <p className="text-gray-600">From: <span className="font-medium">{pickup}</span></p>
        <p className="text-gray-600">To: <span className="font-medium">{drop}</span></p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-green-600 font-semibold">₹ {fare}</p>

        {status ? (
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              status === "Booked"
                ? "bg-yellow-100 text-yellow-800"
                : status === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        ) : (
          <button
            onClick={onBook}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            Book Ride
          </button>
        )}
      </div>
    </div>
  );
}
