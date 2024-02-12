import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./styles/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
// import Home from './components/Home';
import SingersList from "./components/SingersList.js";
import SongsList from "./components/SongsList.js";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql?",
  cache: new InMemoryCache(),
});

export default class App extends Component {
  state = {
    isSongModalOpen: false,
    isSingerModalOpen: false,
    isDetailModalOpen: false,
    selected: null,
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            {/* <Route path="/" element={<Home/>} /> */}
            <Route path="/" element={<SingersList />} />
            <Route path="/songs" element={<SongsList />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
