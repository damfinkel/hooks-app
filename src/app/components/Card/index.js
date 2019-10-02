import React, { Component } from 'react';

import styles from './styles.module.scss';

const MAX_POWER = 10;

class Card extends Component {
  getPower = () => {
    const { card } = this.props;
    const characterSum = card.name
      .split('')
      .reduce((result, _, index) => result + card.name.charCodeAt(index), 0);
    return (characterSum % MAX_POWER) + 1;
  };

  handleClick = () => {
    const { card, index, onClick } = this.props;
    onClick(card, index);
  };

  render() {
    const { card, selected } = this.props;
    const power = this.getPower();
    return (
      <div
        key={card.id}
        className={`column ${styles.cardContainer} ${selected ? styles.selected : ''}`}
        // htmlFor={`cardCheckbox${card.id}`}
      >
        <input
          id={`cardCheckbox${card.id}`}
          type="checkbox"
          value={selected}
          checked={selected}
          onChange={this.handleClick}
          className={styles.cardInput}
        />
        <img src={card.image} alt={card.name} className={styles.cardImage} />
        <div className={`column ${styles.cardOverlay}`}>
          <h3 className={`${styles.cardTitle}`}>{card.name}</h3>
          <span className={styles.cardSubtitle}>id: {card.id} - created 2 years ago</span>
        </div>
        <div className={`column item-1 ${styles.cardStatsContainer}`}>
          <div className={`row space-between middle ${styles.statRow}`}>
            <h4 className={styles.statTitle}>status</h4>
            <span className={styles.statValue}>{card.status}</span>
          </div>
          <div className={`row space-between middle ${styles.statRow}`}>
            <h4 className={styles.statTitle}>species</h4>
            <span className={styles.statValue}>{card.species}</span>
          </div>
          <div className={`row space-between middle ${styles.statRow}`}>
            <h4 className={styles.statTitle}>gender</h4>
            <span className={styles.statValue}>{card.gender}</span>
          </div>
          <div className={`row space-between middle ${styles.statRow}`}>
            <h4 className={styles.statTitle}>origin</h4>
            <span className={styles.statValue}>{card.origin?.name || 'Unknown'}</span>
          </div>
          <div className={`row space-between middle ${styles.statRow}`}>
            <h4 className={styles.statTitle}>last location</h4>
            <span className={styles.statValue}>{card.location?.name || 'Unknown'}</span>
          </div>
          <div className={`row space-between middle ${styles.statRow}`}>
            <h4 className={styles.statTitle}>power</h4>
            <span className={styles.statValue}>{power}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
