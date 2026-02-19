// ============================================
// DeleteProgramModal.tsx

import { useState } from "react";
import { Program } from "../../types";

// ============================================
interface DeleteProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program;
  onConfirm: () => Promise<void>;
}

export function DeleteProgramModal({ isOpen, onClose, program, onConfirm }: DeleteProgramModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl mx-4 p-6 rounded-lg w-full max-w-md">
        <div className="flex items-center mb-4">
          <div className="flex justify-center items-center bg-red-100 dark:bg-red-900/30 mr-4 rounded-full w-12 h-12">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="font-semibold text-gray-900 dark:text-white text-xl">Delete Program</h2>
        </div>
        <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
          Are you sure you want to delete <strong>{program.title}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm" disabled={loading}>
            Cancel
          </button>
          <button type="button" onClick={handleConfirm} disabled={loading} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white text-sm">
            {loading ? "Deleting..." : "Delete Program"}
          </button>
        </div>
      </div>
    </div>
  );
}