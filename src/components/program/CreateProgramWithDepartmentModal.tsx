import { useState, useEffect, useRef } from "react";
import type { CreateProgramPayload, Department, Institution } from "../../types/api.types";
import { toast } from "react-toastify";
import { usePrograms } from "../../hooks/usePrograms";
import { useDepartments } from "../../hooks/useDepartments";

interface CreateProgramWithDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutions: Institution[];
  onSuccess: () => void;
}

export function CreateProgramWithDepartmentModal({ 
  isOpen, 
  onClose, 
  institutions, 
  onSuccess 
}: CreateProgramWithDepartmentModalProps) {
  const [formData, setFormData] = useState<CreateProgramPayload & { department_id: string; institution_id: string }>({
    title: "",
    description: "",
    program_level: "",
    department_id: "",
    institution_id: "",
  });
  
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [isInstitutionDropdownOpen, setIsInstitutionDropdownOpen] = useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);

  const institutionRef = useRef<HTMLDivElement>(null);
  const departmentRef = useRef<HTMLDivElement>(null);

  // Fetch departments based on selected institution
  const { departments, loading: loadingDepartments } = useDepartments(formData.institution_id || "");
  
  // Use the hook with the selected department
  const { createProgram, loading } = usePrograms(formData.department_id || null, undefined);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (institutionRef.current && !institutionRef.current.contains(event.target as Node)) {
        setIsInstitutionDropdownOpen(false);
      }
      if (departmentRef.current && !departmentRef.current.contains(event.target as Node)) {
        setIsDepartmentDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredInstitutions = institutions.filter((inst) =>
    inst.name.toLowerCase().includes(institutionSearch.toLowerCase())
  );

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.institution_id) {
      toast.error("Please select an institution");
      return;
    }

    if (!formData.department_id) {
      toast.error("Please select a department");
      return;
    }

    const result = await createProgram({
      title: formData.title,
      description: formData.description,
      program_level: formData.program_level,
    });

    if (result) {
      setFormData({ 
        title: "", 
        description: "", 
        program_level: "", 
        department_id: "",
        institution_id: "" 
      });
      setInstitutionSearch("");
      setDepartmentSearch("");
      onSuccess();
    }
  };

  const handleClose = () => {
    setFormData({ 
      title: "", 
      description: "", 
      program_level: "", 
      department_id: "",
      institution_id: "" 
    });
    setInstitutionSearch("");
    setDepartmentSearch("");
    onClose();
  };

  const handleSelectInstitution = (institution: Institution) => {
    setFormData({
      ...formData,
      institution_id: institution.id,
      department_id: "",
    });
    setInstitutionSearch(institution.name);
    setDepartmentSearch("");
    setIsInstitutionDropdownOpen(false);
  };

  const handleSelectDepartment = (department: Department) => {
    setFormData({ ...formData, department_id: department.id });
    setDepartmentSearch(department.name);
    setIsDepartmentDropdownOpen(false);
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-end sm:items-center bg-black bg-opacity-50 p-0 sm:p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-lg rounded-t-2xl w-full sm:max-w-md max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        {/* Header - Sticky on mobile */}
        <div className="top-0 sticky bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 sm:py-5 border-gray-200 dark:border-gray-700 border-b">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white text-lg sm:text-xl">
              Create Program
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
                      department_id: "",
                    });
                    setDepartmentSearch("");
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

            {/* Department Searchable Dropdown */}
            <div className="relative" ref={departmentRef}>
              <label
                htmlFor="department_id"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="department_id"
                value={departmentSearch}
                onChange={(e) => {
                  setDepartmentSearch(e.target.value);
                  setIsDepartmentDropdownOpen(true);
                  if (!e.target.value) {
                    setFormData({ ...formData, department_id: "" });
                  }
                }}
                onFocus={() => setIsDepartmentDropdownOpen(true)}
                disabled={!formData.institution_id || loadingDepartments}
                className="dark:bg-gray-700 focus:ring-opacity-50 disabled:opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base disabled:cursor-not-allowed"
                placeholder={
                  loadingDepartments
                    ? "Loading departments..."
                    : "Type to search department..."
                }
                autoComplete="off"
                required
              />
              {isDepartmentDropdownOpen && !loadingDepartments && filteredDepartments.length > 0 && (
                <div className="z-10 absolute bg-white dark:bg-gray-700 shadow-lg mt-1 border border-gray-300 dark:border-gray-600 rounded-lg w-full max-h-60 overflow-y-auto">
                  {filteredDepartments.map((dept) => (
                    <div
                      key={dept.id}
                      onClick={() => handleSelectDepartment(dept)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-2.5 text-gray-700 dark:text-gray-200 text-sm sm:text-base cursor-pointer"
                    >
                      {dept.name}
                    </div>
                  ))}
                </div>
              )}
              {isDepartmentDropdownOpen && departmentSearch && !loadingDepartments && filteredDepartments.length === 0 && (
                <div className="z-10 absolute bg-white dark:bg-gray-700 shadow-lg mt-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                  No departments found
                </div>
              )}
            </div>

            {/* Program Title */}
            <div>
              <label
                htmlFor="title"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                Program Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base"
                placeholder="e.g., BSc Computer Science"
              />
            </div>

            {/* Program Level */}
            <div>
              <label
                htmlFor="program_level"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                Program Level <span className="text-red-500">*</span>
              </label>
              <select
                id="program_level"
                value={formData.program_level}
                onChange={(e) => setFormData({ ...formData, program_level: e.target.value })}
                required
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select level</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="diploma">Diploma</option>
                <option value="certificate">Certificate</option>
              </select>
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
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="dark:bg-gray-700 focus:ring-opacity-50 px-3 py-2.5 sm:py-3 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm sm:text-base resize-none"
                placeholder="Enter program description"
              />
            </div>
          </div>

          {/* Action Buttons */}
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
              {loading ? "Creating..." : "Create Program"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}