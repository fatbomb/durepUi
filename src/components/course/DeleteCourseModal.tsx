// ============================================
// DeleteCourseModal.tsx
// ============================================
import { useState } from "react";
import type { Course } from "../../types/api.types";

interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onConfirm: () => Promise<void>;
}

export default function DeleteCourseModal({
  isOpen,
  onClose,
  course,
  onConfirm,
}: DeleteCourseModalProps) {
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
            <svg
              className="w-6 h-6 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white text-xl">
              Delete Course
            </h2>
          </div>
        </div>

        <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
          Are you sure you want to delete{" "}
          <strong>
            {course.course_code} - {course.name}
          </strong>
          ? This action cannot be undone and will remove the course from all
          programs.
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 mb-4 px-4 py-3 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-300 text-sm">
            <strong>⚠️ Warning:</strong> This will also remove all
            program-course assignments for this course.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 text-sm"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 disabled:opacity-50 px-4 py-2 rounded-lg font-medium text-white text-sm"
          >
            {loading ? "Deleting..." : "Delete Course"}
          </button>
        </div>
      </div>
    </div>
  );
}