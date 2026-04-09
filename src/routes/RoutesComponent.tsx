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

// Settings
const SettingsPage = lazy(() => import('@/pages/Dashboard/Settings/SettingsPage'));


//Admin Panel

// Admins
const AdminsPage = lazy(() => import('@/pages/Dashboard/AdminPanel/Admins/AdminsPage'));
const CreateAdminsPage = lazy(() => import('@/pages/Dashboard/AdminPanel/Admins/CreateAdmins/CreateAdminsPage'));

// Teachers
const TeachersPage = lazy(() => import('@/pages/Dashboard/AdminPanel/Teachers/TeachersPage'));
const CreateTeachersPage = lazy(() => import('@/pages/Dashboard/AdminPanel/Teachers/CreateTeachers/CreateTeachersPage'));

// Students
const StudentsPage = lazy(() => import('@/pages/Dashboard/AdminPanel/Students/StudentsPage'));
const CreateStudentsPage = lazy(() => import('@/pages/Dashboard/AdminPanel/Students/CreateStudents/CreateStudentsPage'));

// Academic Years
const AcademicYears = lazy(() => import('@/pages/Dashboard/AdminPanel/AcademicYears/AcademicYearsPage'));
const CreateAcademicYearPage = lazy(() => import('@/pages/Dashboard/AdminPanel/AcademicYears/CreateAcademicYear/CreateAcademicYearPage'));

// Academic Terms
const AcademicTermsPage = lazy(() => import('@/pages/Dashboard/AdminPanel/AcademicTerms/AcademicTermsPage'));
const CreateAcademicTermPage = lazy(() => import('@/pages/Dashboard/AdminPanel/AcademicTerms/CreateAcademicTerm/CreateAcademicTermPage'));

//Class Levels
const ClassLevelsPage = lazy(() => import('@/pages/Dashboard/AdminPanel/ClassLevels/ClassLevelsPage'));
const CreateClassLevelPage = lazy(() => import('@/pages/Dashboard/AdminPanel/ClassLevels/CreateClassLevel/CreateClassLevelPage'));

//Programs
const ProgramsPage = lazy(() => import('@/pages/Dashboard/AdminPanel/Programs/ProgramsPage'));
const CreateProgramPage = lazy(() => import('@/pages/Dashboard/AdminPanel/Programs/CreateProgram/CreateProgramPage'));

//Subjects
const SubjectsPage = lazy(() => import('@/pages/Dashboard/AdminPanel/Subjects/SubjectsPage'));
const CreateSubjectPage = lazy(() => import('@/pages/Dashboard/AdminPanel/Subjects/CreateSubject/CreateSubjectPage'));

//Year Groups
const YearGroupsPage = lazy(() => import('@/pages/Dashboard/AdminPanel/YearGroups/YearGroupsPage'));
const CreateYearGroupsPage = lazy(() => import('@/pages/Dashboard/AdminPanel/YearGroups/CreateYearGroup/CreateYearGroupPage'));

//Teacher Pages
const TeacherHomePage = lazy(() => import('@/pages/Dashboard/TeacherPanel/Home/HomePage'));


const TeacherExamsPage = lazy(() => import('@/pages/Dashboard/TeacherPanel/Exams/ExamsPage'));
const CreateExamsPage = lazy(() => import('@/pages/Dashboard/TeacherPanel/Exams/CreateExams/CreateExamsPage'));

const QuestionsPage = lazy(() => import('@/pages/Dashboard/TeacherPanel/Questions/QuestionsPage'));
const CreateQuestionsPage = lazy(() => import('@/pages/Dashboard/TeacherPanel/Questions/CreateQuestions/CreateQuestionsPage'));

