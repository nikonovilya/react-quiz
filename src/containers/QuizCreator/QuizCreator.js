import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/Select/Select';
import {
  createControl,
  validate,
  validateForm,
} from '../../formFramework/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

function createOptionControl(optionNumber) {
  return createControl(
    {
      label: `Вариант ${optionNumber}`,
      errorMessage: 'Значение не может быть пустым',
      id: optionNumber,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    quistion: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };
  submitHandler = (event) => {
    event.preventDefault();
  };
  addQuestionHanlder = () => {
    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;
    const { question, option1, option2, option3, option4 } =
      this.state.formControls;
    const quistionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    };
    quiz.push(quistionItem);
    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(), 
    });
  };

  createQuizHandler = (event) => {
    event.preventDefault();
    console.log(this.state.quiz);
  };

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  selectChangeHandler = (event) => {
    console.log(event.target.value);
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.onChangeHandler(event.target.value, controlName)
            }
          ></Input>
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  }
  render() {
    const select = (
      <Select
        label='Выберите правильный ответ'
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      ></Select>
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            {select}
            <Button
              type='primary'
              onClick={this.addQuestionHanlder}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type='seccess'
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
