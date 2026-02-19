// ============================================
// AllProgramsTable.tsx

import { Program } from "../../types";

// ============================================
interface AllProgramsTableProps {
  programs: Program[];
  loading: boolean;
  onEdit: (program: Program) => void;
  onDelete: (program: Program) => void;
  isSuperAdmin: boolean;
}

export function AllProgramsTable({
  programs,
  loading,
  onEdit,
  onDelete,
  isSuperAdmin,
}: AllProgramsTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-12 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
        <svg className="mx-auto mb-4 w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-lg">No Programs Found</h3>
        <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or create a new program.</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="divide-y divide-gray-200 dark:divide-gray-700 min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">Institution</th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-right uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {programs.map((program) => (
              <tr key={program.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 dark:text-white text-sm">{program.institution_name || "—"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 dark:text-white text-sm">{program.department_name || "—"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">{program.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full font-medium text-blue-800 dark:text-blue-300 text-xs">
                    {program.program_level}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                  <button onClick={() => onEdit(program)} className="mr-4 text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 dark:text-blue-400">
                    Edit
                  </button>
                  {isSuperAdmin && (
                    <button onClick={() => onDelete(program)} className="text-red-600 hover:text-red-900 dark:hover:text-red-300 dark:text-red-400">
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