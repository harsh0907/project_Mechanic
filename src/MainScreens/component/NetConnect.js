import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, SafeAreaView} from 'react-native';

class NetConnect extends Component {
  render() {
    return (
      <>
        {this.props.net === false ? (
          <SafeAreaView style={{alignItems: 'center', backgroundColor: 'red'}}>
            <Text style={{color: 'white', fontSize: 17}}>No connection</Text>
          </SafeAreaView>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default connect(state => state.netconnect)(NetConnect);
