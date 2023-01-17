import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { getSingers } from '../queries/queries';
import SingerDetails from './SingerDetails';

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
        return (
          <li
            className="songSingerList"
            key={singer.id}
            onClick={(e) => {
              if (this.state.selected === null) {
                this.setState({ selected: singer.id });
              } else if (this.state.selected === singer.id) {
                this.setState({ selected: null });
              } else {
                this.setState({ selected: singer.id });
              }
            }}
          >
            {singer.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="singersList">
        <h2>Singers</h2>
        <ul className="ulList">{this.displaySingers()}</ul>
        <SingerDetails singerId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getSingers)(SingersList);
