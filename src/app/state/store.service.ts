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

  reset(): void {
    this.setState({
      currentQuestion: this.getState().questions[0],
      currentQuestionCount: 1,
      answers: []
    })
  }

  checkResult() {
    // calculate personality
    const answers = this.getState().answers;
    const results = this.getState().results;
    let a = 0;
    let b = 0;
    let c = 0;
    answers.forEach(answer => {
      if (answer.letter === 'A') {
        a++;
      } else if (answer.letter === 'B') {
        b++;
      } else {
        c++;
      }
    });
    this.setState({
      currentResult: a > 2 ? results[0] : results[1]
    })
  }
}
