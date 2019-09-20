import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Routes from '../../../constants/routes';

import Home from './screens/Home';
import styles from './styles.module.scss';

function Dashboard() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route exact path={Routes.HOME} component={Home} />
        <Route render={<Redirect to={Routes.HOME} />} />
      </Switch>
    </div>
  );
}

export default Dashboard;
