import React from 'react';
import '.styles.scss';

function BottomDeck({cards}) {
  const renderCard = item => <Card id={item.id}  />

  return(
      <div className="container">
        {cards.map(this.renderCard())}
      </div>
  );
}

export default BottomDeck;
