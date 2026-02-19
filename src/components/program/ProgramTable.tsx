import type { Program } from "../../types/api.types";
import { useNavigate } from "react-router";
import { BookOpen, Pencil, Trash2 } from "lucide-react";

interface ProgramTableProps {
  programs: Program[];
  loading: boolean;
  onEdit: (program: Program) => void;
  onDelete: (program: Program) => void;
  isSuperAdmin: boolean;
}

export function ProgramTable({
  programs,
  loading,
  onEdit,
  onDelete,
  isSuperAdmin,
}: ProgramTableProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 py-12 rounded-lg text-center">
        <BookOpen className="mx-auto mb-4 w-12 h-12 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          No programs found. Create your first program to get started.
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
                Title
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Level
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
            {programs.map((program) => (
              <tr key={program.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {program.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full font-medium text-blue-800 dark:text-blue-300 text-xs">
                    {program.program_level}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {program.description}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => navigate(`/programs/${program.id}/courses`)}
                      className="p-1 text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 dark:text-blue-400 transition-colors"
                      title="View Courses"
                    >
                      <BookOpen className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEdit(program)}
                      className="p-1 text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-400 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    {isSuperAdmin && (
                      <button
                        onClick={() => onDelete(program)}
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
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">
                  {program.title}
                </h3>
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full font-medium text-blue-800 dark:text-blue-300 text-xs">
                  {program.program_level}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {program.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => navigate(`/programs/${program.id}/courses`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-md text-sm transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Courses</span>
              </button>
              <button
                onClick={() => onEdit(program)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50 rounded-md text-sm transition-colors"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit</span>
              </button>
              {isSuperAdmin && (
                <button
                  onClick={() => onDelete(program)}
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
