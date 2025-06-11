import React, { useEffect, useState } from "react";
import { XummPkce } from "xumm-oauth2-pkce";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { registerUser } from "./services/api";

const xumm = new XummPkce("6a0a1b23-c534-4f38-9dfc-a907d27a7cd3");

export default function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Automatically restores session if possible
      await xumm.authorize().catch((e) => console.log("e", e));
      xumm.on("error", (error) => {
        console.log("error", error);
      });

      const userAccount = await xumm.user.account;
      if (userAccount) {
        setAccount(userAccount);
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading your wallet info...</div>;
  }

  if (!account) {
    return (
      <div className="text-center mt-20">
        No account found. Please open this in Xaman Wallet.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Your xApp 🧩 {account} </h1>
    </div>
  );
}
