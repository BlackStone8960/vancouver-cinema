const filtersReducerDefaultState = {
  text: ''
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_FILTERS' :
      return {
        ...action.filters
      };
    case 'RESET_FILTERS' :
      return filtersReducerDefaultState;
    default:
      return state;
  }
};

export { filtersReducer as default };