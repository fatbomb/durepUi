import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { BookOpen, Users, FileText, Calendar, Eye, TrendingUp } from "lucide-react";

export default function InstructorCoursesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Mock data - will be replaced with actual API calls based on instructor ID
  const instructorCourses = [
    {
      id: "1",
      course_code: "CS101",
      course_name: "Introduction to Computer Science",
      section_number: "SEC001",
      term: "Fall 2026",
      enrolled_students: 28,
      capacity: 30,
      schedule: "MWF 10:00-11:00 AM",
      room: "Building A - Room 101",
      materials_count: 12,
      avg_attendance: 93,
      assignments_pending: 5,
    },
    {
      id: "2",
      course_code: "CS301",
      course_name: "Data Structures and Algorithms",
      section_number: "SEC002",
      term: "Fall 2026",
      enrolled_students: 25,
      capacity: 30,
      schedule: "TR 2:00-3:30 PM",
      room: "Building A - Room 203",
      materials_count: 15,
      avg_attendance: 88,
      assignments_pending: 3,
    },
    {
      id: "3",
      course_code: "CS401",
      course_name: "Advanced Web Development",
      section_number: "SEC001",
      term: "Fall 2026",
      enrolled_students: 20,
      capacity: 25,
      schedule: "MW 3:00-4:30 PM",
      room: "Building B - Room 105",
      materials_count: 10,
      avg_attendance: 95,
      assignments_pending: 2,
    },
  ];

  const handleViewClassroom = (courseId: string) => {
    navigate(`/instructor/classroom/${courseId}`);
  };

  const getEnrollmentColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'text-orange-600 dark:text-orange-400';
    if (percentage >= 70) return 'text-blue-600 dark:text-blue-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div>
      <PageMeta title="My Courses" description="Manage your teaching courses" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h3 className="mb-2 font-semibold text-gray-800 text-2xl sm:text-3xl dark:text-white/90">
              My Teaching Courses
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Manage your courses, students, and materials
            </p>
          </div>

          {/* Summary Stats */}
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Active Courses</div>
              <div className="font-bold text-gray-900 text-2xl dark:text-white">
                {instructorCourses.length}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Total Students</div>
              <div className="font-bold text-gray-900 text-2xl dark:text-white">
                {instructorCourses.reduce((sum, course) => sum + course.enrolled_students, 0)}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Materials Uploaded</div>
              <div className="font-bold text-gray-900 text-2xl dark:text-white">
                {instructorCourses.reduce((sum, course) => sum + course.materials_count, 0)}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Avg Attendance</div>
              <div className="font-bold text-gray-900 text-2xl dark:text-white">
                {Math.round(instructorCourses.reduce((sum, course) => sum + course.avg_attendance, 0) / instructorCourses.length)}%
              </div>
            </div>
          </div>

          {/* Courses List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {instructorCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Course Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-blue-600 dark:text-blue-400 text-sm">
                              {course.course_code}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                              Section {course.section_number}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                            {course.course_name}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full font-medium text-blue-800 dark:text-blue-300 text-xs">
                              {course.term}
                            </span>
                            <span>•</span>
                            <span>{course.schedule}</span>
                            <span>•</span>
                            <span>📍 {course.room}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="gap-3 grid grid-cols-2 sm:grid-cols-4 mt-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500 dark:text-gray-400 text-xs">Enrollment</span>
                          </div>
                          <div className={`font-semibold text-sm ${getEnrollmentColor(course.enrolled_students, course.capacity)}`}>
                            {course.enrolled_students}/{course.capacity}
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500 dark:text-gray-400 text-xs">Attendance</span>
                          </div>
                          <div className={`font-semibold text-sm ${getAttendanceColor(course.avg_attendance)}`}>
                            {course.avg_attendance}%
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500 dark:text-gray-400 text-xs">Materials</span>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            {course.materials_count} files
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500 dark:text-gray-400 text-xs">Pending</span>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            {course.assignments_pending} tasks
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => handleViewClassroom(course.id)}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors flex-1 lg:flex-initial"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Classroom</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
