// src/types/api.types.ts

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  email?: string;
}

export interface CreateRolePayload {
  role: string;
}

export interface UpdateRolePayload {
  role: string;
}

export interface UsersQueryParams {
  offset?: number;
  limit?: number;
  filter?: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface DeleteUserResponse {
  id: string;
  email: string;
}

export interface DeleteRoleResponse {
  id: string;
  role: string;
}

export interface PaginationParams {
  offset?: number;
  limit?: number;
  filter?: string;
}

// Institution types
export interface Institution {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CreateInstitutionPayload {
  name: string;
  description: string;
}

export interface UpdateInstitutionPayload {
  name?: string;
  description?: string;
}

export interface DeleteInstitutionResponse {
  id: string;
  name: string;
}

// Faculty types
export interface Faculty {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  institution_id?: string;
  institution_name?: string;
}

export interface CreateFacultyPayload {
  name: string;
  description: string;
}

export interface UpdateFacultyPayload {
  name?: string;
  description?: string;
}

export interface DeleteFacultyResponse {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  faculty_id: string;
  created_at: string;
  updated_at: string;
  institution_id?:string;
  institution_name?: string;
}

export interface CreateDepartmentPayload {
  name: string;
  description: string;
  faculty_id: string;
}

export interface UpdateDepartmentPayload {
  name?: string;
  description?: string;
  faculty_id?: string;
}

export interface DeleteDepartmentResponse {
  id: string;
  name: string;
}

// Program Types
export interface Program {
  id: string;
  title: string;
  description: string;
  program_level: string;
  department: string;
  created_at: string;
  updated_at: string;
  department_id?: string;       // Added for relations
  department_name?: string;     // Added for display
  institution_id?: string;      // Added for filtering
  institution_name?: string;    
}

export interface CreateProgramPayload {
  title: string;
  description: string;
  program_level: string;
}

export interface UpdateProgramPayload {
  title?: string;
  description?: string;
  program_level?: string;
}

export interface DeleteProgramResponse {
  id: string;
  title: string;
}

// Course Types
export interface Course {
  id: string;
  name: string;
  course_code: string;
  description: string;
  credit_hours: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCoursePayload {
  name: string;
  course_code: string;
  description: string;
  credit_hours: number;
}

export interface UpdateCoursePayload {
  name?: string;
  course_code?: string;
  description?: string;
  credit_hours?: number;
}

export interface DeleteCourseResponse {
  id: string;
  name: string;
}

// ProgramCourse Types
export interface ProgramCourse {
  id: string;
  program_id: string;
  course_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProgramCoursePayload {
  program_id: string;
  course_id: string;
}

export interface UpdateProgramCoursePayload {
  program_id?: string;
  course_id?: string;
}

export interface DeleteProgramCourseResponse {
  id: string;
}

// Program Course Filter Params
export interface ProgramCourseFilterParams extends PaginationParams {
  program_id?: string;
  course_id?: string;
}

// Student Types
export interface Student {
  id: string;
  user_id: string;
  student_id: string; // University student ID
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth: string;
  address?: string;
  department_id: string;
  department_name?: string;
  enrollment_date: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface CreateStudentPayload {
  user_id?: string;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth: string;
  address?: string;
  department_id: string;
  enrollment_date: string;
  password?: string;
}

export interface UpdateStudentPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  department_id?: string;
  status?: 'active' | 'inactive' | 'graduated' | 'suspended';
}

// Program Enrollment Types
export interface ProgramEnrollment {
  id: string;
  student_id: string;
  program_id: string;
  program_name?: string;
  enrollment_date: string;
  expected_graduation_date?: string;
  status: 'enrolled' | 'completed' | 'dropped' | 'on_hold';
  created_at: string;
  updated_at: string;
}

export interface CreateProgramEnrollmentPayload {
  student_id: string;
  program_id: string;
  enrollment_date: string;
  expected_graduation_date?: string;
}

export interface UpdateProgramEnrollmentPayload {
  status?: 'enrolled' | 'completed' | 'dropped' | 'on_hold';
  expected_graduation_date?: string;
}

// Academic Term Types
export interface AcademicTerm {
  id: string;
  name: string; // e.g., "Fall 2026", "Spring 2026"
  term_type: 'fall' | 'spring' | 'summer';
  year: number;
  start_date: string;
  end_date: string;
  registration_start_date: string;
  registration_end_date: string;
  status: 'upcoming' | 'active' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface CreateAcademicTermPayload {
  name: string;
  term_type: 'fall' | 'spring' | 'summer';
  year: number;
  start_date: string;
  end_date: string;
  registration_start_date: string;
  registration_end_date: string;
}

export interface UpdateAcademicTermPayload {
  name?: string;
  term_type?: 'fall' | 'spring' | 'summer';
  year?: number;
  start_date?: string;
  end_date?: string;
  registration_start_date?: string;
  registration_end_date?: string;
  status?: 'upcoming' | 'active' | 'completed';
}

// Course Section Types (Course offerings in a specific term)
export interface CourseSection {
  id: string;
  course_id: string;
  course_name?: string;
  course_code?: string;
  term_id: string;
  term_name?: string;
  section_number: string;
  capacity: number;
  enrolled_count: number;
  schedule?: string; // e.g., "MWF 10:00-11:00"
  room?: string;
  status: 'open' | 'closed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CreateCourseSectionPayload {
  course_id: string;
  term_id: string;
  section_number: string;
  capacity: number;
  schedule?: string;
  room?: string;
}

export interface UpdateCourseSectionPayload {
  section_number?: string;
  capacity?: number;
  schedule?: string;
  room?: string;
  status?: 'open' | 'closed' | 'cancelled';
}

// Course Instructor Assignment Types
export interface CourseInstructor {
  id: string;
  section_id: string;
  user_id: string; // Teacher/Instructor user ID
  instructor_name?: string;
  instructor_email?: string;
  role: 'primary' | 'assistant' | 'ta'; // Teaching Assistant
  assigned_date: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCourseInstructorPayload {
  section_id: string;
  user_id: string;
  role: 'primary' | 'assistant' | 'ta';
}

export interface UpdateCourseInstructorPayload {
  role?: 'primary' | 'assistant' | 'ta';
}

// Student Course Registration Types
export interface CourseRegistration {
  id: string;
  student_id: string;
  section_id: string;
  course_name?: string;
  course_code?: string;
  term_name?: string;
  registration_date: string;
  status: 'registered' | 'dropped' | 'completed' | 'in_progress';
  grade?: string;
  credits_earned?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCourseRegistrationPayload {
  student_id: string;
  section_id: string;
}

export interface UpdateCourseRegistrationPayload {
  status?: 'registered' | 'dropped' | 'completed' | 'in_progress';
  grade?: string;
  credits_earned?: number;
}

// Course Material Types
export interface CourseMaterial {
  id: string;
  section_id: string;
  title: string;
  description?: string;
  material_type: 'lecture_notes' | 'assignment' | 'reading' | 'video' | 'other';
  file_url?: string;
  upload_date: string;
  uploaded_by: string; // User ID of instructor
  visibility: 'public' | 'students_only';
  created_at: string;
  updated_at: string;
}

export interface CreateCourseMaterialPayload {
  section_id: string;
  title: string;
  description?: string;
  material_type: 'lecture_notes' | 'assignment' | 'reading' | 'video' | 'other';
  file_url?: string;
  visibility: 'public' | 'students_only';
}

export interface UpdateCourseMaterialPayload {
  title?: string;
  description?: string;
  material_type?: 'lecture_notes' | 'assignment' | 'reading' | 'video' | 'other';
  file_url?: string;
  visibility?: 'public' | 'students_only';
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  section_id: string;
  student_id: string;
  student_name?: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  marked_by: string; // User ID of instructor
  created_at: string;
  updated_at: string;
}

export interface CreateAttendanceRecordPayload {
  section_id: string;
  student_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface UpdateAttendanceRecordPayload {
  status?: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface BulkAttendancePayload {
  section_id: string;
  date: string;
  records: {
    student_id: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    notes?: string;
  }[];
}

// Department Employee Types (for managing course instructors)
export interface DepartmentEmployee {
  id: string;
  user_id: string;
  department_id: string;
  department_name?: string;
  first_name: string;
  last_name: string;
  email: string;
  position: 'admin' | 'coordinator' | 'staff';
  hire_date: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface CreateDepartmentEmployeePayload {
  user_id?: string;
  department_id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: 'admin' | 'coordinator' | 'staff';
  hire_date: string;
  password?: string;
}

export interface UpdateDepartmentEmployeePayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  position?: 'admin' | 'coordinator' | 'staff';
  status?: 'active' | 'inactive';
}

// Student Academic Progress
export interface StudentProgress {
  student_id: string;
  program_id: string;
  total_credits_required: number;
  credits_earned: number;
  credits_in_progress: number;
  gpa: number;
  completed_courses: number;
  remaining_courses: number;
}