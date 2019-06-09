import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Button, List } from 'react-native-paper';
import FixedTopBar from '../../components/FixedTopBar';
import * as RNFS from 'react-native-fs';

// 임시로 넣어놓은 값
var bookmarks = ["Anbaeteo","Andong","Angol"];

const API_CITIES = 'http://10.0.2.2:8080/weather-crawler/available-cities';

// readFile이 파일을 읽지를 못함
const readFile = () => {

  RNFS.readFile('/bookmark.txt', 'ascii').then(res => {

    console.log(res);
    bookmarks = res;
    
    // for(var i = 0; i < res.length; i++) {
    //    items = res;
    // }

  })
  .catch(err => {
    console.log(err.message, err.code);
  });
};

export default class BookmarkScreen extends Component {

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
    await readFile();

    this.setState({
      cities: bookmarks,
    });
  }

  renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <Button icon={{source : "star", direction: 'ltr'}} raised theme={{ roundness: 3 }}>{city}</Button>
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

  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
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
