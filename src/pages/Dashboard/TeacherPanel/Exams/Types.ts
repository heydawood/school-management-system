export interface ExamsDataResponse {
    name: string;
    email: string;
    role: string;
    id: string;
    description: string;
    subject: string;
    program: string;
    passMark: number,
    totalMark: number,
    academicTerm: string;
    duration: string;
    examDate: string;
    examTime: string;
    examType: string;
    examStatus: boolean,
    questions: []
}
