import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getSong } from '../queries/queries';

class SongDetails extends Component {
  displaySongDetails() {
    const { song } = this.props.data;
    if (song) {
      if (!song.singer) {
        return (
          <div className="details">
            <p>Song Name: {song.name}</p>
            <p>
              Duration: <span>{song.minutes} minutes and </span>
              <span>{song.seconds} seconds</span>
            </p>
          </div>
        );
      } else {
        return (
          <div className="details">
            <p>Song Name: {song.name}</p>
            <p>
              Duration: <span>{song.minutes} minutes and </span>
              <span>{song.seconds} seconds</span>
            </p>
            <p>By: {song.singer.name}</p>
            <p>All {song.singer.name} songs:</p>
            <ul>
              {song.singer.songs.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
          </div>
        );
      }
    } else {
      return <div>No Song selected...</div>;
    }
    // if (song) {
    //   return (
    //     <div className="details">
    //       <p>Song Name: {song.name}</p>
    //       <p>
    //         Duration: <span>{song.minutes} minutes and </span>
    //         <span>{song.seconds} seconds</span>
    //       </p>
    //       <p>By: {song.singer.name}</p>
    //       <p>All {song.singer.name} songs:</p>
    //       <ul>
    //         {song.singer.songs.map((item) => {
    //           return <li key={item.id}>{item.name}</li>;
    //         })}
    //       </ul>
    //     </div>
    //   );
    // } else {
    //   return <div>No Song selected...</div>;
    // }
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
