import React, { useState, useEffect } from "react";
import Modal from "../common/modal";
import type { CreateAcademicTermPayload, AcademicTerm, UpdateAcademicTermPayload } from "../../types/api.types";

interface CreateTermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAcademicTermPayload | UpdateAcademicTermPayload) => Promise<any>;
  editingTerm?: AcademicTerm | null;
}

export default function CreateTermModal({
  isOpen,
  onClose,
  onSubmit,
  editingTerm = null,
}: CreateTermModalProps) {
  const currentYear = new Date().getFullYear();
  
  const [formData, setFormData] = useState<CreateAcademicTermPayload>({
    name: "",
    term_type: "fall",
    year: currentYear,
    start_date: "",
    end_date: "",
    registration_start_date: "",
    registration_end_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingTerm) {
      setFormData({
        name: editingTerm.name,
        term_type: editingTerm.term_type,
        year: editingTerm.year,
        start_date: editingTerm.start_date.split('T')[0],
        end_date: editingTerm.end_date.split('T')[0],
        registration_start_date: editingTerm.registration_start_date.split('T')[0],
        registration_end_date: editingTerm.registration_end_date.split('T')[0],
      });
    } else {
      setFormData({
        name: "",
        term_type: "fall",
        year: currentYear,
        start_date: "",
        end_date: "",
        registration_start_date: "",
        registration_end_date: "",
      });
    }
    setError(null);
  }, [editingTerm, isOpen, currentYear]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate dates
    if (new Date(formData.start_date) >= new Date(formData.end_date)) {
      setError("End date must be after start date");
      setLoading(false);
      return;
    }

    if (new Date(formData.registration_start_date) >= new Date(formData.registration_end_date)) {
      setError("Registration end date must be after registration start date");
      setLoading(false);
      return;
    }

    if (new Date(formData.registration_end_date) > new Date(formData.start_date)) {
      setError("Registration must end before term starts");
      setLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
      handleClose();
    } catch (err: any) {
      setError(err.message || `Failed to ${editingTerm ? 'update' : 'create'} academic term`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      term_type: "fall",
      year: currentYear,
      start_date: "",
      end_date: "",
      registration_start_date: "",
      registration_end_date: "",
    });
    setError(null);
    onClose();
  };

  // Auto-generate term name based on type and year
  useEffect(() => {
    if (formData.term_type && formData.year) {
      const termName = `${formData.term_type.charAt(0).toUpperCase() + formData.term_type.slice(1)} ${formData.year}`;
      setFormData(prev => ({ ...prev, name: termName }));
    }
  }, [formData.term_type, formData.year]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={editingTerm ? "Edit Academic Term" : "Create New Academic Term"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="term_type"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Term Type *
            </label>
            <select
              id="term_type"
              required
              value={formData.term_type}
              onChange={(e) => setFormData({ ...formData, term_type: e.target.value as 'fall' | 'spring' | 'summer' })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm capitalize"
            >
              <option value="fall">Fall</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="year"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Year *
            </label>
            <input
              type="number"
              id="year"
              required
              min={currentYear}
              max={currentYear + 5}
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Term Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            placeholder="Fall 2026"
          />
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs">
            Auto-generated based on type and year, but you can customize it
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">Term Period</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start_date"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Start Date *
              </label>
              <input
                type="date"
                id="start_date"
                required
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="end_date"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                End Date *
              </label>
              <input
                type="date"
                id="end_date"
                required
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">Registration Period</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="registration_start_date"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Registration Start *
              </label>
              <input
                type="date"
                id="registration_start_date"
                required
                value={formData.registration_start_date}
                onChange={(e) => setFormData({ ...formData, registration_start_date: e.target.value })}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="registration_end_date"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Registration End *
              </label>
              <input
                type="date"
                id="registration_end_date"
                required
                value={formData.registration_end_date}
                onChange={(e) => setFormData({ ...formData, registration_end_date: e.target.value })}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              />
            </div>
          </div>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-xs">
            Registration period should end before the term starts
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors"
          >
            {loading ? (editingTerm ? "Updating..." : "Creating...") : (editingTerm ? "Update Term" : "Create Term")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
