import { Component } from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [1, 2, 3];

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a href='/'>link {link}</a>
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
