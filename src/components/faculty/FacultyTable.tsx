import type { Faculty } from "../../types/api.types";
import { useNavigate } from "react-router";
import { Building2, Pencil, Trash2 } from "lucide-react";

interface FacultyTableProps {
  faculties: Faculty[];
  loading: boolean;
  onEdit: (faculty: Faculty) => void;
  onDelete: (faculty: Faculty) => void;
  isSuperAdmin: boolean;
  institutionId: string;
}

export default function FacultyTable({
  faculties,
  loading,
  onEdit,
  onDelete,
  isSuperAdmin,
  institutionId,
}: FacultyTableProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (faculties.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 py-12 rounded-lg text-center">
        <Building2 className="mx-auto mb-4 w-12 h-12 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          No faculties found. Create your first faculty to get started.
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
                Name
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-right uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
            {faculties.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {faculty.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {faculty.description}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">
                  {new Date(faculty.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => navigate(`/institutions/${institutionId}/departments`)}
                      className="p-1 text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 dark:text-blue-400 transition-colors"
                      title="View Departments"
                    >
                      <Building2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEdit(faculty)}
                      className="p-1 text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-400 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    {isSuperAdmin && (
                      <button
                        onClick={() => onDelete(faculty)}
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
        {faculties.map((faculty) => (
          <div
            key={faculty.id}
            className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
          >
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">
                {faculty.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {faculty.description}
              </p>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Created: {new Date(faculty.created_at).toLocaleDateString()}
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => navigate(`/institutions/${institutionId}/departments`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-md text-sm transition-colors"
              >
                <Building2 className="w-4 h-4" />
                <span>Departments</span>
              </button>
              <button
                onClick={() => onEdit(faculty)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50 rounded-md text-sm transition-colors"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit</span>
              </button>
              {isSuperAdmin && (
                <button
                  onClick={() => onDelete(faculty)}
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
