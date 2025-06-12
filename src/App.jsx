import React, { useEffect, useState } from "react";
import { XummXappSdk } from "xumm-xapp-sdk";

const sdk = new XummXappSdk();

export default function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sdk.environment.ready().then(() => {
      const accountAddress = sdk.environment.account;

      if (accountAddress && accountAddress.startsWith("r")) {
        setAccount(accountAddress);
      } else {
        console.warn("XUMM account not found. Probably not inside Xaman.");
      }

      setLoading(false);
    }).catch((err) => {
      console.error("Xumm environment error:", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading Xaman environment...</div>;
  }

  if (!account) {
    return (
      <div className="text-center mt-20 text-red-500">
        ❌ No XRPL account found. Are you opening this inside Xaman?
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">👋 Hello, {account}</h1>
    </div>
  );
}
