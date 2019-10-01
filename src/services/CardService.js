import api from '../config/api';

const CardsService = {
  getCards: () => api.get('/character')
};

export default CardsService;
