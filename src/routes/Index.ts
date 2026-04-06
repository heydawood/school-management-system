// Auth Module Routes
export const Login = () => '/auth/login';
export const ForgotPassword = () => '/auth/forgot-password';
export const OtpVerification = () => '/auth/verify-otp';
export const ResetPassword = () => '/auth/reset-password';

// Dashboard Module Routes
export const Dashboard = () => '/dashboard/home';


// Settings Module Routes
export const Settings = () => '/dashboard/settings';

//Diet Plan Route
export const LearningHubList = () => '/dashboard/learning-hub';
export const LearningHubCreate = () => '/dashboard/learning-hub/create';
export const LearningHubEdit = (id: number) => `/dashboard/learning-hub/${id}`;


// Admin Module Route
export const AdminCreate = () => '/dashboard/admins/create';


//Teachers Module Route
export const TeachersCreate = () => '/dashboard/teachers/create';

// Students Module Route
export const StudentsCreate = () => '/dashboard/students/create';

//Academics Years Module Route
export const AcademicYearsCreate = () => '/dashboard/academic-years/create';

//Academic Terms Module Route
export const AcademicTermsCreate = () => '/dashboard/academic-terms/create';

//Class Level Route
export const ClassLevelsCreate = () => '/dashboard/class-levels/create';

//Programs Route
export const ProgramsCreate = () => '/dashboard/programs/create';

//Subjects Route
export const SubjectsCreate = () => '/dashboard/subjects/create';

//Year Groups Route
export const YearGroupsCreate = () => '/dashboard/year-groups/create';

//Teachers Panel

export const ExamCreate = () => '/dashboard/teacher/exams/create';
export const QuestionCreate = () => '/dashboard/teacher/questions/create';