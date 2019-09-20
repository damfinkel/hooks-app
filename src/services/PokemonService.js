import api from '../config/api';

const CardsService = {
  getCards: () => api.get(encodeURI('/search?term=greta+van+fleet'))
};

export default CardsService;
