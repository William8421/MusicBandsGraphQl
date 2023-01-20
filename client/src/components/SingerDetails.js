import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getSinger } from '../queries/queries';

class SingerDetails extends Component {
  displaySingerDetails() {
    const { singer } = this.props.data;
    if (singer) {
      return (
        <div className="details">
          <img src={singer.photo} alt="singer" />
          <p>
            Name: <span>{singer.name}</span>
          </p>
          <p>all {singer.name} songs</p>
          <ul className="detailsUl">
            {singer.songs.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Singer selected...</div>;
    }
  }
  render() {
    return (
      <div>
        <div>{this.displaySingerDetails()}</div>
      </div>
    );
  }
}

export default graphql(getSinger, {
  options: (props) => {
    return {
      variables: {
        id: props.singerId,
      },
    };
  },
})(SingerDetails);
