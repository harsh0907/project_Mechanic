/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  NativeModules,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import * as screen_4 from '../../GlobleState/actions/screen_4';
import * as history from '../../GlobleState/actions/history';
import moment from 'moment';
import {notification} from '../../MainScreens/component/PushNotification';

const UPI = NativeModules.UPI;

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: [],
      pay: 0,
    };
  }
  UNSAFE_componentWillMount() {
    this.props.screen_4ChangeActivation(true);
    const {url} = this.props.important_data;
    const uri = `${url}/history`;
    axios({
      method: 'post',
      url: uri,
      data: {
        _id: this.props.screen_2._id,
        type: 'mechaid',
      },
    })
      .then(res => {
        const op = res.data.sort(function(a, b) {
          return b.requesttime - a.requesttime;
        });
        var amount = 0;
        res.data.map(re => (amount += !re.paycomplete ? re.originalamount : 0));
        this.setState({pay: amount});
        this.setState({data: op, show: op});
        this.props.screen_4ChangeActivation(false);
      })
      .catch(() => {
        this.props.screen_4ChangeActivation(false);
      });
  }

  onAll() {
    this.props.history_Change('all');
    this.props.screen_4ChangeActivation(true);
    this.setState({show: this.state.data});
    this.props.screen_4ChangeActivation(false);
  }

  onCompleted() {
    this.props.history_Change('completed');
    this.props.screen_4ChangeActivation(true);
    const op = this.state.data.filter(one => {
      return !one.cencelbycustomer;
    });
    const po = op.sort(function(a, b) {
      return b.donetime - a.donetime;
    });
    this.setState({show: po});
    this.props.screen_4ChangeActivation(false);
  }

  onCencel() {
    this.props.history_Change('cencel');
    this.props.screen_4ChangeActivation(true);
    const op = this.state.data.filter(one => {
      return one.cencelbycustomer;
    });
    const po = op.sort(function(a, b) {
      return b.cenceltime - a.cenceltime;
    });
    this.setState({show: po});
    this.props.screen_4ChangeActivation(false);
  }

  onPay() {
    const {net} = this.props.netconnect;
    if (this.state.pay === 0) {
      Alert.alert(
        'Alert!!',
        'Not Requre to pay any amount',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Alert!!',
        `You have to pay Rs. ${this.state.pay}.`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'Pay', onPress: () => (!net ? {} : this.onselect())},
        ],
        {cancelable: false},
      );
    }
  }
  onselect() {
    const {pay} = this.state;
    const {_id} = this.props.screen_2;
    this.props.screen_4ChangeActivation(true);
    const openLink = async () => {
      const url = `${this.props.important_data.url}/cust/payment`;
      const url1 = `${this.props.important_data.url}/mecha/payment`;

      const payment = await axios({
        method: 'post',
        url,
        data: {id: _id, amount: pay},
      });

      let result = {Status: 'SUCCESS', txnId: '0'};

      if (pay !== 0) {
        let UpiUrl = `upi://pay?pa=8650815062@paytm&pn=Harsh&tr=${
          payment.data._id
        }&am=${pay}&mam=null&cu=INR&url=https://MyUPIApp&refUrl=https://MyUPIApp`;
        let res = await UPI.openLink(UpiUrl);
        result = JSON.parse(
          `{"${res
            .replace(/&/g, '","')
            .replace(/[=]/g, '":"')
            .replace(/ /g, '')}"}`,
        );
      }
      if (result.Status !== 'SUCCESS') {
        await axios({
          method: 'post',
          url: url1,
          data: {
            _id: payment.data._id,
            status: result.Status,
          },
        });
        notification({
          bigText: 'Try Again',
          message: 'your payment has been failed',
          title: 'Payment Failed',
        });
        this.props.screen_4ChangeActivation(false);
      } else {
        notification({
          bigText: 'Thanks for choose',
          message: `You pay ₹${pay} `,
          title: 'Payment Done',
        });

        await axios({
          method: 'post',
          url: url1,
          data: {
            status: result.Status,
            _id: payment.data._id,
            txnid: result.txnId,
            mechaid: _id,
          },
        });
        this.props.screen_1ChangeActivation(true);
        this.props.combine_Change('mainscreen');
        this.props.history_Change('all');
        this.props.screen_4ChangeActivation(false);
      }
    };
    openLink().catch(() => {
      this.props.screen_4ChangeActivation(false);
    });
  }

  renderItem(item) {
    var t = 0;
    const {change} = this.props.history;
    if (change === 'all') {
      t = moment(item.item.requesttime).toArray();
    } else if (change === 'completed') {
      t = moment(item.item.donetime).toArray();
    } else if (change === 'cencel') {
      t = moment(item.item.cenceltime).toArray();
    }
    var co = null;
    switch (item.item.typeofvehicle) {
      case 'bike':
        co = require('./icons/bike.png');
        break;
      case 'car':
        co = require('./icons/car.png');
        break;
      case 'bus':
        co = require('./icons/bus.png');
        break;
      case 'truck':
        co = require('./icons/truck.png');
        break;
      case 'tacter':
        co = require('./icons/tacter.png');
        break;
      case 'autoer':
        co = require('./icons/rickshow.png');
        break;
    }
    return (
      <View
        style={[
          styles.listcontainer,
          {backgroundColor: item.item.cencelbycustomer ? '#FFCCBC' : '#E1BEE4'},
        ]}>
        <View>
          <Image style={{width: 60, height: 60}} source={co} />
          {item.item.toe === 1 ? (
            <Image
              style={{width: 40, height: 40}}
              source={require('./icons/hook.png')}
            />
          ) : (
            <></>
          )}
        </View>
        <View style={{justifyContent: 'space-evenly'}}>
          <View style={[styles.addcon]}>
            <Text style={styles.rupee}>{`${item.item.address}`}</Text>
          </View>
          <View
            style={[
              styles.addcon,
              {height: 30, marginBottom: 8, marginTop: 8},
            ]}>
            <Text>{`${t[2]}/${t[1]}/${t[0]} ${t[3]}:${t[4]}`}</Text>
          </View>
        </View>
        {change !== 'cencel' ? (
          <View
            style={[
              styles.rupeecont,
              {
                backgroundColor: '#FFCC80',
              },
            ]}>
            <Text
              style={[
                styles.rupee,
                {
                  textDecorationLine:
                    change === 'all'
                      ? 'none'
                      : item.item.originalamount === 0 || item.item.paycomplete
                      ? 'underline line-through'
                      : 'none',
                  textDecorationStyle: 'solid',
                },
              ]}>{`₹ ${
              change === 'all'
                ? item.item.chargingfee
                : item.item.originalamount
            }`}</Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  }

  render() {
    const {net} = this.props.netconnect;
    return (
      <View style={{flex: 1}}>
        <View style={styles.Topcontainer}>
          <TouchableOpacity
            style={[styles.buttoncontainer, {marginLeft: 10, width: 80}]}
            onPress={() => (!net ? {} : this.onAll())}>
            <Text style={styles.button}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => (!net ? {} : this.onCompleted())}>
            <Text style={styles.button}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttoncontainer, {marginRight: 10}]}
            onPress={() => (!net ? {} : this.onCencel())}>
            <Text style={styles.button}>Cancelled</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.show}
          horizontal={false}
          keyExtractor={item => {
            return item._id;
          }}
          renderItem={this.renderItem.bind(this)}
        />
        <View
          style={[
            styles.Bottomcontainer,
            {
              justifyContent: 'center',
              paddingTop: 10,
              paddingBottom: 10,
              borderTopWidth: 1,
            },
          ]}>
          <TouchableOpacity
            style={[styles.buttoncontainer, {width: 80}]}
            onPress={() => (!net ? {} : this.onPay())}>
            <Text style={styles.button}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addcon: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rupee: {
    fontSize: 20,
  },
  rupeecont: {
    width: 80,
    height: 60,
    backgroundColor: '#FFCC80',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.34,
    shadowRadius: 40,
    elevation: 20,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  listcontainer: {
    backgroundColor: '#CACFD2',
    marginTop: 10,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  Topcontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFCC80',
    paddingTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  Bottomcontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFCC80',
    paddingBottom: 25,
  },
  buttoncontainer: {
    width: 120,
    height: 40,
    backgroundColor: '#FB8C00',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.34,
    shadowRadius: 40,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
  },
  icons: {
    width: 100,
    height: 100,
    backgroundColor: '#00f',
  },
  nocontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  notext: {
    fontSize: 30,
    color: '#494D4F',
  },
  tagIcon: {
    height: 25,
    width: 25,
  },
  container: {
    backgroundColor: '#0000ff',
    height: null,
    flex: 1,
    justifyContent: 'center',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  card: {
    height: null,
    paddingBottom: 10,
    marginTop: 2,
    flexDirection: 'column',
    borderTopWidth: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.34,
    borderRadius: 30,
    shadowRadius: 20,
    backgroundColor: '#FCDFFF',
    elevation: 12,
  },
  cardContent: {
    flexDirection: 'row',
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    alignSelf: 'center',
    color: '#000',
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#FFFDD0',
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tagText: {
    fontSize: 15,
  },
});

export default connect(
  state => state,
  {...screen_4, ...history},
)(History);
