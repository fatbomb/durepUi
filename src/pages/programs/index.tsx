import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { usePrograms } from "../../hooks/usePrograms";
import { ProgramTable } from "../../components/program/ProgramTable";
import { CreateProgramModal } from "../../components/program/CreateProgramModal";
import { EditProgramModal } from "../../components/program/EditProgramModal";
import { DeleteProgramModal } from "../../components/program/DeleteProgramModal";
import AccessDenied from "../../components/common/AcessDenied";
import type { Program } from "../../types/api.types";
import { ArrowLeft, Plus } from "lucide-react";

export default function ProgramsPage() {
  const navigate = useNavigate();
  const { departmentId } = useParams<{ departmentId: string }>();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { programs, loading, error, createProgram, updateProgram, deleteProgram } = usePrograms(departmentId || null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Access control - only admin and super admin can manage programs
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

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

  const handleBackToDepartments = () => {
    navigate("/departments");
  };

  return (
    <div>
      <PageMeta title="Program Management" description="Manage programs" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex flex-col gap-4 mb-6">
            <button
              onClick={handleBackToDepartments}
              className="flex items-center self-start gap-2 text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Departments</span>
            </button>
            
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-xl sm:text-2xl">
                  Program Management
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Manage programs within this department
                </p>
              </div>
              <button
                onClick={handleCreateProgram}
                className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto font-medium text-white text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Program</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <ProgramTable
            programs={programs}
            loading={loading}
            onEdit={handleEditProgram}
            onDelete={handleDeleteProgram}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateProgramModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createProgram}
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
            onSubmit={(data) => updateProgram(selectedProgram.id, data)}
          />

          <DeleteProgramModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedProgram(null);
            }}
            program={selectedProgram}
            onConfirm={async () => {
              const success = await deleteProgram(selectedProgram.id);
              if (success) {
                setIsDeleteModalOpen(false);
                setSelectedProgram(null);
              }
            }}
          />
        </>
      )}
    </div>
  );
}