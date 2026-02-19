import React, { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { BookOpen, Download, Calendar, CheckCircle, X, Eye } from "lucide-react";

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Mock data - will be replaced with actual API calls
  const coursesData = [
    {
      id: "1",
      course_code: "CS101",
      course_name: "Introduction to Computer Science",
      section: "SEC001",
      term: "Fall 2026",
      instructor: "Dr. Jane Smith",
      schedule: "MWF 10:00-11:00 AM",
      room: "Building A - Room 101",
      credits: 3,
      grade: "A",
      attendance: { present: 28, absent: 2, total: 30 },
      materials: 5,
    },
    {
      id: "2",
      course_code: "MATH201",
      course_name: "Calculus II",
      section: "SEC002",
      term: "Fall 2026",
      instructor: "Prof. John Doe",
      schedule: "TR 2:00-3:30 PM",
      room: "Building B - Room 205",
      credits: 4,
      grade: "B+",
      attendance: { present: 26, absent: 1, total: 27 },
      materials: 8,
    },
    {
      id: "3",
      course_code: "ENG101",
      course_name: "English Composition",
      section: "SEC003",
      term: "Fall 2026",
      instructor: "Dr. Sarah Johnson",
      schedule: "MW 1:00-2:30 PM",
      room: "Building C - Room 301",
      credits: 3,
      grade: "A-",
      attendance: { present: 27, absent: 3, total: 30 },
      materials: 3,
    },
  ];

  const materialsData = {
    "1": [
      { id: "1", name: "Lecture 1 - Introduction.pdf", type: "PDF", uploadedDate: "2026-09-01" },
      { id: "2", name: "Lab Assignment 1.docx", type: "Document", uploadedDate: "2026-09-05" },
      { id: "3", name: "Quiz 1 Solutions.pdf", type: "PDF", uploadedDate: "2026-09-12" },
    ],
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 dark:text-green-400';
    if (grade.startsWith('B')) return 'text-blue-600 dark:text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-600 dark:text-yellow-400';
    if (grade.startsWith('D')) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const calculateAttendancePercentage = (present: number, total: number) => {
    return Math.round((present / total) * 100);
  };

  return (
    <div>
      <PageMeta title="My Courses" description="View your enrolled courses" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="mb-6">
            <h3 className="mb-2 font-semibold text-gray-800 text-xl sm:text-2xl dark:text-white/90">
              My Courses
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              View your enrolled courses, materials, attendance, and grades
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
            </div>
          ) : coursesData.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800/50 py-12 rounded-lg text-center">
              <BookOpen className="mx-auto mb-4 w-12 h-12 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                You are not enrolled in any courses this term.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {coursesData.map((course) => {
                const attendancePercentage = calculateAttendancePercentage(
                  course.attendance.present,
                  course.attendance.total
                );
                const isExpanded = selectedCourse === course.id;

                return (
                  <div
                    key={course.id}
                    className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    {/* Course Header */}
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors"
                      onClick={() => setSelectedCourse(isExpanded ? null : course.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
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
                                  {course.section}
                                </span>
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {course.course_name}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                  {course.instructor}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  {course.credits} credits
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Grade</div>
                            <div className={`font-bold text-lg ${getGradeColor(course.grade)}`}>
                              {course.grade}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 mt-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Schedule</div>
                          <div className="text-gray-900 dark:text-white text-sm">{course.schedule}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Room</div>
                          <div className="text-gray-900 dark:text-white text-sm">{course.room}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Attendance</div>
                          <div className="text-gray-900 dark:text-white text-sm">
                            {attendancePercentage}%
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Materials</div>
                          <div className="text-gray-900 dark:text-white text-sm">
                            {course.materials} files
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/30">
                        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                          {/* Attendance Details */}
                          <div>
                            <h5 className="flex items-center gap-2 mb-4 font-semibold text-gray-900 dark:text-white">
                              <Calendar className="w-4 h-4" />
                              Attendance Record
                            </h5>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400 text-sm">Present</span>
                                <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium text-sm">
                                  <CheckCircle className="w-4 h-4" />
                                  {course.attendance.present} days
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400 text-sm">Absent</span>
                                <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium text-sm">
                                  <X className="w-4 h-4" />
                                  {course.attendance.absent} days
                                </span>
                              </div>
                              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between mb-2 text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">Total</span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {course.attendance.total} sessions
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      attendancePercentage >= 80
                                        ? 'bg-green-600'
                                        : attendancePercentage >= 60
                                        ? 'bg-yellow-600'
                                        : 'bg-red-600'
                                    }`}
                                    style={{ width: `${attendancePercentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Course Materials */}
                          <div>
                            <h5 className="flex items-center gap-2 mb-4 font-semibold text-gray-900 dark:text-white">
                              <Download className="w-4 h-4" />
                              Course Materials
                            </h5>
                            {materialsData[course.id as keyof typeof materialsData] ? (
                              <div className="space-y-2">
                                {materialsData[course.id as keyof typeof materialsData].map((material) => (
                                  <div
                                    key={material.id}
                                    className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                                  >
                                    <div className="flex-1">
                                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                                        {material.name}
                                      </div>
                                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                                        {material.type} • Uploaded {material.uploadedDate}
                                      </div>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-2">
                                      <Download className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                                No materials available yet
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
