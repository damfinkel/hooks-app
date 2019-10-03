import { completeTypes, createTypes } from 'redux-recompose';

import CardsService from '~services/CardService';

const completedTypes = completeTypes(['GET_CPU_DECK']);

export const actions = createTypes(completedTypes, '@@GAME');

export const TARGETS = {
  cpuDeck: 'cpuDeck'
};

export const actionCreators = {
  getCpuDeck: () => ({
    type: actions.GET_CPU_DECK,
    target: TARGETS.cpuDeck,
    service: CardsService.getCards,
    payload: { origin: 'Gazorpazorp' },
    successSelector: result => result.data.results
  })
};
