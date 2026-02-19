import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { GraduationCap, Calendar, TrendingUp, CheckCircle } from "lucide-react";

export default function MyProgramsPage() {
  const [loading] = useState(false);

  // Mock data - will be replaced with actual API calls
  const programsData = [
    {
      id: "1",
      program_name: "Bachelor of Science in Computer Science",
      program_level: "Undergraduate",
      department: "Computer Science",
      enrollment_date: "2022-09-01",
      expected_graduation_date: "2026-06-15",
      status: "enrolled",
      completed_credits: 45,
      required_credits: 120,
      gpa: 3.75,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'dropped':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'on_hold':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const calculateProgress = (completed: number, required: number) => {
    return Math.round((completed / required) * 100);
  };

  return (
    <div>
      <PageMeta title="My Programs" description="View your enrolled programs" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="mb-6">
            <h3 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-xl sm:text-2xl">
              My Programs
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Track your academic program progress and graduation timeline
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
            </div>
          ) : programsData.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800/50 py-12 rounded-lg text-center">
              <GraduationCap className="mx-auto mb-4 w-12 h-12 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                You are not enrolled in any programs yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {programsData.map((program) => {
                const progress = calculateProgress(program.completed_credits, program.required_credits);
                
                return (
                  <div
                    key={program.id}
                    className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-purple-50 dark:to-purple-900/20 p-6 border-gray-200 dark:border-gray-700 border-b">
                      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                              <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="mb-1 font-semibold text-gray-900 dark:text-white text-lg">
                                {program.program_name}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 text-sm">
                                <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full font-medium text-blue-800 dark:text-blue-300 text-xs">
                                  {program.program_level}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  {program.department}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-xs capitalize ${getStatusColor(program.status)}`}>
                          {program.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 p-6">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            Credit Progress
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {program.completed_credits} / {program.required_credits} credits
                          </span>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 mb-1 rounded-full w-full h-3">
                          <div
                            className="bg-blue-600 dark:bg-blue-500 rounded-full h-3 transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400">{progress}% Complete</span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {program.required_credits - program.completed_credits} credits remaining
                          </span>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-gray-500 dark:text-gray-400 text-xs">Enrolled</span>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            {formatDate(program.enrollment_date)}
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-gray-500 dark:text-gray-400 text-xs">Expected Graduation</span>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            {formatDate(program.expected_graduation_date)}
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-gray-500 dark:text-gray-400 text-xs">Program GPA</span>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            {program.gpa.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Milestones */}
                      <div>
                        <h5 className="mb-3 font-semibold text-gray-900 dark:text-white text-sm">
                          Program Milestones
                        </h5>
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <div className={`mt-1 rounded-full w-2 h-2 ${progress >= 25 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-900 dark:text-white text-sm">First Year Completed</span>
                                {progress >= 25 && <CheckCircle className="w-4 h-4 text-green-500" />}
                              </div>
                              <span className="text-gray-500 dark:text-gray-400 text-xs">30 credits</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className={`mt-1 rounded-full w-2 h-2 ${progress >= 50 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-900 dark:text-white text-sm">Second Year Completed</span>
                                {progress >= 50 && <CheckCircle className="w-4 h-4 text-green-500" />}
                              </div>
                              <span className="text-gray-500 dark:text-gray-400 text-xs">60 credits</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className={`mt-1 rounded-full w-2 h-2 ${progress >= 75 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-900 dark:text-white text-sm">Third Year Completed</span>
                                {progress >= 75 && <CheckCircle className="w-4 h-4 text-green-500" />}
                              </div>
                              <span className="text-gray-500 dark:text-gray-400 text-xs">90 credits</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className={`mt-1 rounded-full w-2 h-2 ${progress >= 100 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-900 dark:text-white text-sm">Graduation</span>
                                {progress >= 100 && <CheckCircle className="w-4 h-4 text-green-500" />}
                              </div>
                              <span className="text-gray-500 dark:text-gray-400 text-xs">120 credits</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
