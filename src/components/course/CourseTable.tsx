import React from "react";
import type { Course } from "../../types/api.types";
import { BookOpen, Pencil, Trash2 } from "lucide-react";

interface CourseTableProps {
  courses: Course[];
  loading: boolean;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
  isSuperAdmin: boolean;
}

export function CourseTable({ courses, loading, onEdit, onDelete, isSuperAdmin }: CourseTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 py-12 rounded-lg text-center">
        <BookOpen className="mx-auto mb-4 w-12 h-12 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          No courses found. Create your first course to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="divide-y divide-gray-200 dark:divide-gray-700 min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Credits
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-right uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono font-medium text-gray-900 dark:text-white text-sm">
                    {course.course_code}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {course.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {course.credit_hours}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {course.description}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(course)}
                      className="p-1 text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-400 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    {isSuperAdmin && (
                      <button
                        onClick={() => onDelete(course)}
                        className="p-1 text-red-600 hover:text-red-900 dark:hover:text-red-300 dark:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-semibold text-blue-600 dark:text-blue-400 text-sm">
                    {course.course_code}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-400 text-xs">
                    {course.credit_hours} credits
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                  {course.name}
                </h3>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => onEdit(course)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50 rounded-md text-sm transition-colors"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit</span>
              </button>
              {isSuperAdmin && (
                <button
                  onClick={() => onDelete(course)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md text-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
