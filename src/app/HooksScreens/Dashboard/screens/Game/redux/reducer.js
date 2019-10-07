import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions, TARGETS } from './actions';

const initialStateDescription = {
  [TARGETS.cpuDeck]: null
};

const initialState = completeState(initialStateDescription);

const reducerDescription = {
  primaryActions: [actions.GET_CPU_DECK],
  override: {}
};

const reducer = createReducer(new Immutable(initialState), completeReducer(reducerDescription));

export default reducer;
