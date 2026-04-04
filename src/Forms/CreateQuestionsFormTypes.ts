export interface CreateQuestionTypes {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    isCorrect: boolean;
    createdBy: string;
};

export const CreateQuestionDefaultValues: CreateQuestionTypes = {
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    isCorrect: false,
    createdBy: '',
}