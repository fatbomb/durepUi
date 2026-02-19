// components/users/DeleteUserModal.tsx
import React, { useState } from "react";
import Modal from "./Modal";
import type { User } from "../../types/api.types";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onConfirm: () => Promise<void>;
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  user,
  onConfirm,
}: DeleteUserModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete User">
      <div className="space-y-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 px-4 py-3 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="font-medium text-yellow-800 dark:text-yellow-400 text-sm">
            Warning: This action cannot be undone
          </p>
        </div>

        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete the user{" "}
          <span className="font-semibold">{"user"}</span> (
          {user.email})?
        </p>

        <p className="text-gray-600 dark:text-gray-400 text-sm">
          All associated data and roles will be permanently removed.
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 text-sm"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium text-white text-sm"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
