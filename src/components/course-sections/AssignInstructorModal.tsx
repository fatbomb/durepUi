import React, { useState, useEffect } from "react";
import Modal from "../common/modal";
import type { 
  CourseInstructor,
  CreateCourseInstructorPayload,
  User
} from "../../types/api.types";
import { UserCircle, Search } from "lucide-react";

interface AssignInstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCourseInstructorPayload) => Promise<any>;
  sectionId: string;
  sectionName: string;
  currentInstructors?: CourseInstructor[];
}

export default function AssignInstructorModal({
  isOpen,
  onClose,
  onSubmit,
  sectionId,
  sectionName,
  currentInstructors = [],
}: AssignInstructorModalProps) {
  // Mock faculty/instructor users - in real app, fetch from API
  const availableInstructors: User[] = [
    { id: "user-1", email: "jane.smith@university.edu", created_at: "", updated_at: "" },
    { id: "user-2", email: "john.doe@university.edu", created_at: "", updated_at: "" },
    { id: "user-3", email: "sarah.johnson@university.edu", created_at: "", updated_at: "" },
    { id: "user-4", email: "michael.brown@university.edu", created_at: "", updated_at: "" },
    { id: "user-5", email: "emily.davis@university.edu", created_at: "", updated_at: "" },
  ];

  const [formData, setFormData] = useState<CreateCourseInstructorPayload>({
    section_id: sectionId,
    user_id: "",
    role: "primary",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData({
        section_id: sectionId,
        user_id: "",
        role: "primary",
      });
      setError(null);
      setSearchQuery("");
    }
  }, [isOpen, sectionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.user_id) {
      setError("Please select an instructor");
      setLoading(false);
      return;
    }

    // Check if instructor already assigned
    const alreadyAssigned = currentInstructors.some(
      (instructor) => instructor.user_id === formData.user_id
    );

    if (alreadyAssigned) {
      setError("This instructor is already assigned to this section");
      setLoading(false);
      return;
    }

    // Check if primary instructor already exists when trying to assign primary
    if (formData.role === "primary") {
      const hasPrimary = currentInstructors.some(
        (instructor) => instructor.role === "primary"
      );
      if (hasPrimary) {
        setError("This section already has a primary instructor. Please choose Assistant or TA role.");
        setLoading(false);
        return;
      }
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to assign instructor");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      section_id: sectionId,
      user_id: "",
      role: "primary",
    });
    setError(null);
    setSearchQuery("");
    onClose();
  };

  const filteredInstructors = availableInstructors.filter((instructor) =>
    instructor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInstructorName = (email: string) => {
    return email.split("@")[0].replace(".", " ").split(" ").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title="Assign Instructor"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Section Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="text-blue-900 dark:text-blue-300 text-sm">
            <span className="font-medium">Section:</span> {sectionName}
          </div>
        </div>

        {/* Current Instructors */}
        {currentInstructors.length > 0 && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">
              Current Instructors
            </h4>
            <div className="space-y-2">
              {currentInstructors.map((instructor) => (
                <div
                  key={instructor.id}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded"
                >
                  <div className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white text-sm">
                      {instructor.instructor_name || instructor.instructor_email}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium text-xs capitalize ${
                    instructor.role === 'primary'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      : instructor.role === 'assistant'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                  }`}>
                    {instructor.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Role Selection */}
        <div>
          <label
            htmlFor="role"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Instructor Role *
          </label>
          <select
            id="role"
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
          >
            <option value="primary">Primary Instructor</option>
            <option value="assistant">Assistant Instructor</option>
            <option value="ta">Teaching Assistant (TA)</option>
          </select>
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs">
            Primary instructor is the main teacher for this course section
          </p>
        </div>

        {/* Instructor Search */}
        <div>
          <label
            htmlFor="instructor-search"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Search Instructor *
          </label>
          <div className="relative mb-3">
            <input
              type="text"
              id="instructor-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by email..."
              className="dark:bg-gray-800 px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            />
            <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Instructor List */}
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg max-h-60 overflow-y-auto">
            {filteredInstructors.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                No instructors found
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredInstructors.map((instructor) => {
                  const isAssigned = currentInstructors.some(
                    (ci) => ci.user_id === instructor.id
                  );
                  return (
                    <label
                      key={instructor.id}
                      className={`flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                        isAssigned ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="instructor"
                        value={instructor.id}
                        checked={formData.user_id === instructor.id}
                        onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                        disabled={isAssigned}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                          <UserCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {getInstructorName(instructor.email)}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs">
                            {instructor.email}
                          </div>
                        </div>
                        {isAssigned && (
                          <span className="text-gray-500 dark:text-gray-400 text-xs">
                            Already assigned
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
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
            {loading ? "Assigning..." : "Assign Instructor"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
