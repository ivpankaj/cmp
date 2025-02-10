import { Suspense } from 'react';
import ErrorContent from './error-content';

export default function AuthError() {
  return (
    <Suspense fallback={<ErrorLoading />}>
      <ErrorContent />
    </Suspense>
  );
}

// Loading component
function ErrorLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Loading...</h2>
        </div>
      </div>
    </div>
  );
}