import {combineReducers} from 'redux';
import screen_1Reducer from './screen_1Reducer';
import screen_2Reducer from './screen_2Reducer';
import screen_3Reducer from './screen_3Reducer';
import screen_4Reducer from './screen_4Reducer';
import important_Data from './important_Data';
import combine_Reducer from '../reducers/combine_Reducer';
import netconnect_Reducer from '../reducers/netconnect_Reducer';
import profile_Reducer from '../reducers/profile_Reducer';
import history_Reducer from '../reducers/history_Reducer';

export default combineReducers({
  important_data: important_Data,
  screen_1: screen_1Reducer,
  screen_2: screen_2Reducer,
  screen_3: screen_3Reducer,
  screen_4: screen_4Reducer,
  netconnect: netconnect_Reducer,
  combine: combine_Reducer,
  profile: profile_Reducer,
  history: history_Reducer,
});
