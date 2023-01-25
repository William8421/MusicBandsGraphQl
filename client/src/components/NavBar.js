import React, { Component } from 'react';
import SongsList from './SongsList.js';
import SingersList from './SingersList.js';
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        {/* <div> */}
        <NavLink className="appName" to={'/'}>
          <h1>My Playlist</h1>
        </NavLink>
        {/* </div> */}
        <div className="navButtonsContainer">
          <NavLink className="navlink" to={'/'}>
            Home
          </NavLink>
          <NavLink className="navlink" to={'/singers'}>
            Singers
          </NavLink>
          <NavLink className="navlink" to={'/songs'}>
            Songs
          </NavLink>
        </div>
      </div>
    );
  }
}
