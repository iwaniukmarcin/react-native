import React, {Component} from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import BasicButton from '../components/button';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    try {
      let login = await AsyncStorage.getItem('@user-login');
      this.setState({login: login})
    } catch (e) {
    }
  };

  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@userToken');
      this.props.navigation.navigate('Auth');
    } catch (e) {
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> <Text style={styles.titlePrefix}>Login: </Text>{this.state.login ? this.state.login : 'unknown'}</Text>
        <BasicButton
          title="Change Password"
          onPress={() => this.props.navigation.push('Edit')}
        />
        <BasicButton
          title="Logout"
          onPress={this.handleLogout}
          style={styles.logoutButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 32,
    justifyContent: 'flex-start',
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: '#FF3B30',
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    width: '100%'
  },
  title: {
    fontSize: 32,
    padding: 32
  },
  titlePrefix: {
    fontWeight: '300'
  }
})
