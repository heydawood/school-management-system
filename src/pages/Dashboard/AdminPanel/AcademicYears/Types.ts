export interface AcademicYearDataResponse {
  name: string;
  id: string;
  fromYear: string;
  toYear: string;
  isCurrent: boolean;
  createdBy: string;
  students: [];
  teachers: [];
  createdAt: string;
  updatedAt: string;
}