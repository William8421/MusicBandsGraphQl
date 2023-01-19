import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './styles/Style.scss';

import SongsList from './components/SongsList.js';
import SingersList from './components/SingersList.js';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql?',
  cache: new InMemoryCache(),
});

export default class App extends Component {
  state = {
    isSongModalOpen: false,
    isSingerModalOpen: false,
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <h1>My Playlist</h1>
        <div className="main">
          <div className="singersDiv">
            <SingersList />
          </div>
          <div className="songsDiv">
            <SongsList />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}
