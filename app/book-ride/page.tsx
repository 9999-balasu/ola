/*'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookRidePage() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [vehicle, setVehicle] = useState('Mini');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/book-ride', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pickup, drop, vehicle }),
    });

    const data = await res.json();
    if (data.success) {
      alert('Ride booked!');
      router.push('/dashboard');
    } else {
      alert('Booking failed!');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded-xl text-amber-950">
      <h1 className="text-2xl font-bold mb-4 text-amber-950">🧭 Book a Ride</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Pickup Location"
          className="w-full border p-2 rounded"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Drop Location"
          className="w-full border p-2 rounded text-amber-800"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          required
        />
        <select
          className="w-full border p-2 rounded text-amber-950"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        >
          <option value="Mini">Mini</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
        </select>
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 p-2 rounded text-amber-950"
        >
          Confirm Ride
        </button>
      </form>
    </div>
  );
}*/



'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import RazorpayButton from "@/components/RazorpayButton";

export default function BookRidePage() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [vehicle, setVehicle] = useState('Mini');
  const [showPayment, setShowPayment] = useState(false);
  const [fare, setFare] = useState(0); // example fare

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/book-ride', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pickup, drop, vehicle }),
    });

    const data = await res.json();
    if (data.success) {
      alert('Ride Booked! Proceed to Payment 💳');
      // Estimate fare based on vehicle (simple logic for now)
      const priceMap: Record<string, number> = {
        Mini: 100,
        Sedan: 150,
        SUV: 200,
      };
      setFare(priceMap[vehicle]);
      setShowPayment(true);
    } else {
      alert('Booking failed!');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded-xl text-amber-950">
      <h1 className="text-2xl font-bold mb-4 text-amber-950">🧭 Book a Ride</h1>
      {!showPayment ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Pickup Location"
            className="w-full border p-2 rounded"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Drop Location"
            className="w-full border p-2 rounded text-amber-800"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            required
          />
          <select
            className="w-full border p-2 rounded text-amber-950"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          >
            <option value="Mini">Mini</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
          </select>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 p-2 rounded text-amber-950"
          >
            Confirm Ride
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-lg text-amber-600">✅ Ride Booked Successfully!</p>
          <p className="text-md text-amber-700">💰 Fare: ₹{fare}</p>
          <RazorpayButton amount={fare} />
        </div>
      )}
    </div>
  );
}
