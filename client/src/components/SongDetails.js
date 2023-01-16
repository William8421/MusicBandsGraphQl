import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getSong } from '../queries/queries';

class SongDetails extends Component {
  displaySongDetails() {
    const { song } = this.props.data;
    if (song) {
      return (
        <div>
          <h2>Name:{song.name}</h2>
          <div>
            duration: <span>{song.minutes} minutes and </span>
            <span>{song.seconds} seconds</span>
          </div>
          <p>Song by: {song.singer.name}</p>
          <p>All songs by this singer:</p>
          <ul>
            {song.singer.songs.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Song selected...</div>;
    }
  }
  render() {
    return (
      <div>
        <div>{this.displaySongDetails()}</div>
      </div>
    );
  }
}

export default graphql(getSong, {
  options: (props) => {
    return {
      variables: {
        id: props.songId,
      },
    };
  },
})(SongDetails);
