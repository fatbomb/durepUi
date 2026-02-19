import React from "react";
import type { CourseSection } from "../../types/api.types";
import { Eye, Edit, Trash2, BookOpen, Users, UserPlus } from "lucide-react";

interface SectionTableProps {
  sections: CourseSection[];
  loading: boolean;
  onView?: (section: CourseSection) => void;
  onEdit?: (section: CourseSection) => void;
  onDelete: (section: CourseSection) => void;
  onAssignInstructor?: (section: CourseSection) => void;
  isSuperAdmin: boolean;
  isAdmin?: boolean;
}

export default function SectionTable({
  sections,
  loading,
  onView,
  onEdit,
  onDelete,
  onAssignInstructor,
  isSuperAdmin,
  isAdmin = false,
}: SectionTableProps) {
  const canManage = isSuperAdmin || isAdmin;
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 py-12 rounded-lg text-center">
        <BookOpen className="mx-auto mb-4 w-12 h-12 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          No course sections found. Create your first section to get started.
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'closed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'cancelled':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getEnrollmentColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 100) return 'text-red-600 dark:text-red-400';
    if (percentage >= 80) return 'text-orange-600 dark:text-orange-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="divide-y divide-gray-200 dark:divide-gray-700 min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Section
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Term
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Schedule
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Enrollment
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-right uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
            {sections.map((section) => (
              <tr key={section.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {section.course_code || 'N/A'}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    {section.course_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono font-medium text-gray-900 dark:text-white text-sm">
                    {section.section_number}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full font-medium text-blue-800 dark:text-blue-300 text-xs">
                    {section.term_name || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 dark:text-white text-sm">
                    {section.schedule || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 dark:text-white text-sm">
                    {section.room || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className={`font-medium text-sm ${getEnrollmentColor(section.enrolled_count, section.capacity)}`}>
                      {section.enrolled_count}/{section.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                    <div
                      className={`h-1.5 rounded-full ${
                        (section.enrolled_count / section.capacity) * 100 >= 100
                          ? 'bg-red-600'
                          : (section.enrolled_count / section.capacity) * 100 >= 80
                          ? 'bg-orange-600'
                          : 'bg-green-600'
                      }`}
                      style={{
                        width: `${Math.min((section.enrolled_count / section.capacity) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium text-xs capitalize ${getStatusColor(section.status)}`}>
                    {section.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    {onAssignInstructor && canManage && (
                      <button
                        onClick={() => onAssignInstructor(section)}
                        className="p-1 text-purple-600 hover:text-purple-900 dark:hover:text-purple-300 dark:text-purple-400 transition-colors"
                        title="Assign Instructor"
                      >
                        <UserPlus className="w-5 h-5" />
                      </button>
                    )}
                    {onView && (
                      <button
                        onClick={() => onView(section)}
                        className="p-1 text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 dark:text-blue-400 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    )}
                    {onEdit && canManage && (
                      <button
                        onClick={() => onEdit(section)}
                        className="p-1 text-green-600 hover:text-green-900 dark:hover:text-green-300 dark:text-green-400 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    )}
                    {canManage && (
                      <button
                        onClick={() => onDelete(section)}
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
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="font-medium text-blue-600 dark:text-blue-400 text-xs mb-1">
                  {section.course_code} - Section {section.section_number}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                  {section.course_name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {section.term_name}
                </p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium text-xs capitalize ${getStatusColor(section.status)}`}>
                {section.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              {section.schedule && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Schedule:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{section.schedule}</span>
                </div>
              )}
              {section.room && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Room:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{section.room}</span>
                </div>
              )}
              <div>
                <span className="text-gray-500 dark:text-gray-400">Enrollment:</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`font-medium ${getEnrollmentColor(section.enrolled_count, section.capacity)}`}>
                    {section.enrolled_count}/{section.capacity}
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        (section.enrolled_count / section.capacity) * 100 >= 100
                          ? 'bg-red-600'
                          : (section.enrolled_count / section.capacity) * 100 >= 80
                          ? 'bg-orange-600'
                          : 'bg-green-600'
                      }`}
                      style={{
                        width: `${Math.min((section.enrolled_count / section.capacity) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              {onAssignInstructor && canManage && (
                <button
                  onClick={() => onAssignInstructor(section)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 rounded-md text-sm transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Assign Instructor</span>
                </button>
              )}
              {onView && (
                <button
                  onClick={() => onView(section)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-md text-sm transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
              )}
              {onEdit && canManage && (
                <button
                  onClick={() => onEdit(section)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 rounded-md text-sm transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              {canManage && (
                <button
                  onClick={() => onDelete(section)}
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
