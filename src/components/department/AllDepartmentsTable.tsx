import React from "react";
import type { Department } from "../../types/api.types";

interface AllDepartmentsTableProps {
  departments: Department[];
  loading: boolean;
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
  isSuperAdmin: boolean;
}

export default function AllDepartmentsTable({
  departments,
  loading,
  onEdit,
  onDelete,
  isSuperAdmin,
}: AllDepartmentsTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-12 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
        <svg
          className="mx-auto mb-4 w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-lg">
          No Departments Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your filters or create a new department.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="divide-y divide-gray-200 dark:divide-gray-700 min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Institution
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Department Name
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-right uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {departments.map((department) => (
              <tr
                key={department.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 dark:text-white text-sm">
                    {department.institution_name || "—"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {department.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs text-gray-500 dark:text-gray-400 text-sm truncate">
                    {department.description || "—"}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                  <button
                    onClick={() => onEdit(department)}
                    className="mr-4 text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 dark:text-blue-400"
                  >
                    Edit
                  </button>
                  {isSuperAdmin && (
                    <button
                      onClick={() => onDelete(department)}
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-300 dark:text-red-400"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}