export interface StudentDataResponse {
  name: string;
  email: string;
  role: string;
  id: string;
  applicationStatus: string,
  classLevels?: [],
  examResults?: [],
  studentId: string,
  createdAt: string,
  updatedAt: string,
  dateAdmitted: string,
  isGraduated: boolean,
  isWithdrawn: boolean,
  isSuspended: boolean,
}