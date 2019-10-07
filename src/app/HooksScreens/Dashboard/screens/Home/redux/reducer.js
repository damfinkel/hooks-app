import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions, TARGETS } from './actions';

const initialStateDescription = {
  [TARGETS.cards]: null
};

const initialState = completeState(initialStateDescription);

const reducerDescription = {
  primaryActions: [actions.GET_CARDS],
  override: {}
};

const reducer = createReducer(new Immutable(initialState), completeReducer(reducerDescription));

export default reducer;
