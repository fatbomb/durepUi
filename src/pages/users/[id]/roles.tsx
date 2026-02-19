// pages/users/[id]/roles.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageMeta from "../../../components/common/PageMeta";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../hooks/useUser";
import { useRoles } from "../../../hooks/useRoles";
import RoleTable from "../../../components/users/RoleTable";
import CreateRoleModal from "../../../components/users/CreateRoleModal";
import EditRoleModal from "../../../components/users/EditRoleModal";
import DeleteRoleModal from "../../../components/users/DeleteRoleModal";
import AccessDenied from "../../../components/users/AccessDenied";
import type { UserRole } from "../../../types/api.types";

export default function UserRolesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { user, loading: userLoading } = useUser(id || null);
  const { roles, loading: rolesLoading, createRole, updateRole, deleteRole } = useRoles(id || null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  // Access control
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  const loading = userLoading || rolesLoading;

  const handleCreateRole = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditRole = (role: UserRole) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleDeleteRole = (role: UserRole) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const handleBack = () => {
    navigate("/users");
  };

  return (
    <div>
      <PageMeta title={`Roles - ${ "User"}`} description="Manage user roles" />

      <div className="bg-white dark:bg-white/[0.03] px-5 xl:px-10 py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 dark:text-gray-400 text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Users
            </button>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="mb-2 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                  User Roles
                </h3>
                {user && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Managing roles for <span className="font-medium">{user.email}</span> ({user.email})
                  </p>
                )}
              </div>
              <button
                onClick={handleCreateRole}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm"
              >
                + Add Role
              </button>
            </div>
          </div>

          <RoleTable
            roles={roles}
            loading={loading}
            onEdit={handleEditRole}
            onDelete={handleDeleteRole}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateRoleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createRole}
      />

      {selectedRole && (
        <>
          <EditRoleModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedRole(null);
            }}
            role={selectedRole}
            onSubmit={async (data: Partial<UserRole>) => {
              // Ensure 'role' is a string and not undefined
              const payload = {
                ...data,
                role: data.role ?? selectedRole.role // fallback to existing role if undefined
              };
              return await updateRole(selectedRole.id, payload);
            }}
          />

          <DeleteRoleModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedRole(null);
            }}
            role={selectedRole}
            onConfirm={async () => {
              const success = await deleteRole(selectedRole.id);
              if (success) {
                setIsDeleteModalOpen(false);
                setSelectedRole(null);
              }
            }}
          />
        </>
      )}
    </div>
  );
}
