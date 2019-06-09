import React, { Component } from 'react';

import CloudyImage from './weatherImage/cloudy.svg';
import ClearImage from './weatherImage/clear.svg';
import RainyImage from './weatherImage/rain.svg';
import HazeImage from './weatherImage/haze.svg';
import SnowImage from './weatherImage/snow.svg';
import FogImage from './weatherImage/snow.svg';

import CitySelector from './CitySelector';

const API_WEATHER = 'http://localhost:8080/weather-crawler/current-weathers/by-city-name';

class HomeWeather extends Component {
  state = {
    weather: null,
    selectedCityId: null
  };

  componentWillMount(){
    this.setState({
      selectedCityId: this.props.cityId
    });
  }

  componentDidMount() {
    this.fetchSelectedCityWeather(this.state.selectedCityId);
  }

  async fetchSelectedCityWeather(city){

    console.log('실행');

    const api = `${API_WEATHER}/${city}`;

    const weather = await fetch(api)
      .then(res => res.json())
      .then(data => data);

    this.setState({
      weather
    });
  }

  render() {
    const { weather } = this.state;
    const selectedCityId = this.state.selectedCityId;

    if (!this.state.weather) {
      return <div>Loading...</div>;
    }

    const celsius = (weather.main.temp - 273.15).toFixed(2); // kelvin to celsius

    // weatherMain은 현재 날씨가 Cloudy인지 Rainy인지 등을 나타내는 요소
    const weatherMain = weather.weather[0].main;

    const weatherDesc = weather.weather[0].description;
    const windSpeed = weather.wind.speed;
    const cloudDegree = weather.clouds.all;
    const pressure = weather.main.pressure;
    const humidity = weather.main.humidity;

    let weatherImage;

    switch (weatherMain) {
      case 'Clouds':
        weatherImage = CloudyImage;
        break;
      case 'Haze':
        weatherImage = HazeImage;
        break;
      case 'Clear':
        weatherImage = ClearImage;
        break;
      case "Rain":
        weatherImage = RainyImage;
        break;
      case "Fog":
        weatherImage = FogImage;
        break;
      // Snow인지 불 명확함
      case "Snow":
        weatherImage = SnowImage;
        break;
      default:
        weatherImage = ClearImage;
        break;
    }

    return (
      <div>
        <CitySelector onSelect={(selectedCityId) => this.setState({selectedCityId})}/>
        <div className="jumbotron">
          <h2 id="CityName">{selectedCityId}</h2>
          <p className="lead">{weatherDesc}</p>
          <p className="weather-detail">wind speed: {windSpeed} m/s</p>
          <p className="weather-detail">degree of cloudiness: {cloudDegree}</p>
          <p className="weather-detail">barometric pressure: {pressure} hPa</p>
          <p className="weather-detail">humidity: {humidity} %</p>
          <img id="MainWeatherImage" alt="Main Weather" src={weatherImage} />
          <div className="weather-today-meta">
            <h3 className="weather-main">{weatherMain}</h3>
            <div className="weather-temp">{celsius}°</div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeWeather;
