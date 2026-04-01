import AuthGuard from '@/Layouts/AuthGuard';
import LayoutWrapper from '@/Layouts/LayoutsWrapper';
import RoleGuard from '@/Layouts/RoleGuard';
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Auth Pages
const LoginPage = lazy(() => import('@/pages/auth/login/login'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/Forgot-Password/ForgotPassword'));
const OtpVerificationPage = lazy(() => import('@/pages/auth/Otp-Verification/OtpVerificationPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/Reset-Password/ResetPasswordPage'));

// Dashboard Pages
//const HomePage = lazy(() => import('@/pages/Dashboard/Home/Homepage'));

//Admin Pages

// Settings
const SettingsPage = lazy(() => import('@/pages/Dashboard/Settings/SettingsPage'));

// Admins
const AdminsPage = lazy(() => import('@/pages/Dashboard/Admins/AdminsPage'));
const CreateAdminsPage = lazy(() => import('@/pages/Dashboard/Admins/CreateAdmins/CreateAdminsPage'));

// Teachers
const TeachersPage = lazy(() => import('@/pages/Dashboard/Teachers/TeachersPage'));
const CreateTeachersPage = lazy(() => import('@/pages/Dashboard/Teachers/CreateTeachers/CreateTeachersPage'));

// Students
const StudentsPage = lazy(() => import('@/pages/Dashboard/Students/StudentsPage'));
const CreateStudentsPage = lazy(() => import('@/pages/Dashboard/Students/CreateStudents/CreateStudentsPage'));

// Academic Years
const AcademicYears = lazy(() => import('@/pages/Dashboard/AcademicYears/AcademicYearsPage'));
const CreateAcademicYearPage = lazy(() => import('@/pages/Dashboard/AcademicYears/CreateAcademicYear/CreateAcademicYearPage'));

// Academic Terms
const AcademicTermsPage = lazy(() => import('@/pages/Dashboard/AcademicTerms/AcademicTermsPage'));
const CreateAcademicTermPage = lazy(() => import('@/pages/Dashboard/AcademicTerms/CreateAcademicTerm/CreateAcademicTermPage'));

//Class Levels
const ClassLevelsPage = lazy(() => import('@/pages/Dashboard/ClassLevels/ClassLevelsPage'));
const CreateClassLevelPage = lazy(() => import('@/pages/Dashboard/ClassLevels/CreateClassLevel/CreateClassLevelPage'));

//Programs
const ProgramsPage = lazy(() => import('@/pages/Dashboard/Programs/ProgramsPage'));
const CreateProgramPage = lazy(() => import('@/pages/Dashboard/Programs/CreateProgram/CreateProgramPage'));

//Subjects
const SubjectsPage = lazy(() => import('@/pages/Dashboard/Subjects/SubjectsPage'));
const CreateSubjectPage = lazy(() => import('@/pages/Dashboard/Subjects/CreateSubject/CreateSubjectPage'));

//Year Groups
const YearGroupsPage = lazy(() => import('@/pages/Dashboard/YearGroups/YearGroupsPage'));
const CreateYearGroupsPage = lazy(() => import('@/pages/Dashboard/YearGroups/CreateYearGroup/CreateYearGroupPage'));

//Results
const ResultsPage = lazy(() => import('@/pages/Dashboard/Results/ResultsPage'));
const CreateResultsPage = lazy(() => import('@/pages/Dashboard/YearGroups/CreateYearGroup/CreateYearGroupPage'));

//Teacher Pages
const TeacherHomePage = lazy(() => import('@/pages/Dashboard/TeacherPanel/Home/HomePage'));


const TeacherExamsPage = lazy(() => import('@/pages/Dashboard/TeacherPanel/Exams/ExamsPage'));
const CreateExamsPage = lazy(() => import('@/pages/Dashboard/TeacherPanel/Exams/CreateExams/CreateExamsPage'));

const QuestionsPage = lazy(() => import('@/pages/Dashboard/TeacherPanel/Questions/QuestionsPage'));
const CreateQuestionsPage = lazy(() => import('@/pages/Dashboard/TeacherPanel/Questions/CreateQuestions/CreateQuestionsPage'));

//Student Pages
const StudentHomePage = lazy(() => import('@/pages/Dashboard/StudentPanel/Results/ResultsPage'));



//diet plan
// const LearningHubPage = lazy(() => import('@/pages/Dashboard/LearningHub/LearningHub'));
// const CreateLearningHubPage = lazy(() => import('@/pages/Dashboard/LearningHub/CreateLearningHub/CreateLearningHubPage'));
// const LearningHubViewAndEditPage = lazy(() => import('@/pages/Dashboard/LearningHub/LearningHubViewAndEdit/LearningHubViewAndEditPage'));



const RoutesComponent: React.FC = () => {
  return (
    <Suspense fallback={<div></div>}>

      <Routes>
        {/* Redirect / to /dashboard/home */}

        {/* <Route path="/" element={<Navigate to="/dashboard/admins" replace />} /> */}

        <Route
          path="/"
          element={
            (() => {
              const role = localStorage.getItem("role");

              if (role === "admin") return <Navigate to="/dashboard/admins" />;
              if (role === "teacher") return <Navigate to="/dashboard/teacher" />;
              if (role === "student") return <Navigate to="/dashboard/student" />;

              return <Navigate to="/auth/login" />;
            })()
          }
        />



        <Route
          path="/auth"
          element={
            <AuthGuard>
              <LayoutWrapper type="auth" />
            </AuthGuard>
          }
        >
          {/* Redirect /auth to /auth/login */}
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verify-otp" element={<OtpVerificationPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <LayoutWrapper type="dashboard" />
            </AuthGuard>
          }
        >
          {/* Redirect /dashboard to /dashboard/home */}
          {/* <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} /> */}


          {/* Settings */}
          <Route path="settings" element={<SettingsPage />} />


          {/* Admins */}
          <Route path="admins" element={<AdminsPage />} />
          <Route path="admins/create" element={<CreateAdminsPage />} />

          {/* Teachers */}
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="teachers/create" element={<CreateTeachersPage />} />

          {/* Students */}
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/create" element={<CreateStudentsPage />} />

          {/* Academic Years */}
          <Route path="academic-years" element={<AcademicYears />} />
          <Route path="academic-years/create" element={<CreateAcademicYearPage />} />

          {/* Academic Terms */}
          <Route path="academic-terms" element={<AcademicTermsPage />} />
          <Route path="academic-terms/create" element={<CreateAcademicTermPage />} />

          {/* Class Levels */}
          <Route path="class-levels" element={<ClassLevelsPage />} />
          <Route path="class-levels/create" element={<CreateClassLevelPage />} />

          {/* Programs */}
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="programs/create" element={<CreateProgramPage />} />

          {/* Subjects */}
          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="subjects/create" element={<CreateSubjectPage />} />

          {/* Year Groups */}
          <Route path="year-groups" element={<YearGroupsPage />} />
          <Route path="year-groups/create" element={<CreateYearGroupsPage />} />

          {/* Results */}
          <Route path="results" element={<ResultsPage />} />
          <Route path="year-groups/create" element={<CreateYearGroupsPage />} />


          {/* Teacher Panel */}
          <Route
            path="teacher"
            element={
              <RoleGuard allowedRoles={["teacher"]}>
                <Outlet />
              </RoleGuard>
            }
          >
            <Route index element={<TeacherHomePage />} />

            
             <Route path="exams" element={<TeacherExamsPage />} />
             <Route path="exams/create" element={<CreateExamsPage />} />


            <Route path="questions" element={<QuestionsPage />} />
            {/* <Route path="questions/create" element={<CreateQuestionsPage />} /> */}
            <Route path="exams/:examId/questions/create" element={<CreateQuestionsPage />} />

            {/*<Route path="results" element={<TeacherResultsPage />} /> */}
          </Route>

          {/* Student Panel */}
          <Route
            path="student"
            element={
              <RoleGuard allowedRoles={["student"]}>
                <Outlet />
              </RoleGuard>
            }
          >
            <Route index element={<StudentHomePage />} />

          </Route>


        </Route>
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
