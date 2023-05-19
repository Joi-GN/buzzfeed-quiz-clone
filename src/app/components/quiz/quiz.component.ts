import { Component, OnInit } from '@angular/core';
import questions from '../../../assets/data/questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{

  title:string = "";

  quizQuestions:Object[] = [];
  questionsIndex:number = 0;
  currentQuestion:any = "";

  userAnswers:string[] = [];
  result:string = "";

  end: boolean = false;

  ngOnInit(): void {
      if (questions) {
        this.title = questions.title;
        this.quizQuestions = questions.questions;
        this.currentQuestion = this.quizQuestions[this.questionsIndex];
      }
  }

  pushAnswer(option:string) {
    this.userAnswers.push(option);
    this.nextQuestion();
  }

  async nextQuestion() {
    this.questionsIndex++;

    if(this.quizQuestions.length > this.questionsIndex) {
      this.currentQuestion = this.quizQuestions[this.questionsIndex];
    } else {
      const mostSelected = await this.calculateResult();
      this.end = true;
      this.result = questions.results[mostSelected as keyof typeof questions.results];
    }
  }

  async calculateResult() {
    return this.userAnswers.reduce((curr, prev, i, arr) => {
      if (
        arr.filter(item => item === prev).length >
        arr.filter(item => item === curr).length
      ) return prev;
      else return curr;
    })
  }

}