export interface StudentExamDataResponse{
  name: string;
  description: string;
  subject: string;
  id: string;
  program: string;
  academicTerm: string;
  attemptStatus: string;
  
  exam: {
    name: string;
    examDate: string;
    duration: string;
    id: string;
    attemptStatus: string;
  };
  exams: {
    name: string;
    examDate: string;
    duration: string;
    id: string;
    attemptStatus: string;
  }
}