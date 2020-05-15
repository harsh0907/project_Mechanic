/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
  BackHandler,
} from 'react-native';
import * as screen_1 from '../../GlobleState/actions/screen_1';
import * as screen_4 from '../../GlobleState/actions/screen_4';
import * as screen_3 from '../../GlobleState/actions/screen_3';
import {connect} from 'react-redux';
import axios from 'axios';
import {notification} from './../component/PushNotification';

class Screen_3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tim1: null,
      tim2: null,
    };
  }
  UNSAFE_componentWillMount() {
    this.props.screen_4ChangeActivation(false);
    const {button2, button4} = this.props.screen_3;
    if (button2) {
      this.cencelCheck();
    }
    if (button4) {
      this.onDone();
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
      clearInterval(this.state.tim1);
      clearInterval(this.state.tim2);
      BackHandler.exitApp();
    });
    const {latitude, longitude} = this.props.screen_1;
    const url = `https://us1.locationiq.com/v1/reverse.php?key=d488d6c287186b&lat=${latitude}&lon=${longitude}&format=json&accept-language=%3CISO%20639-1%20Code%3E`;
    axios({method: 'get', url}).then(res => {
      this.props.screen_3SetAddress(res.data.display_name);
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      clearInterval(this.state.tim1);
      clearInterval(this.state.tim2);
      BackHandler.exitApp();
    });
  }

  onArrival() {
    this.props.screen_4ChangeActivation(true);
    const url = `${this.props.important_data.url}/mecha/arrival`;

    axios({
      method: 'post',
      url,
      data: {
        _id: this.props.screen_1.historyid,
      },
    })
      .then(() => {
        this.props.screen_3SetButton1(false);
        this.props.screen_3SetButton2(true);
        this.props.screen_4ChangeActivation(false);
        this.cencelCheck();
      })
      .catch(() => {
        this.props.screen_4ChangeActivation(false);
      });
  }

  cencelCheck() {
    const request = () => {
      clearInterval(this.state.tim1);
      const url = `${this.props.important_data.url}/mecha/checkpoint/cencel`;
      axios({
        method: 'post',
        url,
        data: {
          _id: this.props.screen_1.historyid,
        },
      })
        .then(res => {
          if (res.data) {
            notification({
              bigText: '',
              message: 'Customer cenceled you',
              title: 'Cenceled',
            });
            this.props.screen_1ChangeMechaActivation(1);
            this.props.screen_3SetButton1(true);
            this.props.screen_3SetButton2(false);
            this.props.screen_3ChangeActivation(false);
            this.props.screen_1ChangeActivation(true);
            this.props.screen_4ChangeActivation(true);
          } else {
            if (!this.props.screen_3.button3) {
              this.state.tim1 = setInterval(request, 100);
            }
          }
        })
        .catch(() => {
          if (!this.props.screen_3.button3) {
            this.state.tim1 = setInterval(request, 100);
          }
        });
    };
    this.state.tim1 = setInterval(request, 100);
  }

  onReach() {
    this.props.screen_4ChangeActivation(true);
    const url = `${this.props.important_data.url}/mecha/reach`;

    axios({
      method: 'post',
      url,
      data: {
        _id: this.props.screen_2._id,
      },
    })
      .then(res => {
        this.props.screen_3SetButton2(false);
        this.props.screen_3SetButton3(true);
        this.props.screen_4ChangeActivation(false);
      })
      .catch(() => {
        this.props.screen_4ChangeActivation(false);
      });
  }

  onRelese() {
    this.props.screen_4ChangeActivation(true);
    const url = `${this.props.important_data.url}/mecha/relese`;

    axios({
      method: 'post',
      url,
      data: {
        historyid: this.props.screen_1.historyid,
      },
    })
      .then(() => {
        this.onDone();
        this.props.screen_3SetButton3(false);
        this.props.screen_3SetButton4(true);
        this.props.screen_4ChangeActivation(false);
      })
      .catch(() => {
        this.props.screen_4ChangeActivation(false);
      });
  }

  onDone() {
    const request = () => {
      clearInterval(this.state.tim2);
      const url = `${this.props.important_data.url}/mecha/checkpoint/done`;
      axios({
        method: 'post',
        url,
        data: {
          _id: this.props.screen_1.historyid,
        },
      })
        .then(res => {
          if (res.data[0] === 1) {
            notification({
              bigText: '',
              message: 'Wait for next customer',
              title: 'Finally Done!!',
            });
            this.props.screen_3SetButton4(false);
            this.props.screen_3SetButton1(true);
            this.props.screen_1ChangeMechaActivation(1);
            this.props.screen_3ChangeActivation(false);
            this.props.screen_4ChangeActivation(true);
            this.props.screen_1ChangeActivation(true);
          } else {
            this.state.tim2 = setInterval(request, 100);
          }
        })
        .catch(() => {
          this.state.tim2 = setInterval(request, 100);
        });
    };
    this.state.tim2 = setInterval(request, 100);
  }

  render() {
    const {button1, button2, button3, button4} = this.props.screen_3;
    const {name, email, mobileno, longitude, latitude} = this.props.screen_1;
    const {net} = this.props.netconnect;
    return (
      <View>
        <View style={styles.maincontainer}>
          <View style={styles.Toptopbarcontainer}>
            <View>
              <Text
                style={styles.Toptopbarcontainertext}>{`Name: ${name}`}</Text>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${email}`)}>
              <Text style={styles.Toptopbarcontainertext}>
                {`Email: ${email}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${mobileno}`);
              }}>
              <Text style={styles.Toptopbarcontainertext}>
                {`Mobile no.: ${mobileno}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => {
                Linking.openURL(
                  `https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${latitude},${longitude}`,
                );
              }}>
              <View>
                <Text style={styles.Toptopbarcontainertext}>
                  {`Address: ${this.props.screen_3.address}`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomnaincontainer}>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={[
                styles.imagecontainer,
                {
                  marginRight: 50,
                  marginBottom: 10,
                  backgroundColor: button1 ? '#EAAC84' : '#839192',
                  width: 100,
                  height: 100,
                },
              ]}
              onPress={() => (!net ? {} : button1 ? this.onArrival() : {})}
              activeOpacity={!button1 ? 1 : 0.2}>
              <Image
                style={[styles.image, {width: 70, height: 70}]}
                source={require('./icons/arrival.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.imagecontainer,
                {
                  marginLeft: 50,
                  marginBottom: 10,
                  backgroundColor: button2 ? '#EAAC84' : '#839192',
                  width: 100,
                  height: 100,
                },
              ]}
              onPress={() => (!net ? {} : button2 ? this.onReach() : {})}
              activeOpacity={!button2 ? 1 : 0.2}>
              <Image
                style={[styles.image, {width: 70, height: 70}]}
                source={require('./icons/reach.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={[
                styles.imagecontainer,
                {
                  marginRight: 50,
                  marginTop: 50,
                  backgroundColor: button3 ? '#EAAC84' : '#839192',
                  width: 100,
                  height: 100,
                },
              ]}
              onPress={() => (!net ? {} : button3 ? this.onRelese() : {})}
              activeOpacity={!button3 ? 1 : 0.2}>
              <Image
                style={[styles.image, {width: 70, height: 70}]}
                source={require('./icons/completed.png')}
              />
            </TouchableOpacity>
            <View
              style={[
                styles.imagecontainer,
                {
                  marginLeft: 50,
                  marginTop: 50,
                  width: 100,
                  height: 100,
                  backgroundColor: button4 ? '#EAAC84' : '#839192',
                },
              ]}>
              {button4 ? (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  animating={button4}
                />
              ) : (
                <Image
                  style={[styles.image, {width: 70, height: 70}]}
                  source={require('./icons/done.png')}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  imagecontainer: {
    shadowWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    borderRadius: 30,
    shadowRadius: 50,
    backgroundColor: '#E59866',
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  bottomnaincontainer: {
    justifyContent: 'center',
    marginTop: 80,
  },
  topContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomtopcontainer: {
    backgroundColor: '#f0f',
  },
  maincontainer: {
    shadowWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    borderRadius: 30,
    shadowRadius: 50,
    backgroundColor: '#E59866',
    elevation: 20,
  },
  buttonContainer: {
    height: 100,
    width: 100,
    backgroundColor: '#E59866',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  buttoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  container: {
    backgroundColor: '#F6DDCC',
    justifyContent: 'space-between',
    flex: 1,
  },
  waitcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  waittext: {
    fontSize: 90,
  },
  Toptopbarcontainer: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
  },
  Toptopbarcontainertext: {
    fontSize: 20,
    paddingBottom: 2,
    borderBottomWidth: 2,
    fontWeight: 'bold',
  },
  Topbottombarcontainer: {
    justifyContent: 'center',
  },
  bottomleftcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  distext: {
    fontSize: 25,
    alignItems: 'center',
  },
  bottomRightcontainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  numtext: {
    fontSize: 70,
  },
};

export default connect(
  state => state,
  {...screen_4, ...screen_1, ...screen_3},
)(Screen_3);
