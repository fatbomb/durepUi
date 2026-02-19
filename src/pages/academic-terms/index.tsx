import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { academicTermsApi } from "../../api/academicTerms.api";
import { courseSectionsApi } from "../../api/courseSections.api";
import AccessDenied from "../../components/common/AcessDenied";
import type { AcademicTerm } from "../../types/api.types";
import { Plus, Search, ArrowRightLeft } from "lucide-react";
import TermTable from "../../components/academic-terms/TermTable";
import CreateTermModal from "../../components/academic-terms/CreateTermModal";
import CourseToTermDragDrop from "../../components/academic-terms/CourseToTermDragDrop";
import { useCourses } from "../../hooks/useCourses";

export default function AcademicTermsPage() {
  const { isAdmin, isSuperAdmin } = useAuth();
  const { courses } = useCourses();
  
  const [terms, setTerms] = useState<AcademicTerm[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<AcademicTerm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [termTypeFilter, setTermTypeFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<AcademicTerm | null>(null);
  const [showDragDrop, setShowDragDrop] = useState(false);
  const [selectedTermForDragDrop, setSelectedTermForDragDrop] = useState<AcademicTerm | null>(null);
  const [existingSections, setExistingSections] = useState<any[]>([]);

  // Access control
  if (!isAdmin && !isSuperAdmin) {
    return <AccessDenied />;
  }

  // Fetch terms
  useEffect(() => {
    const fetchTerms = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await academicTermsApi.getAll();
        // Sort by year and term type
        const sorted = data.sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year;
          const termOrder = { spring: 0, summer: 1, fall: 2 };
          return termOrder[a.term_type] - termOrder[b.term_type];
        });
        setTerms(sorted);
        setFilteredTerms(sorted);
      } catch (err: any) {
        setError(err.message || "Failed to fetch academic terms");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  // Filter terms
  useEffect(() => {
    let filtered = terms;

    if (statusFilter) {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    if (termTypeFilter) {
      filtered = filtered.filter(t => t.term_type === termTypeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.year.toString().includes(searchQuery)
      );
    }

    setFilteredTerms(filtered);
  }, [statusFilter, termTypeFilter, searchQuery, terms]);

  const handleCreateTerm = async (data: any) => {
    try {
      await academicTermsApi.create(data);
      // Refresh terms
      const updatedTerms = await academicTermsApi.getAll();
      const sorted = updatedTerms.sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year;
        const termOrder = { spring: 0, summer: 1, fall: 2 };
        return termOrder[a.term_type] - termOrder[b.term_type];
      });
      setTerms(sorted);
      setIsCreateModalOpen(false);
    } catch (err: any) {
      throw err;
    }
  };

  const handleEditTerm = async (data: any) => {
    if (!editingTerm) return;
    try {
      await academicTermsApi.update(editingTerm.id, data);
      // Refresh terms
      const updatedTerms = await academicTermsApi.getAll();
      const sorted = updatedTerms.sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year;
        const termOrder = { spring: 0, summer: 1, fall: 2 };
        return termOrder[a.term_type] - termOrder[b.term_type];
      });
      setTerms(sorted);
      setEditingTerm(null);
    } catch (err: any) {
      throw err;
    }
  };

  const handleDeleteTerm = async (term: AcademicTerm) => {
    if (!window.confirm(`Are you sure you want to delete ${term.name}?`)) {
      return;
    }

    try {
      await academicTermsApi.delete(term.id);
      setTerms(terms.filter(t => t.id !== term.id));
    } catch (err: any) {
      setError(err.message || "Failed to delete academic term");
    }
  };

  const handleEdit = (term: AcademicTerm) => {
    setEditingTerm(term);
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditingTerm(null);
  };

  const handleAddCourseToTerm = async (courseId: string, termId: string) => {
    try {
      // Generate a section number
      const sectionNumber = `SEC${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
      
      // Create a new course section
      await courseSectionsApi.create({
        course_id: courseId,
        term_id: termId,
        section_number: sectionNumber,
        capacity: 30,
      });
      
      // Show success message
      alert('Course section created successfully!');
    } catch (err: any) {
      setError(err.message || "Failed to create course section");
    }
  };

  const handleToggleDragDrop = async () => {
    setShowDragDrop(!showDragDrop);
    if (!showDragDrop) {
      // Set active term as default for drag drop
      const activeTerm = terms.find(t => t.status === 'active');
      const termToSelect = activeTerm || terms[0] || null;
      setSelectedTermForDragDrop(termToSelect);
      
      // Fetch existing sections for the selected term
      if (termToSelect) {
        try {
          const sections = await courseSectionsApi.getAll(termToSelect.id);
          setExistingSections(sections);
        } catch (err) {
          console.error('Failed to fetch existing sections:', err);
          setExistingSections([]);
        }
      }
    }
  };

  // Fetch sections when selected term changes in drag-drop
  useEffect(() => {
    const fetchSectionsForDragDrop = async () => {
      if (showDragDrop && selectedTermForDragDrop) {
        try {
          const sections = await courseSectionsApi.getAll(selectedTermForDragDrop.id);
          setExistingSections(sections);
        } catch (err) {
          console.error('Failed to fetch existing sections:', err);
          setExistingSections([]);
        }
      }
    };
    fetchSectionsForDragDrop();
  }, [selectedTermForDragDrop?.id, showDragDrop]);

  return (
    <div>
      <PageMeta title="Academic Terms" description="Manage academic terms" />

      <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-5 xl:px-10 py-5 sm:py-7 xl:py-12 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
        <div className="mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800 text-xl sm:text-2xl dark:text-white/90">
                Academic Terms
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage semesters and registration periods
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleToggleDragDrop}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>{showDragDrop ? 'Hide' : 'Add Courses'}</span>
              </button>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Term</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-6">
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
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="type-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Filter by Type
              </label>
              <select
                id="type-filter"
                value={termTypeFilter}
                onChange={(e) => setTermTypeFilter(e.target.value)}
                className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full dark:text-white text-sm capitalize"
              >
                <option value="">All Types</option>
                <option value="fall">Fall</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="search-filter"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
              >
                Search Terms
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-filter"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or year..."
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
            Showing {filteredTerms.length} of {terms.length} terms
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Drag and Drop Section */}
          {showDragDrop && (
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                  Select Term
                </label>
                <select
                  value={selectedTermForDragDrop?.id || ""}
                  onChange={(e) => {
                    const term = terms.find(t => t.id === e.target.value);
                    setSelectedTermForDragDrop(term || null);
                  }}
                  className="dark:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 max-w-md dark:text-white text-sm"
                >
                  <option value="">Select a term</option>
                  {terms.map((term) => (
                    <option key={term.id} value={term.id}>
                      {term.name} ({term.status})
                    </option>
                  ))}
                </select>
              </div>
              <CourseToTermDragDrop
                availableCourses={courses}
                selectedTerm={selectedTermForDragDrop}
                existingSections={existingSections}
                onAddCourseToTerm={handleAddCourseToTerm}
              />
            </div>
          )}

          <TermTable
            terms={filteredTerms}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteTerm}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>

      <CreateTermModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingTerm ? handleEditTerm : handleCreateTerm}
        editingTerm={editingTerm}
      />
    </div>
  );
}
