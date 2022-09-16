import { Component } from 'react';
import classes from './Drawer.module.css';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [
  { label: 'Список', to: '/', exact: true },
  { label: 'Авторизация', to: 'auth', exact: false },
  { label: 'Создать тест', to: 'quiz-creator', exact: false },
];

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact.toString()}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    const classesArray = [classes.Drawer];
    if (!this.props.isOpen) {
      classesArray.push(classes.close);
    }
    return (
      <>
        <nav className={classesArray.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? (
          <Backdrop onClick={this.props.onClose}></Backdrop>
        ) : null}
      </>
    );
  }
}

export default Drawer;
