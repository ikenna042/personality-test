import { Question, Answer, Result } from ".";

export interface AppStore {
    questions: Question[];
    currentQuestion: Question | any;
    questionsCount: number;
    currentQuestionCount: number;
    answers: Answer[];
    currentAnswer: Answer | any;
    results: Result[];
    currentResult: Result | any;

}

export const AppState: AppStore = {
    questions: [],
    currentQuestion: undefined,
    questionsCount: 0,
    currentQuestionCount: 0,
    answers: [],
    currentAnswer: undefined,
    results: [],
    currentResult: undefined,
}