import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loading from '~components/Spinner/components/loading';

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

  render() {
    const { cards } = this.props;
    if (!cards) {
      return <Loading />;
    }
    return (
      <div className={`${styles.cardListContainer} column center`}>
        <h1 className={styles.cardListTitle}>Listado de cartas</h1>
        <div className={styles.cardList}>
          {cards?.map((card, index) => (
            <Fragment key={card.id}>
              <input
                type="checkbox"
                name={card.id}
                value={card.id}
                onChange={() => this.handleSelectCard(index)}
                checked={this.state.selectedCardIndexes.has(index)}
              />
              <img src={card.imageUrl} alt={card.name} className={`${styles.cardImage} m-right-4`} />
              <span className={styles.cardName}>{card.name}</span>
            </Fragment>
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
  getCards: () => dispatch(actions.getCards())
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
//   }, [request]);

//   return [state, loading, error];
// };

// const [state, loading, error] = useAsyncRequest(() => {}, []);
