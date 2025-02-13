// app/verify-email/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setStatus('invalid');
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        if (response.ok) {
          setStatus('success');
          setTimeout(() => {
            router.push('/profile');
          }, 3000);
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        {status === 'verifying' && <p>Verifying your email...</p>}
        {status === 'success' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Email Verified!</h1>
            <p>Redirecting to your profile...</p>
          </div>
        )}
        {status === 'error' && <p>Verification failed. Please try again.</p>}
        {status === 'invalid' && <p>Invalid verification link.</p>}
      </div>
    </div>
  );
}