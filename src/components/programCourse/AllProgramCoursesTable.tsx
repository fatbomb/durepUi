import type { Course, Program, ProgramCourse, Department } from "../../types/api.types";

interface AllProgramCoursesTableProps {
  programCourses: ProgramCourse[];
  programs: Program[];
  departments: Department[];
  courses: Course[];
  loading: boolean;
  onEdit: (program: Program) => void;
  isSuperAdmin: boolean;
}

export function AllProgramCoursesTable({ 
  programCourses, 
  programs, 
  departments,
  courses, 
  loading, 
  onEdit,
  isSuperAdmin 
}: AllProgramCoursesTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-4 border-blue-500 border-gray-200 border-t-4 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  // Group program courses by program
  const groupedByProgram = programs.reduce((acc, program) => {
    const programCoursesForProgram = programCourses.filter(
      (pc) => pc.program_id === program.id
    );
    
    if (programCoursesForProgram.length > 0) {
      acc[program.id] = {
        program,
        courses: programCoursesForProgram
          .map((pc) => courses.find((c) => c.id === pc.course_id))
          .filter(Boolean) as Course[],
      };
    }
    
    return acc;
  }, {} as Record<string, { program: Program; courses: Course[] }>);

  const programsWithCourses = Object.values(groupedByProgram);

  if (programsWithCourses.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-12 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
        <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-lg">
          No Program Courses Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Try adjusting your filters or add courses to programs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {programsWithCourses.map(({ program, courses: programCourses }) => {
        const department = departments.find((d) => d.id === program.department_id);
        
        return (
          <div
            key={program.id}
            className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            {/* Program Header */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-3 bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-transparent px-4 sm:px-6 py-4 border-gray-200 dark:border-gray-700 border-b">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                  {program.title}
                </h3>
                <div className="flex sm:flex-row flex-col sm:items-center gap-1 sm:gap-2 mt-1">
                  <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md w-fit font-medium text-blue-800 dark:text-blue-300 text-xs">
                    {department?.name || "Unknown Department"}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md w-fit font-medium text-gray-700 dark:text-gray-300 text-xs">
                    {program.institution_name || "Unknown Institution"}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-xs">
                    {programCourses.length} course{programCourses.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              {isSuperAdmin && (
                <button
                  onClick={() => onEdit(program)}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors"
                >
                  Manage Courses
                </button>
              )}
            </div>

            {/* Courses List */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {programCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 sm:gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-4 sm:px-6 py-3 transition-colors"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono font-semibold text-gray-700 dark:text-gray-300 text-xs">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex sm:flex-row flex-col sm:items-center gap-1 sm:gap-2">
                        <span className="font-mono font-semibold text-gray-900 dark:text-white text-sm">
                          {course.course_code}
                        </span>
                        <span className="hidden sm:inline text-gray-400">•</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300 text-sm truncate">
                          {course.name}
                        </span>
                      </div>
                      {course.description && (
                        <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs line-clamp-1">
                          {course.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded font-medium text-green-800 dark:text-green-300 text-xs whitespace-nowrap">
                      {course.credit_hours} Credits
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}