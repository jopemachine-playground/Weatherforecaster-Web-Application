// React.Component를 줄여 쓸 수 있게 해주는 Syntax Sugar
import React, { Component } from 'react';
import Icon from './Icon';

// 우선 localhost에서 받아오도록 했음
const API_WEATHER = 'http://localhost:8080/weather-crawler/current-weathers/by-city-name';

// state를 가지는 것은 클래스 기반 컴포넌트만 가능한 특성임.
// 그래서 다른 컴포넌트들과 다르게 클래스 기반으로 작성한 것
class TodayWeather extends Component {
  // weather가 변할 때 마다 Rerendering 해 줄 것임. 즉, weather state가 필요하고, 함수형 컴포넌트가 아님
  state = {
    weather: null
  };

  // componentDidMount는 컴포넌트가 생성되어 렌더링 된 후 호출되는 함수
  async componentDidMount() {

    // 클래스 베이스 컴포넌트에 인자를 넘길 땐, this.props를 이용함
    const { cityId } = this.props.match.params;

    // 아래 구문에서 쓰이는 `를 백틱이라고 함. 백틱으로 감싸면 아래처럼 쓸 수 있는데, 이런 걸 템플릿 스트링이라고 함
    const api = `${API_WEATHER}/${cityId}`;

    // weather를 가져온 다음, TodayWeather의 state를 셋팅한 후,
    // Rerendering 해라. 란 의미에서 await, async을 사용하는 것임
    const weather = await fetch(api)
      .then(res => res.json())
      .then(data => data);

    this.setState({
      // 일종의 Syntax Sugar.
      // this.setState({ weather: weather}) 와 같은 의미.
      weather
    });
  }

  render() {

    const { cityId } = this.props;
    const { weather } = this.state;

    // weather state가 undefine여도 부모 컴포넌트는 TodayWeather의 렌더링을 시도함.
    // 그럼 에러가 생기게 되므로 이를 방지하기 위한 에러 처리 구문. !weather 는, weather가 undefine인지 검사하는 문장이다.
    if (!weather) {
      // 아래 같은 역할을 하는 컴포넌트를 Spinner 라고 함
      return <div>Loading...</div>;
    }

    // !weather 구문이 없으면 여기서 에러를 내고 뻗는다.
    const celsius = (weather.main.temp - 273.15).toFixed(2); // kelvin to celsius
    const weatherMain = weather.weather[0].main;
    const iconId = weather.weather[0].id;

    return (
      <div className="weather-today">
        <h2 className="weather-city">{cityId}</h2>

        <div className="weather-today-meta">
          <h3 className="weather-main">{weatherMain}</h3>
          <div className="weather-temp">{celsius}°</div>
        </div>
        <div className="weather-image">
          <Icon iconId={iconId} />
        </div>
      </div>
    );
  }
}

export default TodayWeather;
