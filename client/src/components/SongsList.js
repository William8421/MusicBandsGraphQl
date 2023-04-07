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

  displayInfo = (song) => {
    if (this.state.selected === null) {
      this.setState({ selected: song.id});
    }else if (this.state.selected === song.id) {
      this.setState({ selected: null });
    } else {
      this.setState({ selected: song.id });
    }
    this.setState({
      isDetailModalOpen: !this.state.isDetailModalOpen
    })
  };


  displaySongs() {
    let data = this.props.getSongs;
    if (data.loading) {
      return <div>Loading List...</div>;
    } else {
      return data.songs.map((song) => {
        return (
          <div className='song-container' key={song.id}>
            <li
              onClick={(e) => this.displayInfo(song)}
            >
              {song.name}
            <h5> by {song.singer.name}</h5>
            </li>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div className="songs-list-container">
        <div className="songs-container">
          <h2>Songs</h2>
          <div>
            <ul>{this.displaySongs()}</ul>
            <SongDetails songId={this.state.selected} state={this.state} toggle={this.displayInfo} />
            <AddSong state={this.state} toggle={this.openSongModal} />
          </div>
        </div>
        <button className="add-button" onClick={this.openSongModal}>
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
