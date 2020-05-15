import React, {Component} from 'react';
import MainScreens from './MainScreens';
import NetInfo from '@react-native-community/netinfo';
import * as net_connect from './GlobleState/actions/net_connect';
import {Platform, AppState} from 'react-native';
import PushNotification from 'react-native-push-notification';
import NetConnect from './MainScreens/component/NetConnect';
import Screen_4 from './MainScreens/screen_4';
import Profile from './Details/Profile';
import History from './Details/History/';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class App extends Component {
  UNSAFE_componentWillMount() {
    PushNotification.configure({
      onRegister: function(token) {
        console.log('TOKEN:', token);
      },
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
    NetInfo.addEventListener(sta => {
      this.props.net_Change(sta.isConnected);
    });
    AppState.addEventListener('change', res => {
      if (res === 'background') {
        const op = this.props;
        op.combine.bufferchange = 'mainscreen';
        op.profile.change = 0;
        op.history.change = 'all';
        op.profile.error = 0;
        op.profile.error1 = 0;
        op.profile.route = null;
        AsyncStorage.setItem('storage_Key', JSON.stringify(op));
      }
    });
  }
  render() {
    return (
      <>
        <NetConnect />
        {this.props.combine.change === 'mainscreen' ? <MainScreens /> : <></>}
        {this.props.combine.change === 'profile' ? <Profile /> : <></>}
        {this.props.combine.change === 'history' ? <History /> : <></>}
        {this.props.screen_4.activation ? <Screen_4 /> : <></>}
      </>
    );
  }
}

export default connect(
  state => state,
  net_connect,
)(App);

// const op = {
//   combine: {change: 'mainscreen'},
//   history: {change: 'all'},
//   important_data: {url: 'http://3.7.80.236:3000'},
//   netconnect: {net: true},
//   profile: {
//     change: 0,
//     chargingfee: 0,
//     conform_password: null,
//     error: 0,
//     error1: 0,
//     mobile: null,
//     name: null,
//     password: null,
//     rating: 0,
//     route: null,
//     types: [],
//     upiId: '',
//   },
//   screen_1: {
//     activation: false,
//     custid: '',
//     displayaddress: '',
//     distence: 0,
//     email: '',
//     historyid: '',
//     latitude: null,
//     latitudeme: null,
//     longitude: null,
//     longitudeme: null,
//     mechaactivation: 1,
//     mobileno: '',
//     name: '',
//     time: null,
//     type: null,
//   },
//   screen_2: {
//     activation: true,
//     change: 0,
//     chargingfee: 0,
//     conform_password: '',
//     email: '',
//     error: 0,
//     mobile: '',
//     name: '',
//     password: '',
//     rating: 4,
//     types: [],
//     upiId: '',
//     _id: '',
//   },
//   screen_3: {
//     activation: false,
//     address: '',
//     button1: true,
//     button2: false,
//     button3: false,
//     button4: false,
//   },
//   screen_4: {
//     activation: false,
//     timer: true,
//   },
// };
