import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './styles/Style.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SongsList from './components/SongsList.js';
import SingersList from './components/SingersList.js';
import NavBar from './components/NavBar';

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
        <BrowserRouter>
          <NavBar />
          <Routes>
            {/* <h1>My Playlist</h1> */}
            <Route path="/" />
            <Route path="singers" element={<SingersList />} />
            <Route path="songs" element={<SongsList />} />
            {/* <div className="main"> */}
            {/* <div className="singersDiv"> */}
            {/* <SingersList /> */}
            {/* </div> */}
            {/* <div className="songsDiv">
            <SongsList />
          </div> */}
            {/* </div> */}
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
