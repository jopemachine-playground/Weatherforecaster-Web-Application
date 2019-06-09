import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DefaultTheme, ActivityIndicator, Colors } from 'react-native-paper';
import FixedTopBar from '../../components/FixedTopBar';

const CloudyImage = './weatherIcons/cloudy.png';
const ClearImage = './weatherIcons/clear.png';
const RainyImage = './weatherIcons/rain.png';
const HazeImage = './weatherIcons/haze.png';
const SnowImage = './weatherIcons/snow.png';
const FogImage = './weatherIcons/haze.png';
const MistImage = './weatherIcons/haze.png';

const API_WEATHER = 'http://10.0.2.2:8080/weather-crawler/current-weathers/by-city-name';

export default class WeatherDetailScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);

    fetch(API_WEATHER + '/' + `${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  /* Colors.blue200은 옅은 파란 색깔이란 뜻이고, ActivityIndicator는 로딩 바 같은 컴포넌트 */
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
        <Image style={styles.ImageStyle} source={weatherImage} />
        <Text style={styles.TextStyle}>temp: {celsius.toFixed(1)}</Text>
        <Text style={styles.TextStyle}>wind speed: {windSpeed} m/s</Text>
        <Text style={styles.TextStyle}>weatherMain: {weatherMain}</Text>
        <Text style={styles.TextStyle}>weatherDesc: {weatherDesc}</Text>
        <Text style={styles.TextStyle}>cloudDegree: {cloudDegree}</Text>
        <Text style={styles.TextStyle}>barometric pressure: {pressure} hPa</Text>
        <Text style={styles.TextStyle}>humidity: {humidity} %</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f2ff',
  },
  ActivityIndicatorStyle:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageStyle:{
    height: 130,
    width: 130,
    flex: 0,
    resizeMode:'contain',
    marginBottom: 40
  },
  TextStyle:{
    marginBottom: 11
  }

});
