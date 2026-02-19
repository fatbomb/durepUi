import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { GraduationCap, BookOpen, Award, TrendingUp, Calendar, Clock } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
 

  // Mock data - will be replaced with actual API calls
  const dashboardData = {
    student: {
      name: "John Doe",
      student_id: "ST2024001",
      email: user?.email || "student@university.edu",
    },
    gpa: 3.75,
    totalCredits: 45,
    currentTermCredits: 15,
    enrolledPrograms: 1,
    currentCourses: 5,
    upcomingClasses: [
      {
        id: "1",
        course_code: "CS101",
        course_name: "Introduction to Computer Science",
        time: "10:00 AM",
        room: "Building A - Room 101",
      },
      {
        id: "2",
        course_code: "MATH201",
        course_name: "Calculus II",
        time: "2:00 PM",
        room: "Building B - Room 205",
      },
    ],
  };

  return (
    <div>
      <PageMeta title="Student Dashboard" description="Student portal dashboard" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          {/* Welcome Section */}
          <div className="mb-8">
            <h3 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-2xl sm:text-3xl">
              Welcome back, {dashboardData.student.name}!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Student ID: {dashboardData.student.student_id}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Current GPA</div>
              <div className="font-bold text-gray-900 dark:text-white text-2xl">
                {dashboardData.gpa.toFixed(2)}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Total Credits</div>
              <div className="font-bold text-gray-900 dark:text-white text-2xl">
                {dashboardData.totalCredits}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Current Courses</div>
              <div className="font-bold text-gray-900 dark:text-white text-2xl">
                {dashboardData.currentCourses}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Programs</div>
              <div className="font-bold text-gray-900 dark:text-white text-2xl">
                {dashboardData.enrolledPrograms}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
            {/* Today's Classes */}
            <div className="bg-white dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                  Today's Classes
                </h4>
              </div>
              <div className="space-y-3">
                {dashboardData.upcomingClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="bg-gray-50 dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {classItem.course_code}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">
                          {classItem.course_name}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs">
                        <Clock className="w-3 h-3" />
                        {classItem.time}
                      </div>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      📍 {classItem.room}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                Quick Links
              </h4>
              <div className="gap-3 grid grid-cols-2">
                <a
                  href="/student/my-courses"
                  className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 p-4 rounded-lg text-center transition-colors"
                >
                  <BookOpen className="mx-auto mb-2 w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    My Courses
                  </div>
                </a>
                <a
                  href="/student/my-programs"
                  className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 p-4 rounded-lg text-center transition-colors"
                >
                  <GraduationCap className="mx-auto mb-2 w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    My Programs
                  </div>
                </a>
                <a
                  href="/course-registration"
                  className="bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 p-4 rounded-lg text-center transition-colors"
                >
                  <Calendar className="mx-auto mb-2 w-8 h-8 text-green-600 dark:text-green-400" />
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    Register
                  </div>
                </a>
                <a
                  href="/academic-terms"
                  className="bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 p-4 rounded-lg text-center transition-colors"
                >
                  <Award className="mx-auto mb-2 w-8 h-8 text-orange-600 dark:text-orange-400" />
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    Grades
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white dark:bg-gray-800/50 mt-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">
              Academic Progress
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Credit Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {dashboardData.totalCredits} / 120 credits
                  </span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-full h-3">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 rounded-full h-3 transition-all"
                    style={{ width: `${(dashboardData.totalCredits / 120) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 pt-4 border-gray-200 dark:border-gray-700 border-t">
                <div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">Current Term</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {dashboardData.currentTermCredits} credits
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">Completed</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {dashboardData.totalCredits} credits
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">Remaining</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {120 - dashboardData.totalCredits} credits
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
