import { useState, useEffect, useRef } from "react";
import type { 
  Course, 
  CreateProgramCoursePayload, 
  Program, 
  ProgramCourse,
  Institution,
  Department 
} from "../../types/api.types";
import { useDepartments } from "../../hooks/useDepartments";
import { usePrograms } from "../../hooks/usePrograms";
import { toast } from "react-toastify";

interface AddCourseToProgramBulkModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutions: Institution[];
  courses: Course[];
  existingProgramCourses: ProgramCourse[];
  onSubmit: (data: CreateProgramCoursePayload) => Promise<ProgramCourse | null>;
  onRemove: (programCourseId: string) => Promise<boolean>;
}

export function AddCourseToProgramBulkModal({ 
  isOpen, 
  onClose, 
  institutions,
  courses, 
  existingProgramCourses, 
  onSubmit,
  onRemove 
}: AddCourseToProgramBulkModalProps) {
  const [selectedInstitutionId, setSelectedInstitutionId] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedProgramId, setSelectedProgramId] = useState("");
  
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [programSearch, setProgramSearch] = useState("");
  const [availableCoursesSearch, setAvailableCoursesSearch] = useState("");
  const [assignedCoursesSearch, setAssignedCoursesSearch] = useState("");
  
  const [isInstitutionDropdownOpen, setIsInstitutionDropdownOpen] = useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const institutionRef = useRef<HTMLDivElement>(null);
  const departmentRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<HTMLDivElement>(null);

  // Fetch departments and programs based on selections
  const { departments, loading: loadingDepartments } = useDepartments(selectedInstitutionId || "");
  const { programs, loading: loadingPrograms } = usePrograms(selectedDepartmentId || null, undefined);
  console.log(selectedDepartmentId)
  console.log(programs)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (institutionRef.current && !institutionRef.current.contains(event.target as Node)) {
        setIsInstitutionDropdownOpen(false);
      }
      if (departmentRef.current && !departmentRef.current.contains(event.target as Node)) {
        setIsDepartmentDropdownOpen(false);
      }
      if (programRef.current && !programRef.current.contains(event.target as Node)) {
        setIsProgramDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const filteredInstitutions = institutions.filter((inst) =>
    inst.name.toLowerCase().includes(institutionSearch.toLowerCase())
  );

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  const filteredPrograms = programs.filter((prog) =>
    prog.title.toLowerCase().includes(programSearch.toLowerCase())
  );

  // Get assigned courses for selected program
  const assignedCourses = selectedProgramId
    ? existingProgramCourses
        .filter((pc) => pc.program_id === selectedProgramId)
        .map((pc) => courses.find((c) => c.id === pc.course_id))
        .filter(Boolean) as Course[]
    : [];

  // Get available courses (not yet assigned)
  const availableCourses = selectedProgramId
    ? courses.filter(
        (course) =>
          !existingProgramCourses.some(
            (pc) => pc.program_id === selectedProgramId && pc.course_id === course.id
          )
      )
    : [];

  // Filter courses by search
  const filteredAvailableCourses = availableCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(availableCoursesSearch.toLowerCase()) ||
      course.course_code.toLowerCase().includes(availableCoursesSearch.toLowerCase())
  );

  const filteredAssignedCourses = assignedCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(assignedCoursesSearch.toLowerCase()) ||
      course.course_code.toLowerCase().includes(assignedCoursesSearch.toLowerCase())
  );

  const handleSelectInstitution = (institution: Institution) => {
    setSelectedInstitutionId(institution.id);
    setInstitutionSearch(institution.name);
    setSelectedDepartmentId("");
    setDepartmentSearch("");
    setSelectedProgramId("");
    setProgramSearch("");
    setIsInstitutionDropdownOpen(false);
  };

  const handleSelectDepartment = (department: Department) => {
    setSelectedDepartmentId(department.id);
    setDepartmentSearch(department.name);
    setSelectedProgramId("");
    setProgramSearch("");
    setIsDepartmentDropdownOpen(false);
  };

  const handleSelectProgram = (program: Program) => {
    setSelectedProgramId(program.id);
    setProgramSearch(program.title);
    setIsProgramDropdownOpen(false);
  };

  const handleAddCourse = async (courseId: string) => {
    if (!selectedProgramId) {
      toast.error("Please select a program first");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ program_id: selectedProgramId, course_id: courseId });
      toast.success("Course added successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCourse = async (courseId: string) => {
    if (!selectedProgramId) return;

    const programCourse = existingProgramCourses.find(
      (pc) => pc.program_id === selectedProgramId && pc.course_id === courseId
    );

    if (!programCourse) return;

    setLoading(true);
    try {
      const success = await onRemove(programCourse.id);
      if (success) {
        toast.success("Course removed successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to remove course");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedInstitutionId("");
    setSelectedDepartmentId("");
    setSelectedProgramId("");
    setInstitutionSearch("");
    setDepartmentSearch("");
    setProgramSearch("");
    setAvailableCoursesSearch("");
    setAssignedCoursesSearch("");
    onClose();
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-end sm:items-center bg-black bg-opacity-50 p-0 sm:p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-lg rounded-t-2xl w-full sm:max-w-5xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="top-0 sticky bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 sm:py-5 border-gray-200 dark:border-gray-700 border-b">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white text-lg sm:text-xl">
              Manage Program Courses
            </h2>
            <button
              onClick={handleClose}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          {/* Selection Section */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-6">
            {/* Institution */}
            <div className="relative" ref={institutionRef}>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                Institution <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={institutionSearch}
                onChange={(e) => {
                  setInstitutionSearch(e.target.value);
                  setIsInstitutionDropdownOpen(true);
                  if (!e.target.value) {
                    setSelectedInstitutionId("");
                    setSelectedDepartmentId("");
                    setDepartmentSearch("");
                    setSelectedProgramId("");
                    setProgramSearch("");
                  }
                }}
                onFocus={() => setIsInstitutionDropdownOpen(true)}
                className="dark:bg-gray-700 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
                placeholder="Type to search..."
                autoComplete="off"
              />
              {isInstitutionDropdownOpen && filteredInstitutions.length > 0 && (
                <div className="z-10 absolute bg-white dark:bg-gray-700 shadow-lg mt-1 border border-gray-300 dark:border-gray-600 rounded-lg w-full max-h-60 overflow-y-auto">
                  {filteredInstitutions.map((inst) => (
                    <div
                      key={inst.id}
                      onClick={() => handleSelectInstitution(inst)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-2.5 text-gray-700 dark:text-gray-200 text-sm cursor-pointer"
                    >
                      {inst.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Department */}
            <div className="relative" ref={departmentRef}>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={departmentSearch}
                onChange={(e) => {
                  setDepartmentSearch(e.target.value);
                  setIsDepartmentDropdownOpen(true);
                  if (!e.target.value) {
                    setSelectedDepartmentId("");
                    setSelectedProgramId("");
                    setProgramSearch("");
                  }
                }}
                onFocus={() => setIsDepartmentDropdownOpen(true)}
                disabled={!selectedInstitutionId || loadingDepartments}
                className="dark:bg-gray-700 disabled:opacity-50 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm disabled:cursor-not-allowed"
                placeholder={loadingDepartments ? "Loading..." : "Type to search..."}
                autoComplete="off"
              />
              {isDepartmentDropdownOpen && !loadingDepartments && filteredDepartments.length > 0 && (
                <div className="z-10 absolute bg-white dark:bg-gray-700 shadow-lg mt-1 border border-gray-300 dark:border-gray-600 rounded-lg w-full max-h-60 overflow-y-auto">
                  {filteredDepartments.map((dept) => (
                    <div
                      key={dept.id}
                      onClick={() => handleSelectDepartment(dept)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-2.5 text-gray-700 dark:text-gray-200 text-sm cursor-pointer"
                    >
                      {dept.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Program */}
            <div className="relative" ref={programRef}>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                Program <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={programSearch}
                onChange={(e) => {
                  setProgramSearch(e.target.value);
                  setIsProgramDropdownOpen(true);
                  if (!e.target.value) {
                    setSelectedProgramId("");
                  }
                }}
                onFocus={() => setIsProgramDropdownOpen(true)}
                disabled={!selectedDepartmentId || loadingPrograms}
                className="dark:bg-gray-700 disabled:opacity-50 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm disabled:cursor-not-allowed"
                placeholder={loadingPrograms ? "Loading..." : "Type to search..."}
                autoComplete="off"
              />
              {isProgramDropdownOpen && !loadingPrograms && filteredPrograms.length > 0 && (
                <div className="z-10 absolute bg-white dark:bg-gray-700 shadow-lg mt-1 border border-gray-300 dark:border-gray-600 rounded-lg w-full max-h-60 overflow-y-auto">
                  {filteredPrograms.map((prog) => (
                    <div
                      key={prog.id}
                      onClick={() => handleSelectProgram(prog)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-2.5 text-gray-700 dark:text-gray-200 text-sm cursor-pointer"
                    >
                      {prog.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dual Box for Courses */}
          {selectedProgramId && (
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-6">
              {/* Available Courses */}
              <div className="border dark:border-gray-700 rounded-lg">
                <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-gray-200 dark:border-gray-700 border-b">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    Available Courses ({filteredAvailableCourses.length})
                  </h3>
                  <input
                    type="text"
                    value={availableCoursesSearch}
                    onChange={(e) => setAvailableCoursesSearch(e.target.value)}
                    placeholder="Search courses..."
                    className="dark:bg-gray-800 mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
                  />
                </div>
                <div className="p-2 max-h-96 overflow-y-auto">
                  {filteredAvailableCourses.length === 0 ? (
                    <p className="py-8 text-gray-500 text-sm text-center">No available courses</p>
                  ) : (
                    filteredAvailableCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex justify-between items-center bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 mb-2 p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {course.course_code}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">{course.name}</p>
                        </div>
                        <button
                          onClick={() => handleAddCourse(course.id)}
                          disabled={loading}
                          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 ml-2 p-2 rounded-lg text-white transition-colors"
                          title="Add course"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Assigned Courses */}
              <div className="border dark:border-gray-700 rounded-lg">
                <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-gray-200 dark:border-gray-700 border-b">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    Assigned Courses ({filteredAssignedCourses.length})
                  </h3>
                  <input
                    type="text"
                    value={assignedCoursesSearch}
                    onChange={(e) => setAssignedCoursesSearch(e.target.value)}
                    placeholder="Search courses..."
                    className="dark:bg-gray-800 mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
                  />
                </div>
                <div className="p-2 max-h-96 overflow-y-auto">
                  {filteredAssignedCourses.length === 0 ? (
                    <p className="py-8 text-gray-500 text-sm text-center">No assigned courses</p>
                  ) : (
                    filteredAssignedCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex justify-between items-center bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 mb-2 p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {course.course_code}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">{course.name}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveCourse(course.id)}
                          disabled={loading}
                          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 ml-2 p-2 rounded-lg text-white transition-colors"
                          title="Remove course"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {!selectedProgramId && (
            <div className="bg-gray-50 dark:bg-gray-800/50 mt-6 px-6 py-12 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Please select an institution, department, and program to manage courses
              </p>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-200 text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}