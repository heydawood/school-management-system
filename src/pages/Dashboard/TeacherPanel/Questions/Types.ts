export interface QuestionsDataResponse {
    id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    isCorrect: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}
