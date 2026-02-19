import React, { useState } from "react";
import Modal from "../common/modal";
import { facultiesApi } from "../../api/faculties.api";
import type { Institution, CreateFacultyPayload } from "../../types/api.types";

interface CreateFacultyWithInstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutions: Institution[];
  onSuccess: () => void;
}

export default function CreateFacultyWithInstitutionModal({
  isOpen,
  onClose,
  institutions,
  onSuccess,
}: CreateFacultyWithInstitutionModalProps) {
  const [formData, setFormData] = useState<CreateFacultyPayload & { institutionId: string }>({
    institutionId: "",
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredInstitutions = institutions.filter((inst) =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.institutionId) {
      setError("Please select an institution");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await facultiesApi.create(formData.institutionId, {
        name: formData.name,
        description: formData.description,
      });
      
      setFormData({ institutionId: "", name: "", description: "" });
      setSearchQuery("");
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to create faculty");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ institutionId: "", name: "", description: "" });
    setSearchQuery("");
    setError(null);
    onClose();
  };

  const handleSelectInstitution = (institution: Institution) => {
    setFormData({ ...formData, institutionId: institution.id });
    setSearchQuery(institution.name);
    setIsDropdownOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Faculty">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="relative">
          <label
            htmlFor="institution"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Institution *
          </label>
          <input
            type="text"
            id="institution"
            required
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
              if (!e.target.value) {
                setFormData({ ...formData, institutionId: "" });
              }
            }}
            onFocus={() => setIsDropdownOpen(true)}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            placeholder="Type to search institution..."
            autoComplete="off"
          />
          {isDropdownOpen && filteredInstitutions.length > 0 && (
            <div className="z-10 absolute bg-white dark:bg-gray-800 shadow-lg mt-1 border border-gray-300 dark:border-gray-600 rounded-lg w-full max-h-60 overflow-y-auto">
              {filteredInstitutions.map((inst) => (
                <div
                  key={inst.id}
                  onClick={() => handleSelectInstitution(inst)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 text-sm cursor-pointer"
                >
                  {inst.name}
                </div>
              ))}
            </div>
          )}
          {isDropdownOpen && searchQuery && filteredInstitutions.length === 0 && (
            <div className="z-10 absolute bg-white dark:bg-gray-800 shadow-lg mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-gray-500 dark:text-gray-400 text-sm">
              No institutions found
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Faculty Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            placeholder="Enter faculty name"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Description *
          </label>
          <textarea
            id="description"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm resize-none"
            placeholder="Enter faculty description"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg text-white text-sm"
          >
            {loading ? "Creating..." : "Create Faculty"}
          </button>
        </div>
      </form>
    </Modal>
  );
}