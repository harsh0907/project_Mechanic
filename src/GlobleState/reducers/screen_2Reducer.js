const initial_value = {
  activation: false,
  email: 'harsh@gmail.com',
  password: '123456',
  name: 'Harsh',
  mobile: '8650815062',
  conform_password: '',
  change: 0,
  error: 0,
  types: [1, 0, 1, 0, 1, 0, 0],
  chargingfee: 30,
  rating: 4.5,
  upiId: 'abc@example',
  _id: null, //null replace
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'screen_2setEmail':
      return {...state, email: action.payload};
    case 'screen_2setName':
      return {...state, name: action.payload};
    case 'screen_2setPassword':
      return {...state, password: action.payload};
    case 'screen_2setConform_Password':
      return {...state, conform_password: action.payload};
    case 'screen_2setError':
      return {...state, error: action.payload};
    case 'screen_2setMobile':
      return {...state, mobile: action.payload};
    case 'screen_2changeActivation':
      return {...state, activation: action.payload};
    case 'screen_2set_id':
      return {...state, _id: action.payload};
    case 'screen_2types':
      return {...state, types: action.payload};
    case 'screen_2setChargingFee':
      return {...state, chargingfee: action.payload};
    case 'screen_2setRating':
      return {...state, rating: action.payload};
    case 'screen_2setUpiId':
      return {...state, upiId: action.payload};
    default:
      return state;
  }
};
