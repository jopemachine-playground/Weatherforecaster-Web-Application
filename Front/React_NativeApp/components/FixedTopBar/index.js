import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class FixedTopBar extends React.Component {

  render() {
    const { title } = this.props;
    return (
      <Appbar style={appBarStyles.topFixed}>
        {/* <Icon name="wb-sunny" size={25} color="#ffffff" style={{marginLeft: 7}} /> */}
        <Text style={appBarStyles.titleStyle}>{title}</Text>
        {/* <Appbar.Action style={appBarStyles.iconsStyle} icon="home" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action style={appBarStyles.iconsStyle} icon="archive" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action style={appBarStyles.iconsStyle} icon="star" onPress={() => console.log('Pressed mail')} />*/}
      </Appbar>
    );
  }
}

const appBarStyles = StyleSheet.create({
  topFixed: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },

  titleStyle: {
    marginLeft: 15,
    fontFamily: 'JejuGothic',
    color: '#ffffff',
    fontSize: 20,
    flex: 1,
  },

  iconsStartStyle: {
    alignSelf: 'flex-start',
  },

  iconsEndStyle: {
    alignSelf: 'flex-end',
  }
});
