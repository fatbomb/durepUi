import { useState, useEffect } from 'react';
import { programCoursesApi } from '../api/programCourses.api';
import type {
  ProgramCourse,
  CreateProgramCoursePayload,
  UpdateProgramCoursePayload,
  ApiError,
  ProgramCourseFilterParams,
} from '../types/api.types';
import { toast } from 'react-toastify';

export const useProgramCourses = (
  params?: ProgramCourseFilterParams,
  autoFetch = true
) => {
  const [programCourses, setProgramCourses] = useState<ProgramCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgramCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await programCoursesApi.getAll(params);
      setProgramCourses(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch program courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProgramCourses();
    }
  }, [params?.offset, params?.limit, params?.program_id, params?.course_id]);

  const createProgramCourse = async (
    data: CreateProgramCoursePayload
  ): Promise<ProgramCourse | null> => {
    setLoading(true);
    setError(null);
    try {
      const programCourse = await programCoursesApi.create(data);
      setProgramCourses((prev) => [...prev, programCourse]);
      toast.success('Course added to program successfully');
      return programCourse;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to add course to program');
      toast.error(apiError.message || 'Failed to add course to program');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProgramCourse = async (
    id: string,
    data: UpdateProgramCoursePayload
  ): Promise<ProgramCourse | null> => {
    setLoading(true);
    setError(null);
    try {
      const programCourse = await programCoursesApi.update(id, data);
      setProgramCourses((prev) =>
        prev.map((pc) => (pc.id === id ? programCourse : pc))
      );
      toast.success('Program course updated successfully');
      return programCourse;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update program course');
      toast.error(apiError.message || 'Failed to update program course');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProgramCourse = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await programCoursesApi.delete(id);
      setProgramCourses((prev) => prev.filter((pc) => pc.id !== id));
      toast.success('Course removed from program successfully');
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to remove course from program');
      toast.error(apiError.message || 'Failed to remove course from program');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    programCourses,
    loading,
    error,
    fetchProgramCourses,
    createProgramCourse,
    updateProgramCourse,
    deleteProgramCourse,
  };
};