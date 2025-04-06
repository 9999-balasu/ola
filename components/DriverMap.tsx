/*'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix leaflet marker icons (important for Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function DriverMap() {
  const [driverLocation, setDriverLocation] = useState<LatLngExpression>([17.385044, 78.486671]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation(prev => {
        const [lat, lng] = prev as [number, number];
        return [lat + (Math.random() - 0.5) * 0.001, lng + (Math.random() - 0.5) * 0.001];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold mb-2 text-green-700 text-center">🚖 Live Driver Map</h2>
      <div className="h-[500px] w-full">
        <MapContainer
          center={driverLocation}
          zoom={15}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={driverLocation}>
            <Popup>🚗 Driver is here!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}*/




'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix Leaflet marker icons for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface Driver {
  id: number;
  location: LatLngExpression;
  name: string;
}

export default function DriverMap() {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 1, location: [17.385044, 78.486671], name: "Driver 1" },
    { id: 2, location: [17.384, 78.485], name: "Driver 2" },
    { id: 3, location: [17.386, 78.487], name: "Driver 3" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) => {
          const [lat, lng] = driver.location as [number, number];
          const newLat = lat + (Math.random() - 0.5) * 0.001;
          const newLng = lng + (Math.random() - 0.5) * 0.001;
          return { ...driver, location: [newLat, newLng] };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold mb-2 text-green-700 text-center">🚖 Live Driver Map</h2>
      <div className="h-[500px] w-full">
        <MapContainer
          center={drivers[0].location}
          zoom={15}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {drivers.map((driver) => (
            <Marker key={driver.id} position={driver.location}>
              <Popup>
                🚗 {driver.name} <br />
                Status: Active
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

