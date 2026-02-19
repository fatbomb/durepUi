// components/users/RoleTable.tsx
import type { UserRole } from "../../types/api.types";

interface RoleTableProps {
  roles: UserRole[];
  loading: boolean;
  onEdit: (role: UserRole) => void;
  onDelete: (role: UserRole) => void;
  isSuperAdmin: boolean;
}

export default function RoleTable({
  roles,
  loading,
  onEdit,
  onDelete,
  isSuperAdmin,
}: RoleTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900/20 py-12 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
        <p className="text-gray-600 dark:text-gray-400">No roles assigned</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="divide-y divide-gray-200 dark:divide-gray-700 min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">
                S/L
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">
                Assigned Date
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-white/[0.02] divide-y divide-gray-200 dark:divide-gray-700">
            {roles.map((role, index) => (
              <tr
                key={role.id}
                className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
              >
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100 text-sm whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 text-sm whitespace-nowrap">
                  <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full font-semibold text-blue-800 dark:text-blue-400 text-xs">
                    {role.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">
                  {formatDate(role.created_at)}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">
                  {formatDate(role.updated_at)}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(role)}
                      className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 dark:text-blue-400"
                      title="Edit Role"
                    >
                      Edit
                    </button>
                    {isSuperAdmin && (
                      <button
                        onClick={() => onDelete(role)}
                        className="text-red-600 hover:text-red-900 dark:hover:text-red-300 dark:text-red-400"
                        title="Delete Role"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
