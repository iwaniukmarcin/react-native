import React, {Component} from 'react';
import {View, Text, AsyncStorage, KeyboardAvoidingView, Platform, TextInput, StyleSheet} from 'react-native';
import BasicButton from "../components/button";

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount = async () => {
    try {
      let storageLogin = await AsyncStorage.getItem('@user-login');
      let storagePassword = await AsyncStorage.getItem('@user-password');
      this.setState({
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
        canSubmit: false,
        isSamePasswords: true,
        storageLogin,
        storagePassword
      })
    } catch (e) {

    }
  };

  validateForm = () => {
    if (
      this.state.oldPassword.length > 0 && this.state.newPassword1.length > 0 &&
      this.state.storagePassword === this.state.oldPassword && this.state.newPassword1 === this.state.newPassword2
    ) {
      return true
    }
    return false
  };

  setOldPassword = (text) => {
    const canSubmit = text.length > 0 ? this.validateForm() : false;
    console.log('oldPassword ' + canSubmit);
    this.setState({oldPassword: text, canSubmit})
  };

  setNewPassword1 = (text) => {
    const canSubmit = text && text.length > 0 ? this.validateForm() : false;
    const isSamePasswords = this.state.newPassword2 === text;
    console.log('np1 ' + canSubmit);
    this.setState({newPassword1: text, canSubmit, isSamePasswords})
  };

  setNewPassword2 = (text) => {
    const canSubmit = text && text.length > 0 ? this.validateForm() : false;
    const isSamePasswords = this.state.newPassword1 === text;
    console.log('np2 ' + canSubmit);
    this.setState({newPassword2: text, canSubmit, isSamePasswords})
  };

  changePassword = async () => {
    try {
      await AsyncStorage.setItem('@user-password', this.state.newPassword1)
      this.props.navigation.navigate('Home');
    } catch (e) {
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled={Platform.OS === 'ios'}>
        <Text style={styles.title}> Zmiana hasła konta: {this.state.storageLogin}</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder='Stare hasło'
          value={this.state.oldPassword}
          onChangeText={this.setOldPassword}
          returnKeyType='next'
          autoCapitalize='none'
        />
        <TextInput
          style={[styles.inputContainer]}
          secureTextEntry
          placeholder='Nowe hasło'
          value={this.state.newPassword1}
          onChangeText={this.setNewPassword1}
          returnKeyType='next'
          autoCapitalize='none'
        />
        <TextInput
          style={[styles.inputContainer]}
          secureTextEntry
          placeholder='Powtórz nowe hasło'
          value={this.state.newPassword2}
          onChangeText={this.setNewPassword2}
          returnKeyType='done'
          autoCapitalize='none'
        />
        {!this.state.isSamePasswords
        && <Text style={styles.invalidPassword}>Nowe hasła nie są takie same!</Text>}
        <BasicButton
          title="Zmień hasło"
          style={styles.loginButton}
          disabled={this.state.canSubmit}
          onPress={this.changePassword}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 32,
    justifyContent: 'center'
  },
  loginButton: {
    marginTop: 16,
    backgroundColor: '#4E00B1'
  },
  inputContainer: {
    margin: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
    fontSize: 20
  },
  invalidPassword: {
    color: 'red'
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center'
  }
});

export default EditPassword;
