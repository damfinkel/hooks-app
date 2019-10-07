import React, { Component } from 'react';

import { AppContext } from '../Routes/contexts';
import { appActions } from '../Routes/reducer';

import styles from './styles.module.scss';

class Navbar extends Component {
  static contextType = AppContext;

  handleChangeTheme = () => {
    const payload = this.context.state.theme === 'dark' ? 'light' : 'dark';
    this.context.dispatch({ type: appActions.CHANGE_THEME, payload });
  };

  render() {
    return (
      <div className={`${styles.navbarContainer} row end`}>
        <button type="button" className={styles.themeButton} onClick={this.handleChangeTheme}>
          Change theme
        </button>
      </div>
    );
  }
}

export default Navbar;
