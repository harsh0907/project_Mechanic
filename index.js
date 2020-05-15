/* eslint-disable react-native/no-inline-styles */
import {AppRegistry, View} from 'react-native';
import App from './src/App';
import React, {Component} from 'react';
import {name as appName} from './app.json';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './src/GlobleState/reducers';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

class pro extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      change: 0,
    };
  }
  UNSAFE_componentWillMount() {
    this.renderItem();
  }

  renderItem() {
    const op = {
      combine: {change: 'mainscreen', bufferchange: 'mainscreen'},
      history: {change: 'all'},
      important_data: {url: 'http://3.7.80.236:3000'},
      netconnect: {net: true},
      profile: {
        change: 0,
        chargingfee: 0,
        conform_password: null,
        error: 0,
        error1: 0,
        mobile: null,
        name: null,
        password: null,
        rating: 0,
        route: null,
        types: [],
        upiId: '',
      },
      screen_1: {
        activation: false,
        custid: '',
        displayaddress: '',
        distence: 0,
        email: '',
        historyid: '',
        latitude: null,
        latitudeme: null,
        longitude: null,
        longitudeme: null,
        mechaactivation: 1,
        mobileno: '',
        name: '',
        time: null,
        type: null,
        timer: 1,
      },
      screen_2: {
        activation: true,
        change: 0,
        chargingfee: 0,
        conform_password: '',
        email: '',
        error: 0,
        mobile: '',
        name: '',
        password: '',
        rating: 4,
        types: [],
        upiId: '',
        _id: '',
      },
      screen_3: {
        activation: false,
        address: '',
        button1: true,
        button2: false,
        button3: false,
        button4: false,
      },
      screen_4: {
        activation: false,
        timer: true,
      },
    };

    const storeData = async () => {
      const item = await AsyncStorage.getItem('storage_Key');
      if (item === null) {
        await AsyncStorage.setItem('storage_Key', JSON.stringify(op));
        this.setState({data: op});
      } else {
        this.setState({data: JSON.parse(item)});
      }
      return 1;
    };
    storeData().then(() => this.setState({change: 1}));
  }

  render() {
    return (
      <>
        {this.state.change === 0 ? (
          <View style={{flex: 1, backgroundColor: '#ABEBC6'}}>
            <Spinner
              visible={true}
              textContent={'   Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
          </View>
        ) : (
          <Provider store={createStore(reducers, this.state.data)}>
            <App />
          </Provider>
        )}
      </>
    );
  }
}

const styles = {
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
};

AppRegistry.registerComponent(appName, () => pro);
