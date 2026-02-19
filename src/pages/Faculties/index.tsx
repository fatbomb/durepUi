import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { useFaculties } from "../../hooks/useFaculties";
import FacultyTable from "../../components/faculty/FacultyTable";
import CreateFacultyModal from "../../components/faculty/CreateFacultyModal";
import EditFacultyModal from "../../components/faculty/EditFacultyModal";
import DeleteFacultyModal from "../../components/faculty/DeleteFacultyModal";
import AccessDenied from "../../components/common/AcessDenied";
import type { Faculty } from "../../types/api.types";
import { ArrowLeft, Plus } from "lucide-react";

export default function FacultiesPage() {
  const navigate = useNavigate();
  const { institutionId } = useParams<{ institutionId: string }>();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { faculties, loading, error, createFaculty, updateFaculty, deleteFaculty } = useFaculties(institutionId || null);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  // Access control - only admin and super admin can manage faculties
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

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

  const handleBackToInstitutions = () => {
    navigate("/institutions");
  };

  return (
    <div>
      <PageMeta title="Faculty Management" description="Manage faculties" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex flex-col gap-4 mb-6">
            <button
              onClick={handleBackToInstitutions}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400 text-sm transition-colors self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Institutions</span>
            </button>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-800 text-xl sm:text-2xl dark:text-white/90">
                  Faculty Management
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Manage faculties within this institution
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
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <FacultyTable
            faculties={faculties}
            loading={loading}
            onEdit={handleEditFaculty}
            onDelete={handleDeleteFaculty}
            isSuperAdmin={isSuperAdmin}
            institutionId={institutionId || ""}
          />
        </div>
      </div>

      <CreateFacultyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createFaculty}
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
            onSubmit={(data) => updateFaculty(selectedFaculty.id, data)}
          />

          <DeleteFacultyModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedFaculty(null);
            }}
            faculty={selectedFaculty}
            onConfirm={async () => {
              const success = await deleteFaculty(selectedFaculty.id);
              if (success) {
                setIsDeleteModalOpen(false);
                setSelectedFaculty(null);
              }
            }}
          />
        </>
      )}
    </div>
  );
}