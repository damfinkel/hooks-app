import React from 'react';
import '.styles.scss';

function CardCounter() {
  return(
      <div className="container">
        <span className="cards-title">Cartas restantes: </span>
        <span className="cards">{cards}</span>
      </div>
  );
}

export default CardCounter;
