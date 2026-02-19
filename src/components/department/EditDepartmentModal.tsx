import React, { useState, useEffect } from "react";
import type { Department, UpdateDepartmentPayload } from "../../types/api.types";
import { useFaculties } from "../../hooks/useFaculties";

interface EditDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: Department;
  onSubmit: (data: UpdateDepartmentPayload) => Promise<Department | null>;
  institutionId: string;
}

export default function EditDepartmentModal({
  isOpen,
  onClose,
  department,
  onSubmit,
  institutionId,
}: EditDepartmentModalProps) {
  const [formData, setFormData] = useState<UpdateDepartmentPayload>({
    name: department.name,
    description: department.description,
    faculty_id: department.faculty_id,
  });
  const [loading, setLoading] = useState(false);

  // Fetch faculties for the institution
  const { faculties, loading: loadingFaculties } = useFaculties(institutionId || "");

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: department.name,
        description: department.description,
        faculty_id: department.faculty_id,
      });
    }
  }, [isOpen, department]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-end sm:items-center bg-black bg-opacity-50 p-0 sm:p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-lg rounded-t-2xl w-full sm:max-w-md max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        {/* Header - Sticky on mobile */}
        <div className="top-0 sticky bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 sm:py-5 border-gray-200 dark:border-gray-700 border-b">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white text-lg sm:text-xl">
              Edit Department
            </h2>
            <button
              onClick={onClose}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              disabled={loading}
            >
              <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          <div className="space-y-4 sm:space-y-5">
            {/* Department Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                Department Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base"
                placeholder="e.g., Department of Computer Science"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={3}
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base resize-none"
                placeholder="Enter department description"
              />
            </div>

            {/* Faculty Dropdown */}
            <div>
              <label
                htmlFor="faculty_id"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                Faculty <span className="text-red-500">*</span>
              </label>
              <select
                id="faculty_id"
                value={formData.faculty_id}
                onChange={(e) =>
                  setFormData({ ...formData, faculty_id: e.target.value })
                }
                disabled={loadingFaculties}
                required
                className="dark:bg-gray-700 focus:ring-opacity-50 disabled:opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base appearance-none cursor-pointer disabled:cursor-not-allowed"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">
                  {loadingFaculties ? "Loading faculties..." : "Select a faculty"}
                </option>
                {faculties.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:flex-row flex-col-reverse sm:justify-end gap-3 mt-6 sm:mt-8 pb-safe">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2.5 sm:py-3 rounded-lg w-full sm:w-auto font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 px-4 py-2.5 sm:py-3 rounded-lg w-full sm:w-auto font-medium text-white text-sm sm:text-base transition-colors disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}