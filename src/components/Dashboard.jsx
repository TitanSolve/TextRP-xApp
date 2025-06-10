import React from 'react';

export default function Dashboard({ address }) {
  return (
    <div className="bg-white p-4 rounded shadow mt-10">
      <h2 className="text-lg font-semibold mb-2">Welcome 🎉</h2>
      <p className="text-sm break-all">Wallet Address:</p>
      <p className="text-xs break-all text-gray-600">{address}</p>
    </div>
  );
}
