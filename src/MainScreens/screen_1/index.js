/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, TouchableOpacity, BackHandler, Text} from 'react-native';
import Location from './Component/Location';
import {connect} from 'react-redux';
import * as screen_4 from '../../GlobleState/actions/screen_4';
import Geolocation from '@react-native-community/geolocation';
import * as screen_2 from '../../GlobleState/actions/screen_2';
import * as screen_1 from '../../GlobleState/actions/screen_1';
import * as screen_3 from '../../GlobleState/actions/screen_3';
import * as combine from '../../GlobleState/actions/combine';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import axios from 'axios';
import {notification} from './../component/PushNotification';

class Screen_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
      tim1: null,
      tim2: null,
    };
  }

  UNSAFE_componentWillMount() {
    this.props.screen_1SetTimer(this.props.screen_1.mechaactivation);
    this.props.screen_1SetCustid(null);
    if (this.props.screen_1.mechaactivation === 1) {
      this.geoCheck();
      this.custCheck();
    }

    this.props.combine_Buffer_change('mainscreen');
    this.props.screen_4ChangeActivation(false);
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  componentWillUnmount() {
    this.props.screen_1SetTimer(0);
    clearInterval(this.state.tim1);
    clearInterval(this.state.tim2);
    BackHandler.removeEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  custCheck() {
    const request = () => {
      clearInterval(this.state.tim1);
      const url = `${this.props.important_data.url}/mecha/checkpoint`;
      axios({
        method: 'post',
        url,
        data: {
          _id: this.props.screen_2._id,
        },
      })
        .then(res => {
          if (res.data.length !== 1) {
            notification({
              bigText: '',
              message: `${res.data[1]} calling you.`,
              title: 'Customer Calling',
            });
            clearInterval(this.state.tim1);
            clearInterval(this.state.tim2);
            this.props.screen_4ChangeActivation(true);
            this.props.screen_1SetLatitude(res.data[0][1]);
            this.props.screen_1SetLongitude(res.data[0][2]);
            this.props.screen_1SetCustid(res.data[0][3]);
            this.props.screen_1SetType(res.data[0][4]);
            this.props.screen_1SetHistoryid(res.data[0][5]);
            this.props.screen_1SetDistence(res.data[0][6]);
            this.props.screen_1SetTime(res.data[0][7]);
            this.props.screen_1SetEmail(res.data[0][8]);
            this.props.screen_1setMobile(res.data[0][9]);
            this.props.screen_1SetName(res.data[1]);
            this.props.screen_1ChangeActivation(false);
            this.props.screen_3ChangeActivation(true);
            this.props.screen_1ChangeMechaActivation(0);
          } else {
            if (this.props.screen_1.timer === 1) {
              this.state.tim1 = setInterval(request, 1000);
            }
          }
        })
        .catch(() => {
          if (this.props.screen_1.timer === 1) {
            this.state.tim1 = setInterval(request, 1000);
          }
        });
    };
    this.state.tim1 = setInterval(request, 1000);
  }

  geoCheck() {
    const request = () => {
      clearInterval(this.state.tim2);
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(granted => {
          if (granted) {
            Geolocation.getCurrentPosition(
              data => {
                const {latitude, longitude} = data.coords;
                const url = `${
                  this.props.important_data.url
                }/mecha/updateuser/${this.props.screen_2._id}`;

                axios({
                  method: 'post',
                  url,
                  data: {latitude, longitude},
                })
                  .then(() => {
                    this.props.screen_1SetLatitudeme(latitude);
                    this.props.screen_1SetLongitudeme(longitude);
                    if (this.props.screen_1.timer === 1) {
                      if (this.props.screen_1.custid === null) {
                        this.state.tim2 = setInterval(request, 5000);
                      }
                    } else {
                      console.log('error');
                    }
                  })
                  .catch(() => {
                    if (this.props.screen_1.timer === 1) {
                      this.state.tim2 = setInterval(request, 5000);
                    }
                  });
              },
              () => {
                if (this.props.screen_1.timer === 1) {
                  this.state.tim2 = setInterval(request, 5000);
                }
              },
            );
          } else {
            console.log('error');
          }
        })
        .catch(console.log);
    };
    this.state.tim2 = setInterval(request, 5000);
  }

  onLogout() {
    clearInterval(this.state.tim1);
    clearInterval(this.state.tim2);
    this.props.screen_1ChangeMechaActivation(0);
    const url = `${this.props.important_data.url}/logout`;
    this.props.screen_4ChangeActivation(true);
    axios({
      method: 'post',
      url,
      data: {
        _id: this.props.screen_2._id,
      },
    })
      .then(() => {
        this.props.screen_2Set_Id(null);
        this.props.screen_1ChangeActivation(false);
        this.props.screen_2ChangeActivation(true);
      })
      .catch(() => {
        this.props.screen_1ChangeMechaActivation(1);
        this.props.screen_4ChangeActivation(false);
      });
  }

  onSwitch() {
    this.props.screen_4ChangeActivation(true);
    const url = `${this.props.important_data.url}/mecha/updateuser/${
      this.props.screen_2._id
    }`;

    axios({
      method: 'post',
      url,
      data: {
        activation:
          (this.props.screen_1.mechaactivation + 1) % 2 === 1 ? true : false,
      },
    })
      .then(() => {
        this.props.screen_1ChangeMechaActivation(
          (this.props.screen_1.mechaactivation + 1) % 2,
        );
        if (this.props.screen_1.mechaactivation === 1) {
          this.props.screen_1SetTimer(1);
          setTimeout(() => {
            this.custCheck();
            this.geoCheck();
            this.props.screen_4ChangeActivation(false);
          }, 5000);
        } else {
          this.props.screen_1SetTimer(0);
          setTimeout(() => {
            this.props.screen_4ChangeActivation(false);
          }, 5000);
          clearInterval(this.state.tim1);
          clearInterval(this.state.tim2);
        }
      })
      .catch(() => {
        this.props.screen_4ChangeActivation(false);
      });
  }

  onProfile() {
    clearInterval(this.state.tim1);
    clearInterval(this.state.tim2);
    this.props.screen_4ChangeActivation(true);
    setTimeout(() => {
      this.props.screen_1SetTimer(0);
      this.props.combine_Buffer_change('profile');
      this.props.combine_Change('profile');
    }, 5000);
  }

  onHistory() {
    this.props.screen_4ChangeActivation(true);
    clearInterval(this.state.tim1);
    clearInterval(this.state.tim2);
    setTimeout(() => {
      this.props.screen_1SetTimer(0);
      this.props.combine_Change('history');
      this.props.combine_Buffer_change('history');
    }, 5000);
  }

  render() {
    const {mechaactivation} = this.props.screen_1;
    const {net} = this.props.netconnect;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: '#D6DBDF',
        }}>
        <View>
          <Location />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.switchcontainer}
              onPress={() => (!net ? {} : this.onSwitch())}>
              <Text>{mechaactivation === 1 ? 'on' : 'off'}</Text>
              {mechaactivation === 1 ? (
                <Image
                  style={{width: 60, height: 60}}
                  source={require('./icons/poweroff.png')}
                />
              ) : (
                <Image
                  style={{width: 60, height: 60}}
                  source={require('./icons/poweron.png')}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onHistory()}>
            <Image
              source={require('./icons/history.png')}
              style={styles.icons}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onProfile()}>
            <Image
              source={require('./icons/profile.png')}
              style={styles.icons}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => (!net ? {} : this.onLogout())}>
            <Image source={require('./icons/quit.png')} style={styles.icons} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  switchcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 30,
    width: 80,
    height: 80,
  },
  icons: {
    width: 80,
    height: 80,
  },
  buttoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  button: {
    paddingTop: 20,
  },
};

export default connect(
  state => state,
  {...screen_2, ...screen_4, ...screen_1, ...screen_3, ...combine},
)(Screen_1);
