import React, { Component } from 'react';
import { connect } from 'react-redux';

import { shuffle } from '~utils/array';
import { DeckContext } from '~screens/Dashboard/contexts';

import { actionCreators as actions } from './redux/actions';
import cardImage from './assets/magic-card-back.jpeg';
import styles from './styles.module.scss';

class Game extends Component {
  static contextType = DeckContext;

  static getDerivedStateFromProps(props, prevState) {
    if (props.cpuDeck && !prevState.remainingCpuDeck) {
      // Fetched cpu deck
      return { remainingCpuDeck: shuffle(props.cpuDeck.slice(0, prevState.remainingDeck.length)) };
    }
    return null;
  }

  state = { score: 0, remainingDeck: shuffle(this.context.deck), remainingCpuDeck: null };

  componentDidMount() {
    this.props.getCpuDeck();
  }

  render() {
    const { score } = this.state;
    return (
      <div className={styles.gameContainer}>
        <div className="column">
          <h5 className={`${styles.deckTitle} m-bottom-4`}>Your deck</h5>
          <img src={cardImage} className={styles.cardImage} />
        </div>
        <div className="column center middle">
          <button type="button" className="button self-middle m-bottom-4">
            Next card
          </button>
          <span className={styles.score}>Score: {score}</span>
        </div>
        <div className="column">
          <h5 className={`${styles.deckTitle} m-bottom-4`}>CPU deck</h5>
          <img src={cardImage} className={styles.cardImage} />
        </div>
        <img src={cardImage} className={styles.cardImage} />
        <img src={cardImage} className={`${styles.cardImage} ${styles.cpuCurrentCard}`} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cpuDeck: state.game.cpuDeck,
  cpuDeckLoading: state.game.cpuDeckLoading
});

const mapDispatchToProps = dispatch => ({
  getCpuDeck: () => dispatch(actions.getCpuDeck({ species: 'Gazorpazorp' }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
