/* eslint-disable @typescript-eslint/no-unused-vars */
export const Loader = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-2xl font-bold">Loading...</div>
          </div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  };