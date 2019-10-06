import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Routes from '../../../constants/routes';

import Home from './screens/Home';
import Game from './screens/Game';
import styles from './styles.module.scss';
import { DeckContext } from './contexts';

class Dashboard extends Component {
  // eslint-disable-next-line react/no-unused-state
  setDeck = deck => this.setState({ deck });

  // eslint-disable-next-line react/no-unused-state
  state = { deck: [], setDeck: this.setDeck };

  render() {
    return (
      <div className={styles.container}>
        <DeckContext.Provider value={this.state}>
          <Switch>
            <Route exact path={Routes.HOME} component={Home} />
            {this.state.deck.length && <Route exact path={Routes.GAME} component={Game} />}
            <Redirect to={Routes.HOME} />
          </Switch>
        </DeckContext.Provider>
      </div>
    );
  }
}

export default Dashboard;
