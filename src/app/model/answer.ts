export interface Answer {
    id: number;
    questionId: number;
    optionId: number;
    letter: string;
}

export const answerState: Answer = {
    id: 0,
    questionId: 0,
    optionId: 0,
    letter: ''
}