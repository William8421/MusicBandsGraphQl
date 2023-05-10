import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
import { AddSingerMutation, getSingers, getSongs } from '../queries/queries';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios'

class AddSinger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nationality: '',
      photo: '',
      uploaded: ''
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

  imageHandler(e){
    this.setState({
      photo: e.target.files[0]
    })
  }

  uploadImage(e){
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', this.state.photo);
    formData.append("upload_preset", "WilliamMallak");
    formData.append("upload_name", "denpxdokx");

    axios.post("https://api.cloudinary.com/v1_1/denpxdokx/image/upload", formData)
    .then(response => {
      this.setState({
        uploaded: response.data.url,
        photo: response.data.url
      })
    })
    console.log('state', this.state);
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
            <div className="input-div-image">
              <label>Image</label>
              <input
                type="file"
                name='photo'
                onChange={(e) => this.imageHandler(e)}
              />
            </div>
              {this.state.photo && <button className='add-button' onClick={(e) => this.uploadImage(e)}>Upload</button>}              
            <div>
              {this.state.uploaded && this.state.name && this.state.nationality? (<button className="add-button" onClick={this.props.toggle}>
                Add Singer/Band
              </button>) : (<button style={{backgroundColor: "grey", borderRadius: "6px"}} disabled>Add Singer/Band</button>)}
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