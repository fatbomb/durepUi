import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { useInstitutions } from "../../hooks/useInstitutions";
import { useProgramCourses } from "../../hooks/useProgramCourses";
import { useCourses } from "../../hooks/useCourses";
import { AllProgramCoursesTable } from "../../components/programCourse/AllProgramCoursesTable";
import { AddCourseToProgramBulkModal } from "../../components/programCourse/AddCourseToProgramBulkModal";
import AccessDenied from "../../components/common/AcessDenied";
import { departmentsApi } from "../../api/departments.api";
import { programsApi } from "../../api/programs.api";
import type { ProgramCourse, Department, Program } from "../../types/api.types";

export default function AllProgramCoursesPage() {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { institutions } = useInstitutions();
  const { programCourses, createProgramCourse, deleteProgramCourse } = useProgramCourses();
  const { courses, loading: coursesLoading } = useCourses();
  
  const [programs, setPrograms] = useState<Program[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  // Access control
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  // Fetch all departments and programs
  useEffect(() => {
    const fetchAllData = async () => {
      if (institutions.length === 0) return;
      
      setLoading(true);
      setError(null);
      try {
        // Fetch all departments
        const allDepartmentsPromises = institutions.map((inst) =>
          departmentsApi.getAll(inst.id).then((departments) =>
            departments.map((department) => ({
              ...department,
              institution_id: inst.id,
              institution_name: inst.name,
            }))
          )
        );
        
        const departmentResults = await Promise.all(allDepartmentsPromises);
        const allDepartments = departmentResults.flat();
        setDepartments(allDepartments);

        // Fetch all programs
        const allProgramsPromises = allDepartments.map((dept) =>
          programsApi.getAll(dept.id).then((programs) =>
            programs.map((program) => ({
              ...program,
              department_id: dept.id,
              department_name: dept.name,
              institution_id: dept.institution_id,
              institution_name: dept.institution_name,
            }))
          )
        );
        
        const programResults = await Promise.all(allProgramsPromises);
        const allPrograms = programResults.flat();
        setPrograms(allPrograms);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [institutions]);

  // Filter program courses based on selected filters
  const filteredProgramCourses = programCourses.filter((pc) => {
    const program = programs.find((p) => p.id === pc.program_id);
    const department = program ? departments.find((d) => d.id === program.department_id) : null;
    const course = courses.find((c) => c.id === pc.course_id);

    if (selectedInstitution && department?.institution_id !== selectedInstitution) {
      return false;
    }
    if (selectedDepartment && program?.department_id !== selectedDepartment) {
      return false;
    }
    if (selectedProgram && pc.program_id !== selectedProgram) {
      return false;
    }
    if (searchQuery && course) {
      const query = searchQuery.toLowerCase();
      if (
        !course.name.toLowerCase().includes(query) &&
        !course.course_code.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    return true;
  });

  const handleAddCourse = () => {
    setEditingProgram(null);
    setIsAddModalOpen(true);
  };

  const handleEditProgram = (program: Program) => {
    setEditingProgram(program);
    setIsAddModalOpen(true);
  };

  // Filter departments and programs for dropdowns
  const filteredDepartmentsForDropdown = selectedInstitution
    ? departments.filter((dept) => dept.institution_id === selectedInstitution)
    : departments;

  const filteredProgramsForDropdown = selectedDepartment
    ? programs.filter((prog) => prog.department_id === selectedDepartment)
    : selectedInstitution
    ? programs.filter((prog) => {
        const dept = departments.find((d) => d.id === prog.department_id);
        return dept?.institution_id === selectedInstitution;
      })
    : programs;

  return (
    <div>
      <PageMeta title="All Program Courses" description="Manage all program courses" />

      <div className="bg-white dark:bg-white/[0.03] px-5 xl:px-10 py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                Program Courses
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                View and manage all program-course assignments
              </p>
            </div>
            <button
              onClick={handleAddCourse}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm"
            >
              + Manage Courses
            </button>
          </div>

          {/* Filters */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {/* Institution Filter */}
            <div>
              <label
                htmlFor="institution-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Filter by Institution
              </label>
              <select
                id="institution-filter"
                value={selectedInstitution}
                onChange={(e) => {
                  setSelectedInstitution(e.target.value);
                  setSelectedDepartment("");
                  setSelectedProgram("");
                }}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              >
                <option value="">All Institutions</option>
                {institutions.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label
                htmlFor="department-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Filter by Department
              </label>
              <select
                id="department-filter"
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setSelectedProgram("");
                }}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              >
                <option value="">All Departments</option>
                {filteredDepartmentsForDropdown.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Program Filter */}
            <div>
              <label
                htmlFor="program-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Filter by Program
              </label>
              <select
                id="program-filter"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              >
                <option value="">All Programs</option>
                {filteredProgramsForDropdown.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Filter */}
            <div>
              <label
                htmlFor="search-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Search Courses
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-filter"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by code or name..."
                  className="dark:bg-gray-800 px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
                />
                <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm">
            Showing {filteredProgramCourses.length} of {programCourses.length} course assignments
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <AllProgramCoursesTable
            programCourses={filteredProgramCourses}
            programs={programs}
            departments={departments}
            courses={courses}
            loading={loading || coursesLoading}
            onEdit={handleEditProgram}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <AddCourseToProgramBulkModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProgram(null);
        }}
        institutions={institutions}
        courses={courses}
        existingProgramCourses={programCourses}
        onSubmit={createProgramCourse}
        onRemove={deleteProgramCourse}
      />
    </div>
  );
}