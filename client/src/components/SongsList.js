import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { getSongs, DeleteSongMutation } from '../queries/queries';
import AddSong from './AddSong';
import { flowRight as compose } from 'lodash';
import SongDetails from './SongDetails';

class SongsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  openSongModal = () => {
    this.setState({
      isSongModalOpen: !this.state.isSongModalOpen,
    });
  };
  deleteSong = (e) => {
    this.props.DeleteSongMutation({
      variables: {
        id: e.target.value,
      },
      refetchQueries: [{ query: getSongs }],
    });
  };
  displaySongs() {
    let data = this.props.getSongs;
    if (data.loading) {
      return <div>Loading List...</div>;
    } else {
      return data.songs.map((song) => {
        return (
          <div className="LICLOSEcontiner" key={song.id}>
            <li
              className="songSingerList"
              onClick={(e) => {
                if (this.state.selected === null) {
                  this.setState({ selected: song.id });
                } else if (this.state.selected === song.id) {
                  this.setState({ selected: null });
                } else {
                  this.setState({ selected: song.id });
                }
              }}
            >
              {song.name}
            </li>
            <button
              className="closeButton"
              value={song.id}
              onClick={(e) => this.deleteSong(e)}
            >
              X
            </button>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div className="list">
        <h2>Songs</h2>
        <ul className="ulList">{this.displaySongs()}</ul>
        <AddSong state={this.state} toggle={this.openSongModal} />
        <SongDetails songId={this.state.selected} />
        <button className="Button" onClick={this.openSongModal}>
          Add Song
        </button>
      </div>
    );
  }
}

// export default graphql(getSongs)(SongsList);
export default compose(
  graphql(getSongs, { name: 'getSongs' }),
  graphql(DeleteSongMutation, { name: 'DeleteSongMutation' })
)(SongsList);
