import React from 'react';
import '.styles.scss';

function LifeAndPoint() {
  return(
    <div className="container">
      <div className="points-container">
        <span className="points-title">Puntos ganados: </span>
        <span className="points">{points}</span>
      </div>
      <div className="lifes-container">
        <span className="lifes-title">Vidas: </span>
        <span className="lifes">{lifes}</span>
      </div>
    </div> 
  );
}

export default LifeAndPoint;
