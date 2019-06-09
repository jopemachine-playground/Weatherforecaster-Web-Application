import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

// Stateless component
let style = {
  marginTop: '30px'
}

const List = props => {
  const { cities, match } = props;
  const { url } = match;

  // map 메서드를 이용해 cities 배열 내 모든 요소들을
  // li 리스트로 만들어 랜더링 함

  return (
    <div className="container weather-list" style={style}>
      <p>Choose your city:</p>
      <ul className="weather-cities">
        {cities.map(item => (
          <li key={item}>
            <Link to={`${url}/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(List);
