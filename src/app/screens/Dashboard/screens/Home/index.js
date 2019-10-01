import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Loading from '~components/Spinner/components/loading';
import Card from '~components/Card';

import { actionCreators as actions } from './redux/actions';
import styles from './styles.module.scss';

class CardList extends Component {
  state = { selectedCardIndexes: new Set() };

  componentDidMount() {
    this.props.getCards();
  }

  handleSelectCard = index => {
    const { selectedCardIndexes } = this.state;
    const newSet = new Set(selectedCardIndexes);

    if (selectedCardIndexes.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    this.setState({
      selectedCardIndexes: newSet
    });
  };

  handlePlay = () => {
    this.props.goToGame();
  };

  render() {
    const { cards } = this.props;
    if (!cards) {
      return <Loading />;
    }

    return (
      <div className={`${styles.cardListContainer} column center`}>
        <h1 className={`${styles.cardListTitle} m-bottom-4`}>Rick & Morty card list</h1>
        <button type="button" className={`${styles.playButton} m-bottom-4`} onClick={this.handlePlay}>
          Play
        </button>
        <div className={styles.cardList}>{cards?.map(card => <Card card={card} />)}</div>
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
