import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Loading from '~components/Spinner/components/loading';
import Card from '~components/Card';

import { DeckContext } from '../../contexts';

import { actionCreators as actions } from './redux/actions';
import styles from './styles.module.scss';

const CARD_AMOUNT_TO_PLAY = 5;

class CardList extends Component {
  static contextType = DeckContext;

  state = { selectedCards: {} };

  componentDidMount() {
    this.props.getCards();
  }

  handleSelectCard = (card, index) => {
    const { selectedCards } = this.state;
    let newSelectedCards = { ...selectedCards };
    if (selectedCards[index]) {
      delete newSelectedCards[index];
    } else {
      newSelectedCards = { ...selectedCards, [index]: card };
    }
    this.setState({ selectedCards: newSelectedCards });
  };

  handlePlay = () => {
    this.context.setDeck(Object.values(this.state.selectedCards));
    this.props.goToGame();
  };

  render() {
    const { cards } = this.props;
    const { selectedCards } = this.state;
    const selectedCardsAmount = Object.keys(selectedCards).length;

    if (!cards) {
      return <Loading />;
    }

    return (
      <div className={`${styles.cardListContainer} column center`}>
        <h1 className={`${styles.cardListTitle} m-bottom-4`}>Rick & Morty card list</h1>
        <button
          type="button"
          className={`button ${styles.playButton} m-bottom-4`}
          onClick={this.handlePlay}
          disabled={selectedCardsAmount !== CARD_AMOUNT_TO_PLAY}
        >
          Play
        </button>
        <h2 className={`${styles.cardListTitle} m-bottom-4`}>
          Select {CARD_AMOUNT_TO_PLAY} cards to play! Selected cards: {selectedCardsAmount}
        </h2>
        <div className={styles.cardList}>
          {cards?.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              selected={!!selectedCards[index]}
              onClick={this.handleSelectCard}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cardList.cards,
  pokemonsLoading: state.cardList.cardsLoading
});

const mapDispatchToProps = dispatch => ({
  getCards: () => dispatch(actions.getCards()),
  goToGame: () => dispatch(push('/game'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);

// const executeAsyncRequest = async ({ request, onPrefetch, onSuccess, onError, onPostFetch }) => {
//   onPrefetch();
//   const response = await request();
//   if (response.ok) {
//     onSuccess(response.data);
//   } else {
//     onError(response.error);
//   }
//   onPostFetch();
// };

// const useAsyncRequest = (request, dependencies, initialState = null) => {
//   const [state, setState] = useState(initialState);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetch = async () => {
//       await executeAsyncRequest({
//         request,
//         onPrefetch: () => setLoading(true),
//         onSuccess: data => setState(data),
//         onError: e => setError(e),
//         onPostFetch: () => setLoading(false)
//       });
//     };

//     fetch();
//   }, [dependencies]);

//   return [state, loading, error];
// };

// const [state, loading, error] = useAsyncRequest(() => {}, []);
