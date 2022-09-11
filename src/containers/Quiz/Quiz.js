import { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        id: 1,
        question: 'Какого цвета небо?',
        answers: [
          { id: 1, text: 'Черный' },
          { id: 2, text: 'Голубой' },
          { id: 3, text: 'Красный' },
          { id: 4, text: 'Зеленый' },
        ],
        rightAnswerId: 2,
      },
      {
        id: 2,
        question: 'В каком году основали Санкт-Петербург?',
        answers: [
          { id: 1, text: '1700' },
          { id: 2, text: '1702' },
          { id: 3, text: '1703' },
          { id: 4, text: '1803' },
        ],
        rightAnswerId: 3,
      },
      // {
      //   id: 3,
      //   question: 'Ден красавчик?',
      //   answers: [
      //     { id: 1, text: 'Да' },
      //     { id: 2, text: 'Нет' },
      //   ],
      //   rightAnswerId: 1,
      // },
      // {
      //   id: 4,
      //   question: 'Илюха не очень?',
      //   answers: [
      //     { id: 1, text: 'Да' },
      //     { id: 2, text: 'Нет' },
      //   ],
      //   rightAnswerId: 1,
      // },
    ],
    results: {},
    isFinished: false,
  };

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (!results[question.id]) {
      results[question.id] = 'success';
    }

    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: {
          [answerId]: 'success',
          results,
        },
      });
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {
          [answerId]: 'error',
          results,
        },
      });
    }
  };
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            ></FinishedQuiz>
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            ></ActiveQuiz>
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
