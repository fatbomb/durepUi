import { useState, useEffect } from 'react';
import { coursesApi } from '../api/courses.api';
import type {
  Course,
  CreateCoursePayload,
  UpdateCoursePayload,
  ApiError,
  PaginationParams,
} from '../types/api.types';
import { toast } from 'react-toastify';

export const useCourses = (
  params?: PaginationParams,
  autoFetch = true
) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesApi.getAll(params);
      setCourses(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchCourses();
    }
  }, [params?.offset, params?.limit, params?.filter]);

  const createCourse = async (
    data: CreateCoursePayload
  ): Promise<Course | null> => {
    setLoading(true);
    setError(null);
    try {
      const course = await coursesApi.create(data);
      setCourses((prev) => [...prev, course]);
      toast.success('Course created successfully');
      return course;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to create course');
      toast.error(apiError.message || 'Failed to create course');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (
    id: string,
    data: UpdateCoursePayload
  ): Promise<Course | null> => {
    setLoading(true);
    setError(null);
    try {
      const course = await coursesApi.update(id, data);
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? course : c))
      );
      toast.success('Course updated successfully');
      return course;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update course');
      toast.error(apiError.message || 'Failed to update course');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await coursesApi.delete(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast.success('Course deleted successfully');
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to delete course');
      toast.error(apiError.message || 'Failed to delete course');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};