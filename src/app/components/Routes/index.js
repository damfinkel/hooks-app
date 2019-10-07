import React, { lazy, useReducer } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import { history } from '../../../redux/store';
import Suspense from '../Suspense';
import Routes from '../../../constants/routes';
import Navbar from '../Navbar';

import { AppContext } from './contexts';
import { appReducer, initialState } from './reducer';
import styles from './styles.scss';

const Home = lazy(() => import('../../screens/Dashboard'));

function AppRoutes() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <ConnectedRouter history={history}>
      <div className={styles.container}>
        <AppContext.Provider value={{ state, dispatch }}>
          <Suspense>
            <Navbar />
            <Switch>
              <Route path={Routes.HOME} component={Home} />
            </Switch>
          </Suspense>
        </AppContext.Provider>
      </div>
    </ConnectedRouter>
  );
}

export default AppRoutes;
