// ============================================
// CreateProgramModal.tsx
// ============================================
import React, { useState } from "react";
import type { CreateProgramPayload, Program } from "../../types/api.types";

interface CreateProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProgramPayload) => Promise<Program | null>;
}

export function CreateProgramModal({ isOpen, onClose, onSubmit }: CreateProgramModalProps) {
  const [formData, setFormData] = useState<CreateProgramPayload>({
    title: "",
    description: "",
    program_level: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await onSubmit(formData);
      if (result) {
        setFormData({ title: "", description: "", program_level: "" });
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl mx-4 p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white text-xl">Create Program</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Program Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full dark:text-white"
                placeholder="e.g., BSc Computer Science"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Program Level *</label>
              <select
                value={formData.program_level}
                onChange={(e) => setFormData({ ...formData, program_level: e.target.value })}
                required
                className="dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full dark:text-white"
              >
                <option value="">Select level</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="diploma">Diploma</option>
                <option value="certificate">Certificate</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full dark:text-white"
                placeholder="Enter program description"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 text-sm" disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm">
              {loading ? "Creating..." : "Create Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}