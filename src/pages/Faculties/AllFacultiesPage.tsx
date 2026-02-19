import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { useInstitutions } from "../../hooks/useInstitutions";
import AllFacultiesTable from "../../components/faculty/AllFacultiesTable";
import CreateFacultyWithInstitutionModal from "../../components/faculty/CreateFacultyWithInstitutionModal";
import EditFacultyModal from "../../components/faculty/EditFacultyModal";
import DeleteFacultyModal from "../../components/faculty/DeleteFacultyModal";
import AccessDenied from "../../components/common/AcessDenied";
import { facultiesApi } from "../../api/faculties.api";
import type { Faculty, Institution } from "../../types/api.types";
import { Plus, Search } from "lucide-react";

export default function AllFacultiesPage() {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { institutions } = useInstitutions();
  
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [filteredFaculties, setFilteredFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  // Access control
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  // Fetch all faculties from all institutions
  useEffect(() => {
    const fetchAllFaculties = async () => {
      if (institutions.length === 0) return;
      
      setLoading(true);
      setError(null);
      try {
        const allFacultiesPromises = institutions.map((inst) =>
          facultiesApi.getAll(inst.id).then((faculties) =>
            faculties.map((faculty) => ({
              ...faculty,
              institution_id: inst.id,
              institution_name: inst.name,
            }))
          )
        );
        
        const results = await Promise.all(allFacultiesPromises);
        const allFaculties = results.flat();
        setFaculties(allFaculties);
        setFilteredFaculties(allFaculties);
      } catch (err: any) {
        setError(err.message || "Failed to fetch faculties");
      } finally {
        setLoading(false);
      }
    };

    fetchAllFaculties();
  }, [institutions]);

  // Filter faculties based on institution and search query
  useEffect(() => {
    let filtered = faculties;

    // Filter by institution
    if (selectedInstitution) {
      filtered = filtered.filter(
        (faculty) => faculty.institution_id === selectedInstitution
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((faculty) =>
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFaculties(filtered);
  }, [selectedInstitution, searchQuery, faculties]);

  const handleCreateFaculty = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditFaculty = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setIsEditModalOpen(true);
  };

  const handleDeleteFaculty = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setIsDeleteModalOpen(true);
  };

  const refreshFaculties = async () => {
    if (institutions.length === 0) return;
    
    setLoading(true);
    try {
      const allFacultiesPromises = institutions.map((inst) =>
        facultiesApi.getAll(inst.id).then((faculties) =>
          faculties.map((faculty) => ({
            ...faculty,
            institution_id: inst.id,
            institution_name: inst.name,
          }))
        )
      );
      
      const results = await Promise.all(allFacultiesPromises);
      const allFaculties = results.flat();
      setFaculties(allFaculties);
    } catch (err: any) {
      setError(err.message || "Failed to refresh faculties");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = async () => {
    await refreshFaculties();
    setIsCreateModalOpen(false);
  };

  const handleUpdateSuccess = async () => {
    await refreshFaculties();
    setIsEditModalOpen(false);
    setSelectedFaculty(null);
  };

  const handleDeleteSuccess = async () => {
    await refreshFaculties();
    setIsDeleteModalOpen(false);
    setSelectedFaculty(null);
  };

  return (
    <div>
      <PageMeta title="All Faculties" description="Manage all faculties across institutions" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800 text-xl sm:text-2xl dark:text-white/90">
                All Faculties
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                View and manage all faculties across institutions
              </p>
            </div>
            <button
              onClick={handleCreateFaculty}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Faculty</span>
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
                  placeholder="Search faculties..."
                  className="dark:bg-gray-800 px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
                />
                <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm">
            Showing {filteredFaculties.length} of {faculties.length} faculties
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <AllFacultiesTable
            faculties={filteredFaculties}
            loading={loading}
            onEdit={handleEditFaculty}
            onDelete={handleDeleteFaculty}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateFacultyWithInstitutionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        institutions={institutions}
        onSuccess={handleCreateSuccess}
      />

      {selectedFaculty && (
        <>
          <EditFacultyModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedFaculty(null);
            }}
            faculty={selectedFaculty}
            onSubmit={async (data) => {
              if (!selectedFaculty.institution_id) {
                throw new Error("Faculty institution_id is missing");
              }
              await facultiesApi.update(
                selectedFaculty.institution_id,
                selectedFaculty.id,
                data
              );
              await handleUpdateSuccess();
            }}
          />

          <DeleteFacultyModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedFaculty(null);
            }}
            faculty={selectedFaculty}
            onConfirm={async () => {
              if (!selectedFaculty.institution_id) {
                throw new Error("Faculty institution_id is missing");
              }
              await facultiesApi.delete(
                selectedFaculty.institution_id,
                selectedFaculty.id
              );
              await handleDeleteSuccess();
            }}
          />
        </>
      )}
    </div>
  );
}