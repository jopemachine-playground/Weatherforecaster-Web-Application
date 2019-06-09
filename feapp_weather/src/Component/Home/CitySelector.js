import React, { Component } from 'react';

import './weather.css';

// 우선 localhost에서 받아오도록 했음
const API_CITIES = 'http://localhost:8080/weather-crawler/available-cities';

class CitySelector extends Component {
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
    const { cities } = this.state;
    const { onSelect } = this.props;

    // /: 로 시작하는 부분은 인자를 전달하기 위한 것임,
    // 저 url 뒤에 뭐가 붙으면 그걸 TodayWeather의 cityId로 전달함

    return (
      <div className="container weather-list">
        <p className="lead">Choose your city:</p>

        <select id="selector" className="form-control" onChange={() => onSelect(document.getElementById("selector").value)}>
          {
            cities.map(item => (
              <option key={item}>
                {item}
              </option>
            ))
          }
        </select>
      </div>
    );
  }
}

export default CitySelector;
