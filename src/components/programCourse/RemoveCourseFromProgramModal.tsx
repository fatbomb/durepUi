import { useState } from "react";
import { Course, ProgramCourse } from "../../types";

// RemoveCourseFromProgramModal.tsx
interface RemoveCourseFromProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  programCourse: ProgramCourse;
  courses: Course[];
  onConfirm: () => Promise<void>;
}

export function RemoveCourseFromProgramModal({ isOpen, onClose, programCourse, courses, onConfirm }: RemoveCourseFromProgramModalProps) {
  const [loading, setLoading] = useState(false);
  const course = courses.find((c) => String(c.id) === String(programCourse.course_id));

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl mx-4 p-6 rounded-lg w-full max-w-md">
        <div className="flex items-center mb-4">
          <div className="flex justify-center items-center bg-red-100 mr-4 rounded-full w-12 h-12">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="font-semibold text-xl">Remove Course</h2>
        </div>
        <p className="mb-4 text-sm">Are you sure you want to remove <strong>{course?.name}</strong> from this program?</p>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-lg text-sm" disabled={loading}>Cancel</button>
          <button type="button" onClick={handleConfirm} disabled={loading} className="bg-red-600 px-4 py-2 rounded-lg text-white text-sm">{loading ? "Removing..." : "Remove Course"}</button>
        </div>
      </div>
    </div>
  );
}
