import React, { useEffect, useState } from "react";
import { XummXappSdk } from "xumm-xapp-sdk";

const sdk = new XummXappSdk();

export default function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sdk.environment.ready().then(() => {
      const accountAddress = sdk.environment.account;
      if (accountAddress) {
        setAccount(accountAddress);
      } else {
        console.warn("No XRPL account found in Xaman context");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading Xaman context...</div>;
  }

  if (!account) {
    return (
      <div className="text-center mt-20 text-red-500">
        Not launched from inside Xaman Wallet.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Hello 👋 {account}</h1>
    </div>
  );
}
