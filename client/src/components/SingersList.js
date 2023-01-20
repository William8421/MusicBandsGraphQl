import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { getSingers, DeleteSingerMutation } from '../queries/queries';
import AddSinger from './AddSinger';
import { flowRight as compose } from 'lodash';
import SingerDetails from './SingerDetails';

class SingersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  openSingerModal = () => {
    this.setState({
      isSingerModalOpen: !this.state.isSingerModalOpen,
    });
  };
  deleteSinger = (e) => {
    this.props.DeleteSingerMutation({
      variables: {
        id: e.target.value,
      },
      refetchQueries: [{ query: getSingers }],
    });
  };

  displaySingers() {
    let data = this.props.getSingers;
    if (data.loading) {
      return <div>Loading List...</div>;
    } else {
      return data.singers.map((singer) => {
        return (
          <div className="liCloseContainer" key={singer.id}>
            <button
              title="delete singer"
              className="closeButton"
              value={singer.id}
              onClick={(e) => this.deleteSinger(e)}
            >
              X
            </button>
            <li
              className="songSingerLi"
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
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div className="listContainer">
        <h2>Singers</h2>
        <div className="list">
          <ul className="ulList">{this.displaySingers()}</ul>
          <AddSinger state={this.state} toggle={this.openSingerModal} />
          <SingerDetails singerId={this.state.selected} />
        </div>
        <button className="Button" onClick={this.openSingerModal}>
          Add Singer
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(getSingers, { name: 'getSingers' }),
  graphql(DeleteSingerMutation, { name: 'DeleteSingerMutation' })
)(SingersList);
