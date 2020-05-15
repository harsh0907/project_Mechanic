const initial_value = {
  change: 'all',
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'history_Change':
      return {...state, change: action.payload};
    default:
      return state;
  }
};
