import React, { useEffect, useState } from 'react';
import { XummPkce } from 'xumm-oauth2-pkce';
import UserInfo from './components/UserInfo';

const xumm = new XummPkce(import.meta.env.VITE_XUMM_API_KEY);

export default function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    xumm.authorize().then(() => {
      xumm.user.account.then(account => {
        setAccount(account);
        setLoading(false);
      });
    });
  }, []);

  if (loading) return <div className="text-center mt-20">Connecting to Xaman Wallet...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Welcome to Your xApp 👋</h1>
      <UserInfo address={account} />
    </div>
  );
}
