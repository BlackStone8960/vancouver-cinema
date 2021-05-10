export const setReservation = (reservations) => ({
  type: 'SET_RESERVATION',
  reservations
})

export const startSetReservation = () => {
  return (dispatch) => {
    const reservations = JSON.parse(localStorage.getItem('reservations'));
    dispatch(setReservation(reservations));
  }
}

export const updateReservation = (reservation) => ({
  type: 'UPDATE_RESERVATION',
  reservation
})

export const startUpdateReservation = (id, reservation) => {
  return (dispatch, getState) => {
    const prevState = getState().reservations;
    const newState = {
      ...prevState,
      [id]: reservation
    }
    localStorage.setItem('reservations', JSON.stringify(newState));
    dispatch(updateReservation(newState));
  }
}