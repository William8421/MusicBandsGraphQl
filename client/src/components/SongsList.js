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
          <div className="liCloseContainer" key={song.id}>
            <button
              title="delete song"
              className="closeButton"
              value={song.id}
              onClick={(e) => this.deleteSong(e)}
            >
              X
            </button>
            <li
              className="songSingerLi"
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
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div className="listContainer">
        <h2>Songs</h2>
        <div className="list">
          <ul className="ulList">{this.displaySongs()}</ul>
          <SongDetails songId={this.state.selected} />
          <AddSong state={this.state} toggle={this.openSongModal} />
        </div>
        <button className="Button" onClick={this.openSongModal}>
          Add Song
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(getSongs, { name: 'getSongs' }),
  graphql(DeleteSongMutation, { name: 'DeleteSongMutation' })
)(SongsList);
