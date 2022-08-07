import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  currentQuestionCount = 1;
  totalQuestions = 10;
  currentAnswer: any = undefined;
  question = 'You’re really busy at work and a colleague is telling you their life story and personal woes. You'

  options = [
    {
      letter: 'A',
      value: "Don't dare to interrupt them"
    },
    {
      letter: 'B',
      value: "Don't dare to interrupt them"
    }
  ]

  constructor() { }

  ngOnInit(): void {
    console.log({options: this.options})
  }

  next() {
    console.log('next')
  }

  previous() {
    console.log('previous')
  }

  optionSelected(item: any) {
    console.log(item)
    this.currentAnswer = item;
  }

}
