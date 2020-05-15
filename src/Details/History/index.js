/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import History from './History';
import {connect} from 'react-redux';
import {BackHandler, Image, TouchableOpacity} from 'react-native';
import * as screen_4 from '../../GlobleState/actions/screen_4';
import * as combine from '../../GlobleState/actions/combine';
import * as history from '../../GlobleState/actions/history';
import * as screen_1 from '../../GlobleState/actions/screen_1';

class Index extends Component {
  UNSAFE_componentWillMount() {
    this.props.screen_4ChangeActivation(false);
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  back() {
    this.props.screen_4ChangeActivation(true);
    setTimeout(() => {
      this.props.history_Change('all');
      this.props.screen_1ChangeActivation(true);
      this.props.combine_Change('mainscreen');
    }, 5000);
  }

  render() {
    return (
      <>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFCC80',
            height: 30,
            justifyContent: 'center',
          }}
          onPress={() => this.back()}>
          <Image
            style={{width: 50, height: 50}}
            source={require('./icons/arrow.png')}
          />
        </TouchableOpacity>
        <History />
      </>
    );
  }
}

export default connect(
  state => state,
  {...screen_4, ...combine, ...history, ...screen_1},
)(Index);
