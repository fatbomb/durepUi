// ProgramCourseTable.tsx
import type { ProgramCourse, Course } from "../../types/api.types";

interface ProgramCourseTableProps {
  programCourses: ProgramCourse[];
  courses: Course[];
  loading: boolean;
  onRemove: (pc: ProgramCourse) => void;
  isSuperAdmin: boolean;
}

export function ProgramCourseTable({ programCourses, courses, loading, onRemove, isSuperAdmin }: ProgramCourseTableProps) {
  if (loading) {
    return <div className="flex justify-center items-center py-12"><div className="border-4 rounded-full w-12 h-12 animate-spin"></div></div>;
  }

  if (programCourses.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-12 border rounded-lg text-center">
        <h3 className="mb-2 font-semibold text-lg">No Courses Assigned</h3>
        <p className="text-gray-500">Add courses to this program to get started.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="divide-y min-w-full">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="px-6 py-3 font-medium text-xs text-left uppercase">Course Code</th>
            <th className="px-6 py-3 font-medium text-xs text-left uppercase">Course Name</th>
            <th className="px-6 py-3 font-medium text-xs text-left uppercase">Credit Hours</th>
            <th className="px-6 py-3 font-medium text-xs text-right uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y">
          {programCourses.map((pc) => {
            const course = courses.find((c) => c.id === pc.course_id);
            return (
              <tr key={pc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 whitespace-nowrap"><span className="font-mono text-sm">{course?.course_code || "—"}</span></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="font-medium text-sm">{course?.name || "—"}</div></td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm">{course?.credit_hours || "—"}</span></td>
                <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                  {isSuperAdmin && <button onClick={() => onRemove(pc)} className="text-red-600 hover:text-red-900">Remove</button>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
