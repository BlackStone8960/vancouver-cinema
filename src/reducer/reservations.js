const reservationsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_RESERVATION':
      return action.reservations;
    case 'UPDATE_RESERVATION':
      return action.reservation;
    default :
      return state;
  }
};

export { reservationsReducer as default };