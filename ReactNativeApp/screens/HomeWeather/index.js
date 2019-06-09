import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Paragraph, Title, DefaultTheme, Avatar, ActivityIndicator, Colors } from 'react-native-paper';

import BottomFixedNavigation from '../../components/BottomFixedNavigation';
import FixedTopBar from '../../components/FixedTopBar';

const CloudyImage = './weatherImage/cloudy.png';
const ClearImage = './weatherImage/sunny.png';
const RainyImage = './weatherImage/rainy.png';
const HazeImage = './weatherImage/haze.png';
const SnowImage = './weatherImage/snow.png';
const FogImage = './weatherImage/fog.png';
const MistImage = './weatherImage/mist.png';

const API_WEATHER = 'http://10.0.2.2:8080/weather-crawler/current-weathers/by-city-name';

export default class HomeWeather extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation, city } = this.props;

    fetch(API_WEATHER + '/' + `${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator style={styles.ActivityIndicatorStyle} animating={true} color={Colors.blue200} />
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let weatherMain = this.state.weather[0].main;
    let weatherDesc = this.state.weather[0].description;
    let windSpeed = this.state.wind.speed;
    let cloudDegree = this.state.clouds.all;
    let pressure = this.state.main.pressure;
    let humidity = this.state.main.humidity;

    let weatherImage;

    switch (weatherMain) {
     case 'Clouds':
       weatherImage = require(CloudyImage);
       break;
     case 'Haze':
       weatherImage = require(HazeImage);
       break;
     case 'Clear':
       weatherImage = require(ClearImage);
       break;
     case "Rain":
       weatherImage = require(RainyImage);
       break;
     case "Fog":
       weatherImage = require(FogImage);
       break;
     // Snow인지 불 명확함
     case "Snow":
       weatherImage = require(SnowImage);
       break;
     case "Mist":
       weatherImage = require(MistImage);
     default:
       weatherImage = require(ClearImage);
       break;
     }

    return (
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <Card.Cover style={styles.cardImage} source={weatherImage} />
          <Card.Title style={styles.cityTitle} title="Daejeon" subtitle="현재 날씨 입니다"
            left={(props) => <Avatar.Icon {...props} icon="location-city" />}/>
          <Card.Content style={{marginTop: 20}}>
            <Text style={styles.text}>온도: {celsius.toFixed(1)}°C</Text>
            <Text style={styles.text}>풍속: {windSpeed} m/s</Text>
            <Text style={styles.text}>날씨: {weatherMain}</Text>
            <Text style={styles.text}>설명: {weatherDesc}</Text>
            <Text style={styles.text}>기압: {pressure} hPa</Text>
            <Text style={styles.text}>습도: {humidity} %</Text>
            <Text style={styles.text}>구름낀 정도: {cloudDegree}</Text>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

// flex1이 아이콘들을 오른쪽에 붙게함
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#ffffff',
  },
  text: {
    fontFamily: 'JejuGothic',
    marginBottom: 10,
    fontSize: 16,
  },
  cardContainer:{
    backgroundColor: '#f5f5f5',
  },
  cityTitle: {
    fontSize: 35,
  },
  ActivityIndicatorStyle:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
