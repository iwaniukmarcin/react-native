import React, {Component} from 'react';

import {View, ActivityIndicator, AsyncStorage} from 'react-native';

export default class Loader extends Component {

  componentDidMount = async () => {
    try {
      await AsyncStorage.setItem('@user-login', 'admin');
      await AsyncStorage.setItem('@user-password', 'admin');
      const userToken = await AsyncStorage.getItem('@userToken');
      if (userToken !== null) {
        if (userToken === 'xxx') {
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('Auth');
        }
      } else {
        this.props.navigation.navigate('Auth');
      }
    } catch (e) {
      //
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
}