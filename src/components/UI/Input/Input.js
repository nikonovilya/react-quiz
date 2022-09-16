import React from 'react';
import classes from './Input.module.css';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

export default function Input(props) {
  const inputType = props.type || 'text';
  const classesArray = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    classesArray.push(classes.invalid);
  }

  return (
    <div className={classesArray.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      ></input>
      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Введите верное значние  '}</span>
      ) : null}
    </div>
  );
}
