import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AppContext } from '~components/Routes/contexts';

import Routes from '../../../constants/routes';

import Home from './screens/Home';
import Game from './screens/Game';
import styles from './styles.module.scss';
import { DeckContext } from './contexts';

class Dashboard extends Component {
  static contextType = AppContext;

  // eslint-disable-next-line react/no-unused-state
  setDeck = deck => this.setState({ deck });

  // eslint-disable-next-line react/no-unused-state
  state = { deck: [], setDeck: this.setDeck };

  render() {
    const backgroundColor = this.context.state.theme === 'dark' ? '#2d3739' : '#9a9a9a';
    return (
      // eslint-disable-next-line react/forbid-dom-props
      <div className={styles.container} style={{ backgroundColor }}>
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
