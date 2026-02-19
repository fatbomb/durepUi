// Mock API Client for Development
// This file intercepts API calls and returns mock data

import {
  mockUsers,
  mockUserRoles,
  mockInstitutions,
  mockFaculties,
  mockDepartments,
  mockPrograms,
  mockCourses,
  mockProgramCourses,
  mockStudents,
  mockProgramEnrollments,
  mockAcademicTerms,
  mockCourseSections,
  mockCourseInstructors,
  mockCourseRegistrations,
  mockCourseMaterials,
  mockAttendanceRecords,
  mockDepartmentEmployees,
  getUserRoles,
  getFacultiesByInstitution,
  getProgramsByDepartment,
  getProgramCoursesByProgram,
  getStudentsByDepartment,
  getProgramEnrollmentsByStudent,
  getProgramEnrollmentsByProgram,
  getCourseSectionsByTerm,
  getCourseSectionsByCourse,
  getCourseInstructorsBySection,
  getCourseRegistrationsByStudent,
  getCourseRegistrationsBySection,
  getCourseMaterialsBySection,
  getDepartmentEmployeesByDepartment,
  generateId,
} from "../data/mockData";

import type {
  User,
  UserRole,
  Institution,
  Faculty,
  Department,
  Program,
  Course,
  ProgramCourse,
  Student,
  ProgramEnrollment,
  AcademicTerm,
  CourseSection,
  CourseInstructor,
  CourseRegistration,
  CourseMaterial,
  AttendanceRecord,
  DepartmentEmployee,
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  CreateStudentPayload,
  UpdateStudentPayload,
  CreateProgramEnrollmentPayload,
  UpdateProgramEnrollmentPayload,
  CreateAcademicTermPayload,
  UpdateAcademicTermPayload,
  CreateCourseSectionPayload,
  UpdateCourseSectionPayload,
  CreateCourseInstructorPayload,
  UpdateCourseInstructorPayload,
  CreateCourseRegistrationPayload,
  UpdateCourseRegistrationPayload,
  CreateCourseMaterialPayload,
  UpdateCourseMaterialPayload,
  CreateAttendanceRecordPayload,
  UpdateAttendanceRecordPayload,
  BulkAttendancePayload,
  CreateDepartmentEmployeePayload,
  UpdateDepartmentEmployeePayload,
} from "../types/api.types";

import { MOCK_CONFIG } from '../config/mock.config';

// Simulate network delay
const delay = (ms: number = MOCK_CONFIG.MOCK_DELAY) => new Promise(resolve => setTimeout(resolve, ms));

// Mock authentication tokens
const MOCK_ACCESS_TOKEN = "mock-access-token-12345";
const MOCK_REFRESH_TOKEN = "mock-refresh-token-67890";

// In-memory storage for mock data (allows CRUD operations)
let users = [...mockUsers];
let userRoles = [...mockUserRoles];
let institutions = [...mockInstitutions];
let faculties = [...mockFaculties];
let departments = [...mockDepartments];
let programs = [...mockPrograms];
let courses = [...mockCourses];
let programCourses = [...mockProgramCourses];
let students = [...mockStudents];
let programEnrollments = [...mockProgramEnrollments];
let academicTerms = [...mockAcademicTerms];
let courseSections = [...mockCourseSections];
let courseInstructors = [...mockCourseInstructors];
let courseRegistrations = [...mockCourseRegistrations];
let courseMaterials = [...mockCourseMaterials];
let attendanceRecords = [...mockAttendanceRecords];
let departmentEmployees = [...mockDepartmentEmployees];

export class MockApiClient {
  // ============================================
  // AUTHENTICATION
  // ============================================

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay();
    
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Store tokens
    localStorage.setItem("access_token", MOCK_ACCESS_TOKEN);
    localStorage.setItem("refresh_token", MOCK_REFRESH_TOKEN);
    localStorage.setItem("user", JSON.stringify(user));

