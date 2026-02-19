// AddCourseToProgramBulkModal.tsx
import { useState } from "react";
import type { Course, CreateProgramCoursePayload, Program, ProgramCourse } from "../../types/api.types";

interface AddCourseToProgramBulkModalProps {
  isOpen: boolean;
  onClose: () => void;
  programs: Program[];
  courses: Course[];
  existingProgramCourses: ProgramCourse[];
  onSubmit: (data: CreateProgramCoursePayload) => Promise<ProgramCourse | null>;
}

export function AddCourseToProgramBulkModal({ isOpen, onClose, programs, courses, existingProgramCourses, onSubmit }: AddCourseToProgramBulkModalProps) {
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const availableCourses = courses.filter((course) => 
    !existingProgramCourses.some((pc) => pc.program_id === selectedProgramId && pc.course_id === course.id)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ program_id: selectedProgramId, course_id: selectedCourseId });
      setSelectedProgramId("");
      setSelectedCourseId("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl mx-4 p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-semibold text-xl">Add Course to Program</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Select Program *</label>
              <select value={selectedProgramId} onChange={(e) => { setSelectedProgramId(e.target.value); setSelectedCourseId(""); }} required className="dark:bg-gray-700 px-3 py-2 border rounded-lg w-full">
                <option value="">Choose a program</option>
                {programs.map((prog) => (
                  <option key={prog.id} value={prog.id}>{prog.title} ({prog.department_name})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm">Select Course *</label>
              <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)} required disabled={!selectedProgramId} className="dark:bg-gray-700 px-3 py-2 border rounded-lg w-full">
                <option value="">Choose a course</option>
                {availableCourses.map((course) => (
                  <option key={course.id} value={course.id}>{course.course_code} - {course.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-lg text-sm" disabled={loading}>Cancel</button>
            <button type="submit" disabled={loading} className="bg-blue-600 px-4 py-2 rounded-lg text-white text-sm">{loading ? "Adding..." : "Add Course"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}