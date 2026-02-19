// Mock Data for DUERP UI
// This file contains comprehensive dummy data for all entities with proper relationships

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
} from "../types/api.types";

// ============================================
// USERS & ROLES
// ============================================

export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "superadmin@duerp.edu",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    email: "admin@duerp.edu",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "user-3",
    email: "faculty@duerp.edu",
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },
  {
    id: "user-4",
    email: "john.doe@duerp.edu",
    created_at: "2024-01-04T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "user-5",
    email: "jane.smith@duerp.edu",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
  {
    id: "user-6",
    email: "robert.johnson@duerp.edu",
    created_at: "2024-01-06T00:00:00Z",
    updated_at: "2024-01-06T00:00:00Z",
  },
  {
    id: "user-7",
    email: "maria.garcia@duerp.edu",
    created_at: "2024-01-07T00:00:00Z",
    updated_at: "2024-01-07T00:00:00Z",
  },
  {
    id: "user-8",
    email: "david.wilson@duerp.edu",
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
  },
  // Student users
  {
    id: "user-9",
    email: "emily.chen@student.duerp.edu",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "user-10",
    email: "michael.brown@student.duerp.edu",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "user-11",
    email: "sarah.davis@student.duerp.edu",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "user-12",
    email: "james.anderson@student.duerp.edu",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "user-13",
    email: "sophia.martinez@student.duerp.edu",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  // Department employee users
  {
    id: "user-14",
    email: "robert.thompson@duerp.edu",
    created_at: "2020-01-15T00:00:00Z",
    updated_at: "2020-01-15T00:00:00Z",
  },
  {
    id: "user-15",
    email: "linda.white@duerp.edu",
    created_at: "2021-06-01T00:00:00Z",
    updated_at: "2021-06-01T00:00:00Z",
  },
];

export const mockUserRoles: UserRole[] = [
  {
    id: "role-1",
    user_id: "user-1",
    role: "super-admin",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "role-2",
    user_id: "user-2",
    role: "admin",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "role-3",
    user_id: "user-3",
    role: "faculty",
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },
  {
    id: "role-4",
    user_id: "user-4",
    role: "admin",
    created_at: "2024-01-04T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "role-5",
    user_id: "user-5",
    role: "faculty",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
  {
    id: "role-6",
    user_id: "user-6",
    role: "faculty",
    created_at: "2024-01-06T00:00:00Z",
    updated_at: "2024-01-06T00:00:00Z",
  },
  // Student roles
  {
    id: "role-7",
    user_id: "user-9",
    role: "student",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "role-8",
    user_id: "user-10",
    role: "student",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "role-9",
    user_id: "user-11",
    role: "student",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "role-10",
    user_id: "user-12",
    role: "student",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "role-11",
    user_id: "user-13",
    role: "student",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  // Department employee roles
  {
    id: "role-12",
    user_id: "user-14",
    role: "department-admin",
    created_at: "2020-01-15T00:00:00Z",
    updated_at: "2020-01-15T00:00:00Z",
  },
  {
    id: "role-13",
    user_id: "user-15",
    role: "department-coordinator",
    created_at: "2021-06-01T00:00:00Z",
    updated_at: "2021-06-01T00:00:00Z",
  },
];

// ============================================
// INSTITUTIONS
// ============================================

export const mockInstitutions: Institution[] = [
  {
    id: "inst-1",
    name: "Massachusetts Institute of Technology",
    description: "A private research university in Cambridge, Massachusetts, known for its cutting-edge research in science and technology.",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "inst-2",
    name: "Stanford University",
    description: "A private research university in Stanford, California, renowned for its entrepreneurial spirit and innovation.",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "inst-3",
    name: "Harvard University",
    description: "The oldest institution of higher education in the United States, located in Cambridge, Massachusetts.",
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },
  {
    id: "inst-4",
    name: "University of California, Berkeley",
    description: "A public research university in Berkeley, California, known for its academic excellence and social activism.",
    created_at: "2024-01-04T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "inst-5",
    name: "Carnegie Mellon University",
    description: "A private research university in Pittsburgh, Pennsylvania, renowned for its programs in computer science and engineering.",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
];

// ============================================
// FACULTIES
// ============================================

export const mockFaculties: Faculty[] = [
  // MIT Faculties
  {
    id: "fac-1",
    name: "School of Engineering",
    description: "MIT's School of Engineering is the largest of the five schools, offering programs in various engineering disciplines.",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "fac-2",
    name: "School of Science",
    description: "Dedicated to advancing knowledge in the natural sciences through research and education.",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "fac-3",
    name: "Sloan School of Management",
    description: "MIT's business school, known for its innovative approach to management education.",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },
  
  // Stanford Faculties
  {
    id: "fac-4",
    name: "School of Engineering",
    description: "Stanford's School of Engineering is a leader in engineering education and research.",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-04T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "fac-5",
    name: "School of Humanities and Sciences",
    description: "The largest of Stanford's seven schools, offering programs across the humanities and sciences.",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
  {
    id: "fac-6",
    name: "Graduate School of Business",
    description: "Stanford's business school, known for developing innovative leaders.",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-06T00:00:00Z",
    updated_at: "2024-01-06T00:00:00Z",
  },

  // Harvard Faculties
  {
    id: "fac-7",
    name: "Faculty of Arts and Sciences",
    description: "Harvard's largest faculty, encompassing the humanities, social sciences, and natural sciences.",
    institution_id: "inst-3",
    institution_name: "Harvard University",
    created_at: "2024-01-07T00:00:00Z",
    updated_at: "2024-01-07T00:00:00Z",
  },
  {
    id: "fac-8",
    name: "John A. Paulson School of Engineering and Applied Sciences",
    description: "Harvard's engineering school, focusing on interdisciplinary research and education.",
    institution_id: "inst-3",
    institution_name: "Harvard University",
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
  },
  {
    id: "fac-9",
    name: "Harvard Business School",
    description: "One of the world's leading business schools, known for the case method of teaching.",
    institution_id: "inst-3",
    institution_name: "Harvard University",
    created_at: "2024-01-09T00:00:00Z",
    updated_at: "2024-01-09T00:00:00Z",
  },

  // UC Berkeley Faculties
  {
    id: "fac-10",
    name: "College of Engineering",
    description: "UC Berkeley's College of Engineering is one of the top engineering schools in the world.",
    institution_id: "inst-4",
    institution_name: "University of California, Berkeley",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "fac-11",
    name: "College of Letters and Science",
    description: "The largest college at UC Berkeley, offering programs in the arts, humanities, and sciences.",
    institution_id: "inst-4",
    institution_name: "University of California, Berkeley",
    created_at: "2024-01-11T00:00:00Z",
    updated_at: "2024-01-11T00:00:00Z",
  },

  // Carnegie Mellon Faculties
  {
    id: "fac-12",
    name: "School of Computer Science",
    description: "One of the world's leading computer science schools, pioneering research in AI and robotics.",
    institution_id: "inst-5",
    institution_name: "Carnegie Mellon University",
    created_at: "2024-01-12T00:00:00Z",
    updated_at: "2024-01-12T00:00:00Z",
  },
  {
    id: "fac-13",
    name: "Carnegie Institute of Technology",
    description: "CMU's engineering school, known for its interdisciplinary approach.",
    institution_id: "inst-5",
    institution_name: "Carnegie Mellon University",
    created_at: "2024-01-13T00:00:00Z",
    updated_at: "2024-01-13T00:00:00Z",
  },
];

// ============================================
// DEPARTMENTS
// ============================================

export const mockDepartments: Department[] = [
  // MIT Engineering Departments
  {
    id: "dept-1",
    name: "Electrical Engineering and Computer Science",
    description: "The largest department at MIT, covering electrical engineering and computer science.",
    faculty_id: "fac-1",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "dept-2",
    name: "Mechanical Engineering",
    description: "One of the oldest and largest departments at MIT, focusing on mechanical systems and design.",
    faculty_id: "fac-1",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "dept-3",
    name: "Chemical Engineering",
    description: "Pioneering research in chemical processes and materials science.",
    faculty_id: "fac-1",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },

  // MIT Science Departments
  {
    id: "dept-4",
    name: "Mathematics",
    description: "Pure and applied mathematics research and education.",
    faculty_id: "fac-2",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-04T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "dept-5",
    name: "Physics",
    description: "Fundamental research in theoretical and experimental physics.",
    faculty_id: "fac-2",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },

  // Stanford Engineering Departments
  {
    id: "dept-6",
    name: "Computer Science",
    description: "Leading research in artificial intelligence, systems, and theory.",
    faculty_id: "fac-4",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-06T00:00:00Z",
    updated_at: "2024-01-06T00:00:00Z",
  },
  {
    id: "dept-7",
    name: "Electrical Engineering",
    description: "Research in circuits, systems, and signal processing.",
    faculty_id: "fac-4",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-07T00:00:00Z",
    updated_at: "2024-01-07T00:00:00Z",
  },
  {
    id: "dept-8",
    name: "Bioengineering",
    description: "Interdisciplinary research at the intersection of engineering and biology.",
    faculty_id: "fac-4",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
  },

  // Stanford Humanities and Sciences
  {
    id: "dept-9",
    name: "Economics",
    description: "Research in microeconomics, macroeconomics, and econometrics.",
    faculty_id: "fac-5",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-09T00:00:00Z",
    updated_at: "2024-01-09T00:00:00Z",
  },
  {
    id: "dept-10",
    name: "Psychology",
    description: "Research in cognitive, social, and developmental psychology.",
    faculty_id: "fac-5",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },

  // Harvard Engineering Departments
  {
    id: "dept-11",
    name: "Computer Science",
    description: "Research in algorithms, systems, and computational science.",
    faculty_id: "fac-8",
    institution_id: "inst-3",
    institution_name: "Harvard University",
    created_at: "2024-01-11T00:00:00Z",
    updated_at: "2024-01-11T00:00:00Z",
  },
  {
    id: "dept-12",
    name: "Applied Physics",
    description: "Research in quantum science, photonics, and materials.",
    faculty_id: "fac-8",
    institution_id: "inst-3",
    institution_name: "Harvard University",
    created_at: "2024-01-12T00:00:00Z",
    updated_at: "2024-01-12T00:00:00Z",
  },

  // UC Berkeley Engineering Departments
  {
    id: "dept-13",
    name: "Electrical Engineering and Computer Sciences",
    description: "Top-ranked department in EECS with world-class research.",
    faculty_id: "fac-10",
    institution_id: "inst-4",
    institution_name: "University of California, Berkeley",
    created_at: "2024-01-13T00:00:00Z",
    updated_at: "2024-01-13T00:00:00Z",
  },
  {
    id: "dept-14",
    name: "Civil and Environmental Engineering",
    description: "Research in infrastructure, sustainability, and environmental systems.",
    faculty_id: "fac-10",
    institution_id: "inst-4",
    institution_name: "University of California, Berkeley",
    created_at: "2024-01-14T00:00:00Z",
    updated_at: "2024-01-14T00:00:00Z",
  },

  // Carnegie Mellon Departments
  {
    id: "dept-15",
    name: "Computer Science Department",
    description: "Leading research in AI, machine learning, and robotics.",
    faculty_id: "fac-12",
    institution_id: "inst-5",
    institution_name: "Carnegie Mellon University",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "dept-16",
    name: "Robotics Institute",
    description: "World-renowned center for robotics research and education.",
    faculty_id: "fac-12",
    institution_id: "inst-5",
    institution_name: "Carnegie Mellon University",
    created_at: "2024-01-16T00:00:00Z",
    updated_at: "2024-01-16T00:00:00Z",
  },
];

// ============================================
// PROGRAMS
// ============================================

export const mockPrograms: Program[] = [
  // MIT EECS Programs
  {
    id: "prog-1",
    title: "Bachelor of Science in Computer Science",
    description: "Undergraduate program in computer science with focus on algorithms, systems, and theory.",
    program_level: "Undergraduate",
    department: "Electrical Engineering and Computer Science",
    department_id: "dept-1",
    department_name: "Electrical Engineering and Computer Science",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "prog-2",
    title: "Master of Engineering in Computer Science",
    description: "Professional master's program for advanced study in computer science.",
    program_level: "Graduate",
    department: "Electrical Engineering and Computer Science",
    department_id: "dept-1",
    department_name: "Electrical Engineering and Computer Science",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "prog-3",
    title: "PhD in Electrical Engineering",
    description: "Doctoral program in electrical engineering with research focus.",
    program_level: "Doctorate",
    department: "Electrical Engineering and Computer Science",
    department_id: "dept-1",
    department_name: "Electrical Engineering and Computer Science",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },

  // MIT Mechanical Engineering Programs
  {
    id: "prog-4",
    title: "Bachelor of Science in Mechanical Engineering",
    description: "Comprehensive undergraduate program in mechanical engineering.",
    program_level: "Undergraduate",
    department: "Mechanical Engineering",
    department_id: "dept-2",
    department_name: "Mechanical Engineering",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-04T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "prog-5",
    title: "Master of Science in Mechanical Engineering",
    description: "Advanced study in mechanical systems, design, and manufacturing.",
    program_level: "Graduate",
    department: "Mechanical Engineering",
    department_id: "dept-2",
    department_name: "Mechanical Engineering",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },

  // MIT Mathematics Programs
  {
    id: "prog-6",
    title: "Bachelor of Science in Mathematics",
    description: "Rigorous undergraduate program in pure and applied mathematics.",
    program_level: "Undergraduate",
    department: "Mathematics",
    department_id: "dept-4",
    department_name: "Mathematics",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-06T00:00:00Z",
    updated_at: "2024-01-06T00:00:00Z",
  },
  {
    id: "prog-7",
    title: "PhD in Mathematics",
    description: "Doctoral program in pure and applied mathematics research.",
    program_level: "Doctorate",
    department: "Mathematics",
    department_id: "dept-4",
    department_name: "Mathematics",
    institution_id: "inst-1",
    institution_name: "Massachusetts Institute of Technology",
    created_at: "2024-01-07T00:00:00Z",
    updated_at: "2024-01-07T00:00:00Z",
  },

  // Stanford CS Programs
  {
    id: "prog-8",
    title: "Bachelor of Science in Computer Science",
    description: "Comprehensive CS program with specializations in AI, systems, and theory.",
    program_level: "Undergraduate",
    department: "Computer Science",
    department_id: "dept-6",
    department_name: "Computer Science",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
  },
  {
    id: "prog-9",
    title: "Master of Science in Computer Science",
    description: "Advanced CS program with focus on research and innovation.",
    program_level: "Graduate",
    department: "Computer Science",
    department_id: "dept-6",
    department_name: "Computer Science",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-09T00:00:00Z",
    updated_at: "2024-01-09T00:00:00Z",
  },
  {
    id: "prog-10",
    title: "PhD in Computer Science",
    description: "Doctoral program for cutting-edge research in computer science.",
    program_level: "Doctorate",
    department: "Computer Science",
    department_id: "dept-6",
    department_name: "Computer Science",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },

  // Stanford Bioengineering Programs
  {
    id: "prog-11",
    title: "Bachelor of Science in Bioengineering",
    description: "Interdisciplinary program combining engineering and biology.",
    program_level: "Undergraduate",
    department: "Bioengineering",
    department_id: "dept-8",
    department_name: "Bioengineering",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-11T00:00:00Z",
    updated_at: "2024-01-11T00:00:00Z",
  },
  {
    id: "prog-12",
    title: "Master of Science in Bioengineering",
    description: "Advanced study in biomedical devices, tissue engineering, and biomechanics.",
    program_level: "Graduate",
    department: "Bioengineering",
    department_id: "dept-8",
    department_name: "Bioengineering",
    institution_id: "inst-2",
    institution_name: "Stanford University",
    created_at: "2024-01-12T00:00:00Z",
    updated_at: "2024-01-12T00:00:00Z",
  },

  // Harvard CS Programs
  {
    id: "prog-13",
    title: "Bachelor of Arts in Computer Science",
    description: "Liberal arts approach to computer science education.",
    program_level: "Undergraduate",
    department: "Computer Science",
    department_id: "dept-11",
    department_name: "Computer Science",
    institution_id: "inst-3",
    institution_name: "Harvard University",
    created_at: "2024-01-13T00:00:00Z",
    updated_at: "2024-01-13T00:00:00Z",
  },
  {
    id: "prog-14",
    title: "Master of Science in Computational Science and Engineering",
    description: "Interdisciplinary program combining computation with domain sciences.",
    program_level: "Graduate",
    department: "Computer Science",
    department_id: "dept-11",
    department_name: "Computer Science",
    institution_id: "inst-3",
    institution_name: "Harvard University",
    created_at: "2024-01-14T00:00:00Z",
    updated_at: "2024-01-14T00:00:00Z",
  },

  // UC Berkeley EECS Programs
  {
    id: "prog-15",
    title: "Bachelor of Science in Electrical Engineering and Computer Sciences",
    description: "Integrated program in electrical engineering and computer science.",
    program_level: "Undergraduate",
    department: "Electrical Engineering and Computer Sciences",
    department_id: "dept-13",
    department_name: "Electrical Engineering and Computer Sciences",
    institution_id: "inst-4",
    institution_name: "University of California, Berkeley",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "prog-16",
    title: "Master of Engineering in EECS",
    description: "Professional master's program with industry focus.",
    program_level: "Graduate",
    department: "Electrical Engineering and Computer Sciences",
    department_id: "dept-13",
    department_name: "Electrical Engineering and Computer Sciences",
    institution_id: "inst-4",
    institution_name: "University of California, Berkeley",
    created_at: "2024-01-16T00:00:00Z",
    updated_at: "2024-01-16T00:00:00Z",
  },

  // Carnegie Mellon Programs
  {
    id: "prog-17",
    title: "Bachelor of Science in Computer Science",
    description: "Rigorous CS program with strong foundation in theory and practice.",
    program_level: "Undergraduate",
    department: "Computer Science Department",
    department_id: "dept-15",
    department_name: "Computer Science Department",
    institution_id: "inst-5",
    institution_name: "Carnegie Mellon University",
    created_at: "2024-01-17T00:00:00Z",
    updated_at: "2024-01-17T00:00:00Z",
  },
  {
    id: "prog-18",
    title: "Master of Science in Artificial Intelligence",
    description: "Specialized program in artificial intelligence and machine learning.",
    program_level: "Graduate",
    department: "Computer Science Department",
    department_id: "dept-15",
    department_name: "Computer Science Department",
    institution_id: "inst-5",
    institution_name: "Carnegie Mellon University",
    created_at: "2024-01-18T00:00:00Z",
    updated_at: "2024-01-18T00:00:00Z",
  },
  {
    id: "prog-19",
    title: "Master of Science in Robotics",
    description: "Comprehensive program in robotics systems and autonomous agents.",
    program_level: "Graduate",
    department: "Robotics Institute",
    department_id: "dept-16",
    department_name: "Robotics Institute",
    institution_id: "inst-5",
    institution_name: "Carnegie Mellon University",
    created_at: "2024-01-19T00:00:00Z",
    updated_at: "2024-01-19T00:00:00Z",
  },
  {
    id: "prog-20",
    title: "PhD in Robotics",
    description: "Doctoral program for advanced research in robotics and automation.",
    program_level: "Doctorate",
    department: "Robotics Institute",
    department_id: "dept-16",
    department_name: "Robotics Institute",
    institution_id: "inst-5",
    institution_name: "Carnegie Mellon University",
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
  },
];

// ============================================
// COURSES
// ============================================

export const mockCourses: Course[] = [
  // Computer Science Courses
  {
    id: "course-1",
    name: "Introduction to Computer Science",
    course_code: "CS101",
    description: "Fundamental concepts of computer science including algorithms, data structures, and programming.",
    credit_hours: 4,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "course-2",
    name: "Data Structures and Algorithms",
    course_code: "CS201",
    description: "Advanced study of data structures, algorithm design, and complexity analysis.",
    credit_hours: 4,
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "course-3",
    name: "Operating Systems",
    course_code: "CS301",
    description: "Design and implementation of operating systems including process management, memory management, and file systems.",
    credit_hours: 4,
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },
  {
    id: "course-4",
    name: "Database Systems",
    course_code: "CS302",
    description: "Database design, SQL, transaction processing, and distributed databases.",
    credit_hours: 3,
    created_at: "2024-01-04T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "course-5",
    name: "Computer Networks",
    course_code: "CS303",
    description: "Network protocols, architecture, and distributed systems.",
    credit_hours: 3,
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
  {
    id: "course-6",
    name: "Artificial Intelligence",
    course_code: "CS401",
    description: "Introduction to AI including search algorithms, machine learning, and knowledge representation.",
    credit_hours: 4,
    created_at: "2024-01-06T00:00:00Z",
    updated_at: "2024-01-06T00:00:00Z",
  },
  {
    id: "course-7",
    name: "Machine Learning",
    course_code: "CS402",
    description: "Supervised and unsupervised learning, neural networks, and deep learning.",
    credit_hours: 4,
    created_at: "2024-01-07T00:00:00Z",
    updated_at: "2024-01-07T00:00:00Z",
  },
  {
    id: "course-8",
    name: "Computer Vision",
    course_code: "CS403",
    description: "Image processing, feature detection, object recognition, and scene understanding.",
    credit_hours: 3,
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
  },
  {
    id: "course-9",
    name: "Natural Language Processing",
    course_code: "CS404",
    description: "Computational linguistics, text processing, and language models.",
    credit_hours: 3,
    created_at: "2024-01-09T00:00:00Z",
    updated_at: "2024-01-09T00:00:00Z",
  },
  {
    id: "course-10",
    name: "Software Engineering",
    course_code: "CS305",
    description: "Software development lifecycle, design patterns, testing, and project management.",
    credit_hours: 3,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },

  // Mathematics Courses
  {
    id: "course-11",
    name: "Calculus I",
    course_code: "MATH101",
    description: "Limits, derivatives, and applications of differentiation.",
    credit_hours: 4,
    created_at: "2024-01-11T00:00:00Z",
    updated_at: "2024-01-11T00:00:00Z",
  },
  {
    id: "course-12",
    name: "Calculus II",
    course_code: "MATH102",
    description: "Integration techniques, sequences, and series.",
    credit_hours: 4,
    created_at: "2024-01-12T00:00:00Z",
    updated_at: "2024-01-12T00:00:00Z",
  },
  {
    id: "course-13",
    name: "Linear Algebra",
    course_code: "MATH201",
    description: "Vector spaces, matrices, eigenvalues, and linear transformations.",
    credit_hours: 3,
    created_at: "2024-01-13T00:00:00Z",
    updated_at: "2024-01-13T00:00:00Z",
  },
  {
    id: "course-14",
    name: "Discrete Mathematics",
    course_code: "MATH202",
    description: "Logic, set theory, combinatorics, and graph theory.",
    credit_hours: 3,
    created_at: "2024-01-14T00:00:00Z",
    updated_at: "2024-01-14T00:00:00Z",
  },
  {
    id: "course-15",
    name: "Probability and Statistics",
    course_code: "MATH301",
    description: "Probability theory, statistical inference, and hypothesis testing.",
    credit_hours: 3,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },

  // Engineering Courses
  {
    id: "course-16",
    name: "Introduction to Electrical Engineering",
    course_code: "EE101",
    description: "Basic circuit analysis, electrical components, and systems.",
    credit_hours: 4,
    created_at: "2024-01-16T00:00:00Z",
    updated_at: "2024-01-16T00:00:00Z",
  },
  {
    id: "course-17",
    name: "Digital Logic Design",
    course_code: "EE201",
    description: "Boolean algebra, combinational and sequential circuits, and hardware description languages.",
    credit_hours: 4,
    created_at: "2024-01-17T00:00:00Z",
    updated_at: "2024-01-17T00:00:00Z",
  },
  {
    id: "course-18",
    name: "Signals and Systems",
    course_code: "EE301",
    description: "Signal processing, Fourier analysis, and system modeling.",
    credit_hours: 4,
    created_at: "2024-01-18T00:00:00Z",
    updated_at: "2024-01-18T00:00:00Z",
  },
  {
    id: "course-19",
    name: "Control Systems",
    course_code: "EE302",
    description: "Feedback control, stability analysis, and controller design.",
    credit_hours: 3,
    created_at: "2024-01-19T00:00:00Z",
    updated_at: "2024-01-19T00:00:00Z",
  },
  {
    id: "course-20",
    name: "Thermodynamics",
    course_code: "ME101",
    description: "Laws of thermodynamics, heat transfer, and energy systems.",
    credit_hours: 3,
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
  },
  {
    id: "course-21",
    name: "Mechanics of Materials",
    course_code: "ME201",
    description: "Stress, strain, and deformation of solid materials.",
    credit_hours: 3,
    created_at: "2024-01-21T00:00:00Z",
    updated_at: "2024-01-21T00:00:00Z",
  },
  {
    id: "course-22",
    name: "Fluid Mechanics",
    course_code: "ME202",
    description: "Fluid statics, dynamics, and applications in engineering.",
    credit_hours: 3,
    created_at: "2024-01-22T00:00:00Z",
    updated_at: "2024-01-22T00:00:00Z",
  },

  // Robotics Courses
  {
    id: "course-23",
    name: "Introduction to Robotics",
    course_code: "ROB101",
    description: "Robot kinematics, dynamics, and control fundamentals.",
    credit_hours: 4,
    created_at: "2024-01-23T00:00:00Z",
    updated_at: "2024-01-23T00:00:00Z",
  },
  {
    id: "course-24",
    name: "Robot Perception",
    course_code: "ROB201",
    description: "Sensors, computer vision, and sensor fusion for robotics.",
    credit_hours: 3,
    created_at: "2024-01-24T00:00:00Z",
    updated_at: "2024-01-24T00:00:00Z",
  },
  {
    id: "course-25",
    name: "Robot Motion Planning",
    course_code: "ROB301",
    description: "Path planning algorithms, obstacle avoidance, and navigation.",
    credit_hours: 3,
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-01-25T00:00:00Z",
  },

  // Bioengineering Courses
  {
    id: "course-26",
    name: "Introduction to Bioengineering",
    course_code: "BIO101",
    description: "Fundamentals of biological systems and engineering principles.",
    credit_hours: 3,
    created_at: "2024-01-26T00:00:00Z",
    updated_at: "2024-01-26T00:00:00Z",
  },
  {
    id: "course-27",
    name: "Biomechanics",
    course_code: "BIO201",
    description: "Mechanics of biological tissues and systems.",
    credit_hours: 3,
    created_at: "2024-01-27T00:00:00Z",
    updated_at: "2024-01-27T00:00:00Z",
  },
  {
    id: "course-28",
    name: "Tissue Engineering",
    course_code: "BIO301",
    description: "Design and fabrication of artificial tissues and organs.",
    credit_hours: 3,
    created_at: "2024-01-28T00:00:00Z",
    updated_at: "2024-01-28T00:00:00Z",
  },

  // Additional Advanced Courses
  {
    id: "course-29",
    name: "Quantum Computing",
    course_code: "CS501",
    description: "Quantum algorithms, quantum information theory, and quantum hardware.",
    credit_hours: 3,
    created_at: "2024-01-29T00:00:00Z",
    updated_at: "2024-01-29T00:00:00Z",
  },
  {
    id: "course-30",
    name: "Blockchain and Cryptocurrencies",
    course_code: "CS502",
    description: "Distributed ledger technology, consensus algorithms, and smart contracts.",
    credit_hours: 3,
    created_at: "2024-01-30T00:00:00Z",
    updated_at: "2024-01-30T00:00:00Z",
  },
];

// ============================================
// PROGRAM COURSES (Relationships)
// ============================================

export const mockProgramCourses: ProgramCourse[] = [
  // MIT CS Program (prog-1) - Undergraduate
  { id: "pc-1", program_id: "prog-1", course_id: "course-1", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "pc-2", program_id: "prog-1", course_id: "course-2", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "pc-3", program_id: "prog-1", course_id: "course-3", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "pc-4", program_id: "prog-1", course_id: "course-4", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "pc-5", program_id: "prog-1", course_id: "course-5", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "pc-6", program_id: "prog-1", course_id: "course-10", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "pc-7", program_id: "prog-1", course_id: "course-11", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "pc-8", program_id: "prog-1", course_id: "course-12", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "pc-9", program_id: "prog-1", course_id: "course-13", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "pc-10", program_id: "prog-1", course_id: "course-14", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },

  // MIT CS Program (prog-2) - Master's
  { id: "pc-11", program_id: "prog-2", course_id: "course-6", created_at: "2024-01-02T00:00:00Z", updated_at: "2024-01-02T00:00:00Z" },
  { id: "pc-12", program_id: "prog-2", course_id: "course-7", created_at: "2024-01-02T00:00:00Z", updated_at: "2024-01-02T00:00:00Z" },
  { id: "pc-13", program_id: "prog-2", course_id: "course-8", created_at: "2024-01-02T00:00:00Z", updated_at: "2024-01-02T00:00:00Z" },
  { id: "pc-14", program_id: "prog-2", course_id: "course-9", created_at: "2024-01-02T00:00:00Z", updated_at: "2024-01-02T00:00:00Z" },
  { id: "pc-15", program_id: "prog-2", course_id: "course-29", created_at: "2024-01-02T00:00:00Z", updated_at: "2024-01-02T00:00:00Z" },
  { id: "pc-16", program_id: "prog-2", course_id: "course-30", created_at: "2024-01-02T00:00:00Z", updated_at: "2024-01-02T00:00:00Z" },

  // MIT EE PhD Program (prog-3)
  { id: "pc-17", program_id: "prog-3", course_id: "course-16", created_at: "2024-01-03T00:00:00Z", updated_at: "2024-01-03T00:00:00Z" },
  { id: "pc-18", program_id: "prog-3", course_id: "course-17", created_at: "2024-01-03T00:00:00Z", updated_at: "2024-01-03T00:00:00Z" },
  { id: "pc-19", program_id: "prog-3", course_id: "course-18", created_at: "2024-01-03T00:00:00Z", updated_at: "2024-01-03T00:00:00Z" },
  { id: "pc-20", program_id: "prog-3", course_id: "course-19", created_at: "2024-01-03T00:00:00Z", updated_at: "2024-01-03T00:00:00Z" },

  // MIT ME Undergraduate (prog-4)
  { id: "pc-21", program_id: "prog-4", course_id: "course-11", created_at: "2024-01-04T00:00:00Z", updated_at: "2024-01-04T00:00:00Z" },
  { id: "pc-22", program_id: "prog-4", course_id: "course-12", created_at: "2024-01-04T00:00:00Z", updated_at: "2024-01-04T00:00:00Z" },
  { id: "pc-23", program_id: "prog-4", course_id: "course-13", created_at: "2024-01-04T00:00:00Z", updated_at: "2024-01-04T00:00:00Z" },
  { id: "pc-24", program_id: "prog-4", course_id: "course-20", created_at: "2024-01-04T00:00:00Z", updated_at: "2024-01-04T00:00:00Z" },
  { id: "pc-25", program_id: "prog-4", course_id: "course-21", created_at: "2024-01-04T00:00:00Z", updated_at: "2024-01-04T00:00:00Z" },
  { id: "pc-26", program_id: "prog-4", course_id: "course-22", created_at: "2024-01-04T00:00:00Z", updated_at: "2024-01-04T00:00:00Z" },

  // MIT Math Undergraduate (prog-6)
  { id: "pc-27", program_id: "prog-6", course_id: "course-11", created_at: "2024-01-06T00:00:00Z", updated_at: "2024-01-06T00:00:00Z" },
  { id: "pc-28", program_id: "prog-6", course_id: "course-12", created_at: "2024-01-06T00:00:00Z", updated_at: "2024-01-06T00:00:00Z" },
  { id: "pc-29", program_id: "prog-6", course_id: "course-13", created_at: "2024-01-06T00:00:00Z", updated_at: "2024-01-06T00:00:00Z" },
  { id: "pc-30", program_id: "prog-6", course_id: "course-14", created_at: "2024-01-06T00:00:00Z", updated_at: "2024-01-06T00:00:00Z" },
  { id: "pc-31", program_id: "prog-6", course_id: "course-15", created_at: "2024-01-06T00:00:00Z", updated_at: "2024-01-06T00:00:00Z" },

  // Stanford CS Undergraduate (prog-8)
  { id: "pc-32", program_id: "prog-8", course_id: "course-1", created_at: "2024-01-08T00:00:00Z", updated_at: "2024-01-08T00:00:00Z" },
  { id: "pc-33", program_id: "prog-8", course_id: "course-2", created_at: "2024-01-08T00:00:00Z", updated_at: "2024-01-08T00:00:00Z" },
  { id: "pc-34", program_id: "prog-8", course_id: "course-3", created_at: "2024-01-08T00:00:00Z", updated_at: "2024-01-08T00:00:00Z" },
  { id: "pc-35", program_id: "prog-8", course_id: "course-4", created_at: "2024-01-08T00:00:00Z", updated_at: "2024-01-08T00:00:00Z" },
  { id: "pc-36", program_id: "prog-8", course_id: "course-6", created_at: "2024-01-08T00:00:00Z", updated_at: "2024-01-08T00:00:00Z" },
  { id: "pc-37", program_id: "prog-8", course_id: "course-7", created_at: "2024-01-08T00:00:00Z", updated_at: "2024-01-08T00:00:00Z" },

  // Stanford CS Master's (prog-9)
  { id: "pc-38", program_id: "prog-9", course_id: "course-7", created_at: "2024-01-09T00:00:00Z", updated_at: "2024-01-09T00:00:00Z" },
  { id: "pc-39", program_id: "prog-9", course_id: "course-8", created_at: "2024-01-09T00:00:00Z", updated_at: "2024-01-09T00:00:00Z" },
  { id: "pc-40", program_id: "prog-9", course_id: "course-9", created_at: "2024-01-09T00:00:00Z", updated_at: "2024-01-09T00:00:00Z" },
  { id: "pc-41", program_id: "prog-9", course_id: "course-29", created_at: "2024-01-09T00:00:00Z", updated_at: "2024-01-09T00:00:00Z" },

  // Stanford Bioengineering Undergraduate (prog-11)
  { id: "pc-42", program_id: "prog-11", course_id: "course-26", created_at: "2024-01-11T00:00:00Z", updated_at: "2024-01-11T00:00:00Z" },
  { id: "pc-43", program_id: "prog-11", course_id: "course-27", created_at: "2024-01-11T00:00:00Z", updated_at: "2024-01-11T00:00:00Z" },
  { id: "pc-44", program_id: "prog-11", course_id: "course-11", created_at: "2024-01-11T00:00:00Z", updated_at: "2024-01-11T00:00:00Z" },
  { id: "pc-45", program_id: "prog-11", course_id: "course-12", created_at: "2024-01-11T00:00:00Z", updated_at: "2024-01-11T00:00:00Z" },

  // Stanford Bioengineering Master's (prog-12)
  { id: "pc-46", program_id: "prog-12", course_id: "course-27", created_at: "2024-01-12T00:00:00Z", updated_at: "2024-01-12T00:00:00Z" },
  { id: "pc-47", program_id: "prog-12", course_id: "course-28", created_at: "2024-01-12T00:00:00Z", updated_at: "2024-01-12T00:00:00Z" },

  // Harvard CS Undergraduate (prog-13)
  { id: "pc-48", program_id: "prog-13", course_id: "course-1", created_at: "2024-01-13T00:00:00Z", updated_at: "2024-01-13T00:00:00Z" },
  { id: "pc-49", program_id: "prog-13", course_id: "course-2", created_at: "2024-01-13T00:00:00Z", updated_at: "2024-01-13T00:00:00Z" },
  { id: "pc-50", program_id: "prog-13", course_id: "course-3", created_at: "2024-01-13T00:00:00Z", updated_at: "2024-01-13T00:00:00Z" },
  { id: "pc-51", program_id: "prog-13", course_id: "course-6", created_at: "2024-01-13T00:00:00Z", updated_at: "2024-01-13T00:00:00Z" },

  // UC Berkeley EECS Undergraduate (prog-15)
  { id: "pc-52", program_id: "prog-15", course_id: "course-1", created_at: "2024-01-15T00:00:00Z", updated_at: "2024-01-15T00:00:00Z" },
  { id: "pc-53", program_id: "prog-15", course_id: "course-2", created_at: "2024-01-15T00:00:00Z", updated_at: "2024-01-15T00:00:00Z" },
  { id: "pc-54", program_id: "prog-15", course_id: "course-16", created_at: "2024-01-15T00:00:00Z", updated_at: "2024-01-15T00:00:00Z" },
  { id: "pc-55", program_id: "prog-15", course_id: "course-17", created_at: "2024-01-15T00:00:00Z", updated_at: "2024-01-15T00:00:00Z" },
  { id: "pc-56", program_id: "prog-15", course_id: "course-18", created_at: "2024-01-15T00:00:00Z", updated_at: "2024-01-15T00:00:00Z" },

  // Carnegie Mellon CS Undergraduate (prog-17)
  { id: "pc-57", program_id: "prog-17", course_id: "course-1", created_at: "2024-01-17T00:00:00Z", updated_at: "2024-01-17T00:00:00Z" },
  { id: "pc-58", program_id: "prog-17", course_id: "course-2", created_at: "2024-01-17T00:00:00Z", updated_at: "2024-01-17T00:00:00Z" },
  { id: "pc-59", program_id: "prog-17", course_id: "course-3", created_at: "2024-01-17T00:00:00Z", updated_at: "2024-01-17T00:00:00Z" },
  { id: "pc-60", program_id: "prog-17", course_id: "course-6", created_at: "2024-01-17T00:00:00Z", updated_at: "2024-01-17T00:00:00Z" },
  { id: "pc-61", program_id: "prog-17", course_id: "course-7", created_at: "2024-01-17T00:00:00Z", updated_at: "2024-01-17T00:00:00Z" },

  // Carnegie Mellon AI Master's (prog-18)
  { id: "pc-62", program_id: "prog-18", course_id: "course-6", created_at: "2024-01-18T00:00:00Z", updated_at: "2024-01-18T00:00:00Z" },
  { id: "pc-63", program_id: "prog-18", course_id: "course-7", created_at: "2024-01-18T00:00:00Z", updated_at: "2024-01-18T00:00:00Z" },
  { id: "pc-64", program_id: "prog-18", course_id: "course-8", created_at: "2024-01-18T00:00:00Z", updated_at: "2024-01-18T00:00:00Z" },
  { id: "pc-65", program_id: "prog-18", course_id: "course-9", created_at: "2024-01-18T00:00:00Z", updated_at: "2024-01-18T00:00:00Z" },

  // Carnegie Mellon Robotics Master's (prog-19)
  { id: "pc-66", program_id: "prog-19", course_id: "course-23", created_at: "2024-01-19T00:00:00Z", updated_at: "2024-01-19T00:00:00Z" },
  { id: "pc-67", program_id: "prog-19", course_id: "course-24", created_at: "2024-01-19T00:00:00Z", updated_at: "2024-01-19T00:00:00Z" },
  { id: "pc-68", program_id: "prog-19", course_id: "course-25", created_at: "2024-01-19T00:00:00Z", updated_at: "2024-01-19T00:00:00Z" },
  { id: "pc-69", program_id: "prog-19", course_id: "course-7", created_at: "2024-01-19T00:00:00Z", updated_at: "2024-01-19T00:00:00Z" },
  { id: "pc-70", program_id: "prog-19", course_id: "course-8", created_at: "2024-01-19T00:00:00Z", updated_at: "2024-01-19T00:00:00Z" },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getUserRoles(userId: string): UserRole[] {
  return mockUserRoles.filter(role => role.user_id === userId);
}

export function getFacultiesByInstitution(institutionId: string): Faculty[] {
  return mockFaculties.filter(faculty => faculty.institution_id === institutionId);
}

export function getDepartmentsByFaculty(facultyId: string): Department[] {
  return mockDepartments.filter(dept => dept.faculty_id === facultyId);
}

export function getProgramsByDepartment(departmentId: string): Program[] {
  return mockPrograms.filter(prog => prog.department_id === departmentId);
}

export function getCoursesByProgram(programId: string): Course[] {
  const programCourseIds = mockProgramCourses
    .filter(pc => pc.program_id === programId)
    .map(pc => pc.course_id);
  
  return mockCourses.filter(course => programCourseIds.includes(course.id));
}

export function getProgramCoursesByProgram(programId: string): ProgramCourse[] {
  return mockProgramCourses.filter(pc => pc.program_id === programId);
}

// Generate unique IDs for new entities
let idCounter = 1000;
export function generateId(prefix: string): string {
  return `${prefix}-${idCounter++}`;
}

// ============================================
// STUDENTS
// ============================================

export const mockStudents: Student[] = [
  {
    id: "student-1",
    user_id: "user-9",
    student_id: "ST2024001",
    first_name: "Emily",
    last_name: "Chen",
    email: "emily.chen@student.duerp.edu",
    phone: "+1-555-0101",
    date_of_birth: "2002-05-15",
    address: "123 College Ave, Cambridge, MA",
    department_id: "dept-1", // MIT CS
    enrollment_date: "2024-09-01",
    status: "active",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "student-2",
    user_id: "user-10",
    student_id: "ST2024002",
    first_name: "Michael",
    last_name: "Brown",
    email: "michael.brown@student.duerp.edu",
    phone: "+1-555-0102",
    date_of_birth: "2003-08-22",
    address: "456 Student Rd, Cambridge, MA",
    department_id: "dept-1", // MIT CS
    enrollment_date: "2024-09-01",
    status: "active",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "student-3",
    user_id: "user-11",
    student_id: "ST2024003",
    first_name: "Sarah",
    last_name: "Davis",
    email: "sarah.davis@student.duerp.edu",
    phone: "+1-555-0103",
    date_of_birth: "2002-11-30",
    address: "789 Campus Dr, Cambridge, MA",
    department_id: "dept-2", // MIT EE
    enrollment_date: "2024-09-01",
    status: "active",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "student-4",
    user_id: "user-12",
    student_id: "ST2024004",
    first_name: "James",
    last_name: "Anderson",
    email: "james.anderson@student.duerp.edu",
    phone: "+1-555-0104",
    date_of_birth: "2001-03-10",
    address: "321 University Blvd, Stanford, CA",
    department_id: "dept-6", // Stanford CS
    enrollment_date: "2024-09-01",
    status: "active",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "student-5",
    user_id: "user-13",
    student_id: "ST2024005",
    first_name: "Sophia",
    last_name: "Martinez",
    email: "sophia.martinez@student.duerp.edu",
    phone: "+1-555-0105",
    date_of_birth: "2003-07-18",
    address: "654 Academic Way, Stanford, CA",
    department_id: "dept-6", // Stanford CS
    enrollment_date: "2024-09-01",
    status: "active",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
];

// ============================================
// PROGRAM ENROLLMENTS
// ============================================

export const mockProgramEnrollments: ProgramEnrollment[] = [
  {
    id: "enroll-1",
    student_id: "student-1",
    program_id: "prog-1", // MIT CS Bachelor's
    enrollment_date: "2024-09-01",
    expected_graduation_date: "2028-05-31",
    status: "enrolled",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "enroll-2",
    student_id: "student-2",
    program_id: "prog-1", // MIT CS Bachelor's
    enrollment_date: "2024-09-01",
    expected_graduation_date: "2028-05-31",
    status: "enrolled",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "enroll-3",
    student_id: "student-3",
    program_id: "prog-3", // MIT EE Bachelor's
    enrollment_date: "2024-09-01",
    expected_graduation_date: "2028-05-31",
    status: "enrolled",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "enroll-4",
    student_id: "student-4",
    program_id: "prog-11", // Stanford CS Bachelor's
    enrollment_date: "2024-09-01",
    expected_graduation_date: "2028-05-31",
    status: "enrolled",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "enroll-5",
    student_id: "student-5",
    program_id: "prog-11", // Stanford CS Bachelor's
    enrollment_date: "2024-09-01",
    expected_graduation_date: "2028-05-31",
    status: "enrolled",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
  },
];

// ============================================
// ACADEMIC TERMS
// ============================================

export const mockAcademicTerms: AcademicTerm[] = [
  {
    id: "term-1",
    name: "Fall 2025",
    term_type: "fall",
    year: 2025,
    start_date: "2025-09-01",
    end_date: "2025-12-20",
    registration_start_date: "2025-08-01",
    registration_end_date: "2025-09-10",
    status: "completed",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-12-20T00:00:00Z",
  },
  {
    id: "term-2",
    name: "Spring 2026",
    term_type: "spring",
    year: 2026,
    start_date: "2026-01-15",
    end_date: "2026-05-15",
    registration_start_date: "2025-12-01",
    registration_end_date: "2026-01-20",
    status: "active",
    created_at: "2025-09-01T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "term-3",
    name: "Summer 2026",
    term_type: "summer",
    year: 2026,
    start_date: "2026-06-01",
    end_date: "2026-08-15",
    registration_start_date: "2026-04-01",
    registration_end_date: "2026-06-05",
    status: "upcoming",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "term-4",
    name: "Fall 2026",
    term_type: "fall",
    year: 2026,
    start_date: "2026-09-01",
    end_date: "2026-12-20",
    registration_start_date: "2026-08-01",
    registration_end_date: "2026-09-10",
    status: "upcoming",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

// ============================================
// COURSE SECTIONS
// ============================================

export const mockCourseSections: CourseSection[] = [
  // Spring 2026 - Introduction to Programming
  {
    id: "section-1",
    course_id: "course-1",
    term_id: "term-2",
    section_number: "A01",
    capacity: 30,
    enrolled_count: 2,
    schedule: "MWF 10:00-11:30",
    room: "Building 1, Room 101",
    status: "open",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "section-2",
    course_id: "course-1",
    term_id: "term-2",
    section_number: "A02",
    capacity: 30,
    enrolled_count: 0,
    schedule: "TTh 14:00-15:30",
    room: "Building 1, Room 102",
    status: "open",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  // Spring 2026 - Data Structures
  {
    id: "section-3",
    course_id: "course-2",
    term_id: "term-2",
    section_number: "B01",
    capacity: 25,
    enrolled_count: 1,
    schedule: "MWF 13:00-14:30",
    room: "Building 2, Room 201",
    status: "open",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  // Spring 2026 - Algorithms
  {
    id: "section-4",
    course_id: "course-3",
    term_id: "term-2",
    section_number: "C01",
    capacity: 25,
    enrolled_count: 1,
    schedule: "TTh 10:00-11:30",
    room: "Building 2, Room 202",
    status: "open",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  // Fall 2026 - Introduction to Programming
  {
    id: "section-5",
    course_id: "course-1",
    term_id: "term-4",
    section_number: "A01",
    capacity: 30,
    enrolled_count: 0,
    schedule: "MWF 10:00-11:30",
    room: "Building 1, Room 101",
    status: "open",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
  },
];

// ============================================
// DEPARTMENT EMPLOYEES
// ============================================

export const mockDepartmentEmployees: DepartmentEmployee[] = [
  {
    id: "emp-1",
    user_id: "user-14",
    department_id: "dept-1", // MIT CS
    first_name: "Dr. Robert",
    last_name: "Thompson",
    email: "robert.thompson@duerp.edu",
    position: "admin",
    hire_date: "2020-01-15",
    status: "active",
    created_at: "2020-01-15T00:00:00Z",
    updated_at: "2020-01-15T00:00:00Z",
  },
  {
    id: "emp-2",
    user_id: "user-15",
    department_id: "dept-1", // MIT CS
    first_name: "Linda",
    last_name: "White",
    email: "linda.white@duerp.edu",
    position: "coordinator",
    hire_date: "2021-06-01",
    status: "active",
    created_at: "2021-06-01T00:00:00Z",
    updated_at: "2021-06-01T00:00:00Z",
  },
];

// ============================================
// COURSE INSTRUCTORS
// ============================================

export const mockCourseInstructors: CourseInstructor[] = [
  {
    id: "instructor-1",
    section_id: "section-1",
    user_id: "user-4", // john.doe@duerp.edu
    role: "primary",
    assigned_date: "2026-01-01",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "instructor-2",
    section_id: "section-2",
    user_id: "user-5", // jane.smith@duerp.edu
    role: "primary",
    assigned_date: "2026-01-01",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "instructor-3",
    section_id: "section-3",
    user_id: "user-4",
    role: "primary",
    assigned_date: "2026-01-01",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "instructor-4",
    section_id: "section-4",
    user_id: "user-6", // robert.johnson@duerp.edu
    role: "primary",
    assigned_date: "2026-01-01",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

// ============================================
// COURSE REGISTRATIONS
// ============================================

export const mockCourseRegistrations: CourseRegistration[] = [
  {
    id: "reg-1",
    student_id: "student-1",
    section_id: "section-1",
    registration_date: "2026-01-10",
    status: "in_progress",
    created_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "reg-2",
    student_id: "student-2",
    section_id: "section-1",
    registration_date: "2026-01-10",
    status: "in_progress",
    created_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "reg-3",
    student_id: "student-1",
    section_id: "section-3",
    registration_date: "2026-01-10",
    status: "in_progress",
    created_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "reg-4",
    student_id: "student-2",
    section_id: "section-4",
    registration_date: "2026-01-10",
    status: "in_progress",
    created_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-01-10T00:00:00Z",
  },
];

// ============================================
// COURSE MATERIALS
// ============================================

export const mockCourseMaterials: CourseMaterial[] = [
  {
    id: "material-1",
    section_id: "section-1",
    title: "Week 1: Introduction to Python",
    description: "Lecture slides and code examples for week 1",
    material_type: "lecture_notes",
    file_url: "/materials/intro-python-week1.pdf",
    upload_date: "2026-01-15",
    uploaded_by: "user-4",
    visibility: "students_only",
    created_at: "2026-01-15T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "material-2",
    section_id: "section-1",
    title: "Assignment 1: Variables and Data Types",
    description: "First programming assignment due Feb 1",
    material_type: "assignment",
    file_url: "/materials/assignment-1.pdf",
    upload_date: "2026-01-16",
    uploaded_by: "user-4",
    visibility: "students_only",
    created_at: "2026-01-16T00:00:00Z",
    updated_at: "2026-01-16T00:00:00Z",
  },
  {
    id: "material-3",
    section_id: "section-3",
    title: "Week 1: Arrays and Linked Lists",
    description: "Introduction to basic data structures",
    material_type: "lecture_notes",
    file_url: "/materials/ds-week1.pdf",
    upload_date: "2026-01-15",
    uploaded_by: "user-4",
    visibility: "students_only",
    created_at: "2026-01-15T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
];

// ============================================
// ATTENDANCE RECORDS
// ============================================

export const mockAttendanceRecords: AttendanceRecord[] = [
  // Section 1 - Class 1 (Jan 15, 2026)
  {
    id: "attend-1",
    section_id: "section-1",
    student_id: "student-1",
    date: "2026-01-15",
    status: "present",
    marked_by: "user-4",
    created_at: "2026-01-15T10:00:00Z",
    updated_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "attend-2",
    section_id: "section-1",
    student_id: "student-2",
    date: "2026-01-15",
    status: "present",
    marked_by: "user-4",
    created_at: "2026-01-15T10:00:00Z",
    updated_at: "2026-01-15T10:00:00Z",
  },
  // Section 1 - Class 2 (Jan 17, 2026)
  {
    id: "attend-3",
    section_id: "section-1",
    student_id: "student-1",
    date: "2026-01-17",
    status: "present",
    marked_by: "user-4",
    created_at: "2026-01-17T10:00:00Z",
    updated_at: "2026-01-17T10:00:00Z",
  },
  {
    id: "attend-4",
    section_id: "section-1",
    student_id: "student-2",
    date: "2026-01-17",
    status: "late",
    notes: "Arrived 10 minutes late",
    marked_by: "user-4",
    created_at: "2026-01-17T10:00:00Z",
    updated_at: "2026-01-17T10:00:00Z",
  },
];

// ============================================
// HELPER FUNCTIONS (Extended)
// ============================================

export function getStudentsByDepartment(departmentId: string): Student[] {
  return mockStudents.filter(student => student.department_id === departmentId);
}

export function getProgramEnrollmentsByStudent(studentId: string): ProgramEnrollment[] {
  return mockProgramEnrollments.filter(enrollment => enrollment.student_id === studentId);
}

export function getProgramEnrollmentsByProgram(programId: string): ProgramEnrollment[] {
  return mockProgramEnrollments.filter(enrollment => enrollment.program_id === programId);
}

export function getCourseSectionsByTerm(termId: string): CourseSection[] {
  return mockCourseSections.filter(section => section.term_id === termId);
}

export function getCourseSectionsByCourse(courseId: string): CourseSection[] {
  return mockCourseSections.filter(section => section.course_id === courseId);
}

export function getCourseInstructorsBySection(sectionId: string): CourseInstructor[] {
  return mockCourseInstructors.filter(instructor => instructor.section_id === sectionId);
}

export function getCourseRegistrationsByStudent(studentId: string): CourseRegistration[] {
  return mockCourseRegistrations.filter(reg => reg.student_id === studentId);
}

export function getCourseRegistrationsBySection(sectionId: string): CourseRegistration[] {
  return mockCourseRegistrations.filter(reg => reg.section_id === sectionId);
}

export function getCourseMaterialsBySection(sectionId: string): CourseMaterial[] {
  return mockCourseMaterials.filter(material => material.section_id === sectionId);
}

export function getAttendanceBySection(sectionId: string): AttendanceRecord[] {
  return mockAttendanceRecords.filter(record => record.section_id === sectionId);
}

export function getAttendanceByStudent(studentId: string): AttendanceRecord[] {
  return mockAttendanceRecords.filter(record => record.student_id === studentId);
}

export function getDepartmentEmployeesByDepartment(departmentId: string): DepartmentEmployee[] {
  return mockDepartmentEmployees.filter(emp => emp.department_id === departmentId);
}

// Get available courses for student registration in a term
export function getAvailableCoursesForStudent(studentId: string, termId: string, programId: string): CourseSection[] {
  // Get courses in the student's program
  const programCourseIds = getCoursesByProgram(programId).map(c => c.id);
  
  // Get sections for this term that match program courses
  const availableSections = mockCourseSections.filter(section => 
    section.term_id === termId && 
    programCourseIds.includes(section.course_id) &&
    section.status === 'open'
  );
  
  // Filter out courses already registered
  const registeredSections = getCourseRegistrationsByStudent(studentId)
    .filter(reg => reg.status !== 'dropped')
    .map(reg => reg.section_id);
  
  return availableSections.filter(section => !registeredSections.includes(section.id));
}
