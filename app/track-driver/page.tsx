// app/track-driver/page.tsx
'use client';

import { useEffect, useState } from 'react';

const TrackDriverPage = () => {
  const [driverLocation, setDriverLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchDriverLocation = async () => {
      const res = await fetch('/api/driver-location');
      const data = await res.json();
      if (data.success) {
        setDriverLocation(data.location);
      }
    };

    const interval = setInterval(fetchDriverLocation, 5000); // Update every 5 seconds
    fetchDriverLocation(); // Initial fetch

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  if (!driverLocation) return <div>Loading...</div>;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h1>Track Driver</h1>
      <div id="map" style={{ height: '100%' }}>
        {/* Implement Google Maps or other map integration here */}
        <iframe
          src={`https://maps.google.com/maps?q=${driverLocation.lat},${driverLocation.lng}&z=14&output=embed`}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrackDriverPage;
