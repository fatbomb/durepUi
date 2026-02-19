import React, { useState, useEffect } from "react";
import Modal from "../common/modal";
import type { 
  CreateCourseSectionPayload, 
  CourseSection, 
  UpdateCourseSectionPayload,
  Course,
  AcademicTerm
} from "../../types/api.types";

interface CreateSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCourseSectionPayload | UpdateCourseSectionPayload) => Promise<any>;
  courses: Course[];
  terms: AcademicTerm[];
  editingSection?: CourseSection | null;
}

export default function CreateSectionModal({
  isOpen,
  onClose,
  onSubmit,
  courses,
  terms,
  editingSection = null,
}: CreateSectionModalProps) {
  const [formData, setFormData] = useState<CreateCourseSectionPayload>({
    course_id: "",
    term_id: "",
    section_number: "",
    capacity: 30,
    schedule: "",
    room: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingSection) {
      setFormData({
        course_id: editingSection.course_id,
        term_id: editingSection.term_id,
        section_number: editingSection.section_number,
        capacity: editingSection.capacity,
        schedule: editingSection.schedule || "",
        room: editingSection.room || "",
      });
    } else {
      setFormData({
        course_id: "",
        term_id: "",
        section_number: "",
        capacity: 30,
        schedule: "",
        room: "",
      });
    }
    setError(null);
  }, [editingSection, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate capacity
    if (formData.capacity < 1) {
      setError("Capacity must be at least 1");
      setLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
      handleClose();
    } catch (err: any) {
      setError(err.message || `Failed to ${editingSection ? 'update' : 'create'} course section`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      course_id: "",
      term_id: "",
      section_number: "",
      capacity: 30,
      schedule: "",
      room: "",
    });
    setError(null);
    onClose();
  };

  // Auto-generate section number suggestion
  const generateSectionNumber = () => {
    const count = Math.floor(Math.random() * 99) + 1;
    return `SEC${count.toString().padStart(3, '0')}`;
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={editingSection ? "Edit Course Section" : "Create New Course Section"}
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
              htmlFor="course_id"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Course *
            </label>
            <select
              id="course_id"
              required
              disabled={!!editingSection}
              value={formData.course_id}
              onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm disabled:opacity-50"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="term_id"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Academic Term *
            </label>
            <select
              id="term_id"
              required
              disabled={!!editingSection}
              value={formData.term_id}
              onChange={(e) => setFormData({ ...formData, term_id: e.target.value })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm disabled:opacity-50"
            >
              <option value="">Select Term</option>
              {terms.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="section_number"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Section Number *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="section_number"
                required
                value={formData.section_number}
                onChange={(e) => setFormData({ ...formData, section_number: e.target.value })}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1 dark:text-white text-sm"
                placeholder="SEC001"
              />
              {!editingSection && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, section_number: generateSectionNumber() })}
                  className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 text-xs transition-colors"
                >
                  Generate
                </button>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="capacity"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Capacity *
            </label>
            <input
              type="number"
              id="capacity"
              required
              min={1}
              max={500}
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="schedule"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Schedule
          </label>
          <input
            type="text"
            id="schedule"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            placeholder="MWF 10:00-11:00 AM"
          />
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs">
            Example: MWF 10:00-11:00 AM, TR 2:00-3:30 PM
          </p>
        </div>

        <div>
          <label
            htmlFor="room"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Room
          </label>
          <input
            type="text"
            id="room"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            placeholder="Building A - Room 101"
          />
        </div>

        {editingSection && (
          <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-400 text-xs">
            Note: Course and Term cannot be changed after creation. To assign to a different course or term, please create a new section.
          </div>
        )}

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
            {loading ? (editingSection ? "Updating..." : "Creating...") : (editingSection ? "Update Section" : "Create Section")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
