/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text, ScrollView} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {connect} from 'react-redux';
import * as screen_1 from '../../../GlobleState/actions/screen_1';
import * as screen_4 from '../../../GlobleState/actions/screen_4';
import axios from 'axios';

class Location extends Component {
  UNSAFE_componentWillMount() {
    this.props.screen_4ChangeActivation(true);
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(granted => {
        if (granted) {
          this.cencelCheck();
        } else {
          console.log('error');
        }
      })
      .catch(console.log);
  }

  cencelCheck() {
    var t = null;
    const request = () => {
      clearInterval(t);
      Geolocation.getCurrentPosition(
        data => {
          const {latitude, longitude} = data.coords;
          const url = `https://us1.locationiq.com/v1/reverse.php?key=d488d6c287186b&lat=${latitude}&lon=${longitude}&format=json&accept-language=%3CISO%20639-1%20Code%3E`;
          axios({method: 'get', url})
            .then(res => {
              this.props.screen_4ChangeActivation(false);
              this.props.screen_1SetLatitudeme(latitude);
              this.props.screen_1SetLongitudeme(longitude);
              this.props.screen_1SetDisplayAddress(res.data.display_name);
            })
            .catch(() => {
              t = setInterval(request, 100);
            });

          const urp = `${this.props.important_data.url}/mecha/updateuser/${
            this.props.screen_2._id
          }`;

          axios({
            method: 'post',
            url: urp,
            data: {latitude, longitude},
          })
            .then(() => {})
            .catch(() => {});
        },
        () => {
          t = setInterval(request, 100);
        },
      );
    };
    var t = setInterval(request, 100);
  }

  onAddress() {
    this.props.screen_4ChangeActivation(true);
    const {latitudeme, longitudeme} = this.props.screen_1;
    const url = `https://us1.locationiq.com/v1/reverse.php?key=d488d6c287186b&lat=${latitudeme}&lon=${longitudeme}&format=json&accept-language=%3CISO%20639-1%20Code%3E`;
    axios({method: 'get', url})
      .then(res => {
        this.props.screen_1SetDisplayAddress(res.data.display_name);
        this.props.screen_4ChangeActivation(false);
      })
      .catch(() => this.props.screen_4ChangeActivation(false));
  }

  render() {
    const {net} = this.props.netconnect;
    return (
      <View style={styles.locationContainer}>
        <TouchableOpacity onPress={() => (!net ? {} : this.onAddress())}>
          <Image
            source={require('../icons/location.png')}
            style={styles.icons}
          />
        </TouchableOpacity>
        <ScrollView horizontal={true} style={{marginLeft: 15}}>
          <Text style={styles.text}>
            {`${this.props.screen_1.displayaddress}`}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  locationContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  switchcontainer: {
    backgroundColor: '#00f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  icons: {
    width: 30,
    height: 40,
  },
  buttoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0',
  },
};

export default connect(
  state => state,
  {...screen_1, ...screen_4},
)(Location);
