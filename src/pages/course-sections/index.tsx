import React, { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { courseSectionsApi } from "../../api/courseSections.api";
import { academicTermsApi } from "../../api/academicTerms.api";
import { instructorAssignmentsApi } from "../../api/instructorAssignments.api";
import AccessDenied from "../../components/common/AcessDenied";
import type { CourseSection, AcademicTerm, Course } from "../../types/api.types";
import { Plus, Search, UserPlus } from "lucide-react";
import SectionTable from "../../components/course-sections/SectionTable";
import CreateSectionModal from "../../components/course-sections/CreateSectionModal";
import AssignInstructorModal from "../../components/course-sections/AssignInstructorModal";
import { useCourses } from "../../hooks/useCourses";

export default function CourseSectionsPage() {
  const { isAdmin, isSuperAdmin } = useAuth();
  const { courses } = useCourses();
  
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [filteredSections, setFilteredSections] = useState<CourseSection[]>([]);
  const [terms, setTerms] = useState<AcademicTerm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [courseFilter, setCourseFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<CourseSection | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assigningSection, setAssigningSection] = useState<CourseSection | null>(null);

  // Access control
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  // Fetch terms
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const data = await academicTermsApi.getAll();
        const sorted = data.sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year;
          const termOrder = { spring: 0, summer: 1, fall: 2 };
          return termOrder[a.term_type] - termOrder[b.term_type];
        });
        setTerms(sorted);
        // Set active term as default
        const activeTerm = sorted.find(t => t.status === 'active');
        if (activeTerm) setSelectedTerm(activeTerm.id);
      } catch (err: any) {
        setError(err.message || "Failed to fetch terms");
      }
    };
    fetchTerms();
  }, []);

  // Fetch sections when term changes
  useEffect(() => {
    if (!selectedTerm) {
      setSections([]);
      setFilteredSections([]);
      return;
    }
    
    const fetchSections = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await courseSectionsApi.getAll(selectedTerm);
        // Enrich with course and term data
        const enriched = data.map(section => {
          const course = courses.find(c => c.id === section.course_id);
          const term = terms.find(t => t.id === section.term_id);
          return {
            ...section,
            course_name: course?.name,
            course_code: course?.course_code,
            term_name: term?.name,
          };
        });
        setSections(enriched);
        setFilteredSections(enriched);
      } catch (err: any) {
        setError(err.message || "Failed to fetch course sections");
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, [selectedTerm, courses, terms]);

  // Filter sections
  useEffect(() => {
    let filtered = sections;

    if (statusFilter) {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    if (courseFilter) {
      filtered = filtered.filter(s => s.course_id === courseFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.course_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.course_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.section_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.room?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSections(filtered);
  }, [statusFilter, courseFilter, searchQuery, sections]);

  const handleCreateSection = async (data: any) => {
    try {
      await courseSectionsApi.create(data);
      // Refresh sections for current term
      if (selectedTerm) {
        const updatedSections = await courseSectionsApi.getAll(selectedTerm);
        const enriched = updatedSections.map(section => {
          const course = courses.find(c => c.id === section.course_id);
          const term = terms.find(t => t.id === section.term_id);
          return {
            ...section,
            course_name: course?.name,
            course_code: course?.course_code,
            term_name: term?.name,
          };
        });
        setSections(enriched);
      }
      setIsCreateModalOpen(false);
    } catch (err: any) {
      throw err;
    }
  };

  const handleEditSection = async (data: any) => {
    if (!editingSection) return;
    try {
      await courseSectionsApi.update(editingSection.id, data);
      // Refresh sections for current term
      if (selectedTerm) {
        const updatedSections = await courseSectionsApi.getAll(selectedTerm);
        const enriched = updatedSections.map(section => {
          const course = courses.find(c => c.id === section.course_id);
          const term = terms.find(t => t.id === section.term_id);
          return {
            ...section,
            course_name: course?.name,
            course_code: course?.course_code,
            term_name: term?.name,
          };
        });
        setSections(enriched);
      }
      setEditingSection(null);
    } catch (err: any) {
      throw err;
    }
  };

  const handleDeleteSection = async (section: CourseSection) => {
    if (!window.confirm(`Are you sure you want to delete section ${section.section_number}?`)) {
      return;
    }

    try {
      await courseSectionsApi.delete(section.id);
      setSections(sections.filter(s => s.id !== section.id));
    } catch (err: any) {
      setError(err.message || "Failed to delete course section");
    }
  };

  const handleEdit = (section: CourseSection) => {
    setEditingSection(section);
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditingSection(null);
  };

  const handleAssignInstructor = (section: CourseSection) => {
    setAssigningSection(section);
    setIsAssignModalOpen(true);
  };

  const handleAssignInstructorSubmit = async (data: any) => {
    try {
      await instructorAssignmentsApi.create(data);
      // Optionally refresh sections or show success message
      setIsAssignModalOpen(false);
      setAssigningSection(null);
    } catch (err: any) {
      throw err;
    }
  };

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
    setAssigningSection(null);
  };

  return (
    <div>
      <PageMeta title="Course Sections" description="Manage course sections" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800 text-xl sm:text-2xl dark:text-white/90">
                Course Sections
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage course offerings by term
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              disabled={!selectedTerm}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create Section</span>
            </button>
          </div>

          {/* Filters */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mb-6">
            <div>
              <label
                htmlFor="term-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Academic Term *
              </label>
              <select
                id="term-filter"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              >
                <option value="">Select a term</option>
                {terms.map((term) => (
                  <option key={term.id} value={term.id}>
                    {term.name} ({term.status})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Filter by Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm capitalize"
              >
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="course-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Filter by Course
              </label>
              <select
                id="course-filter"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
              >
                <option value="">All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="search-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Search Sections
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-filter"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="dark:bg-gray-800 px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm"
                />
                <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          {selectedTerm && (
            <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm">
              Showing {filteredSections.length} of {sections.length} sections
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {!selectedTerm ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-400 text-sm">
              Please select an academic term to view course sections
            </div>
          ) : (
            <SectionTable
              sections={filteredSections}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDeleteSection}
              onAssignInstructor={handleAssignInstructor}
              isSuperAdmin={isSuperAdmin}
              isAdmin={isAdmin}
            />
          )}
        </div>
      </div>

      <CreateSectionModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingSection ? handleEditSection : handleCreateSection}
        courses={courses}
        terms={terms}
        editingSection={editingSection}
      />

      {assigningSection && (
        <AssignInstructorModal
          isOpen={isAssignModalOpen}
          onClose={handleCloseAssignModal}
          onSubmit={handleAssignInstructorSubmit}
          sectionId={assigningSection.id}
          sectionName={`${assigningSection.course_code} - ${assigningSection.section_number}`}
        />
      )}
    </div>
  );
}
