import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navigation.css';

let copyrightStyle = {
  color : '#ffffff',
  fontSize: '15px',
  fontFamily: 'Nanum-Gothic'
};

// Stateless component
const Navigation = () => {
return (
<nav className="navbar navbar-dark bg-dark fixed-top">
  <p className="lead" style={copyrightStyle}>&copy; 실전코딩 6조</p>
  <div className="row">
    <ul className="navigation">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <NavLink to="/about" activeClassName="selected">
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/weather" activeClassName="selected">
          Weather
        </NavLink>
      </li>
    </ul>
  </div>
</nav>
);
};

export default Navigation;
