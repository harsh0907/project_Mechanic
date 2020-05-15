/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import * as screen_2 from '../../GlobleState/actions/screen_2';
import * as screen_4 from '../../GlobleState/actions/screen_4';
import * as screen_1 from '../../GlobleState/actions/screen_1';
import isEmail from 'validator/lib/isEmail';
import isByteLength from 'validator/lib/isByteLength';
import axios from 'axios';

class Screen_2 extends Component {
  UNSAFE_componentWillMount() {
    this.props.screen_4ChangeActivation(false);
    this.props.screen_2SetEmail('');
    this.props.screen_2SetPassword('');
    BackHandler.addEventListener('hardwareBackPress', () =>
      BackHandler.exitApp(),
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      BackHandler.exitApp(),
    );
  }

  onLogin() {
    const {email, password} = this.props.screen_2;
    const {screen_2SetError} = this.props;
    const {url} = this.props.important_data;
    screen_2SetError(0);
    if (!isEmail(email)) {
      screen_2SetError(1);
      return null;
    } else if (isByteLength(password, {min: 0, max: 5})) {
      screen_2SetError(1);
      return null;
    }
    const uri = `${url}/login`;
    this.props.screen_4ChangeActivation(true);
    axios({
      method: 'post',
      url: uri,
      data: {
        email,
        password,
        type: 'mecha',
      },
    })
      .then(res => {
        const {
          mobileno,
          name,
          bike,
          autoer,
          bus,
          car,
          tacter,
          toe,
          truck,
          _id,
          rating,
          chargingfee,
          upiId,
        } = res.data[0];
        this.props.screen_4ChangeActivation(true);
        this.props.screen_2SetName(name);
        this.props.screen_2SetMobile(mobileno);
        this.props.screen_2Set_Id(_id);
        this.props.screen_2Type([bike, autoer, bus, car, tacter, truck, toe]);
        this.props.screen_1ChangeMechaActivation(1);
        this.props.screen_2SetRating(rating);
        this.props.screen_2SetChargingFee(chargingfee);
        this.props.screen_2SetUpiId(upiId);
        this.props.screen_2ChangeActivation(false);
        this.props.screen_1ChangeActivation(true);
      })
      .catch(() => {
        this.props.screen_4ChangeActivation(false);
        screen_2SetError(1);
      });
  }

  render() {
    const {
      screen_2SetEmail,
      screen_2SetPassword,
      screen_2SetError,
    } = this.props;
    const {net} = this.props.netconnect;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.props.screen_2.error === 1 ? (
          <Text style={styles.error}>Invalid Details</Text>
        ) : (
          <View />
        )}

        <View style={[styles.inputContainer, {marginTop: 25}]}>
          <Image
            style={styles.inputIcon}
            source={require('./icons/email.png')}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={this.props.screen_2.email}
            onChangeText={email => {
              screen_2SetEmail(email);
              screen_2SetError(0);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require('./icons/password.png')}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={this.props.screen_2.password}
            onChangeText={password => {
              screen_2SetPassword(password);
              screen_2SetError(0);
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => (!net ? {} : this.onLogin())}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  error: {marginBottom: 20, color: 'red', fontSize: 16},
  container: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 40,
    elevation: 20,
  },
  inputContainer: {
    borderColor: '#00b5ec',
    backgroundColor: '#DCDCDC',
    borderBottomWidth: 2,
    width: 250,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    backgroundColor: '#DCDCDC',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
    marginRight: 10,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
    marginTop: 18,
  },
  loginText: {
    color: 'white',
  },
});

export default connect(
  state => state,
  {...screen_2, ...screen_4, ...screen_1},
)(Screen_2);
