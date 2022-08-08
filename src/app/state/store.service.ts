import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { HttpClient } from '@angular/common/http';
import { Answer, AppState, AppStore, Question } from '../model';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends ObservableStore<AppStore> {

  constructor(private readonly http: HttpClient) {
    super({
      logStateChanges: true,
      trackStateHistory: true
    })
    this.setState(AppState, 'INITIALIZED');
  }

  async getQuestions(): Promise<void> {
    this.http.get<any>('/assets/data.json')
      .subscribe({
        next: (data) => {
          this.setState({
            questions: data.questions,
            currentQuestion: data.questions[0],
            currentQuestionCount: 1,
            results: data.results,
            questionsCount: data.questions.length
          });
        },
        error: (err: any) => {
          console.log(err);
        }
      });    
  }

  setCurrentQuestion(question: Question): void {
    const currentQuestionCount = this.getState().currentQuestionCount;
    this.setState({
      currentQuestion: question,
      currentQuestionCount: currentQuestionCount + 1
    })
  }

  setCurrentAnswer(answer: Answer): void {
    this.setState({
      currentAnswer: answer
    })
  }

  next(): void {
    const currentQuestionCount = this.getState().currentQuestionCount;
    const questions = this.getState().questions;
    const currentQuestion = questions[currentQuestionCount];
    const answers = this.getState().answers;
    this.setState({
      currentQuestion: currentQuestion,
      answers: [...answers, this.getState().currentAnswer],
      currentQuestionCount: answers.length === questions.length ? currentQuestionCount : currentQuestionCount + 1
    })
  }

  previous(): void {
    const currentQuestionCount = this.getState().currentQuestionCount;
    const questions = this.getState().questions;
    const currentQuestion = questions[currentQuestionCount - 2];
    const answers = this.getState().answers;
    this.setState({
      currentQuestion: currentQuestion,
      currentQuestionCount: currentQuestionCount - 1,
      answers: [...answers.slice(0, currentQuestionCount - 1)]
    })
  }

  reset(): void {
    this.setState({
      currentQuestion: this.getState().questions[0],
      currentQuestionCount: 1,
      answers: []
    })
  }
}
