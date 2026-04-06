export interface AdminDataResponse {
  name: string;
  email: string;
  role: string;
  id: string;
}

export interface AdminDataByIdResponse {
  name: string;
  email: string;
  role: string;
  id: string;
  academicTerms?: [];
  programs?: [];
  yearGroups?: [];
  academicYears?: [];
  classLevels?: [];
  teachers?: [];
  students?: [];
  createdAt: string;
  updatedAt: string;
}