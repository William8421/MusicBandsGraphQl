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
          <div className="LICLOSEcontiner" key={singer.id}>
            <li
              className="songSingerList"
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
            <button
              className="closeButton"
              value={singer.id}
              onClick={(e) => this.deleteSinger(e)}
            >
              X
            </button>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div className="list">
        <h2>Singers</h2>
        <ul className="ulList">{this.displaySingers()}</ul>
        <AddSinger state={this.state} toggle={this.openSingerModal} />
        <SingerDetails singerId={this.state.selected} />
        <button className="Button" onClick={this.openSingerModal}>
          add singer
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(getSingers, { name: 'getSingers' }),
  graphql(DeleteSingerMutation, { name: 'DeleteSingerMutation' })
)(SingersList);
