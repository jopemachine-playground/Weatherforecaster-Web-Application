import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomFixedNavigation from '../components/BottomFixedNavigation';
import FixedTopBar from '../components/FixedTopBar';

export default class SingleScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <FixedTopBar title="현재 날씨"></FixedTopBar>
        <BottomFixedNavigation stackNavigation={this.props.navigation}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