    return {
      access_token: MOCK_ACCESS_TOKEN,
      refresh_token: MOCK_REFRESH_TOKEN,
      user,
    };
  }

  static async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    await delay();

    // Check if user already exists
    if (users.find(u => u.email === credentials.email)) {
      throw new Error("User already exists");
    }

    const newUser: User = {
      id: generateId("user"),
      email: credentials.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    users.push(newUser);

    // Store tokens
    localStorage.setItem("access_token", MOCK_ACCESS_TOKEN);
    localStorage.setItem("refresh_token", MOCK_REFRESH_TOKEN);
    localStorage.setItem("user", JSON.stringify(newUser));

    return {
      access_token: MOCK_ACCESS_TOKEN,
      refresh_token: MOCK_REFRESH_TOKEN,
      user: newUser,
    };
  }

  static logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  }

  static getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  static getUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  // ============================================
  // USERS
  // ============================================

  static async getUsers(): Promise<User[]> {
    await delay();
    return users;
  }

  static async getUserById(id: string): Promise<User> {
    await delay();
    const user = users.find(u => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
  }

  static async createUser(data: { email: string; password: string }): Promise<User> {
    await delay();

    if (users.find(u => u.email === data.email)) {
      throw new Error("User already exists");
    }

    const newUser: User = {
      id: generateId("user"),
      email: data.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    users.push(newUser);
    return newUser;
  }

  static async updateUser(id: string, data: { email?: string }): Promise<User> {
    await delay();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");

    users[index] = {
      ...users[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    return users[index];
  }

  static async deleteUser(id: string): Promise<{ id: string; email: string }> {
    await delay();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");

    const deletedUser = users[index];
    users = users.filter(u => u.id !== id);
    
    // Also delete user roles
    userRoles = userRoles.filter(r => r.user_id !== id);

    return { id: deletedUser.id, email: deletedUser.email };
  }

  // ============================================
  // USER ROLES
  // ============================================

  static async getUserRoles(userId: string): Promise<UserRole[]> {
    await delay();
    return getUserRoles(userId);
  }

  static async createUserRole(userId: string, data: { role: string }): Promise<UserRole> {
    await delay();

    const newRole: UserRole = {
      id: generateId("role"),
      user_id: userId,
      role: data.role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    userRoles.push(newRole);
    return newRole;
  }

  static async updateUserRole(userId: string, roleId: string, data: { role: string }): Promise<UserRole> {
    await delay();
    const index = userRoles.findIndex(r => r.id === roleId && r.user_id === userId);
    if (index === -1) throw new Error("Role not found");

    userRoles[index] = {
      ...userRoles[index],
      role: data.role,
      updated_at: new Date().toISOString(),
    };

    return userRoles[index];
  }

  static async deleteUserRole(userId: string, roleId: string): Promise<{ id: string; role: string }> {
    await delay();
    const role = userRoles.find(r => r.id === roleId && r.user_id === userId);
    if (!role) throw new Error("Role not found");

    userRoles = userRoles.filter(r => r.id !== roleId);
    return { id: role.id, role: role.role };
  }

  // ============================================
  // INSTITUTIONS
  // ============================================

  static async getInstitutions(): Promise<Institution[]> {
    await delay();
    return institutions;
  }

  static async getInstitutionById(id: string): Promise<Institution> {
    await delay();
    const institution = institutions.find(i => i.id === id);
    if (!institution) throw new Error("Institution not found");
    return institution;
  }

  static async createInstitution(data: { name: string; description: string }): Promise<Institution> {
    await delay();

    const newInstitution: Institution = {
      id: generateId("inst"),
      name: data.name,
      description: data.description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    institutions.push(newInstitution);
    return newInstitution;
  }

  static async updateInstitution(id: string, data: { name?: string; description?: string }): Promise<Institution> {
    await delay();
    const index = institutions.findIndex(i => i.id === id);
    if (index === -1) throw new Error("Institution not found");

    institutions[index] = {
      ...institutions[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    return institutions[index];
  }

  static async deleteInstitution(id: string): Promise<{ id: string; name: string }> {
    await delay();
    const institution = institutions.find(i => i.id === id);
    if (!institution) throw new Error("Institution not found");

    institutions = institutions.filter(i => i.id !== id);
    
    // Cascade delete faculties
    const facultyIds = faculties.filter(f => f.institution_id === id).map(f => f.id);
    faculties = faculties.filter(f => f.institution_id !== id);
    
    // Cascade delete departments
    facultyIds.forEach(fid => {
      const deptIds = departments.filter(d => d.faculty_id === fid).map(d => d.id);
      departments = departments.filter(d => d.faculty_id !== fid);
      
      // Cascade delete programs
      deptIds.forEach(did => {
        const progIds = programs.filter(p => p.department_id === did).map(p => p.id);
        programs = programs.filter(p => p.department_id !== did);
        
        // Cascade delete program courses
        progIds.forEach(pid => {
          programCourses = programCourses.filter(pc => pc.program_id !== pid);
        });
      });
    });

    return { id: institution.id, name: institution.name };
  }

  // ============================================
  // FACULTIES
  // ============================================

  static async getFaculties(institutionId: string): Promise<Faculty[]> {
    await delay();
    return getFacultiesByInstitution(institutionId);
  }

  static async getAllFaculties(): Promise<Faculty[]> {
    await delay();
    return faculties;
  }

  static async getFacultyById(institutionId: string, id: string): Promise<Faculty> {
    await delay();
    const faculty = faculties.find(f => f.id === id && f.institution_id === institutionId);
    if (!faculty) throw new Error("Faculty not found");
    return faculty;
  }

  static async createFaculty(institutionId: string, data: { name: string; description: string }): Promise<Faculty> {
    await delay();

    const institution = institutions.find(i => i.id === institutionId);
    if (!institution) throw new Error("Institution not found");

    const newFaculty: Faculty = {
      id: generateId("fac"),
      name: data.name,
      description: data.description,
      institution_id: institutionId,
      institution_name: institution.name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    faculties.push(newFaculty);
    return newFaculty;
  }

  static async updateFaculty(institutionId: string, id: string, data: { name?: string; description?: string }): Promise<Faculty> {
    await delay();
    const index = faculties.findIndex(f => f.id === id && f.institution_id === institutionId);
    if (index === -1) throw new Error("Faculty not found");

    faculties[index] = {
      ...faculties[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    return faculties[index];
  }

  static async deleteFaculty(institutionId: string, id: string): Promise<{ id: string; name: string }> {
    await delay();
    const faculty = faculties.find(f => f.id === id && f.institution_id === institutionId);
    if (!faculty) throw new Error("Faculty not found");

    faculties = faculties.filter(f => f.id !== id);
    
    // Cascade delete departments
    const deptIds = departments.filter(d => d.faculty_id === id).map(d => d.id);
    departments = departments.filter(d => d.faculty_id !== id);
    
    // Cascade delete programs
    deptIds.forEach(did => {
      const progIds = programs.filter(p => p.department_id === did).map(p => p.id);
      programs = programs.filter(p => p.department_id !== did);
      
      // Cascade delete program courses
      progIds.forEach(pid => {
        programCourses = programCourses.filter(pc => pc.program_id !== pid);
      });
    });

    return { id: faculty.id, name: faculty.name };
  }

  // ============================================
  // DEPARTMENTS
  // ============================================

  static async getDepartments(institutionId: string): Promise<Department[]> {
    await delay();
    const facultyIds = faculties
      .filter(f => f.institution_id === institutionId)
      .map(f => f.id);
    return departments.filter(d => facultyIds.includes(d.faculty_id));
  }

  static async getAllDepartments(): Promise<Department[]> {
    await delay();
    return departments;
  }

  static async getDepartmentById(_institutionId: string, id: string): Promise<Department> {
    await delay();
    const department = departments.find(d => d.id === id);
    if (!department) throw new Error("Department not found");
    return department;
  }

  static async createDepartment(institutionId: string, data: { name: string; description: string; faculty_id: string }): Promise<Department> {
    await delay();

    const faculty = faculties.find(f => f.id === data.faculty_id);
    if (!faculty) throw new Error("Faculty not found");

    const institution = institutions.find(i => i.id === institutionId);

    const newDepartment: Department = {
      id: generateId("dept"),
      name: data.name,
      description: data.description,
      faculty_id: data.faculty_id,
      institution_id: institutionId,
      institution_name: institution?.name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    departments.push(newDepartment);
    return newDepartment;
  }

  static async updateDepartment(_institutionId: string, id: string, data: { name?: string; description?: string; faculty_id?: string }): Promise<Department> {
    await delay();
    const index = departments.findIndex(d => d.id === id);
    if (index === -1) throw new Error("Department not found");

    departments[index] = {
      ...departments[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    return departments[index];
  }

  static async deleteDepartment(_institutionId: string, id: string): Promise<{ id: string; name: string }> {
    await delay();
    const department = departments.find(d => d.id === id);
    if (!department) throw new Error("Department not found");

    departments = departments.filter(d => d.id !== id);
    
    // Cascade delete programs
    const progIds = programs.filter(p => p.department_id === id).map(p => p.id);
    programs = programs.filter(p => p.department_id !== id);
    
    // Cascade delete program courses
    progIds.forEach(pid => {
      programCourses = programCourses.filter(pc => pc.program_id !== pid);
    });

    return { id: department.id, name: department.name };
  }

  // ============================================
  // PROGRAMS
  // ============================================

  static async getPrograms(departmentId: string): Promise<Program[]> {
    await delay();
    return getProgramsByDepartment(departmentId);
  }

  static async getAllPrograms(): Promise<Program[]> {
    await delay();
    return programs;
  }

  static async getProgramById(departmentId: string, id: string): Promise<Program> {
    await delay();
    const program = programs.find(p => p.id === id && p.department_id === departmentId);
    if (!program) throw new Error("Program not found");
    return program;
  }

  static async createProgram(departmentId: string, data: { title: string; description: string; program_level: string }): Promise<Program> {
    await delay();

    const department = departments.find(d => d.id === departmentId);
    if (!department) throw new Error("Department not found");

    const newProgram: Program = {
      id: generateId("prog"),
      title: data.title,
      description: data.description,
      program_level: data.program_level,
      department: department.name,
      department_id: departmentId,
      department_name: department.name,
      institution_id: department.institution_id,
      institution_name: department.institution_name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    programs.push(newProgram);
    return newProgram;
  }

  static async updateProgram(departmentId: string, id: string, data: { title?: string; description?: string; program_level?: string }): Promise<Program> {
    await delay();
    const index = programs.findIndex(p => p.id === id && p.department_id === departmentId);
    if (index === -1) throw new Error("Program not found");

    programs[index] = {
      ...programs[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    return programs[index];
  }

  static async deleteProgram(departmentId: string, id: string): Promise<{ id: string; title: string }> {
    await delay();
    const program = programs.find(p => p.id === id && p.department_id === departmentId);
    if (!program) throw new Error("Program not found");

    programs = programs.filter(p => p.id !== id);
    
    // Cascade delete program courses
    programCourses = programCourses.filter(pc => pc.program_id !== id);

    return { id: program.id, title: program.title };
  }

  // ============================================
  // COURSES
  // ============================================

  static async getCourses(): Promise<Course[]> {
    await delay();
    return courses;
  }

  static async getCourseById(id: string): Promise<Course> {
    await delay();
    const course = courses.find(c => c.id === id);
    if (!course) throw new Error("Course not found");
    return course;
  }

  static async createCourse(data: { name: string; course_code: string; description: string; credit_hours: number }): Promise<Course> {
    await delay();

    if (courses.find(c => c.course_code === data.course_code)) {
      throw new Error("Course code already exists");
    }

    const newCourse: Course = {
      id: generateId("course"),
      name: data.name,
      course_code: data.course_code,
      description: data.description,
      credit_hours: data.credit_hours,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    courses.push(newCourse);
    return newCourse;
  }

  static async updateCourse(id: string, data: { name?: string; course_code?: string; description?: string; credit_hours?: number }): Promise<Course> {
    await delay();
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Course not found");

    courses[index] = {
      ...courses[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    return courses[index];
  }

  static async deleteCourse(id: string): Promise<{ id: string; name: string }> {
    await delay();
    const course = courses.find(c => c.id === id);
    if (!course) throw new Error("Course not found");

    courses = courses.filter(c => c.id !== id);
    
    // Also delete program course associations
    programCourses = programCourses.filter(pc => pc.course_id !== id);

    return { id: course.id, name: course.name };
  }

  // ============================================
  // PROGRAM COURSES
  // ============================================

  static async getProgramCourses(programId?: string): Promise<ProgramCourse[]> {
    await delay();
    if (programId) {
      return getProgramCoursesByProgram(programId);
    }
    return programCourses;
  }

  static async createProgramCourse(data: { program_id: string; course_id: string }): Promise<ProgramCourse> {
    await delay();

    // Check if association already exists
    if (programCourses.find(pc => pc.program_id === data.program_id && pc.course_id === data.course_id)) {
      throw new Error("Course already added to program");
    }

    const newProgramCourse: ProgramCourse = {
      id: generateId("pc"),
      program_id: data.program_id,
      course_id: data.course_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    programCourses.push(newProgramCourse);
    return newProgramCourse;
  }

  static async deleteProgramCourse(id: string): Promise<{ id: string }> {
    await delay();
    const programCourse = programCourses.find(pc => pc.id === id);
    if (!programCourse) throw new Error("Program course not found");

    programCourses = programCourses.filter(pc => pc.id !== id);
    return { id: programCourse.id };
  }

  // ============================================
  // STUDENTS
  // ============================================

  static async getStudents(departmentId?: string): Promise<Student[]> {
    await delay();
    if (departmentId) {
      return getStudentsByDepartment(departmentId);
    }
    return students;
  }

  static async getStudent(id: string): Promise<Student> {
    await delay();
    const student = students.find(s => s.id === id);
    if (!student) throw new Error("Student not found");
    
    // Enrich with department name
    const dept = departments.find(d => d.id === student.department_id);
    return { ...student, department_name: dept?.name };
  }

  static async createStudent(data: CreateStudentPayload): Promise<Student> {
    await delay();

    // Check if student ID already exists
    if (students.find(s => s.student_id === data.student_id)) {
      throw new Error("Student ID already exists");
    }

    // Create user account if needed
    let userId = data.user_id;
    if (!userId && data.email) {
      const newUser: User = {
        id: generateId("user"),
        email: data.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      users.push(newUser);
      userId = newUser.id;

      // Assign student role
      const studentRole: UserRole = {
        id: generateId("role"),
        user_id: userId,
        role: "student",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      userRoles.push(studentRole);
    }

    const newStudent: Student = {
      id: generateId("student"),
      user_id: userId || generateId("user"),
      student_id: data.student_id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.date_of_birth,
      address: data.address,
      department_id: data.department_id,
      enrollment_date: data.enrollment_date,
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    students.push(newStudent);
    return newStudent;
  }

  static async updateStudent(id: string, data: UpdateStudentPayload): Promise<Student> {
    await delay();
    const student = students.find(s => s.id === id);
    if (!student) throw new Error("Student not found");

    const updated = {
      ...student,
      ...data,
      updated_at: new Date().toISOString(),
    };

    students = students.map(s => s.id === id ? updated : s);
    return updated;
  }

  static async deleteStudent(id: string): Promise<{ id: string; student_id: string }> {
    await delay();
    const student = students.find(s => s.id === id);
    if (!student) throw new Error("Student not found");

    students = students.filter(s => s.id !== id);
    
    // Also delete related enrollments and registrations
    programEnrollments = programEnrollments.filter(pe => pe.student_id !== id);
    courseRegistrations = courseRegistrations.filter(cr => cr.student_id !== id);
    attendanceRecords = attendanceRecords.filter(ar => ar.student_id !== id);

    return { id: student.id, student_id: student.student_id };
  }

  // ============================================
  // PROGRAM ENROLLMENTS
  // ============================================

  static async getProgramEnrollments(studentId?: string, programId?: string): Promise<ProgramEnrollment[]> {
    await delay();
    if (studentId) {
      return getProgramEnrollmentsByStudent(studentId);
    }
    if (programId) {
      return getProgramEnrollmentsByProgram(programId);
    }
    return programEnrollments;
  }

  static async createProgramEnrollment(data: CreateProgramEnrollmentPayload): Promise<ProgramEnrollment> {
    await delay();

    // Check if already enrolled
    if (programEnrollments.find(pe => pe.student_id === data.student_id && pe.program_id === data.program_id)) {
      throw new Error("Student already enrolled in this program");
    }

    const newEnrollment: ProgramEnrollment = {
      id: generateId("enroll"),
      student_id: data.student_id,
      program_id: data.program_id,
      enrollment_date: data.enrollment_date,
      expected_graduation_date: data.expected_graduation_date,
      status: "enrolled",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    programEnrollments.push(newEnrollment);
    return newEnrollment;
  }

  static async updateProgramEnrollment(id: string, data: UpdateProgramEnrollmentPayload): Promise<ProgramEnrollment> {
    await delay();
    const enrollment = programEnrollments.find(pe => pe.id === id);
    if (!enrollment) throw new Error("Program enrollment not found");

    const updated = {
      ...enrollment,
      ...data,
      updated_at: new Date().toISOString(),
    };

    programEnrollments = programEnrollments.map(pe => pe.id === id ? updated : pe);
    return updated;
  }

  static async deleteProgramEnrollment(id: string): Promise<{ id: string }> {
    await delay();
    const enrollment = programEnrollments.find(pe => pe.id === id);
    if (!enrollment) throw new Error("Program enrollment not found");

    programEnrollments = programEnrollments.filter(pe => pe.id !== id);
    return { id: enrollment.id };
  }

  // ============================================
  // ACADEMIC TERMS
  // ============================================

  static async getAcademicTerms(): Promise<AcademicTerm[]> {
    await delay();
    return academicTerms;
  }

  static async getAcademicTerm(id: string): Promise<AcademicTerm> {
    await delay();
    const term = academicTerms.find(t => t.id === id);
    if (!term) throw new Error("Academic term not found");
    return term;
  }

  static async createAcademicTerm(data: CreateAcademicTermPayload): Promise<AcademicTerm> {
    await delay();

    const newTerm: AcademicTerm = {
      id: generateId("term"),
      name: data.name,
      term_type: data.term_type,
      year: data.year,
      start_date: data.start_date,
      end_date: data.end_date,
      registration_start_date: data.registration_start_date,
      registration_end_date: data.registration_end_date,
      status: "upcoming",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    academicTerms.push(newTerm);
    return newTerm;
  }

  static async updateAcademicTerm(id: string, data: UpdateAcademicTermPayload): Promise<AcademicTerm> {
    await delay();
    const term = academicTerms.find(t => t.id === id);
    if (!term) throw new Error("Academic term not found");

    const updated = {
      ...term,
      ...data,
      updated_at: new Date().toISOString(),
    };

    academicTerms = academicTerms.map(t => t.id === id ? updated : t);
    return updated;
  }

  static async deleteAcademicTerm(id: string): Promise<{ id: string; name: string }> {
    await delay();
    const term = academicTerms.find(t => t.id === id);
    if (!term) throw new Error("Academic term not found");

    academicTerms = academicTerms.filter(t => t.id !== id);
    
    // Also delete related sections
    const sectionsToDelete = courseSections.filter(cs => cs.term_id === id);
    sectionsToDelete.forEach(section => {
      courseInstructors = courseInstructors.filter(ci => ci.section_id !== section.id);
      courseRegistrations = courseRegistrations.filter(cr => cr.section_id !== section.id);
      courseMaterials = courseMaterials.filter(cm => cm.section_id !== section.id);
      attendanceRecords = attendanceRecords.filter(ar => ar.section_id !== section.id);
    });
    courseSections = courseSections.filter(cs => cs.term_id !== id);

    return { id: term.id, name: term.name };
  }

  // ============================================
  // COURSE SECTIONS
  // ============================================

  static async getCourseSections(termId?: string, courseId?: string): Promise<CourseSection[]> {
    await delay();
    if (termId) {
      const sections = getCourseSectionsByTerm(termId);
      // Enrich with course and term info
      return sections.map(section => {
        const course = courses.find(c => c.id === section.course_id);
        const term = academicTerms.find(t => t.id === section.term_id);
        return {
          ...section,
          course_name: course?.name,
          course_code: course?.course_code,
          term_name: term?.name,
        };
      });
    }
    if (courseId) {
      return getCourseSectionsByCourse(courseId);
    }
    return courseSections.map(section => {
      const course = courses.find(c => c.id === section.course_id);
      const term = academicTerms.find(t => t.id === section.term_id);
      return {
        ...section,
        course_name: course?.name,
        course_code: course?.course_code,
        term_name: term?.name,
      };
    });
  }

  static async getCourseSection(id: string): Promise<CourseSection> {
    await delay();
    const section = courseSections.find(cs => cs.id === id);
    if (!section) throw new Error("Course section not found");
    
    const course = courses.find(c => c.id === section.course_id);
    const term = academicTerms.find(t => t.id === section.term_id);
    return {
      ...section,
      course_name: course?.name,
      course_code: course?.course_code,
      term_name: term?.name,
    };
  }

  static async createCourseSection(data: CreateCourseSectionPayload): Promise<CourseSection> {
    await delay();

    const newSection: CourseSection = {
      id: generateId("section"),
      course_id: data.course_id,
      term_id: data.term_id,
      section_number: data.section_number,
      capacity: data.capacity,
      enrolled_count: 0,
      schedule: data.schedule,
      room: data.room,
      status: "open",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    courseSections.push(newSection);
    return newSection;
  }

  static async updateCourseSection(id: string, data: UpdateCourseSectionPayload): Promise<CourseSection> {
    await delay();
    const section = courseSections.find(cs => cs.id === id);
    if (!section) throw new Error("Course section not found");

    const updated = {
      ...section,
      ...data,
      updated_at: new Date().toISOString(),
    };

    courseSections = courseSections.map(cs => cs.id === id ? updated : cs);
    return updated;
  }

  static async deleteCourseSection(id: string): Promise<{ id: string }> {
    await delay();
    const section = courseSections.find(cs => cs.id === id);
    if (!section) throw new Error("Course section not found");

    courseSections = courseSections.filter(cs => cs.id !== id);
    
    // Also delete related data
    courseInstructors = courseInstructors.filter(ci => ci.section_id !== id);
    courseRegistrations = courseRegistrations.filter(cr => cr.section_id !== id);
    courseMaterials = courseMaterials.filter(cm => cm.section_id !== id);
    attendanceRecords = attendanceRecords.filter(ar => ar.section_id !== id);

    return { id: section.id };
  }

  // ============================================
  // DEPARTMENT EMPLOYEES
  // ============================================

  static async getDepartmentEmployees(departmentId?: string): Promise<DepartmentEmployee[]> {
    await delay();
    if (departmentId) {
      return getDepartmentEmployeesByDepartment(departmentId);
    }
    return departmentEmployees;
  }

  static async createDepartmentEmployee(data: CreateDepartmentEmployeePayload): Promise<DepartmentEmployee> {
    await delay();

    // Create user account if needed
    let userId = data.user_id;
    if (!userId) {
      const newUser: User = {
        id: generateId("user"),
        email: data.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      users.push(newUser);
      userId = newUser.id;

      // Assign department role based on position
      const role = data.position === 'admin' ? 'department-admin' : 'department-coordinator';
      const empRole: UserRole = {
        id: generateId("role"),
        user_id: userId,
        role: role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      userRoles.push(empRole);
    }

    const newEmployee: DepartmentEmployee = {
      id: generateId("emp"),
      user_id: userId,
      department_id: data.department_id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      position: data.position,
      hire_date: data.hire_date,
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    departmentEmployees.push(newEmployee);
    return newEmployee;
  }

  static async updateDepartmentEmployee(id: string, data: UpdateDepartmentEmployeePayload): Promise<DepartmentEmployee> {
    await delay();
    const employee = departmentEmployees.find(e => e.id === id);
    if (!employee) throw new Error("Department employee not found");

    const updated = {
      ...employee,
      ...data,
      updated_at: new Date().toISOString(),
    };

    departmentEmployees = departmentEmployees.map(e => e.id === id ? updated : e);
    return updated;
  }

  static async deleteDepartmentEmployee(id: string): Promise<{ id: string }> {
    await delay();
    const employee = departmentEmployees.find(e => e.id === id);
    if (!employee) throw new Error("Department employee not found");

    departmentEmployees = departmentEmployees.filter(e => e.id !== id);
    return { id: employee.id };
  }

  // ============================================
  // COURSE INSTRUCTORS
  // ============================================

  static async getCourseInstructors(sectionId: string): Promise<CourseInstructor[]> {
    await delay();
    const instructors = getCourseInstructorsBySection(sectionId);
    // Enrich with user info
    return instructors.map(instructor => {
      const user = users.find(u => u.id === instructor.user_id);
      return {
        ...instructor,
        instructor_name: user?.email.split('@')[0],
        instructor_email: user?.email,
      };
    });
  }

  static async createCourseInstructor(data: CreateCourseInstructorPayload): Promise<CourseInstructor> {
    await delay();

    // Check if instructor already assigned
    if (courseInstructors.find(ci => ci.section_id === data.section_id && ci.user_id === data.user_id)) {
      throw new Error("Instructor already assigned to this section");
    }

    const newInstructor: CourseInstructor = {
      id: generateId("instructor"),
      section_id: data.section_id,
      user_id: data.user_id,
      role: data.role,
      assigned_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    courseInstructors.push(newInstructor);
    return newInstructor;
  }

  static async updateCourseInstructor(id: string, data: UpdateCourseInstructorPayload): Promise<CourseInstructor> {
    await delay();
    const instructor = courseInstructors.find(ci => ci.id === id);
    if (!instructor) throw new Error("Course instructor not found");

    const updated = {
      ...instructor,
      ...data,
      updated_at: new Date().toISOString(),
    };

    courseInstructors = courseInstructors.map(ci => ci.id === id ? updated : ci);
    return updated;
  }

  static async deleteCourseInstructor(id: string): Promise<{ id: string }> {
    await delay();
    const instructor = courseInstructors.find(ci => ci.id === id);
    if (!instructor) throw new Error("Course instructor not found");

    courseInstructors = courseInstructors.filter(ci => ci.id !== id);
    return { id: instructor.id };
  }

  // ============================================
  // COURSE REGISTRATIONS
  // ============================================

  static async getCourseRegistrations(studentId?: string, sectionId?: string): Promise<CourseRegistration[]> {
    await delay();
    if (studentId) {
      const registrations = getCourseRegistrationsByStudent(studentId);
      // Enrich with course and term info
      return registrations.map(reg => {
        const section = courseSections.find(cs => cs.id === reg.section_id);
        if (!section) return reg;
        const course = courses.find(c => c.id === section.course_id);
        const term = academicTerms.find(t => t.id === section.term_id);
        return {
          ...reg,
          course_name: course?.name,
          course_code: course?.course_code,
          term_name: term?.name,
        };
      });
    }
    if (sectionId) {
      return getCourseRegistrationsBySection(sectionId);
    }
    return courseRegistrations;
  }

  static async createCourseRegistration(data: CreateCourseRegistrationPayload): Promise<CourseRegistration> {
    await delay();

    // Check if already registered
    const existing = courseRegistrations.find(
      cr => cr.student_id === data.student_id && cr.section_id === data.section_id && cr.status !== 'dropped'
    );
    if (existing) {
      throw new Error("Student already registered in this section");
    }

    // Check capacity
    const section = courseSections.find(cs => cs.id === data.section_id);
    if (!section) throw new Error("Course section not found");
    if (section.enrolled_count >= section.capacity) {
      throw new Error("Course section is full");
    }

    const newRegistration: CourseRegistration = {
      id: generateId("reg"),
      student_id: data.student_id,
      section_id: data.section_id,
      registration_date: new Date().toISOString().split('T')[0],
      status: "registered",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    courseRegistrations.push(newRegistration);
    
    // Update enrolled count
    section.enrolled_count++;
    courseSections = courseSections.map(cs => cs.id === section.id ? section : cs);

    return newRegistration;
  }

  static async updateCourseRegistration(id: string, data: UpdateCourseRegistrationPayload): Promise<CourseRegistration> {
    await delay();
    const registration = courseRegistrations.find(cr => cr.id === id);
    if (!registration) throw new Error("Course registration not found");

    // If dropping, update enrolled count
    if (data.status === 'dropped' && registration.status !== 'dropped') {
      const section = courseSections.find(cs => cs.id === registration.section_id);
      if (section && section.enrolled_count > 0) {
        section.enrolled_count--;
        courseSections = courseSections.map(cs => cs.id === section.id ? section : cs);
      }
    }

    const updated = {
      ...registration,
      ...data,
      updated_at: new Date().toISOString(),
    };

    courseRegistrations = courseRegistrations.map(cr => cr.id === id ? updated : cr);
    return updated;
  }

  static async deleteCourseRegistration(id: string): Promise<{ id: string }> {
    await delay();
    const registration = courseRegistrations.find(cr => cr.id === id);
    if (!registration) throw new Error("Course registration not found");

    courseRegistrations = courseRegistrations.filter(cr => cr.id !== id);
    
    // Update enrolled count
    const section = courseSections.find(cs => cs.id === registration.section_id);
    if (section && section.enrolled_count > 0) {
      section.enrolled_count--;
      courseSections = courseSections.map(cs => cs.id === section.id ? section : cs);
    }

    return { id: registration.id };
  }

  // ============================================
  // COURSE MATERIALS
  // ============================================

  static async getCourseMaterials(sectionId: string): Promise<CourseMaterial[]> {
    await delay();
    return getCourseMaterialsBySection(sectionId);
  }

  static async createCourseMaterial(data: CreateCourseMaterialPayload): Promise<CourseMaterial> {
    await delay();

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const newMaterial: CourseMaterial = {
      id: generateId("material"),
      section_id: data.section_id,
      title: data.title,
      description: data.description,
      material_type: data.material_type,
      file_url: data.file_url,
      upload_date: new Date().toISOString().split('T')[0],
      uploaded_by: currentUser.id || "user-1",
      visibility: data.visibility || "students_only",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    courseMaterials.push(newMaterial);
    return newMaterial;
  }

  static async updateCourseMaterial(id: string, data: UpdateCourseMaterialPayload): Promise<CourseMaterial> {
    await delay();
    const material = courseMaterials.find(cm => cm.id === id);
    if (!material) throw new Error("Course material not found");

    const updated = {
      ...material,
      ...data,
      updated_at: new Date().toISOString(),
    };

    courseMaterials = courseMaterials.map(cm => cm.id === id ? updated : cm);
    return updated;
  }

  static async deleteCourseMaterial(id: string): Promise<{ id: string }> {
    await delay();
    const material = courseMaterials.find(cm => cm.id === id);
    if (!material) throw new Error("Course material not found");

    courseMaterials = courseMaterials.filter(cm => cm.id !== id);
    return { id: material.id };
  }

  // ============================================
  // ATTENDANCE RECORDS
  // ============================================

  static async getAttendanceRecords(sectionId?: string, studentId?: string, date?: string): Promise<AttendanceRecord[]> {
    await delay();
    let records = attendanceRecords;
    
    if (sectionId) {
      records = records.filter(ar => ar.section_id === sectionId);
    }
    if (studentId) {
      records = records.filter(ar => ar.student_id === studentId);
    }
    if (date) {
      records = records.filter(ar => ar.date === date);
    }

    // Enrich with student info
    return records.map(record => {
      const student = students.find(s => s.id === record.student_id);
      return {
        ...record,
        student_name: student ? `${student.first_name} ${student.last_name}` : undefined,
      };
    });
  }

  static async createAttendanceRecord(data: CreateAttendanceRecordPayload): Promise<AttendanceRecord> {
    await delay();

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const newRecord: AttendanceRecord = {
      id: generateId("attend"),
      section_id: data.section_id,
      student_id: data.student_id,
      date: data.date,
      status: data.status,
      notes: data.notes,
      marked_by: currentUser.id || "user-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    attendanceRecords.push(newRecord);
    return newRecord;
  }

  static async bulkCreateAttendance(data: BulkAttendancePayload): Promise<AttendanceRecord[]> {
    await delay();

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const newRecords: AttendanceRecord[] = [];

    for (const record of data.records) {
      // Check if record already exists for this date
      const existing = attendanceRecords.find(
        ar => ar.section_id === data.section_id && 
              ar.student_id === record.student_id && 
              ar.date === data.date
      );

      if (existing) {
        // Update existing
        existing.status = record.status;
        existing.notes = record.notes;
        existing.updated_at = new Date().toISOString();
        attendanceRecords = attendanceRecords.map(ar => ar.id === existing.id ? existing : ar);
        newRecords.push(existing);
      } else {
        // Create new
        const newRecord: AttendanceRecord = {
          id: generateId("attend"),
          section_id: data.section_id,
          student_id: record.student_id,
          date: data.date,
          status: record.status,
          notes: record.notes,
          marked_by: currentUser.id || "user-1",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        attendanceRecords.push(newRecord);
        newRecords.push(newRecord);
      }
    }

    return newRecords;
  }

  static async updateAttendanceRecord(id: string, data: UpdateAttendanceRecordPayload): Promise<AttendanceRecord> {
    await delay();
    const record = attendanceRecords.find(ar => ar.id === id);
    if (!record) throw new Error("Attendance record not found");

    const updated = {
      ...record,
      ...data,
      updated_at: new Date().toISOString(),
    };

    attendanceRecords = attendanceRecords.map(ar => ar.id === id ? updated : ar);
    return updated;
  }

  static async deleteAttendanceRecord(id: string): Promise<{ id: string }> {
    await delay();
    const record = attendanceRecords.find(ar => ar.id === id);
    if (!record) throw new Error("Attendance record not found");

    attendanceRecords = attendanceRecords.filter(ar => ar.id !== id);
    return { id: record.id };
  }
}
