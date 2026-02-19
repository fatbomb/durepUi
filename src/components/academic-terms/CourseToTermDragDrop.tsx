import React, { useState, useEffect } from "react";
import type { Course, AcademicTerm, CourseSection } from "../../types/api.types";
import { GripVertical, Plus, X, CheckCircle, RefreshCw } from "lucide-react";

interface CourseToTermDragDropProps {
  availableCourses: Course[];
  selectedTerm: AcademicTerm | null;
  existingSections: CourseSection[];
  onAddCourseToTerm: (courseId: string, termId: string) => void;
}

export default function CourseToTermDragDrop({
  availableCourses,
  selectedTerm,
  existingSections,
  onAddCourseToTerm,
}: CourseToTermDragDropProps) {
  const [draggedCourse, setDraggedCourse] = useState<Course | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [addedCourses, setAddedCourses] = useState<Course[]>([]);

  // Reset added courses when term changes
  useEffect(() => {
    setAddedCourses([]);
  }, [selectedTerm?.id]);

  // Get existing course IDs for this term
  const existingCourseIds = existingSections.map(section => section.course_id);
  
  // Get existing courses info
  const existingCourses = availableCourses.filter(course => 
    existingCourseIds.includes(course.id)
  );

  const handleDragStart = (e: React.DragEvent, course: Course) => {
    setDraggedCourse(course);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("courseId", course.id);
  };

  const handleDragEnd = () => {
    setDraggedCourse(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const courseId = e.dataTransfer.getData("courseId");
    if (courseId && selectedTerm && draggedCourse) {
      // Check if course already added
      if (!addedCourses.find(c => c.id === courseId)) {
        setAddedCourses([...addedCourses, draggedCourse]);
        onAddCourseToTerm(courseId, selectedTerm.id);
      }
    }
    setDraggedCourse(null);
  };

  const handleRemoveCourse = (courseId: string) => {
    setAddedCourses(addedCourses.filter(c => c.id !== courseId));
  };

  if (!selectedTerm) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-400 text-sm">
        Please select an academic term to add courses
      </div>
    );
  }

  // Filter out already added courses AND existing courses
  const availableToAdd = availableCourses.filter(
    course => !addedCourses.find(added => added.id === course.id) &&
              !existingCourseIds.includes(course.id)
  );

  return (
    <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
      {/* Available Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Available Courses
          </h4>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {availableToAdd.length} available
          </span>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {availableToAdd.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
              {addedCourses.length > 0 
                ? "All courses have been added to this term" 
                : "No courses available"}
            </div>
          ) : (
            availableToAdd.map((course) => (
              <div
                key={course.id}
                draggable
                onDragStart={(e) => handleDragStart(e, course)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 rounded-lg cursor-move hover:border-blue-500 dark:hover:border-blue-500 transition-all ${
                  draggedCourse?.id === course.id ? 'opacity-50' : ''
                }`}
              >
                <GripVertical className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {course.course_code}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">
                    {course.name}
                  </div>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">
                  {course.credit_hours} credits
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Drop Zone */}
      <div>
        <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
          Courses in {selectedTerm.name}
        </h4>

        {/* Existing Courses from Database */}
        {existingCourses.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                  Existing Sections
                </h5>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                {existingCourses.length} section{existingCourses.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              {existingCourses.map((course) => {
                const courseSections = existingSections.filter(s => s.course_id === course.id);
                return (
                  <div
                    key={course.id}
                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                        <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {course.course_code}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">
                          {course.name} • {courseSections.length} section{courseSections.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Drop Zone for New Courses */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`min-h-64 border-2 border-dashed rounded-lg p-6 transition-all ${
            isDragOver
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30'
          }`}
        >
          {addedCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className={`mb-4 p-4 rounded-full ${
                isDragOver
                  ? 'bg-blue-100 dark:bg-blue-900/30'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                <Plus className={`w-8 h-8 ${
                  isDragOver
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400'
                }`} />
              </div>
              <h5 className="mb-2 font-medium text-gray-900 dark:text-white">
                {isDragOver ? 'Drop to add course' : 'Add New Courses'}
              </h5>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
                Drag a course from the left to create a new section
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                    Added to {selectedTerm.name}
                  </h5>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {addedCourses.length} course{addedCourses.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {addedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {course.course_code}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">
                          {course.name} • {course.credit_hours} credits
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveCourse(course.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 transition-colors ml-2"
                      title="Remove from list"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              {isDragOver && (
                <div className="border-2 border-dashed border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center mt-2">
                  <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    Drop to add another course
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 mt-4 px-4 py-3 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-900 dark:text-blue-300 text-xs">
            <strong>💡 Tip:</strong> Drag courses from the left to create new sections for {selectedTerm.name}.
            {addedCourses.length > 0 && (
              <span className="block mt-1 font-medium text-green-700 dark:text-green-400">
                ✓ {addedCourses.length} course section{addedCourses.length !== 1 ? 's' : ''} will be created!
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
