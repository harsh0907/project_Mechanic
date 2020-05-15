/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import * as profile from '../../GlobleState/actions/profile';
import * as screen_2 from '../../GlobleState/actions/screen_2';
import * as screen_4 from '../../GlobleState/actions/screen_4';
import * as combine from '../../GlobleState/actions/combine';
import * as screen_1 from '../../GlobleState/actions/screen_1';
import isByteLength from 'validator/lib/isByteLength';
import Rating from './rating';
import axios from 'axios';
import VehicleList from './VehicleList';

class Profile extends Component {
  UNSAFE_componentWillMount() {
    const {
      name,
      mobile,
      password,
      types,
      chargingfee,
      rating,
      upiId,
    } = this.props.screen_2;
    this.props.profile_Name(name);
    this.props.profile_Password(password);
    this.props.profile_Conform_password(password);
    this.props.profile_Mobile(mobile.toString());
    this.props.profile_ChargingFee(chargingfee);
    this.props.profile_Rating(rating);
    this.props.profile_Types(types);
    this.props.profile_UpiId(upiId);
  }

  onUpdate() {
    const {
      name,
      password,
      mobile,
      conform_password,
      chargingfee,
      types,
      upiId,
    } = this.props.profile;
    const {url} = this.props.important_data;
    const {profile_SetError, profile_Route} = this.props;
    if (isByteLength(password, {min: 0, max: 5})) {
      profile_SetError(1);
      return null;
    } else if (conform_password !== password) {
      profile_SetError(1);
      return null;
    } else if (isByteLength(mobile, {min: 0, max: 9})) {
      profile_SetError(1);
      return null;
    } else if (name === '') {
      profile_SetError(1);
      return null;
    } else if (chargingfee === '') {
      profile_SetError(1);
      return null;
    } else if (
      types[0] === 0 &&
      types[1] === 0 &&
      types[2] === 0 &&
      types[3] === 0 &&
      types[4] === 0 &&
      types[5] === 0 &&
      types[6] === 1
    ) {
      profile_SetError(1);
      return null;
    } else if (upiId === '') {
      profile_SetError(1);
      return null;
    }
    profile_Route(null);
    const uri = `${url}/mecha/updateuser/${this.props.screen_2._id}`;
    this.props.screen_4ChangeActivation(true);
    axios({
      method: 'post',
      url: uri,
      data: {
        password,
        mobileno: mobile,
        name,
        chargingfee,
        toe: types[6],
        bike: types[0],
        car: types[3],
        bus: types[2],
        truck: types[5],
        autoer: types[1],
        tacter: types[4],
        upiId,
      },
    })
      .then(() => {
        this.props.screen_4ChangeActivation(false);
        this.props.profile_SetError(0);
        this.props.screen_2SetName(name);
        this.props.screen_2SetPassword(password);
        this.props.screen_2SetMobile(mobile);
        this.props.screen_2SetChargingFee(chargingfee);
        this.props.screen_2Type(types);
        this.props.screen_2SetUpiId(upiId);
      })
      .catch(() => {
        this.props.screen_4ChangeActivation(false);
        this.props.profile_SetError(1);
      });
  }

  back() {
    this.props.profile_Change(0);
    this.props.profile_Route(null);
    this.props.profile_SetError(0);
    this.props.screen_4ChangeActivation(true);
    setTimeout(() => {
      this.props.screen_1ChangeActivation(true);
      this.props.combine_Change('mainscreen');
    }, 5000);
  }

