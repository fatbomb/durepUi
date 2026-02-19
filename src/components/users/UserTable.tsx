import React from "react";
import type { User } from "../../types/api.types";
import { Shield, Pencil, Trash2, Users } from "lucide-react";

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onViewRoles: (user: User) => void;
  isSuperAdmin: boolean;
}

export default function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
  onViewRoles,
  isSuperAdmin,
}: UserTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 py-12 rounded-lg text-center">
        <Users className="mx-auto mb-4 w-12 h-12 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          No users found. Create your first user to get started.
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
                S/N
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Email
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
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onViewRoles(user)}
                      className="p-1 text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-300 dark:text-indigo-400 transition-colors"
                      title="View Roles"
                    >
                      <Shield className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="p-1 text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-400 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    {isSuperAdmin && (
                      <button
                        onClick={() => onDelete(user)}
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
        {users.map((user, index) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  User #{index + 1}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                  {user.email}
                </h3>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Created: {new Date(user.created_at).toLocaleDateString()}
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => onViewRoles(user)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md text-sm transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Roles</span>
              </button>
              <button
                onClick={() => onEdit(user)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50 rounded-md text-sm transition-colors"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit</span>
              </button>
              {isSuperAdmin && (
                <button
                  onClick={() => onDelete(user)}
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
