import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { useDepartments } from "../../hooks/useDepartments";
import DepartmentTable from "../../components/department/DepartmentTable";
import CreateDepartmentModal from "../../components/department/CreateDepartmentModal";
import EditDepartmentModal from "../../components/department/EditDepartmentModal";
import DeleteDepartmentModal from "../../components/department/DeleteDepartmentModal";
import AccessDenied from "../../components/common/AcessDenied";
import type { Department } from "../../types/api.types";
import { ArrowLeft, Plus } from "lucide-react";

export default function DepartmentsPage() {
  const navigate = useNavigate();
  const { institutionId } = useParams<{ institutionId: string }>();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { departments, loading, error, createDepartment, updateDepartment, deleteDepartment } = useDepartments(institutionId || null);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  // Access control - only admin and super admin can manage departments
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

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

  const handleBackToFaculties = () => {
    navigate(`/institutions/${institutionId}/faculties`);
  };

  return (
    <div>
      <PageMeta title="Department Management" description="Manage departments" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex flex-col gap-4 mb-6">
            <button
              onClick={handleBackToFaculties}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400 text-sm transition-colors self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Faculties</span>
            </button>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-800 text-xl sm:text-2xl dark:text-white/90">
                  Department Management
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Manage departments within this institution
                </p>
              </div>
              <button
                onClick={handleCreateDepartment}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Department</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <DepartmentTable
            departments={departments}
            loading={loading}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateDepartmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createDepartment}
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
            onSubmit={(data) => updateDepartment(selectedDepartment.id, data)}
          />

          <DeleteDepartmentModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedDepartment(null);
            }}
            department={selectedDepartment}
            onConfirm={async () => {
              const success = await deleteDepartment(selectedDepartment.id);
              if (success) {
                setIsDeleteModalOpen(false);
                setSelectedDepartment(null);
              }
            }}
          />
        </>
      )}
    </div>
  );
}