import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { useInstitutions } from "../../hooks/useInstitutions";
import { useDepartments } from "../../hooks/useDepartments";
import { AllProgramsTable } from "../../components/program/AllProgramTable";
import { CreateProgramWithDepartmentModal } from "../../components/program/CreateProgramWithDepartmentModal";
import { EditProgramModal } from "../../components/program/EditProgramModal";
import { DeleteProgramModal } from "../../components/program/DeleteProgramModal";
import AccessDenied from "../../components/common/AcessDenied";
import { departmentsApi } from "../../api/departments.api";
import { programsApi } from "../../api/programs.api";
import type { Program, Department } from "../../types/api.types";

export default function AllProgramsPage() {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { institutions } = useInstitutions();
  
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Access control
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  // Fetch all departments and programs from all institutions
  useEffect(() => {
    const fetchAllData = async () => {
      if (institutions.length === 0) return;
      
      setLoading(true);
      setError(null);
      try {
        // Fetch all departments first
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

        // Fetch all programs for each department
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
        setFilteredPrograms(allPrograms);
      } catch (err: any) {
        setError(err.message || "Failed to fetch programs");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [institutions]);

  // Filter programs based on institution, department and search query
  useEffect(() => {
    let filtered = programs;

    // Filter by institution
    if (selectedInstitution) {
      filtered = filtered.filter(
        (program) => program.institution_id === selectedInstitution
      );
    }

    // Filter by department
    if (selectedDepartment) {
      filtered = filtered.filter(
        (program) => program.department_id === selectedDepartment
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((program) =>
        program.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPrograms(filtered);
  }, [selectedInstitution, selectedDepartment, searchQuery, programs]);

  const handleCreateProgram = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditProgram = (program: Program) => {
    setSelectedProgram(program);
    setIsEditModalOpen(true);
  };

  const handleDeleteProgram = (program: Program) => {
    setSelectedProgram(program);
    setIsDeleteModalOpen(true);
  };

  const refreshPrograms = async () => {
    if (institutions.length === 0) return;
    
    setLoading(true);
    try {
      // Fetch all departments first
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
      setError(err.message || "Failed to refresh programs");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = async () => {
    await refreshPrograms();
    setIsCreateModalOpen(false);
  };

  const handleUpdateSuccess = async () => {
    await refreshPrograms();
    setIsEditModalOpen(false);
    setSelectedProgram(null);
  };

  const handleDeleteSuccess = async () => {
    await refreshPrograms();
    setIsDeleteModalOpen(false);
    setSelectedProgram(null);
  };

  // Filter departments by selected institution for the dropdown
  const filteredDepartmentsForDropdown = selectedInstitution
    ? departments.filter((dept) => dept.institution_id === selectedInstitution)
    : departments;

  return (
    <div>
      <PageMeta title="All Programs" description="Manage all programs across departments" />

      <div className="bg-white dark:bg-white/[0.03] px-5 xl:px-10 py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                All Programs
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                View and manage all programs across departments
              </p>
            </div>
            <button
              onClick={handleCreateProgram}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm"
            >
              + Add Program
            </button>
          </div>

          {/* Filters */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-6">
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
                  setSelectedDepartment(""); // Reset department filter
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
                onChange={(e) => setSelectedDepartment(e.target.value)}
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

            {/* Search Filter */}
            <div>
              <label
                htmlFor="search-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Search by Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-filter"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search programs..."
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
            Showing {filteredPrograms.length} of {programs.length} programs
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <AllProgramsTable
            programs={filteredPrograms}
            loading={loading}
            onEdit={handleEditProgram}
            onDelete={handleDeleteProgram}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateProgramWithDepartmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        institutions={institutions}
        onSuccess={handleCreateSuccess}
      />

      {selectedProgram && (
        <>
          <EditProgramModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedProgram(null);
            }}
            program={selectedProgram}
            onSubmit={async (data) => {
              if (!selectedProgram.department_id) {
                throw new Error("Program department_id is missing");
              }
              const updatedProgram = await programsApi.update(
                selectedProgram.department_id,
                selectedProgram.id,
                data
              );
              await handleUpdateSuccess();
              return updatedProgram ?? null;
            }}
          />

          <DeleteProgramModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedProgram(null);
            }}
            program={selectedProgram}
            onConfirm={async () => {
              if (!selectedProgram.department_id) {
                throw new Error("Program department_id is missing");
              }
              await programsApi.delete(
                selectedProgram.department_id,
                selectedProgram.id
              );
              await handleDeleteSuccess();
            }}
          />
        </>
      )}
    </div>
  );
}