// CreateCourseModal.tsx
import { useState } from "react";
import type { CreateCoursePayload, Course } from "../../types/api.types";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCoursePayload) => Promise<Course | null>;
}

export function CreateCourseModal({ isOpen, onClose, onSubmit }: CreateCourseModalProps) {
  const [formData, setFormData] = useState<CreateCoursePayload>({
    name: "",
    course_code: "",
    description: "",
    credit_hours: 3,
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await onSubmit(formData);
      if (result) {
        setFormData({ name: "", course_code: "", description: "", credit_hours: 3 });
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl mx-4 p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-semibold text-xl">Create Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Course Code *</label>
              <input type="text" value={formData.course_code} onChange={(e) => setFormData({ ...formData, course_code: e.target.value })} required className="dark:bg-gray-700 px-3 py-2 border rounded-lg w-full" placeholder="e.g., CS101" />
            </div>
            <div>
              <label className="block mb-2 text-sm">Course Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="dark:bg-gray-700 px-3 py-2 border rounded-lg w-full" placeholder="e.g., Introduction to Programming" />
            </div>
            <div>
              <label className="block mb-2 text-sm">Credit Hours *</label>
              <input type="number" min="1" max="12" value={formData.credit_hours} onChange={(e) => setFormData({ ...formData, credit_hours: parseInt(e.target.value) })} required className="dark:bg-gray-700 px-3 py-2 border rounded-lg w-full" />
            </div>
            <div>
              <label className="block mb-2 text-sm">Description *</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={3} className="dark:bg-gray-700 px-3 py-2 border rounded-lg w-full" />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-lg text-sm" disabled={loading}>Cancel</button>
            <button type="submit" disabled={loading} className="bg-blue-600 px-4 py-2 rounded-lg text-white text-sm">{loading ? "Creating..." : "Create Course"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}