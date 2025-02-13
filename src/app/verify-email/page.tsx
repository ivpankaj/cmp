'use client';
import VerifyEmail from '@/components/VerifyMail';
import { Suspense } from 'react';


export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}