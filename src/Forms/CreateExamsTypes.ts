export interface  CreateExamTypes {
  name: string;
  description: string;
  subject: string;
  program: string;
  passMark: number;
  totalMark: number;
  academicTerm: string;
  duration: string;
  examDate: string;
  examTime: string;
  examType: string;
  examStatus: string;
  classLevel: string;
  academicYear: string;
  createdBy: string;
  questions: { value: string }[];
};

export const CreateExamDefaultValues: CreateExamTypes = {
  name: '',
  description: '',
  subject: '',
  program: '',
  passMark: 0,
  totalMark: 0,
  academicTerm: '',
  duration: '',
  examDate: '',
  examTime: '',
  examType: '',
  examStatus: 'pending',
  classLevel: '',
  academicYear: '',
  createdBy: '',
  questions: [{ value: '' }],
};