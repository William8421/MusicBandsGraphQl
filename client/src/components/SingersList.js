import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { getSingers } from '../queries/queries';

class SingersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  displaySingers() {
    let data = this.props.data;
    if (data.loading) {
      return <div>Loading List...</div>;
    } else {
      return data.singers.map((singer) => {
        return <li key={singer.id}>{singer.name}</li>;
      });
    }
  }
  render() {
    return (
      <div className="singersList">
        <ul>
          <h2>Singers</h2>
          {this.displaySingers()}
        </ul>
      </div>
    );
  }
}

export default graphql(getSingers)(SingersList);
