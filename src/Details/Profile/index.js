import React, {Component} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import Password from './Password';
import {BackHandler} from 'react-native';
import * as screen_4 from '../../GlobleState/actions/screen_4';
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

  render() {
    return <>{this.props.profile.change === 1 ? <Profile /> : <Password />}</>;
  }
}

export default connect(
  state => state,
  {...screen_4, ...screen_1},
)(Index);
