import React, { Component } from 'react';

class Game extends Component {
  render() {
    return(
      <div>
        <Boardgame />
        <div>
          <CardCounter />
          <BottomDeck />
          <LifeAndPoint />
        </div>
      </div>
    );
  }
}
