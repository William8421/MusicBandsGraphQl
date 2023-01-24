import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getSong } from '../queries/queries';

class SongDetails extends Component {
  displaySongDetails() {
    const { song } = this.props.data;
    if (song) {
      return (
        <div className="details">
          {/* <img src={song.singer.photo} alt="singer" />   */}
          <p>
            Song Name: <span>{song.name}</span>
          </p>
          <p>
            Duration: <span>{song.minutes} minutes and </span>
            <span>{song.seconds} seconds</span>
          </p>
          <p>
            Released Date: <span>{song.releaseDate}</span>{' '}
          </p>
          <p>
            By: <span>{song.singer.name}</span>
          </p>
          <p>All {song.singer.name} songs:</p>
          <ul className="detailsUl">
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
