import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../hooks/useUsers";
import UserTable from "../../components/users/UserTable";
import CreateUserModal from "../../components/users/CreateUserModal";
import EditUserModal from "../../components/users/EditUserModal";
import DeleteUserModal from "../../components/users/DeleteUserModal";
import AccessDenied from "../../components/users/AccessDenied";
import type { User } from "../../types/api.types";
import { Plus } from "lucide-react";

export default function UsersPage() {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Access control
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  const handleCreateUser = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleViewRoles = (user: User) => {
    navigate(`/users/${user.id}/roles`);
  };

  return (
    <div>
      <PageMeta title="User Management" description="Manage system users" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-xl sm:text-2xl">
                User Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage users, their roles, and permissions
              </p>
            </div>
            <button
              onClick={handleCreateUser}
              className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto font-medium text-white text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <UserTable
            users={users}
            loading={loading}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onViewRoles={handleViewRoles}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createUser}
      />

      {selectedUser && (
        <>
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
            onSubmit={(data) => updateUser(selectedUser.id, data)}
          />

          <DeleteUserModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
            onConfirm={async () => {
              const success = await deleteUser(selectedUser.id);
              if (success) {
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
              }
            }}
          />
        </>
      )}
    </div>
  );
}