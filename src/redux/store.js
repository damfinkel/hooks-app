import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers as CR, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { fetchMiddleware, configureMergeState, wrapCombineReducers } from 'redux-recompose';

/*
 * TODO Add this if you need it
 * import AnalyticsMiddleware from '../services/AnalyticsService';
 */
import cardList from '~screens/Dashboard/screens/Home/redux/reducer';

configureMergeState((state, diff) => state.merge(diff));

const combineReducers = wrapCombineReducers(CR);

export const history = createBrowserHistory();

// Add reducers here
const reducers = combineReducers({
  cardList,
  router: connectRouter(history)
});

const middlewares = [thunk, fetchMiddleware, routerMiddleware(history)];
const enhancers = [];

// TODO Add this if you need it.
/* ------------- Analytics Middleware ------------- */
// Middlewares.push(AnalyticsMiddleware);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = (state, action) =>
  /*
   * TODO Add this if you need it
   * if (action.type === authActions.SIGN_OUT) {
   *   return reducers(getGlobalState(state), action);
   * }
   */
  reducers(state, action);

const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
