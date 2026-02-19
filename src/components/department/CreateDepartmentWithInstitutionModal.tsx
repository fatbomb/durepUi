import React, { useState, useEffect, useRef } from "react";
import type {
  CreateDepartmentPayload,
  Institution,
  Faculty,
} from "../../types/api.types";
import { toast } from "react-toastify";
import { useFaculties } from "../../hooks/useFaculties";
import { useDepartments } from "../../hooks/useDepartments";

interface CreateDepartmentWithInstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutions: Institution[];
  onSuccess: () => void;
}

export default function CreateDepartmentWithInstitutionModal({
  isOpen,
  onClose,
  institutions,
  onSuccess,
}: CreateDepartmentWithInstitutionModalProps) {
  const [formData, setFormData] = useState<
    CreateDepartmentPayload & { institution_id: string }
  >({
    name: "",
    description: "",
    faculty_id: "",
    institution_id: "",
  });

  // Call hooks at the top level
  const { faculties, loading: loadingFaculties } = useFaculties(
    formData.institution_id || ""
  );
  const { createDepartment } = useDepartments(formData.institution_id || "");
  
  const [loading, setLoading] = useState(false);
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [facultySearch, setFacultySearch] = useState("");
  const [isInstitutionDropdownOpen, setIsInstitutionDropdownOpen] = useState(false);
  const [isFacultyDropdownOpen, setIsFacultyDropdownOpen] = useState(false);

  const institutionRef = useRef<HTMLDivElement>(null);
  const facultyRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (institutionRef.current && !institutionRef.current.contains(event.target as Node)) {
        setIsInstitutionDropdownOpen(false);
      }
      if (facultyRef.current && !facultyRef.current.contains(event.target as Node)) {
        setIsFacultyDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredInstitutions = institutions.filter((inst) =>
    inst.name.toLowerCase().includes(institutionSearch.toLowerCase())
  );

  const filteredFaculties = faculties.filter((fac) =>
    fac.name.toLowerCase().includes(facultySearch.toLowerCase())
  );

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.institution_id) {
      toast.error("Please select an institution");
      return;
    }

    if (!formData.faculty_id) {
      toast.error("Please select a faculty");
      return;
    }

    setLoading(true);
    try {
      await createDepartment({
        name: formData.name,
        description: formData.description,
        faculty_id: formData.faculty_id,
      });

      toast.success("Department created successfully");

      setFormData({
        name: "",
        description: "",
        faculty_id: "",
        institution_id: "",
      });
      setInstitutionSearch("");
      setFacultySearch("");

      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Failed to create department");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      faculty_id: "",
      institution_id: "",
    });
    setInstitutionSearch("");
    setFacultySearch("");
    onClose();
  };

  const handleSelectInstitution = (institution: Institution) => {
    setFormData({
      ...formData,
      institution_id: institution.id,
      faculty_id: "",
    });
    setInstitutionSearch(institution.name);
    setFacultySearch("");
    setIsInstitutionDropdownOpen(false);
  };

  const handleSelectFaculty = (faculty: Faculty) => {
    setFormData({ ...formData, faculty_id: faculty.id });
    setFacultySearch(faculty.name);
    setIsFacultyDropdownOpen(false);
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-end sm:items-center bg-black bg-opacity-50 p-0 sm:p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-lg rounded-t-2xl w-full sm:max-w-md max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        {/* Header - Sticky on mobile */}
        <div className="top-0 sticky bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 sm:py-5 border-gray-200 dark:border-gray-700 border-b">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white text-lg sm:text-xl">
              Create Department
            </h2>
            <button
              onClick={handleClose}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              disabled={loading}
            >
              <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          <div className="space-y-4 sm:space-y-5">
            {/* Institution Searchable Dropdown */}
            <div className="relative" ref={institutionRef}>
              <label
                htmlFor="institution_id"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                Institution <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="institution_id"
                value={institutionSearch}
                onChange={(e) => {
                  setInstitutionSearch(e.target.value);
                  setIsInstitutionDropdownOpen(true);
                  if (!e.target.value) {
                    setFormData({
                      ...formData,
                      institution_id: "",
                      faculty_id: "",
                    });
                    setFacultySearch("");
                  }
                }}
                onFocus={() => setIsInstitutionDropdownOpen(true)}
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base"
                placeholder="Type to search institution..."
                autoComplete="off"
                required
              />
              {isInstitutionDropdownOpen && filteredInstitutions.length > 0 && (
                <div className="z-10 absolute bg-white dark:bg-gray-700 shadow-lg mt-1 border border-gray-300 dark:border-gray-600 rounded-lg w-full max-h-60 overflow-y-auto">
                  {filteredInstitutions.map((inst) => (
                    <div
                      key={inst.id}
                      onClick={() => handleSelectInstitution(inst)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-2.5 text-gray-700 dark:text-gray-200 text-sm sm:text-base cursor-pointer"
                    >
                      {inst.name}
                    </div>
                  ))}
                </div>
              )}
              {isInstitutionDropdownOpen && institutionSearch && filteredInstitutions.length === 0 && (
                <div className="z-10 absolute bg-white dark:bg-gray-700 shadow-lg mt-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                  No institutions found
                </div>
              )}
            </div>

            {/* Faculty Searchable Dropdown */}
            <div className="relative" ref={facultyRef}>
              <label
                htmlFor="faculty_id"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                Faculty <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="faculty_id"
                value={facultySearch}
                onChange={(e) => {
                  setFacultySearch(e.target.value);
                  setIsFacultyDropdownOpen(true);
                  if (!e.target.value) {
                    setFormData({ ...formData, faculty_id: "" });
                  }
                }}
                onFocus={() => setIsFacultyDropdownOpen(true)}
                disabled={!formData.institution_id || loadingFaculties}
                className="dark:bg-gray-700 focus:ring-opacity-50 disabled:opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base disabled:cursor-not-allowed"
                placeholder={
                  loadingFaculties
                    ? "Loading faculties..."
                    : "Type to search faculty..."
                }
                autoComplete="off"
                required
              />
              {isFacultyDropdownOpen && !loadingFaculties && filteredFaculties.length > 0 && (
                <div className="z-10 absolute bg-white dark:bg-gray-700 shadow-lg mt-1 border border-gray-300 dark:border-gray-600 rounded-lg w-full max-h-60 overflow-y-auto">
                  {filteredFaculties.map((fac) => (
                    <div
                      key={fac.id}
                      onClick={() => handleSelectFaculty(fac)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-2.5 text-gray-700 dark:text-gray-200 text-sm sm:text-base cursor-pointer"
                    >
                      {fac.name}
                    </div>
                  ))}
                </div>
              )}
              {isFacultyDropdownOpen && facultySearch && !loadingFaculties && filteredFaculties.length === 0 && (
                <div className="z-10 absolute bg-white dark:bg-gray-700 shadow-lg mt-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                  No faculties found
                </div>
              )}
            </div>

            {/* Department Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                Department Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base"
                placeholder="e.g., Department of Computer Science"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={3}
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base resize-none"
                placeholder="Enter department description"
              />
            </div>
          </div>

          {/* Action Buttons - Sticky on mobile */}
          <div className="flex sm:flex-row flex-col-reverse sm:justify-end gap-3 mt-6 sm:mt-8 pb-safe">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2.5 sm:py-3 rounded-lg w-full sm:w-auto font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base transition-colors"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 px-4 py-2.5 sm:py-3 rounded-lg w-full sm:w-auto font-medium text-white text-sm sm:text-base transition-colors disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Department"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}