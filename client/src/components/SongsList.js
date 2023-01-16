import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { getSongs } from '../queries/queries';
import SongDetails from './SongDetails';

class SongsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  displaySongs() {
    let data = this.props.data;
    if (data.loading) {
      return <div>Loading List...</div>;
    } else {
      return data.songs.map((song) => {
        return (
          <li
            key={song.id}
            onClick={(e) => {
              this.setState({ selected: song.id });
            }}
          >
            {song.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="songsList">
        <ul>
          <h2>Songs</h2>
          {this.displaySongs()}
        </ul>
        <SongDetails songId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getSongs)(SongsList);
