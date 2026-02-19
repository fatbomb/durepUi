import { useState } from "react";
import Modal from "../common/modal";
import type { Institution } from "../../types/api.types";

interface DeleteInstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  institution: Institution;
  onConfirm: () => Promise<void>;
}

export default function DeleteInstitutionModal({
  isOpen,
  onClose,
  institution,
  onConfirm,
}: DeleteInstitutionModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Institution">
      <div className="space-y-4">
        <div className="bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-red-800 dark:text-red-400 text-sm">
                Warning
              </h3>
              <div className="mt-2 text-red-700 dark:text-red-300 text-sm">
                <p>
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">{institution.name}</span>?
                </p>
                <p className="mt-2">
                  This action cannot be undone. All faculties associated with
                  this institution will also be affected.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded-lg text-white text-sm"
          >
            {loading ? "Deleting..." : "Delete Institution"}
          </button>
        </div>
      </div>
    </Modal>
  );
}