import React from "react";

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-900 z-50">
    <div className="flex flex-col items-center">
        <img src="/amilliontechies.png" alt="Logo" className="w-20 h-20 mb-6" />

      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-opacity-50"></div>
    </div>
  </div>
);

export default LoadingScreen;