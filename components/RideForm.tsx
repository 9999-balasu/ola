// components/RideForm.tsx
/*'use client';

import { useState } from 'react';

export default function RideForm() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !drop || !vehicle) return alert("All fields are required.");
    setSubmitted(true);
  };

  return (
    <>
      {submitted ? (
        <div className="text-green-600 font-semibold">
          ✅ Ride confirmed from <b>{pickup}</b> to <b>{drop}</b> via <b>{vehicle}</b>!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full border p-2 rounded text-amber-950"
          />
          <input
            type="text"
            placeholder="Drop Location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            className="w-full border p-2 rounded text-amber-950"
          />
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full border p-2 rounded text-amber-950"
          >
            <option value="">Select Vehicle</option>
            <option value="Bike">🛵 Bike</option>
            <option value="Auto">🛺 Auto</option>
            <option value="Mini">🚗 Mini</option>
            <option value="Sedan">🚙 Sedan</option>
          </select>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-amber-950"
          >
            Confirm Ride
          </button>
        </form>
      )}
    </>
  );
}*/



// components/RideForm.tsx
'use client';

import { useState } from 'react';

export default function RideForm() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !drop || !vehicle) return alert("All fields are required.");

    const res = await fetch('/api/book-ride', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickup, drop, vehicle }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <>
      {submitted ? (
        <div className="text-green-600 font-semibold">
          ✅ Ride confirmed from <b>{pickup}</b> to <b>{drop}</b> via <b>{vehicle}</b>!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Drop Location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Vehicle</option>
            <option value="Bike">🛵 Bike</option>
            <option value="Auto">🛺 Auto</option>
            <option value="Mini">🚗 Mini</option>
            <option value="Sedan">🚙 Sedan</option>
          </select>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Confirm Ride
          </button>
        </form>
      )}
    </>
  );
}

