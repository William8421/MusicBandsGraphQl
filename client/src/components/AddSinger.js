import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
import { AddSingerMutation, getSingers, getSongs } from '../queries/queries';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class AddSinger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nationality: '',
      photo: '',
    };
  }
  // displaySong() {
  //   let data = this.props.getSongs;

  //   if (data.loading) {
  //     return <option disabled>Loading Songs...</option>;
  //   } else {
  //     return data.songs.map((song) => {
  //       return (
  //         <option key={song.id} value={song.id}>
  //           {song.name}
  //         </option>
  //       );
  //     });
  //   }
  // }
  submitForm(e) {
    e.preventDefault();
    this.props.AddSingerMutation({
      variables: {
        name: this.state.name,
        nationality: this.state.nationality,
        photo: this.state.photo,
      },
      refetchQueries: [{ query: getSingers }],
    });
    e.target.reset();
  }

  render() {
    return (
      <Modal isOpen={this.props.state.isSingerModalOpen}>
        <ModalHeader toggle={this.props.toggle}>Add Singer</ModalHeader>
        <ModalBody>
          <form onSubmit={this.submitForm.bind(this)}>
            <div>
              <label>singer Name</label>
              <input
                type="text"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div>
              <label>nationality</label>
              <input
                type="text"
                onChange={(e) => this.setState({ nationality: e.target.value })}
              />
            </div>
            <div>
              <label>photo link</label>
              <input
                type="text"
                onChange={(e) => this.setState({ photo: e.target.value })}
              />
            </div>
            <ModalFooter>
              <button onClick={this.props.toggle}>Add Singer</button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default compose(
  graphql(getSongs, { name: 'getSongs' }),
  graphql(AddSingerMutation, { name: 'AddSingerMutation' })
)(AddSinger);
