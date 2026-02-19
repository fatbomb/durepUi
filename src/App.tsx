import { Route, BrowserRouter as Router, Routes } from "react-router";

// import Alerts from "./pages/UiElements/Alerts";
import AppLayout from "./layout/AppLayout";
// import Avatars from "./pages/UiElements/Avatars";
// import Badges from "./pages/UiElements/Badges";
// import BarChart from "./pages/Charts/BarChart";
// import BasicTables from "./pages/Tables/BasicTables";
// import Blank from "./pages/Blank";
// import Buttons from "./pages/UiElements/Buttons";
// import Calendar from "./pages/Calendar";
// import FormElements from "./pages/Forms/FormElements";
import Home from "./pages/Dashboard/Home";
import CourseRecord from "./pages/Dashboard/CourseRecords.tsx";
// import Images from "./pages/UiElements/Images";
// import LineChart from "./pages/Charts/LineChart";
import NotFound from "./pages/OtherPage/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Roles from "./pages/UserManagement/Roles";
import { ScrollToTop } from "./components/common/ScrollToTop";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
// import UserProfiles from "./pages/UserProfiles";
// import Videos from "./pages/UiElements/Videos";
import AllClasses from "./pages/Attendance/AllClasses.tsx";
import History from "./pages/Attendance/History.tsx";
import TakeAttendance from "./pages/Attendance/TakeAttendance.tsx";
import Createclass from "./pages/Attendance/CreateClass.tsx";
import AttendanceSheet from "./pages/Attendance/AttendanceSheet.tsx";
import UpdateClass from "./pages/Attendance/UpdateClass.tsx";
import Program from "./pages/Settings/program.tsx";
import UsersPage from "./pages/users/index.tsx";
import UserRolesPage from "./pages/users/[id]/roles.tsx";
import FacultiesPage from "./pages/faculties/index.tsx";
import InstitutionsPage from "./pages/Institutions/index.tsx";
import AllFacultiesPage from "./pages/faculties/AllFacultiesPage.tsx";
import CoursesPage from "./pages/courses/index.tsx";
import AllDepartmentsPage from "./pages/departments/AllDepartmentPage.tsx";
import DepartmentsPage from "./pages/departments/index.tsx";
import AllProgramCoursesPage from "./pages/ProgramCourses/AllProgramCoursesPage.tsx";
import ProgramCoursesPage from "./pages/ProgramCourses/index.tsx";
import AllProgramsPage from "./pages/programs/AllProgramsPage.tsx";
import ProgramsPage from "./pages/programs/index.tsx";
// University System Pages
import StudentsPage from "./pages/students/index.tsx";
import AcademicTermsPage from "./pages/academic-terms/index.tsx";
import CourseSectionsPage from "./pages/course-sections/index.tsx";
// Student Portal Pages
import StudentDashboard from "./pages/student/dashboard.tsx";
import MyProgramsPage from "./pages/student/my-programs.tsx";
import MyCoursesPage from "./pages/student/my-courses.tsx";
// Instructor Portal Pages
import InstructorCoursesPage from "./pages/instructor/my-courses.tsx";
import ClassroomPage from "./pages/instructor/classroom/[sectionId]/index.tsx";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Protected Dashboard Layout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/role_list" element={<Roles />} />
            <Route path="/CourseRecord" element={<CourseRecord />} />
            <Route path="/AllClasses" element={<AllClasses />} />
            <Route path="/History" element={<History />} />
            <Route path="/take-attendance/:id" element={<TakeAttendance />} />
            <Route path="/create-class" element={<Createclass />} />
            <Route path="/attendance-sheet/:id" element={<AttendanceSheet />} />
            <Route path="/update-class/:id" element={<UpdateClass />} />
            <Route path="/program" element={<Program />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id/roles" element={<UserRolesPage />} />
            <Route path="/institutions/:institutionId/faculties" element={<FacultiesPage />} />
            <Route path="/institutions" element={<InstitutionsPage />} />
            <Route path="/faculties" element={<AllFacultiesPage />} />
            
            {/* Department routes */}
            <Route path="/institutions/:institutionId/departments" element={<DepartmentsPage />} />
            <Route path="/departments" element={<AllDepartmentsPage />} />

            {/* Program routes */}
            <Route path="/departments/:departmentId/programs" element={<ProgramsPage />} />
            <Route path="/programs" element={<AllProgramsPage />} />

            {/* Course routes */}
            <Route path="/courses" element={<CoursesPage />} />

            {/* Program Course routes */}
            <Route path="/programs/:programId/courses" element={<ProgramCoursesPage />} />
            <Route path="/program-courses" element={<AllProgramCoursesPage />} />

            {/* University System routes */}
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/academic-terms" element={<AcademicTermsPage />} />
            <Route path="/course-sections" element={<CourseSectionsPage />} />

            {/* Student Portal routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/my-programs" element={<MyProgramsPage />} />
            <Route path="/student/my-courses" element={<MyCoursesPage />} />

            {/* Instructor Portal routes */}
            <Route path="/instructor/my-courses" element={<InstructorCoursesPage />} />
            <Route path="/instructor/classroom/:sectionId" element={<ClassroomPage />} />

            {/* <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />

            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} /> */}
          </Route>

          {/* Public Auth Pages */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
