import React, { useContext } from 'react';

import { AppContext } from '../Routes/contexts';
import { appActions } from '../Routes/reducer';

import styles from './styles.module.scss';

function Navbar() {
  const { state, dispatch } = useContext(AppContext);

  const handleChangeTheme = () => {
    const payload = state.theme === 'dark' ? 'light' : 'dark';
    dispatch({ type: appActions.CHANGE_THEME, payload });
  };

  return (
    <div className={`${styles.navbarContainer} row end`}>
      <button type="button" className={styles.themeButton} onClick={handleChangeTheme}>
        Change theme
      </button>
    </div>
  );
}

export default Navbar;
