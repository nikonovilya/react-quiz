import classes from './MenuToggle.module.css';

const MenuToggle = (props) => {
  const classesArray = [classes.MenuToggle, 'fa'];

  if (props.isOpen) {
    classesArray.push('fa-times');
    classesArray.push(classes.open);
  } else {
    classesArray.push('fa-bars');
  }

  return <i className={classesArray.join(' ')} onClick={props.onToggle}></i>;
};

export default MenuToggle;
