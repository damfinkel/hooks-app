import api from '../config/api';

const CardsService = {
  getCards: params => api.get('/character', params)
};

export default CardsService;
