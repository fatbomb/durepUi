import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { useProgramCourses } from "../../hooks/useProgramCourses";
import { useCourses } from "../../hooks/useCourses";
import { ProgramCourseTable } from "../../components/programCourse/ProgramCourseTable";
import { AddCourseToProgramModal } from "../../components/programCourse/AddCourseToProgramModal";
import { RemoveCourseFromProgramModal } from "../../components/programCourse/RemoveCourseFromProgramModal";
import AccessDenied from "../../components/common/AcessDenied";
import type { ProgramCourse } from "../../types/api.types";

export default function ProgramCoursesPage() {
  const navigate = useNavigate();
  const { programId } = useParams<{ programId: string }>();
  const { isAdmin, isSuperAdmin } = useAuth();
  
  const { programCourses, loading, error, createProgramCourse, deleteProgramCourse } = useProgramCourses(
    { program_id: programId || "" },
    !!programId
  );
  
  const { courses, loading: coursesLoading } = useCourses();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedProgramCourse, setSelectedProgramCourse] = useState<ProgramCourse | null>(null);

  // Access control - only admin and super admin can manage program courses
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  const handleAddCourse = () => {
    setIsAddModalOpen(true);
  };

  const handleRemoveCourse = (programCourse: ProgramCourse) => {
    setSelectedProgramCourse(programCourse);
    setIsRemoveModalOpen(true);
  };

  const handleBackToPrograms = () => {
    navigate("/programs");
  };

  // Get courses that are not already in the program
  const availableCourses = courses.filter(
    (course) => !programCourses.some((pc) => pc.course_id === course.id)
  );

  return (
    <div>
      <PageMeta title="Program Courses" description="Manage courses in program" />

      <div className="bg-white dark:bg-white/[0.03] px-5 xl:px-10 py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <button
                onClick={handleBackToPrograms}
                className="flex items-center mb-3 text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400 text-sm"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Programs
              </button>
              <h3 className="mb-2 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                Program Courses
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage courses assigned to this program
              </p>
            </div>
            <button
              onClick={handleAddCourse}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm"
              disabled={availableCourses.length === 0}
            >
              + Add Course to Program
            </button>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {availableCourses.length === 0 && !loading && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 mb-4 px-4 py-3 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-700 dark:text-yellow-400 text-sm">
              All available courses have been added to this program.
            </div>
          )}

          <ProgramCourseTable
            programCourses={programCourses}
            courses={courses}
            loading={loading || coursesLoading}
            onRemove={handleRemoveCourse}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <AddCourseToProgramModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        programId={programId || ""}
        availableCourses={availableCourses}
        onSubmit={async (courseId) => {
          if (programId) {
            const result = await createProgramCourse({
              program_id: programId,
              course_id: courseId,
            });
            if (result) {
              setIsAddModalOpen(false);
            }
          }
        }}
      />

      {selectedProgramCourse && (
        <RemoveCourseFromProgramModal
          isOpen={isRemoveModalOpen}
          onClose={() => {
            setIsRemoveModalOpen(false);
            setSelectedProgramCourse(null);
          }}
          programCourse={selectedProgramCourse}
          courses={courses}
          onConfirm={async () => {
            const success = await deleteProgramCourse(selectedProgramCourse.id);
            if (success) {
              setIsRemoveModalOpen(false);
              setSelectedProgramCourse(null);
            }
          }}
        />
      )}
    </div>
  );
}