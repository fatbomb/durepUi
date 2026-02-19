import React, { useState, useEffect } from "react";
import Modal from "../common/modal";
import type { Institution, UpdateInstitutionPayload } from "../../types/api.types";

interface EditInstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  institution: Institution;
  onSubmit: (data: UpdateInstitutionPayload) => Promise<any>;
}

export default function EditInstitutionModal({
  isOpen,
  onClose,
  institution,
  onSubmit,
}: EditInstitutionModalProps) {
  const [formData, setFormData] = useState<UpdateInstitutionPayload>({
    name: institution.name,
    description: institution.description,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData({
      name: institution.name,
      description: institution.description,
    });
  }, [institution]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update institution");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: institution.name,
      description: institution.description,
    });
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Institution">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Institution Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            placeholder="Enter institution name"
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
            placeholder="Enter institution description"
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
            {loading ? "Updating..." : "Update Institution"}
          </button>
        </div>
      </form>
    </Modal>
  );
}