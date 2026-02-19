import React, { useState } from "react";
import Modal from "../common/modal";
import type { CreateStudentPayload, Department } from "../../types/api.types";

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStudentPayload) => Promise<any>;
  departments: Department[];
}

export default function CreateStudentModal({
  isOpen,
  onClose,
  onSubmit,
  departments,
}: CreateStudentModalProps) {
  const [formData, setFormData] = useState<CreateStudentPayload>({
    student_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
    department_id: "",
    enrollment_date: new Date().toISOString().split('T')[0],
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      setFormData({
        student_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        address: "",
        department_id: "",
        enrollment_date: new Date().toISOString().split('T')[0],
        password: "",
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to register student");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      student_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      address: "",
      department_id: "",
      enrollment_date: new Date().toISOString().split('T')[0],
      password: "",
    });
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Register New Student">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="student_id"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Student ID *
            </label>
            <input
              type="text"
              id="student_id"
              required
              value={formData.student_id}
              onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              placeholder="ST2024001"
            />
          </div>

          <div>
            <label
              htmlFor="department_id"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Department *
            </label>
            <select
              id="department_id"
              required
              value={formData.department_id}
              onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              First Name *
            </label>
            <input
              type="text"
              id="first_name"
              required
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              placeholder="John"
            />
          </div>

          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="last_name"
              required
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            placeholder="student@university.edu"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              placeholder="+1-555-0100"
            />
          </div>

          <div>
            <label
              htmlFor="date_of_birth"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
            >
              Date of Birth *
            </label>
            <input
              type="date"
              id="date_of_birth"
              required
              value={formData.date_of_birth}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
              className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Address
          </label>
          <textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={2}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm resize-none"
            placeholder="123 Main St, City, State"
          />
        </div>

        <div>
          <label
            htmlFor="enrollment_date"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Enrollment Date *
          </label>
          <input
            type="date"
            id="enrollment_date"
            required
            value={formData.enrollment_date}
            onChange={(e) => setFormData({ ...formData, enrollment_date: e.target.value })}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            Initial Password *
          </label>
          <input
            type="password"
            id="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
            placeholder="••••••••"
          />
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs">
            Student will use this to login for the first time
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
            {loading ? "Registering..." : "Register Student"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
