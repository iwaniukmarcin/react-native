import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Dialog from "react-native-dialog";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUnSafeDrink: true,
      percentage: 0,
      dialogVisible: false,
      fadeAnim: new Animated.Value(1),
    };
  }

  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  handleAddDrink = (type) => {
    const isUnSafeDrink = type === 'alcohol';
    const percentages = (isUnSafeDrink ? -20 : 20) + +this.state.percentage;
    const newPercentageValue = percentages >= 0 && percentages <= 100 ? percentages : this.state.percentage;

    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: isUnSafeDrink ? 1 : 0,
        duration: 1000,
      }
    ).start(() => this.setState({
      isUnSafeDrink: isUnSafeDrink,
      fadeAnim: new Animated.Value(isUnSafeDrink ? 0 : 1)
    }));

    this.setState({
      percentage: newPercentageValue,
      dialogVisible: false
    });
  };

  handleDelete = () => {
    this.setState({dialogVisible: false});
  };

  render() {
    const {isUnSafeDrink, percentage, fadeAnim} = this.state;

    return (
      <View style={styles.container}>
        <Text>Your daily water routine</Text>
        <Text style={styles.title}>{percentage}%</Text>
        <TouchableOpacity style={styles.waterContainer}
                          onPress={() => {
                            this.showDialog();
                          }}>
          <LinearGradient colors={['#0B5BD3', '#FFF']} style={{flex: 1}}>
            <Animated.View
              // style={[styles.waterPortion, (isUnSafeDrink ? percentage === 80 : percentage === 100) && {opacity: fadeAnim}]}>
              style={[styles.waterPortion, percentage === 100 && {opacity: fadeAnim}, percentage > 100 && {opacity: 0}]}>
            </Animated.View>
            <View style={styles.separator}/>
            <Animated.View
              // style={[styles.waterPortion, (isUnSafeDrink ? percentage === 60 : percentage === 80) && {opacity: fadeAnim}]}>
              style={[styles.waterPortion, percentage === 80 && {opacity: fadeAnim}, percentage > 80 && {opacity: 0}]}>
            </Animated.View>
            <View style={styles.separator}/>
            <Animated.View
              // style={[styles.waterPortion, (isUnSafeDrink ? percentage === 40 : percentage === 60) && {opacity: fadeAnim}]}>
              style={[styles.waterPortion, percentage === 60 && {opacity: fadeAnim}, percentage > 60 && {opacity: 0}]}>
            </Animated.View>
            <View style={styles.separator}/>
            <Animated.View
              // style={[styles.waterPortion, (isUnSafeDrink ? percentage === 20 : percentage === 40) && {opacity: fadeAnim}]}>
              style={[styles.waterPortion, percentage === 40 && {opacity: fadeAnim}, percentage > 40 && {opacity: 0}]}>
            </Animated.View>
            <View style={styles.separator}/>
            <Animated.View
              // style={[styles.waterPortion, (isUnSafeDrink ? percentage === 0 : percentage === 20) && {opacity: fadeAnim}]}>
              style={[styles.waterPortion, percentage === 20 && {opacity: fadeAnim}, percentage > 20 && {opacity: 0}]}>
            </Animated.View>
          </LinearGradient>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}
                          onBackdropPress={() => this.setState({dialogVisible: false})}>
          <Dialog.Title>Select drink type</Dialog.Title>
          <Dialog.Description>
            What did you drink?
          </Dialog.Description>
          <Dialog.Button disabled={this.state.percentage >= 100} style={this.state.percentage >= 100 && styles.greyText}
                         label="A glass of pure Water" onPress={() => this.handleAddDrink('water')}/>
          <Dialog.Button disabled={this.state.percentage >= 100} style={this.state.percentage >= 100 && styles.greyText}
                         label="Drink with Sugar" onPress={() => this.handleAddDrink('water')}/>
          <Dialog.Button disabled={this.state.percentage <= 0} style={this.state.percentage === 0 && styles.greyText}
                         label="Alcohol" onPress={() => this.handleAddDrink('alcohol')}/>
        </Dialog.Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    color: '#007AFF',
    padding: 32,
  },
  waterContainer: {
    flex: 1,
    height: '80%',
    width: '80%',
    borderWidth: 4,
  },
  waterPortion: {
    flex: 1,
    backgroundColor: 'white',
  },
  separator: {
    borderWidth: 1,
    flex: 0
  },
  greyText: {
    color: 'grey'
  }
});
