import { Question } from "./question";
import { Result } from "./result";

export interface ApiResponse {
    questions: Question[];
    results: Result[];
}

export const ApiResponseState: ApiResponse = {
    questions: [],
    results: []
}