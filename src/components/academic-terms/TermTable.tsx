import type { AcademicTerm } from "../../types/api.types";
import { Eye, Edit, Trash2, Calendar } from "lucide-react";

interface TermTableProps {
  terms: AcademicTerm[];
  loading: boolean;
  onView?: (term: AcademicTerm) => void;
  onEdit?: (term: AcademicTerm) => void;
  onDelete: (term: AcademicTerm) => void;
  isSuperAdmin: boolean;
}

export default function TermTable({
  terms,
  loading,
  onView,
  onEdit,
  onDelete,
  isSuperAdmin,
}: TermTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (terms.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 py-12 rounded-lg text-center">
        <Calendar className="mx-auto mb-4 w-12 h-12 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          No academic terms found. Create your first term to get started.
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'upcoming':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'completed':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getTermTypeColor = (termType: string) => {
    switch (termType) {
      case 'fall':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      case 'spring':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300';
      case 'summer':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="divide-y divide-gray-200 dark:divide-gray-700 min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Term Name
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Term Period
              </th>
              <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                Registration Period
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
            {terms.map((term) => (
              <tr key={term.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {term.name}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    {term.year}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium text-xs capitalize ${getTermTypeColor(term.term_type)}`}>
                    {term.term_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 dark:text-white text-sm">
                    {formatDate(term.start_date)}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    to {formatDate(term.end_date)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 dark:text-white text-sm">
                    {formatDate(term.registration_start_date)}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    to {formatDate(term.registration_end_date)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium text-xs capitalize ${getStatusColor(term.status)}`}>
                    {term.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    {onView && (
                      <button
                        onClick={() => onView(term)}
                        className="p-1 text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 dark:text-blue-400 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    )}
                    {onEdit && isSuperAdmin && (
                      <button
                        onClick={() => onEdit(term)}
                        className="p-1 text-green-600 hover:text-green-900 dark:hover:text-green-300 dark:text-green-400 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    )}
                    {isSuperAdmin && (
                      <button
                        onClick={() => onDelete(term)}
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
        {terms.map((term) => (
          <div
            key={term.id}
            className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                  {term.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {term.year}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium text-xs capitalize ${getStatusColor(term.status)}`}>
                  {term.status}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium text-xs capitalize ${getTermTypeColor(term.term_type)}`}>
                  {term.term_type}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Term Period:</span>
                <div className="text-gray-900 dark:text-white">
                  {formatDate(term.start_date)} - {formatDate(term.end_date)}
                </div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Registration:</span>
                <div className="text-gray-900 dark:text-white">
                  {formatDate(term.registration_start_date)} - {formatDate(term.registration_end_date)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              {onView && (
                <button
                  onClick={() => onView(term)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-md text-sm transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
              )}
              {onEdit && isSuperAdmin && (
                <button
                  onClick={() => onEdit(term)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 rounded-md text-sm transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              {isSuperAdmin && (
                <button
                  onClick={() => onDelete(term)}
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
