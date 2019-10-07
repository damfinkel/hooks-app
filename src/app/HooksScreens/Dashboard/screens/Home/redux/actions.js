import { completeTypes, createTypes } from 'redux-recompose';

import CardsService from '~services/CardService';

const completedTypes = completeTypes(['GET_CARDS']);

export const actions = createTypes(completedTypes, '@@CARDS');

export const TARGETS = {
  cards: 'cards'
};

export const actionCreators = {
  getCards: () => ({
    type: actions.GET_CARDS,
    target: TARGETS.cards,
    service: CardsService.getCards,
    successSelector: result => result.data.results
  })
};
