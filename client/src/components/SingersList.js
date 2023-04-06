import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { getSingers} from '../queries/queries';
import AddSinger from './AddSinger';
import SingerDetails from './SingerDetails';

class SingersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDelete: null,
      selected: null,
      openConfirm: false,
      isDetailModalOpen: false
    };
  }
  openSingerModal = () => {
    this.setState({
      isSingerModalOpen: !this.state.isSingerModalOpen,
    });
  };


  displayInfo = (singer) => {
    if (this.state.selected === null) {
      this.setState({ selected: singer.id});
    }else if (this.state.selected === singer.id) {
      this.setState({ selected: null });
    } else {
      this.setState({ selected: singer.id });
    }
    this.setState({
      isDetailModalOpen: !this.state.isDetailModalOpen
    })
  };

  displaySingers() {
    let data = this.props.getSingers;
    if (data.loading) {
      return <div>Loading List...</div>;
    } else {
      return data.singers.map((singer) => {
        return (
          <div key={singer.id}>
            <img src={singer.photo} alt={singer.name}
            onClick={(e) => this.displayInfo(singer)}
            />
            <li
              onClick={(e) => this.displayInfo(singer)}
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
      <div className="list-container">
        <div className="singers-container">
          <h2>Singers/Bands</h2>
          <div>
            <ul>{this.displaySingers()}</ul>
            <AddSinger state={this.state} toggle={this.openSingerModal} />
            <SingerDetails singerId={this.state.selected} state={this.state} toggle={this.displayInfo}/>
          </div>
        </div>
        <button className="add-button" onClick={this.openSingerModal}>
          Add Singer/Band
        </button>
      </div>
    );
  }
}

export default graphql(getSingers, { name: 'getSingers' })
(SingersList);