//Student Pages
// const StudentHomePage = lazy(() => import('@/pages/Dashboard/StudentPanel/Results/ResultsPage'));
const StudentExamPage = lazy(() => import('@/pages/Dashboard/StudentPanel/StudentExam/AllExamPage'));
const ExamPage = lazy(() => import('@/pages/Dashboard/StudentPanel/StudentExam/ExamPage'));
const StudentExamResultPage = lazy(() => import('@/pages/Dashboard/StudentPanel/StudentExam/StudentExamResultPage'));
const StudentExamReviewPage = lazy(() => import('@/pages/Dashboard/StudentPanel/StudentExam/StudentExamReviewPage'));



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
          <Route path="admins" element={
            <RoleGuard allowedRoles={["admin"]}>
              <AdminsPage />
            </RoleGuard>
          } />
          <Route path="admins/create" element={<RoleGuard allowedRoles={["admin"]}>
            <CreateAdminsPage />
          </RoleGuard>} />

          {/* Teachers */}
          <Route path="teachers" element={
            <RoleGuard allowedRoles={["admin"]}>
              <TeachersPage />
            </RoleGuard>} />

          <Route path="teachers/create" element={
            <RoleGuard allowedRoles={["admin"]}>
              <CreateTeachersPage />
            </RoleGuard>} />

          {/* Students */}
          <Route path="students" element={<RoleGuard allowedRoles={["admin"]}>
            <StudentsPage />
          </RoleGuard>} />
          <Route path="students/create" element={<RoleGuard allowedRoles={["admin"]}>
            <CreateStudentsPage />
          </RoleGuard>} />

          {/* Academic Years */}
          <Route path="academic-years" element={<RoleGuard allowedRoles={["admin"]}>
            <AcademicYears />
          </RoleGuard>} 
          />
          <Route path="academic-years/create" element={
            <RoleGuard allowedRoles={["admin"]}>
            <CreateAcademicYearPage />
          </RoleGuard>} />

          {/* Academic Terms */}
          <Route path="academic-terms" element={
            <RoleGuard allowedRoles={["admin"]}>
            <AcademicTermsPage />
            </RoleGuard>
          } 
            />
          <Route path="academic-terms/create" element={
            <RoleGuard allowedRoles={["admin"]}>

            <CreateAcademicTermPage />
            </RoleGuard>
          } 
            />

          {/* Class Levels */}
          <Route path="class-levels" element={
            <RoleGuard allowedRoles={["admin"]}>

            <ClassLevelsPage />
            </RoleGuard>
          } 
            />
          <Route path="class-levels/create" element={
            <RoleGuard allowedRoles={["admin"]}>

            <CreateClassLevelPage />
            </RoleGuard>
          }
             />

          {/* Programs */}
          <Route path="programs" element={
            <RoleGuard allowedRoles={["admin"]}>

            <ProgramsPage />
            </RoleGuard>
            } />
          <Route path="programs/create" element={
            <RoleGuard allowedRoles={["admin"]}>

            <CreateProgramPage />
            </RoleGuard>
            } />

          {/* Subjects */}
          <Route path="subjects" element={
            <RoleGuard allowedRoles={["admin"]}>

            <SubjectsPage />
            </RoleGuard>
            } />
          <Route path="subjects/create" element={
            <RoleGuard allowedRoles={["admin"]}>

            <CreateSubjectPage />
            </RoleGuard>
            } />

          {/* Year Groups */}
          <Route path="year-groups" element={
            <RoleGuard allowedRoles={["admin"]}>

            <YearGroupsPage />
            </RoleGuard>
            } />
          <Route path="year-groups/create" element={
            <RoleGuard allowedRoles={["admin"]}>

            <CreateYearGroupsPage />
            </RoleGuard>
            } />


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
            <Route index element={<Navigate to="exams" replace />} />

            <Route path="exams" element={<StudentExamPage />} />
            <Route path="exams/:examId" element={<ExamPage />} />
            <Route path="exams/:examId/result" element={<StudentExamResultPage />} />
            <Route path="exams/:examId/review" element={<StudentExamReviewPage />} />

          </Route>


        </Route>
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
