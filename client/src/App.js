import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './styles/main.scss';

import SongsList from './components/SongsList.js';
import SingersList from './components/SingersList.js';
import AddSong from './components/AddSong';
import AddSinger from './components/AddSinger.js';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql?',
  cache: new InMemoryCache(),
});

export default class App extends Component {
  state = {
    isSongModalOpen: false,
    isSingerModalOpen: false,
  };

  openSongModal = () => {
    this.setState({
      isSongModalOpen: !this.state.isSongModalOpen,
    });
  };

  openSingerModal = () => {
    this.setState({
      isSingerModalOpen: !this.state.isSingerModalOpen,
    });
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <h1>My Playlist</h1>
          <div className="lists">
            <SongsList />
            <SingersList />
          </div>
          <div className="lists">
            <button onClick={this.openSongModal}>Add Song</button>
            <AddSong state={this.state} toggle={this.openSongModal} />
          </div>
          <button onClick={this.openSingerModal}>Add Singer</button>
          <AddSinger state={this.state} toggle={this.openSingerModal} />
        </div>
      </ApolloProvider>
    );
  }
}
