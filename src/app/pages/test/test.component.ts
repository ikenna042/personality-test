import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Answer, Question } from '../../model';
import { StoreService } from 'src/app/state/store.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  questions: Question[] = [];
  currentQuestion: Partial<Question> = {};
  currentQuestionCount = 1;
  totalQuestions = this.questions.length;
  currentAnswer: any = {};
  previousAnswer: any = {};
  answers: Answer[] = [];
  storeSub: Subscription;

  constructor(private readonly storeService: StoreService) {
    this.storeSub = this.storeService.stateChanged.subscribe(state => {
      if (state) {
        console.log({state: state});
        this.currentQuestion = state.currentQuestion;
        this.totalQuestions = state.questionsCount;
        this.answers = state.answers;
        this.currentQuestionCount = this.answers.length !== this.totalQuestions ? state.currentQuestionCount : this.currentQuestionCount;
      }
    }
    )
  }

  ngOnInit(): void {
    this.storeService.getQuestions();
    console.log({currentQuestion: this.currentQuestion})
  }

  next() {
    this.storeService.setCurrentAnswer(this.currentAnswer);
    this.storeService.next();
    this.previousAnswer = this.currentAnswer;
    this.currentAnswer = {};
  }

  previous() {
    this.currentAnswer = this.previousAnswer;
    this.storeService.previous();
  }

  optionSelected(item: any) {
    console.log(item)
    this.currentAnswer = {
      id: item.id,
      questionId: this.currentQuestion.id,
      optionId: item.id
    };
  }

  finish() {
    console.log('finish')
    
  }

  startAgain() {
    this.storeService.reset();
  }

}
