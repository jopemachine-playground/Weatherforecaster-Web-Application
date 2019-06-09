import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import CityListScreen from '../screens/CityListScreen';
import WeatherDetailScreen from '../screens/WeatherDetailScreen';
import HomeWeatherScreen from '../screens/HomeWeatherScreen';

const CityListScreenStack = createStackNavigator({
  CityList: CityListScreen,
});

const WeatherDetailScreenStack = createStackNavigator({
  WeatherDetail: WeatherDetailScreen,
});


const HomeWeatherScreenStack = createStackNavigator({
  HomeWeather: HomeWeatherScreen,
});


export default createBottomTabNavigator({
  CityListScreenStack,
  WeatherDetailScreenStack,
  HomeWeatherScreenStack,
});
