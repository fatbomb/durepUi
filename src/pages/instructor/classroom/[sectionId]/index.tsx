import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageMeta from "../../../../components/common/PageMeta";
import { BookOpen, Users, FileText, Calendar, TrendingUp, Upload } from "lucide-react";

export default function ClassroomPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [activeTab, setActiveTab] = useState<'students' | 'materials' | 'attendance' | 'grades'>('students');

  // Mock data for the classroom
  const classroomData = {
    course_code: "CS101",
    course_name: "Introduction to Computer Science",
    section_number: "SEC001",
    term: "Fall 2026",
    schedule: "MWF 10:00-11:00 AM",
    room: "Building A - Room 101",
    enrolled_students: 28,
    capacity: 30,
  };

  const students = [
    {
      id: "1",
      student_id: "ST2024001",
      name: "John Doe",
      email: "john.doe@university.edu",
      attendance_rate: 95,
      grade: "A",
    },
    {
      id: "2",
      student_id: "ST2024002",
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      attendance_rate: 88,
      grade: "B+",
    },
    {
      id: "3",
      student_id: "ST2024003",
      name: "Bob Johnson",
      email: "bob.johnson@university.edu",
      attendance_rate: 92,
      grade: "A-",
    },
  ];

  const materials = [
    {
      id: "1",
      title: "Lecture 1 - Introduction to Programming",
      type: "PDF",
      size: "2.5 MB",
      uploadedDate: "2026-09-01",
      downloads: 28,
    },
    {
      id: "2",
      title: "Lab Assignment 1",
      type: "Document",
      size: "1.2 MB",
      uploadedDate: "2026-09-05",
      downloads: 25,
    },
    {
      id: "3",
      title: "Midterm Study Guide",
      type: "PDF",
      size: "3.8 MB",
      uploadedDate: "2026-10-15",
      downloads: 27,
    },
  ];

  const attendanceDates = [
    { date: "2026-09-01", present: 27, absent: 1, late: 0 },
    { date: "2026-09-03", present: 28, absent: 0, late: 0 },
    { date: "2026-09-05", present: 26, absent: 2, late: 0 },
  ];

  const tabs = [
    { id: 'students', label: 'Students', icon: Users },
    { id: 'materials', label: 'Materials', icon: FileText },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'grades', label: 'Grades', icon: TrendingUp },
  ];

  return (
    <div>
      <PageMeta title={`Classroom - ${classroomData.course_code}`} description="Manage your classroom" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {classroomData.course_code}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Section {classroomData.section_number}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-xl mb-2">
                  {classroomData.course_name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full font-medium text-blue-800 dark:text-blue-300 text-xs">
                    {classroomData.term}
                  </span>
                  <span>•</span>
                  <span>{classroomData.schedule}</span>
                  <span>•</span>
                  <span>📍 {classroomData.room}</span>
                  <span>•</span>
                  <span>{classroomData.enrolled_students}/{classroomData.capacity} students</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                    Enrolled Students ({students.length})
                  </h4>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="divide-y divide-gray-200 dark:divide-gray-700 min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                      <tr>
                        <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                          Student ID
                        </th>
                        <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                          Attendance
                        </th>
                        <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs text-left uppercase tracking-wider">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-mono font-medium text-gray-900 dark:text-white text-sm">
                              {student.student_id}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {student.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-600 dark:text-gray-400 text-sm">
                              {student.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`font-medium text-sm ${
                              student.attendance_rate >= 90
                                ? 'text-green-600 dark:text-green-400'
                                : student.attendance_rate >= 75
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              {student.attendance_rate}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                              {student.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="font-mono text-blue-600 dark:text-blue-400 text-xs mb-1">
                        {student.student_id}
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {student.name}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {student.email}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 text-xs">Attendance: </span>
                          <span className={`font-medium text-sm ${
                            student.attendance_rate >= 90
                              ? 'text-green-600 dark:text-green-400'
                              : student.attendance_rate >= 75
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {student.attendance_rate}%
                          </span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          Grade: {student.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                    Course Materials ({materials.length})
                  </h4>
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors w-full sm:w-auto">
                    <Upload className="w-4 h-4" />
                    <span>Upload Material</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {materials.map((material) => (
                    <div
                      key={material.id}
                      className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              {material.title}
                            </h5>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>{material.type}</span>
                              <span>•</span>
                              <span>{material.size}</span>
                              <span>•</span>
                              <span>Uploaded {material.uploadedDate}</span>
                              <span>•</span>
                              <span>{material.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                    Attendance Records
                  </h4>
                  <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors w-full sm:w-auto">
                    Mark Attendance
                  </button>
                </div>

                <div className="space-y-3">
                  {attendanceDates.map((record, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 rounded-lg"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white mb-1">
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-green-600 dark:text-green-400 font-semibold">
                              {record.present}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">Present</div>
                          </div>
                          <div className="text-center">
                            <div className="text-red-600 dark:text-red-400 font-semibold">
                              {record.absent}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">Absent</div>
                          </div>
                          <div className="text-center">
                            <div className="text-yellow-600 dark:text-yellow-400 font-semibold">
                              {record.late}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">Late</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grades Tab */}
            {activeTab === 'grades' && (
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-6">
                  Student Grades
                </h4>

                <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {student.name}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm">
                            {student.student_id}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <select
                            defaultValue={student.grade}
                            className="dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                          >
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-6 py-2 rounded-lg font-medium text-white text-sm transition-colors">
                      Save Grades
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
