export interface StudentExamDataResponse{
  name: string;
  description: string;
  subject: string;
  id: string;
  program: string;
  academicTerm: string;
  attemptStatus: string;
  question: string;
}

export interface StudentExamApiResponse  {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    exams: StudentExamDataResponse[];
  };
};
