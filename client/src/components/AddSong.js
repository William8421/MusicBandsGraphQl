import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
import { AddSongMutation, getSingers, getSongs } from '../queries/queries';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      minutes: '00',
      seconds: '00',
      releaseDate: 'Unknown',
      singerId: '',
    };
  }

  displaySinger() {
    let data = this.props.getSingers;

    if (data.loading) {
      return <option disabled>Loading Singers...</option>;
    } else {
      return data.singers.map((singer) => {
        return (
          <option key={singer.id} value={singer.id}>
            {singer.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.props.AddSongMutation({
      variables: {
        name: this.state.name,
        minutes: this.state.minutes,
        seconds: this.state.seconds,
        releaseDate: this.state.releaseDate,
        singerId: this.state.singerId,
      },
      refetchQueries: [{ query: getSongs }],
    });
    e.target.reset();
  }

  render() {
    return (
      <Modal isOpen={this.props.state.isSongModalOpen}>
        <ModalHeader toggle={this.props.toggle}>Add Song</ModalHeader>
        <ModalBody>
          <form onSubmit={this.submitForm.bind(this)}>
            <div className="songInputDiv">
              <label>Song Name</label>
              <input
                type="text"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="durationDiv">
              <div>Duration</div>
              <label>min</label>
              <input
                type="number"
                min={0}
                max={60}
                onChange={(e) => this.setState({ minutes: e.target.value })}
              />
              <label>sec</label>
              <input
                type="number"
                min={0}
                max={60}
                onChange={(e) => this.setState({ seconds: e.target.value })}
              />
            </div>
            <div className="releaseDateDiv">
              <label>ReleaseDate</label>
              <input
                type="number"
                min={1900}
                max={2099}
                onChange={(e) => this.setState({ releaseDate: e.target.value })}
              />
            </div>
            <div className="selectDiv">
              <label>Singer</label>
              <select
                onChange={(e) => this.setState({ singerId: e.target.value })}
              >
                <option> Select Singer</option>
                {this.displaySinger()}
              </select>
            </div>
            <ModalFooter>
              <button className="Button" onClick={this.props.toggle}>
                Add Song
              </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default compose(
  graphql(getSingers, { name: 'getSingers' }),
  graphql(AddSongMutation, { name: 'AddSongMutation' })
)(AddSong);
