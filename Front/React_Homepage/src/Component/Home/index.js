import React from 'react';
import HomeWeather from './HomeWeather';
import './weather.css';

// 임시로 설정
let settingCityName = "Daejeon";

const homeStyle = {
  marginTop: '100px',
  fontFamily: "Nanum Gothic"
}

// Stateless component
const Home = () => {

  return (
    <div className="container" style={homeStyle}>
      <HomeWeather cityId={settingCityName} />
    </div>
  );
};

export default Home;
