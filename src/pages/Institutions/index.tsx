import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { useInstitutions } from "../../hooks/useInstitutions";
import InstitutionTable from "../../components/institutions/InstitutionTable";
import CreateInstitutionModal from "../../components/institutions/CreateInstitutionModal";
import EditInstitutionModal from "../../components/institutions/EditInstitutionModal";
import DeleteInstitutionModal from "../../components/institutions/DeleteInstitutionModal";
import AccessDenied from "../../components/common/AcessDenied";
import type { Institution } from "../../types/api.types";
import { Plus } from "lucide-react";

export default function InstitutionsPage() {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { institutions, loading, error, createInstitution, updateInstitution, deleteInstitution } = useInstitutions();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  // Access control - only admin and super admin can manage institutions
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  const handleCreateInstitution = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditInstitution = (institution: Institution) => {
    setSelectedInstitution(institution);
    setIsEditModalOpen(true);
  };

  const handleDeleteInstitution = (institution: Institution) => {
    setSelectedInstitution(institution);
    setIsDeleteModalOpen(true);
  };

  const handleViewFaculties = (institution: Institution) => {
    navigate(`/institutions/${institution.id}/faculties`);
  };

  return (
    <div>
      <PageMeta title="Institution Management" description="Manage institutions" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800 text-xl sm:text-2xl dark:text-white/90">
                Institution Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage institutions and their faculties
              </p>
            </div>
            <button
              onClick={handleCreateInstitution}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Institution</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <InstitutionTable
            institutions={institutions}
            loading={loading}
            onEdit={handleEditInstitution}
            onDelete={handleDeleteInstitution}
            onViewFaculties={handleViewFaculties}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateInstitutionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createInstitution}
      />

      {selectedInstitution && (
        <>
          <EditInstitutionModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedInstitution(null);
            }}
            institution={selectedInstitution}
            onSubmit={(data) => updateInstitution(selectedInstitution.id, data)}
          />

          <DeleteInstitutionModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedInstitution(null);
            }}
            institution={selectedInstitution}
            onConfirm={async () => {
              const success = await deleteInstitution(selectedInstitution.id);
              if (success) {
                setIsDeleteModalOpen(false);
                setSelectedInstitution(null);
              }
            }}
          />
        </>
      )}
    </div>
  );
}