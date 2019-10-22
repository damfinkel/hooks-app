export const appActions = {
  CHANGE_THEME: 'CHANGE_THEME'
};

export const initialState = { theme: 'dark' };

export const appReducer = (state, action) => {
  switch (action.type) {
    case appActions.CHANGE_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};
