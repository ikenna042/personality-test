import { Option } from '.'

export interface Question {
    id: number;
    question: string;
    options: Option[];
}

export const questionState: Question = {
    id: 0,
    question: '',
    options: []
}