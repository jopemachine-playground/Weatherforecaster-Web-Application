import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Button, List } from 'react-native-paper';
import FixedTopBar from '../../components/FixedTopBar';
import * as RNFS from 'react-native-fs';

const API_CITIES = 'http://10.0.2.2:8080/weather-crawler/available-cities';

const fileWrite = (contents) => {
  RNFS.writeFile('../BookmarkScreen/bookmark.txt', contents, 'ascii').then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err.message, err.code);
  });
}

export default class CityListScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }

  async componentDidMount() {
    fetch(API_CITIES)
      .then(response => response.json())
      .then(cities => {
        console.log('cities =', cities.length);
        this.setState({
          cities
        });
      });
  }

  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
    );
  }

  renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <Button icon={{source : "label", direction: 'ltr'}} raised theme={{ roundness: 3 }}>{city}</Button>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <ScrollView>
          <FlatList style={styles.container}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={item => item}
                    data={this.state.cities}
          />
        </ScrollView>
      </View>
    );
  }
}

// flex1이 아이콘들을 오른쪽에 붙게함
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 60,
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
