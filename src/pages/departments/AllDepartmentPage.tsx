import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { useInstitutions } from "../../hooks/useInstitutions";
import AllDepartmentsTable from "../../components/department/AllDepartmentsTable";
import CreateDepartmentWithInstitutionModal from "../../components/department/CreateDepartmentWithInstitutionModal";
import EditDepartmentModal from "../../components/department/EditDepartmentModal";
import DeleteDepartmentModal from "../../components/department/DeleteDepartmentModal";
import AccessDenied from "../../components/common/AcessDenied";
import { departmentsApi } from "../../api/departments.api";
import type { Department } from "../../types/api.types";

export default function AllDepartmentsPage() {
  const { isAdmin, isSuperAdmin } = useAuth();
  const { institutions } = useInstitutions();
  
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  // Access control
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  // Fetch all departments from all institutions
  useEffect(() => {
    const fetchAllDepartments = async () => {
      if (institutions.length === 0) return;
      
      setLoading(true);
      setError(null);
      try {
        const allDepartmentsPromises = institutions.map((inst) =>
          departmentsApi.getAll(inst.id).then((departments) =>
            departments.map((department) => ({
              ...department,
              institution_id: inst.id,
              institution_name: inst.name,
            }))
          )
        );
        
        const results = await Promise.all(allDepartmentsPromises);
        const allDepartments = results.flat();
        setDepartments(allDepartments);
        setFilteredDepartments(allDepartments);
      } catch (err: any) {
        setError(err.message || "Failed to fetch departments");
      } finally {
        setLoading(false);
      }
    };

    fetchAllDepartments();
  }, [institutions]);

  // Filter departments based on institution and search query
  useEffect(() => {
    let filtered = departments;

    // Filter by institution
    if (selectedInstitution) {
      filtered = filtered.filter(
        (department) => department.institution_id === selectedInstitution
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((department) =>
        department.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDepartments(filtered);
  }, [selectedInstitution, searchQuery, departments]);

  const handleCreateDepartment = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };

  const handleDeleteDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setIsDeleteModalOpen(true);
  };

  const refreshDepartments = async () => {
    if (institutions.length === 0) return;
    
    setLoading(true);
    try {
      const allDepartmentsPromises = institutions.map((inst) =>
        departmentsApi.getAll(inst.id).then((departments) =>
          departments.map((department) => ({
            ...department,
            institution_id: inst.id,
            institution_name: inst.name,
          }))
        )
      );
      
      const results = await Promise.all(allDepartmentsPromises);
      const allDepartments = results.flat();
      setDepartments(allDepartments);
    } catch (err: any) {
      setError(err.message || "Failed to refresh departments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = async () => {
    await refreshDepartments();
    setIsCreateModalOpen(false);
  };

  const handleUpdateSuccess = async () => {
    await refreshDepartments();
    setIsEditModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleDeleteSuccess = async () => {
    await refreshDepartments();
    setIsDeleteModalOpen(false);
    setSelectedDepartment(null);
  };

  return (
    <div>
      <PageMeta title="All Departments" description="Manage all departments across institutions" />

      <div className="bg-white dark:bg-white/[0.03] px-5 xl:px-10 py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                All Departments
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                View and manage all departments across institutions
              </p>
            </div>
            <button
              onClick={handleCreateDepartment}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm"
            >
              + Add Department
            </button>
          </div>

          {/* Filters */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-6">
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
                onChange={(e) => setSelectedInstitution(e.target.value)}
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

            {/* Search Filter */}
            <div>
              <label
                htmlFor="search-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Search by Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-filter"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search departments..."
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
            Showing {filteredDepartments.length} of {departments.length} departments
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <AllDepartmentsTable
            departments={filteredDepartments}
            loading={loading}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateDepartmentWithInstitutionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        institutions={institutions}
        onSuccess={handleCreateSuccess}
      />

      {selectedDepartment && (
        <>
          <EditDepartmentModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedDepartment(null);
            }}
            department={selectedDepartment}
            institutionId={selectedDepartment.institution_id ?? ""}
            onSubmit={async (data) => {
              if (!selectedDepartment.institution_id) {
                throw new Error("Department institution_id is missing");
              }
              const updatedDepartment = await departmentsApi.update(
                selectedDepartment.institution_id,
                selectedDepartment.id,
                data
              );
              await handleUpdateSuccess();
              return updatedDepartment ?? null;
            }}
          />

          <DeleteDepartmentModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedDepartment(null);
            }}
            department={selectedDepartment}
            onConfirm={async () => {
              if (!selectedDepartment.institution_id) {
                throw new Error("Department institution_id is missing");
              }
              await departmentsApi.delete(
                selectedDepartment.institution_id,
                selectedDepartment.id
              );
              await handleDeleteSuccess();
            }}
          />
        </>
      )}
    </div>
  );
}