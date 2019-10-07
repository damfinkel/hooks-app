import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { shuffle } from '~utils/array';
import Loading from '~components/Spinner/components/loading';
import Card from '~components/Card';
import { getPower, DECK_SIZE } from '~utils/cards';

import { DeckContext } from '../../contexts';

import { actionCreators as actions } from './redux/actions';
import cardImage from './assets/magic-card-back.jpeg';
import versusImage from './assets/versus.png';
import styles from './styles.module.scss';

function Game1() {
  const { deck } = useContext(DeckContext);
  const [score, setScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [remainingDeck, setRemainingDeck] = useState(shuffle(deck));
  const [remainingCpuDeck, setRemainingCpuDeck] = useState(null);
  const [currentPlayerCard, setCurrentPlayerCard] = useState(null);
  const [currentCpuCard, setCurrentCpuCard] = useState(null);

  const cpuDeck = useSelector(state => state.game.cpuDeck);
  const dispatch = useDispatch();
  const getCpuDeck = useCallback(() => dispatch(actions.getCpuDeck()), [dispatch]);

  useEffect(() => {
    getCpuDeck();
  }, [getCpuDeck]);

  useEffect(() => {
    if (cpuDeck && !remainingCpuDeck) {
      setRemainingCpuDeck(shuffle(cpuDeck.slice(0, DECK_SIZE)));
    }
  }, [cpuDeck, remainingCpuDeck]);

  const handleShowNextCard = () => {
    const nextPlayerCard = remainingDeck[0];
    const nextCpuCard = remainingCpuDeck[0];
    const newRemainingDeck = remainingDeck.slice(1, remainingDeck.length);
    const newRemainingCpuDeck = remainingCpuDeck.slice(1, remainingCpuDeck.length);
    const youWin = getPower(nextPlayerCard) > getPower(nextCpuCard);
    const newScore = score + (youWin ? 1 : 0);
    const newCpuScore = cpuScore + (youWin ? 0 : 1);

    setCurrentPlayerCard(nextPlayerCard);
    setCurrentCpuCard(nextCpuCard);
    setRemainingDeck(newRemainingDeck);
    setRemainingCpuDeck(newRemainingCpuDeck);
    setScore(newScore);
    setCpuScore(newCpuScore);
  };

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
          <button type="button" className="button self-middle m-bottom-4" onClick={handleShowNextCard}>
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

export default Game1;
