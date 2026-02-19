import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../hooks/useCourses";
import { CourseTable } from "../../components/course/CourseTable";
import { CreateCourseModal } from "../../components/course/CreateCourseModal";
import EditCourseModal from "../../components/course/EditCourseModal";
import DeleteCourseModal from "../../components/course/DeleteCourseModal";
import AccessDenied from "../../components/common/AcessDenied";
import type { Course } from "../../types/api.types";
import { Plus, Search } from "lucide-react";

export default function CoursesPage() {
  const { isAdmin, isSuperAdmin } = useAuth();
  const { courses, loading, error, createCourse, updateCourse, deleteCourse } = useCourses();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Access control - only admin and super admin can manage courses
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  const handleCreateCourse = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteModalOpen(true);
  };

  // Filter courses based on search query
  const filteredCourses = searchQuery
    ? courses.filter(
        (course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.course_code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courses;

  return (
    <div>
      <PageMeta title="Course Management" description="Manage courses" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800 text-xl sm:text-2xl dark:text-white/90">
                Course Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage all courses in the system
              </p>
            </div>
            <button
              onClick={handleCreateCourse}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>

          {/* Search Filter */}
          <div className="mb-6">
            <label
              htmlFor="search-filter"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Search by Name or Code
            </label>
            <div className="relative">
              <input
                type="text"
                id="search-filter"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="dark:bg-gray-800 px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              />
              <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <CourseTable
            courses={filteredCourses}
            loading={loading}
            onEdit={handleEditCourse}
            onDelete={handleDeleteCourse}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createCourse}
      />

      {selectedCourse && (
        <>
          <EditCourseModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedCourse(null);
            }}
            course={selectedCourse}
            onSubmit={(data) => updateCourse(selectedCourse.id, data)}
          />

          <DeleteCourseModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedCourse(null);
            }}
            course={selectedCourse}
            onConfirm={async () => {
              const success = await deleteCourse(selectedCourse.id);
              if (success) {
                setIsDeleteModalOpen(false);
                setSelectedCourse(null);
              }
            }}
          />
        </>
      )}
    </div>
  );
}