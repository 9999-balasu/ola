'use client';

import React from 'react';

interface DashboardProps {
  user: {
    name: string;
    email: string;
  };
}

export default function DashboardComponent({ user }: DashboardProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Welcome to your Dashboard
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Info</h2>
        <p className="text-lg text-gray-600">
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
}
