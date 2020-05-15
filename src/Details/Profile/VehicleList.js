/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import * as profile from './../../GlobleState/actions/profile';

class VehicleList extends Component {
  onchange(type) {
    const {types} = this.props.profile;
    this.props.profile_Route('types');
    if (type === 'car') {
      types[3] = (types[3] + 1) % 2;
    } else if (type === 'bus') {
      types[2] = (types[2] + 1) % 2;
    } else if (type === 'autoer') {
      types[1] = (types[1] + 1) % 2;
    } else if (type === 'tacter') {
      types[4] = (types[4] + 1) % 2;
    } else if (type === 'truck') {
      types[5] = (types[5] + 1) % 2;
    } else if (type === 'bike') {
      types[0] = (types[0] + 1) % 2;
    } else if (type === 'hook') {
      types[6] = (types[6] + 1) % 2;
    }
    this.props.profile_Types(types);
  }
  render() {
    const {types} = this.props.profile;
    const {net} = this.props.netconnect;
    return (
      <View
        style={{
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={styles.listContainer}>
          <View>
            <TouchableOpacity
              style={[
                styles.card,
                {
                  backgroundColor: types[3] === 1 ? '#BB8FCE' : '#e2e2e2',
                },
              ]}
              onPress={() => (!net ? {} : this.onchange('car'))}>
              <Image
                style={styles.cardImage}
                source={require('./icons/car.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.card,
                {
                  backgroundColor: types[2] === 1 ? '#BB8FCE' : '#e2e2e2',
                },
              ]}
              onPress={() => (!net ? {} : this.onchange('bus'))}>
              <Image
                style={styles.cardImage}
                source={require('./icons/bus.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.card,
                {
                  backgroundColor: types[1] === 1 ? '#BB8FCE' : '#e2e2e2',
                },
              ]}
              onPress={() => (!net ? {} : this.onchange('autoer'))}>
              <Image
                style={styles.cardImage}
                source={require('./icons/rickshow.png')}
              />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={[
                styles.card,
                {
                  backgroundColor: types[4] === 1 ? '#BB8FCE' : '#e2e2e2',
                },
              ]}
              onPress={() => (!net ? {} : this.onchange('tacter'))}>
              <Image
                style={styles.cardImage}
                source={require('./icons/tacter.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.card,
                {
                  backgroundColor: types[5] === 1 ? '#BB8FCE' : '#e2e2e2',
                },
              ]}
              onPress={() => (!net ? {} : this.onchange('truck'))}>
              <Image
                style={styles.cardImage}
                source={require('./icons/truck.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.card,
                {
                  backgroundColor: types[0] === 1 ? '#BB8FCE' : '#e2e2e2',
                },
              ]}
              onPress={() => (!net ? {} : this.onchange('bike'))}>
              <Image
                style={styles.cardImage}
                source={require('./icons/bike.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.card,
                {
                  backgroundColor: types[6] === 1 ? '#BB8FCE' : '#e2e2e2',
                },
              ]}
              onPress={() => (!net ? {} : this.onchange('hook'))}>
              <Image
                style={styles.cardImage}
                source={require('./icons/hook.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 5,
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  /******** card **************/
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 20,
    //flexBasis: '42%',
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EE82EE',
    borderWidth: 1,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
});

export default connect(
  state => state,
  profile,
)(VehicleList);
