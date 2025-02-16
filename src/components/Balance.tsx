import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';


const BalanceDisplay = () => {
  const { data: session } = useSession();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/balance');
        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }
        const data = await response.json();
        setBalance(data.balance);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchBalance();
    }
  }, [session]);

  if (!session) {
    return null;
  }

  return (
<>
     
        Your Balance
        {loading ? (
          <div className="animate-pulse bg-gray-200 h-8 w-24 rounded" />
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <div className="text-2xl font-bold">
            {balance} credits
          </div>
        )}
</>
  );
};

export default BalanceDisplay;