import React, { Component } from 'react';
import { connect } from 'react-redux';

import { shuffle } from '~utils/array';
import { DeckContext } from '~screens/Dashboard/contexts';
import Loading from '~components/Spinner/components/loading';
import Card from '~components/Card';
import { getPower } from '~utils/cards';

import { actionCreators as actions } from './redux/actions';
import cardImage from './assets/magic-card-back.jpeg';
import versusImage from './assets/versus.png';
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

  state = {
    score: 0,
    cpuScore: 0,
    remainingDeck: shuffle(this.context.deck),
    remainingCpuDeck: null,
    currentPlayerCard: null,
    currentCpuCard: null
  };

  componentDidMount() {
    this.props.getCpuDeck();
  }

  handleShowNextCard = () => {
    const { remainingDeck, remainingCpuDeck, score, cpuScore } = this.state;
    const nextPlayerCard = remainingDeck[0];
    const nextCpuCard = remainingCpuDeck[0];
    const newRemainingDeck = remainingDeck.slice(1, remainingDeck.length);
    const newRemainingCpuDeck = remainingCpuDeck.slice(1, remainingCpuDeck.length);
    const youWin = getPower(nextPlayerCard) > getPower(nextCpuCard);
    const newScore = score + (youWin ? 1 : 0);
    const newCpuScore = cpuScore + (youWin ? 0 : 1);

    this.setState({
      currentPlayerCard: nextPlayerCard,
      currentCpuCard: nextCpuCard,
      remainingDeck: newRemainingDeck,
      remainingCpuDeck: newRemainingCpuDeck,
      score: newScore,
      cpuScore: newCpuScore
    });
  };

  render() {
    const {
      score,
      cpuScore,
      remainingDeck,
      remainingCpuDeck,
      currentCpuCard,
      currentPlayerCard
    } = this.state;

    if (!remainingCpuDeck) {
      return <Loading />;
    }
    return (
      <div className={styles.gameContainer}>
        <div className="column">
          <h5 className={`${styles.deckTitle} m-bottom-4`}>Your deck</h5>
          <img src={cardImage} className={`${styles.cardImage} m-bottom-4`} />
          <span className={`${styles.score} m-bottom-4`}>Score: {score}</span>
        </div>
        <div className="column center middle">
          {remainingDeck.length > 0 && (
            <button type="button" className="button self-middle m-bottom-4" onClick={this.handleShowNextCard}>
              {currentPlayerCard ? 'Next card' : 'Start game'}
            </button>
          )}
          {remainingCpuDeck.length === 0 && (
            <span className={styles.score}>{score > cpuScore ? 'You win!' : 'You lose :('}</span>
          )}
        </div>
        <div className="column">
          <h5 className={`${styles.deckTitle} m-bottom-4`}>CPU deck</h5>
          <img src={cardImage} className={`${styles.cardImage} m-bottom-4`} />
          <span className={styles.score}>Score: {cpuScore}</span>
        </div>
        {currentPlayerCard && <Card card={currentPlayerCard} />}
        {currentPlayerCard && <img src={versusImage} className={styles.versusImage} />}
        {currentCpuCard && <Card className={styles.cpuCurrentCard} card={currentCpuCard} />}
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
