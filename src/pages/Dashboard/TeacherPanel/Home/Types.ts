import type { ExamsDataResponse } from "../Exams/Types";

export interface TeacherProfileDataResponse {
  name: string;
  email: string;
  teacherId: string;
  applicationStatus: string;
  isSuspended: boolean;
  dateEmployed: string;
  examsCreated: ExamsDataResponse[];
}