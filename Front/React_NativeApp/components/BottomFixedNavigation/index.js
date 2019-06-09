import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import AppNavigator from '../../App.js';
import CityListScreen from '../../screens/CityListScreen';
import HomeWeatherScreen from '../../screens/HomeWeather';
import BookmarkScreen from '../../screens/BookmarkScreen';

export default class BottomFixedNavigation extends React.Component {

  CityListRoute = () => <CityListScreen navigation={this.props.stackNavigation}/>;
  HomeWeatherRoute = () => <HomeWeatherScreen city="Daejeon" navigation={this.props.stackNavigation}/>;
  BookmarkRoute = () => <BookmarkScreen navigation={this.props.stackNavigation}/>;

  state = {
    index: 0,
    routes: [
      { key: 'Home', title: 'Home', icon: 'home' },
      { key: 'City_List', title: 'City List', icon: 'location-city' },
      { key: 'Bookmark', title: 'Bookmark', icon: 'star' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    Home: this.HomeWeatherRoute,
    City_List: this.CityListRoute,
    Bookmark : this.BookmarkRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
