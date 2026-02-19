// ========================================================
// Common Fields Interface (reuse everywhere)
// ========================================================
export interface CommonFields {
  domain_status: number;
  version_no: number;
  action_by: string;
  action_at: string;
  action_ip: string;
}

// ========================================================
// USERS
// ========================================================
export interface User extends CommonFields {
  id?: number;
  email: string;
  password?: string;
  role: 'super' | 'admin' | 'faculty' | 'student';
  name: string;
  instituteId?: number;
  facultyId?: number;
  departmentId?: number;
  programId?: number;
}

// ========================================================
// INSTITUTE
// ========================================================
export interface Institute extends CommonFields {
  id: number;
  name: string;
  description: string;
  createdBy: number;
  createdAt: string;
}

// ========================================================
// FACULTY
// ========================================================
// export interface Faculty extends CommonFields {
//   id: number;
//   name: string;
//   description: string;
//   instituteId: number;
//   deanId?: number;
// }

// ========================================================
// DEPARTMENT
// ========================================================
export interface Department extends CommonFields {
  id: number;
  name: string;
  facultyId: number;
  instituteId: number;
  description: string;
  chairmanId?: number;
  adminId?: number;
  isActive: boolean;
}

// ========================================================
// DEGREE
// ========================================================
export interface Degree extends CommonFields {
  id: number;
  type: 'BSc' | 'MSc' | 'BA' | 'MA' | 'PhD' | 'BS' | 'MS';
  field: string;
  fullName: string;
  departmentId: number;
  totalCredits: number;
  duration: string;
}

// ========================================================
// PROGRAM
// ========================================================
// export interface Program extends CommonFields {
//   id: number;
//   title: string;
//   degreeId: number;
//   departmentId: number;
//   duration: string;
//   totalCredits: number;
//   isActive: boolean;
//   creditType: 'closed' | 'open' | 'mixed';
// }

// ========================================================
// SYLLABUS
// ========================================================
export interface Syllabus extends CommonFields {
  id: number;
  programId: number;
  version: string;
  effectiveFrom: string;
  totalCredits: number;
  isActive: boolean;
  courses: SyllabusCourse[];
}

export interface SyllabusCourse extends CommonFields {
  id: number;
  courseId: number;
  isCore: boolean;
  semester: number;
  credits: number;
  creditType: 'closed' | 'open';
  prerequisites?: number[];
}

// ========================================================
// COURSE
// ========================================================
// export interface Course extends CommonFields {
//   id: number;
//   code: string;
//   name: string;
//   credits: number;
//   departmentId: number;
//   description: string;
//   courseType: 'core' | 'elective' | 'lab' | 'project';
//   isActive: boolean;
//   prerequisites?: number[];
//   learningOutcomes?: string[];
// }

// ========================================================
// STUDENT
// ========================================================
export interface Student extends CommonFields {
  id: number;
  name: string;
  email: string;
  enrollmentNo: string;
  gpa: string;
  year: string;
  departmentId: number;
  programId: number;
  instituteId: number;
  currentSemester: number;
}

// ========================================================
// ADMISSION
// ========================================================
export interface Admission extends CommonFields {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  programId: number;
  status: 'Admitted' | 'Pending' | 'Rejected';
}

// ========================================================
// COURSE ENROLLMENT
// ========================================================
export interface CourseEnrollment extends CommonFields {
  id: number;
  courseId: number;
  studentId: number;
  academicOperationId: number;
  status: 'enrolled' | 'completed' | 'dropped';
  grade?: string;
  marks?: number;
}

// ========================================================
// ACADEMIC OPERATION
// ========================================================
export interface AcademicOperation extends CommonFields {
  id: number;
  session: string;
  semester: number;
  programId: number;
  courses: number[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  closedCredits: number[];
  openCredits: number[];
  registrationDeadline: string;
}

// ========================================================
// DEPARTMENT ADMIN
// ========================================================
export interface DepartmentAdmin extends CommonFields {
  id: number;
  userId: number;
  departmentId: number;
  role: 'chairman' | 'exam_committee' | 'admin';
}

// ========================================================
// COURSE PREREQUISITE
// ========================================================
export interface CoursePrerequisite extends CommonFields {
  id: number;
  courseId: number;
  prerequisiteCourseId: number;
}

// src/types/index.ts
export * from './api.types';