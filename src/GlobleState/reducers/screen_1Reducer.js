const initial_value = {
  activation: true,
  mechaactivation: 1,
  type: null,
  distence: 0,
  time: 0,
  latitude: 28.408171,
  longitude: 77.850338,
  latitudeme: null,
  longitudeme: 28.408171,
  custid: 77.850338,
  historyid: '5eb5c8b42b63473f89f916b8',
  displayaddress: '',
  name: 'Harh',
  email: 'harh@gmail.com',
  mobileno: '8650815062',
  timer: 1,
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'screen_1setTime':
      return {...state, time: action.payload};
    case 'screen_1setType':
      return {...state, type: action.payload};
    case 'screen_1setLatitude':
      return {...state, latitude: action.payload};
    case 'screen_1setLongitude':
      return {...state, longitude: action.payload};
    case 'screen_1changeActivation':
      return {...state, activation: action.payload};
    case 'screen_1setDistence':
      return {...state, distence: action.payload};
    case 'screen_1setCustid':
      return {...state, custid: action.payload};
    case 'screen_1setHistoryid':
      return {...state, historyid: action.payload};
    case 'screen_1setLatitudeme':
      return {...state, latitudeme: action.payload};
    case 'screen_1setLongitudeme':
      return {...state, longitudeme: action.payload};
    case 'screen_1changemechaActivation':
      return {...state, mechaactivation: action.payload};
    case 'screen_1setDisplayAddress':
      return {...state, displayaddress: action.payload};
    case 'screen_1setName':
      return {...state, name: action.payload};
    case 'screen_1setEmail':
      return {...state, email: action.payload};
    case 'screen_1setMobile':
      return {...state, mobileno: action.payload};
    case 'screen_1setTimer':
      return {...state, timer: action.payload};

    default:
      return state;
  }
};
