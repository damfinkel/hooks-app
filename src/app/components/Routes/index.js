import React, { lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import { history } from '../../../redux/store';
import Suspense from '../Suspense';
import Routes from '../../../constants/routes';

import styles from './styles.scss';

const Home = lazy(() => import('../../screens/Dashboard'));

function AppRoutes() {
  return (
    <ConnectedRouter history={history}>
      <div className={styles.container}>
        <Suspense>
          <Switch>
            <Route path={Routes.HOME} component={Home} />
          </Switch>
        </Suspense>
      </div>
    </ConnectedRouter>
  );
}

export default AppRoutes;
