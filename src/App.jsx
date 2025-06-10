import React, { useEffect, useState } from "react";
import { XummPkce } from "xumm-oauth2-pkce";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { registerUser } from "./services/api";

const xumm = new XummPkce(import.meta.env.VITE_XUMM_API_KEY);

export default function App() {
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial auth (auto)
  useEffect(() => {
    const init = async () => {
      try {
        await xumm.authorize(); // shows QR / opens Xaman popup
        const address = await xumm.user.account;

        await registerUser(address);
        setUserAddress(address);
      } catch (e) {
        console.error("Auth failed", e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading)
    return <div className="text-center mt-20">🔄 Connecting to Xaman...</div>;

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      {userAddress ? (
        <Dashboard address={userAddress} />
      ) : (
        <Login onLogin={async () => {}} />
      )}
    </div>
  );
}
