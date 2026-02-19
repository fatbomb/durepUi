import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { studentsApi } from "../../api/students.api";
import { useDepartments } from "../../hooks/useDepartments";
import AccessDenied from "../../components/common/AcessDenied";
import type { Student } from "../../types/api.types";
import { Plus, Search} from "lucide-react";
import StudentTable from "../../components/students/StudentTable";
import CreateStudentModal from "../../components/students/CreateStudentModal";

export default function StudentsPage() {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { departments } = useDepartments();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Access control
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await studentsApi.getAll();
        // Enrich with department names
        const enriched = data.map(student => {
          const dept = departments.find(d => d.id === student.department_id);
          return { ...student, department_name: dept?.name };
        });
        setStudents(enriched);
        setFilteredStudents(enriched);
      } catch (err: any) {
        setError(err.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [departments]);

  // Filter students
  useEffect(() => {
    let filtered = students;

    if (selectedDepartment) {
      filtered = filtered.filter(s => s.department_id === selectedDepartment);
    }

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [selectedDepartment, searchQuery, students]);

  const handleCreateStudent = async (data: any) => {
    try {
      await studentsApi.create(data);
      // Refresh students
      const updatedStudents = await studentsApi.getAll();
      const enriched = updatedStudents.map(student => {
        const dept = departments.find(d => d.id === student.department_id);
        return { ...student, department_name: dept?.name };
      });
      setStudents(enriched);
      setIsCreateModalOpen(false);
    } catch (err: any) {
      throw err;
    }
  };

  const handleViewStudent = (student: Student) => {
    navigate(`/students/${student.id}`);
  };

  const handleDeleteStudent = async (student: Student) => {
    if (!window.confirm(`Are you sure you want to delete ${student.first_name} ${student.last_name}?`)) {
      return;
    }

    try {
      await studentsApi.delete(student.id);
      setStudents(students.filter(s => s.id !== student.id));
    } catch (err: any) {
      setError(err.message || "Failed to delete student");
    }
  };

  return (
    <div>
      <PageMeta title="Student Management" description="Manage students" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-xl sm:text-2xl">
                Student Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Register and manage students
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto font-medium text-white text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Register Student</span>
            </button>
          </div>

          {/* Filters */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-6">
            <div>
              <label
                htmlFor="department-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Filter by Department
              </label>
              <select
                id="department-filter"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="search-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Search Students
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-filter"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, ID, or email..."
                  className="dark:bg-gray-800 px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
                />
                <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm">
            Showing {filteredStudents.length} of {students.length} students
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <StudentTable
            students={filteredStudents}
            loading={loading}
            onView={handleViewStudent}
            onDelete={handleDeleteStudent}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateStudentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateStudent}
        departments={departments}
      />
    </div>
  );
}
