//const data = require('./testdata');
const initial_value = {
  activation: false,
  address: '',
  button1: true,
  button2: false,
  button3: false,
  button4: false,
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'screen_3setAddress':
      return {...state, address: action.payload};
    case 'screen_3changeActivation':
      return {...state, activation: action.payload};
    case 'screen_3setButton1':
      return {...state, button1: action.payload};
    case 'screen_3setButton2':
      return {...state, button2: action.payload};
    case 'screen_3setButton3':
      return {...state, button3: action.payload};
    case 'screen_3setButton4':
      return {...state, button4: action.payload};
    default:
      return state;
  }
};