  render() {
    const {
      name,
      mobile,
      password,
      route,
      conform_password,
      chargingfee,
      upiId,
    } = this.props.profile;
    const {net} = this.props.netconnect;
    return (
      <>
        <TouchableOpacity
          style={{
            backgroundColor: '#F3E5F5',
            height: 30,
            justifyContent: 'center',
          }}
          onPress={() => this.back()}>
          <Image
            style={{width: 50, height: 50}}
            source={require('./icons/arrow.png')}
          />
        </TouchableOpacity>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{backgroundColor: '#F3E5F5'}}>
          <View>
            <View style={styles.imagecontainer}>
              <Image
                style={styles.avatar}
                source={require('./icons/profile.png')}
              />

              <TouchableOpacity
                style={{paddingBottom: 10}}
                onPress={() =>
                  !net
                    ? {}
                    : this.props.profile_Route(route !== 'name' ? 'name' : null)
                }>
                {route !== 'name' ? (
                  <Text style={styles.name}>{this.props.screen_2.name}</Text>
                ) : (
                  <TextInput
                    style={[styles.name]}
                    placeholder="Name"
                    underlineColorAndroid="transparent"
                    value={name}
                    onChangeText={this.props.profile_Name}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              {this.props.profile.error === 1 ? (
                <Text style={{color: 'red', fontSize: 15}}>Invalid update</Text>
              ) : (
                <View />
              )}
            </View>

            <View>
              <View style={styles.lowercontainer}>
                <Text style={styles.lowertext}>
                  {this.props.screen_2.email}
                </Text>
              </View>

              <View style={{marginTop: 20}}>
                <Rating />
              </View>
              <TouchableOpacity
                style={styles.lowercontainer}
                onPress={() =>
                  !net
                    ? {}
                    : this.props.profile_Route(
                        route !== 'mobile' ? 'mobile' : null,
                      )
                }>
                {route !== 'mobile' ? (
                  <Text style={styles.lowertext}>
                    {this.props.screen_2.mobile}
                  </Text>
                ) : (
                  <TextInput
                    style={[styles.inputs]}
                    placeholder="Mobile No."
                    keyboardType="number-pad"
                    underlineColorAndroid="transparent"
                    value={mobile.toString()}
                    onChangeText={this.props.profile_Mobile}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.lowercontainer}
                onPress={() =>
                  !net
                    ? {}
                    : this.props.profile_Route(route !== 'fee' ? 'fee' : null)
                }>
                {route !== 'fee' ? (
                  <Text style={styles.lowertext}>
                    {`₹ ${this.props.screen_2.chargingfee}`}
                  </Text>
                ) : (
                  <View>
                    <TextInput
                      style={[styles.inputs]}
                      placeholder="Charging Fee"
                      keyboardType="number-pad"
                      underlineColorAndroid="transparent"
                      value={chargingfee.toString()}
                      onChangeText={this.props.profile_ChargingFee}
                    />
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.lowercontainer}
                onPress={() =>
                  !net
                    ? {}
                    : this.props.profile_Route(route !== 'upi' ? 'upi' : null)
                }>
                {route !== 'upi' ? (
                  <Text style={styles.lowertext}>
                    {`${this.props.screen_2.upiId}`}
                  </Text>
                ) : (
                  <View>
                    <TextInput
                      style={[styles.inputs]}
                      placeholder="Upi Id"
                      underlineColorAndroid="transparent"
                      value={upiId}
                      onChangeText={this.props.profile_UpiId}
                    />
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.lowercontainer}
                onPress={() =>
                  !net
                    ? {}
                    : this.props.profile_Route(
                        route !== 'password' ? 'password' : null,
                      )
                }>
                {route !== 'password' ? (
                  <Text style={[styles.lowertext, {marginBottom: 10}]}>
                    *********
                  </Text>
                ) : (
                  <View>
                    <TextInput
                      style={[styles.inputs, {marginBottom: 7}]}
                      placeholder="Password"
                      secureTextEntry={true}
                      underlineColorAndroid="transparent"
                      value={password}
                      onChangeText={this.props.profile_Password}
                    />
                    <TextInput
                      style={[styles.inputs]}
                      placeholder="conform_Password"
                      secureTextEntry={true}
                      underlineColorAndroid="transparent"
                      value={conform_password}
                      onChangeText={this.props.profile_Conform_password}
                    />
                  </View>
                )}
              </TouchableOpacity>
              <VehicleList />
            </View>
          </View>
          {route !== null ? (
            <View>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={!net ? {} : () => this.onUpdate()}>
                <View style={styles.updatecontainer}>
                  <Text style={styles.updatetext}>Update</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    fontSize: 18,
  },
  imagecontainer: {
    backgroundColor: '#CE93D8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 40,
    elevation: 20,
  },
  name: {
    fontSize: 38,
  },
  lowercontainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  lowertext: {
    fontSize: 18,
  },
  updatecontainer: {
    width: 150,
    height: 60,
    backgroundColor: '#B39DDB',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 40,
    elevation: 20,
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 70,
    marginTop: 90,
  },
  updatetext: {
    fontSize: 20,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  body: {
    backgroundColor: '#778899',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
  },
});

export default connect(
  state => state,
  {...profile, ...screen_2, ...screen_4, ...combine, ...profile, ...screen_1},
)(Profile);
