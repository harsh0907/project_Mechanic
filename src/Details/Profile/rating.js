/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';

class Rating extends Component {
  render() {
    const {rating} = this.props.screen_2;
    const onstar = require('./icons/onstar.png');
    const offstar = require('./icons/offstar.png');
    return (
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <Image
          style={{width: 30, height: 30}}
          source={rating >= 1 ? onstar : offstar}
        />
        <Image
          style={{width: 30, height: 30}}
          source={rating >= 2 ? onstar : offstar}
        />
        <Image
          style={{width: 30, height: 30}}
          source={rating >= 3 ? onstar : offstar}
        />
        <Image
          style={{width: 30, height: 30}}
          source={rating >= 4 ? onstar : offstar}
        />
        <Image
          style={{width: 30, height: 30}}
          source={rating >= 5 ? onstar : offstar}
        />
      </View>
    );
  }
}

export default connect(state => state)(Rating);
