export interface Answer {
    id: number;
    questionId: number;
    optionId: number;
}

export const answerState: Answer = {
    id: 0,
    questionId: 0,
    optionId: 0
}