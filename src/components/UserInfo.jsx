import React from 'react';

export default function UserInfo({ address }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-md font-semibold">Your Wallet Address:</h2>
      <p className="text-xs break-all mt-1">{address}</p>
    </div>
  );
}