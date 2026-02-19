// ============================================
// EditCourseModal.tsx
// ============================================
import React, { useState, useEffect } from "react";
import type { Course, UpdateCoursePayload } from "../../types/api.types";

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onSubmit: (data: UpdateCoursePayload) => Promise<Course | null>;
}

export default function EditCourseModal({
  isOpen,
  onClose,
  course,
  onSubmit,
}: EditCourseModalProps) {
  const [formData, setFormData] = useState<UpdateCoursePayload>({
    name: course.name,
    course_code: course.course_code,
    description: course.description,
    credit_hours: course.credit_hours,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: course.name,
        course_code: course.course_code,
        description: course.description,
        credit_hours: course.credit_hours,
      });
    }
  }, [isOpen, course]);

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
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl mx-4 p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white text-xl">
          Edit Course
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="course_code"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Course Code *
              </label>
              <input
                type="text"
                id="course_code"
                value={formData.course_code}
                onChange={(e) =>
                  setFormData({ ...formData, course_code: e.target.value })
                }
                required
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full font-mono dark:text-white text-sm"
                placeholder="e.g., CS101"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Course Name *
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
                placeholder="e.g., Introduction to Programming"
              />
            </div>

            <div>
              <label
                htmlFor="credit_hours"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Credit Hours *
              </label>
              <input
                type="number"
                id="credit_hours"
                min="1"
                max="12"
                value={formData.credit_hours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    credit_hours: parseInt(e.target.value),
                  })
                }
                required
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white"
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
                placeholder="Enter course description"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
