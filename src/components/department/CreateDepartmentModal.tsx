import React, { useState } from "react";
import type { CreateDepartmentPayload, Department } from "../../types/api.types";

interface CreateDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDepartmentPayload) => Promise<Department | null>;
}

export default function CreateDepartmentModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateDepartmentModalProps) {
  const [formData, setFormData] = useState<CreateDepartmentPayload>({
    name: "",
    description: "",
    faculty_id: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await onSubmit(formData);
      if (result) {
        setFormData({ name: "", description: "", faculty_id: "" });
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", description: "", faculty_id: "" });
    onClose();
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl mx-4 p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white text-xl">
          Create Department
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Department Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white"
                placeholder="e.g., Department of Computer Science"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={3}
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white"
                placeholder="Enter department description"
              />
            </div>

            <div>
              <label
                htmlFor="faculty_id"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Faculty ID *
              </label>
              <input
                type="text"
                id="faculty_id"
                value={formData.faculty_id}
                onChange={(e) =>
                  setFormData({ ...formData, faculty_id: e.target.value })
                }
                required
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full font-mono dark:text-white text-sm"
                placeholder="Faculty UUID"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 text-sm"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg font-medium text-white text-sm"
            >
              {loading ? "Creating..." : "Create Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}