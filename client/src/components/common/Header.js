import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeStyle = { color: '#F15B2A' };

  return (
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <NavLink className="nav-link" to="/" activeStyle={activeStyle} exact>
            Home
          </NavLink>
        </li>
        <li class="nav-item">
          <NavLink
            className="nav-link"
            to="/podcasts"
            activeStyle={activeStyle}
          >
            Podcasts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
