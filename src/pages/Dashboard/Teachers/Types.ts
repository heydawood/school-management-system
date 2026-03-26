export interface TeacherDataResponse {
  name: string;
  email: string;
  role: string;
  id: string;
  isWithdrawn: boolean,
  isSuspended: boolean,
  applicationStatus: string,
  examsCreated?: [],
  dateEmployed: string,
  teacherId: string,
  createdAt: string,
  updatedAt: string,
}

