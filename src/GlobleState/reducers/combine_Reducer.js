const initial_value = {
  change: 'mainscreen',
  bufferchange: 'mainscreen',
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'change':
      return {...state, change: action.payload};
    case 'buffer_change':
      return {...state, bufferchange: action.payload};
    default:
      return state;
  }
};
