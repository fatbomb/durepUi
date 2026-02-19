import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Role = 'super' | 'admin' | 'faculty' | 'staff' | 'student';
export type DegreeType = 'BSc' | 'MSc' | 'BA' | 'MA' | 'PhD';

export interface User {
  id: string;
  created_at: string;
  updated_at: string | null;
  email: string | null;
  password_hash: string | null;
  role: Role | null;
}

export interface Faculty {
  id: string;
  created_at: string;
  name: string | null;
  description: string | null;
}

export interface Department {
  id: string;
  created_at: string;
  name: string | null;
  description: string | null;
  faculty: string | null;
}

export interface Subject {
  id: string;
  created_at: string;
  updated_at: string | null;
  title: string | null;
  description: string | null;
  code: string | null;
  abbreviation: string | null;
}

export interface Degree {
  id: string;
  created_at: string;
  degree: DegreeType | null;
  level: string | null;
  full_name: string | null;
  field: string | null;
}

export interface Program {
  id: string;
  created_at: string;
  title: string | null;
  description: string | null;
  curriculum_description: string | null;
  is_active: boolean | null;
  degree: string | null;
  start_session: string | null;
  end_session: string | null;
  department: string | null;
  major: string | null;
}

export interface Course {
  id: string;
  created_at: string;
  updated_at: string | null;
  course_code: string | null;
  name: string | null;
  description: string | null;
  outcoumes: any | null;
  credit_hours: number | null;
  subject: string | null;
}

export interface AcademicOperation {
  id: string;
  created_at: string;
  title: string | null;
  description: string | null;
  session: string | null;
  semester: number | null;
  year: number | null;
  start_at: string | null;
  end_at: string | null;
  program: string | null;
}
