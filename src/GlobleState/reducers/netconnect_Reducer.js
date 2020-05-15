const initial_value = {
  net: false,
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'net_Change':
      return {...state, net: action.payload};
    default:
      return state;
  }
};
