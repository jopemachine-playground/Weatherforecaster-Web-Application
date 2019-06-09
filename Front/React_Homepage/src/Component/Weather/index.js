import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router';

import List from './List';
import TodayWeather from './TodayWeather';
import './weather.css';

// 우선 localhost에서 받아오도록 했음
const API_CITIES = 'http://localhost:8080/weather-crawler/available-cities';

class Weather extends Component {
  state = {
    cities: []
  };

  async componentDidMount() {
    const cities = await fetch(API_CITIES)
      .then(res => res.json())
      .then(data => data);

    // Now I can use data as sync!
    // console.warn('FETCHED CITIES', cities);

    this.setState({
      cities
    });
  }

  render() {
    const { match } = this.props;
    const { cities } = this.state;

    // /: 로 시작하는 부분은 인자를 전달하기 위한 것임,
    // 저 url 뒤에 뭐가 붙으면 그걸 TodayWeather의 cityId로 전달함
    return (
      <div className="weather">
        <Switch>
          <Route path={`${match.path}/:cityId`} component={TodayWeather} />
          <Route exact path={match.path} render={() => <List cities={cities} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Weather);
