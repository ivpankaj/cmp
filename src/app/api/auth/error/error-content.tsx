'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Authentication Error</h2>
          <p className="mt-4 text-red-400">
            {error === 'OAuthAccountNotLinked'
              ? 'This email is already associated with another account. Please sign in using the original provider.'
              : 'An error occurred during authentication. Please try again.'}
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}