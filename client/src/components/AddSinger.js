import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
import { AddSingerMutation, getSingers, getSongs } from '../queries/queries';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

class AddSinger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nationality: '',
      photo: '',
    };
  }
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
            <div className="input-div">
              <label>Singer/Band Name</label>
              <input
                type="text"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="input-div">
              <label>Nationality</label>
              <input
                type="text"
                onChange={(e) => this.setState({ nationality: e.target.value })}
              />
            </div>
            <div className="input-div">
              <label>Photo link</label>
              <input
                type="text"
                onChange={(e) => this.setState({ photo: e.target.value })}
              />
            </div>
            <div>
              <button className="add-button" onClick={this.props.toggle}>
                Add Singer/Band
              </button>
            </div>
            
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
