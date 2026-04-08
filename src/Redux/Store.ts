import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/Slice';
import authTeacherReducer from './AuthTeacher/Slice';
import authStudentReducer from './AuthStudent/Slice';
import userManagementReducer from './UserManagement/Slice';
import SubscriptionReducer from './Subscription/Slice';
import workoutsReducer from './Workouts/Slice';
import paymentsReducer from './Payments/Slice';
import homePageReducer from './Home/Slice';
import CategoryReducer from './Categories/Slice';
import AnalyticsReducer from './Analytics/Slice';
import LearningHubReducer from './LearningHub/Slice';
import AdminSliceReducer from './AdminPanel/Admin/Slice';
import TeacherSliceReducer from './Teachers/Slice';
import StudentSliceReducer from './Students/Slice';
import AcademicYearsReducer from './AdminPanel/AcademicYears/Slice';
import AcademicTermsReducer from './AdminPanel/AcademicTerms/Slice';
import ClassLevelsReducer from './AdminPanel/ClassLevels/Slice';
import ProgramsReducer from './AdminPanel/Programs/Slice';
import SubjectsReducer from './AdminPanel/Subjects/Slice';
import YearGroupsReducer from './AdminPanel/YearGroups/Slice';
import ExamsReducer from './Exams/Slice';
import QuestionsReducer from './Questions/Slice';
import ResultsReducer from './Results/Slice';

export const appReducer = combineReducers({
  authReducer,
  authTeacherReducer,
  authStudentReducer,
  userManagement: userManagementReducer,
  subscriptionRecords: SubscriptionReducer,
  workouts: workoutsReducer,
  paymentRecords: paymentsReducer,
  homePage: homePageReducer,
  CategoryRecords: CategoryReducer,
  analytics: AnalyticsReducer,
  LearningHubRecords: LearningHubReducer,
  AdminRecords: AdminSliceReducer,
  TeacherRecords: TeacherSliceReducer,
  StudentRecords: StudentSliceReducer,
  AcademicYearsRecords: AcademicYearsReducer,
  AcademicTermsRecords: AcademicTermsReducer,
  ClassLevelsRecords: ClassLevelsReducer,
  ProgramsRecords: ProgramsReducer,
  SubjectsRecords: SubjectsReducer,
  YearGroupsRecords: YearGroupsReducer,
  ExamsRecords: ExamsReducer,
  QuestionsRecords: QuestionsReducer,
  ResultsRecords: ResultsReducer,
});

export const store = () => {
  return configureStore({
    reducer: appReducer,
  });
};

// Infer the type of makeStore SubscriptionSlice
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
