// components/users/EditRoleModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import type { UpdateRolePayload, UserRole } from "../../types/api.types";

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  onSubmit: (data: UpdateRolePayload) => Promise<UserRole | null>;
}

export default function EditRoleModal({
  isOpen,
  onClose,
  role,
  onSubmit,
}: EditRoleModalProps) {
  const [formData, setFormData] = useState<UpdateRolePayload>({
    role: role.role,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData({
      role: role.role,
    });
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await onSubmit(formData);
    setLoading(false);

    if (result) {
      onClose();
    } else {
      setError("Failed to update role. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Role">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            className="bg-white dark:bg-gray-800 px-4 py-2 border border-gray-300 focus:border-blue-500 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
            required
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs">
            Update the role for this user
          </p>
        </div>

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
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Role"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
