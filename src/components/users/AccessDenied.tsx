// components/users/AccessDenied.tsx
import React from "react";
import PageMeta from "../common/PageMeta";

export default function AccessDenied() {
  return (
    <div>
      <PageMeta title="Access Denied" description="Access Denied" />
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-flex justify-center items-center bg-red-100 dark:bg-red-900/30 mb-4 rounded-full w-16 h-16">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mb-2 font-bold text-gray-900 dark:text-white text-2xl">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
          <p className="mt-1 text-gray-500 dark:text-gray-500 text-sm">
            Only administrators can manage users.
          </p>
        </div>
      </div>
    </div>
  );
}
