import classes from './AnswerItem.module.css';

const AnswerItem = (props) => {
  const classesArray = [classes.AnswerItem];
  if (props.state) {
    classesArray.push(classes[props.state]);
  }

  return (
    <li
      className={classesArray.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  );
};

export default AnswerItem;
