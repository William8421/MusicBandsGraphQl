import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getSinger,getSingers, DeleteSingerMutation, getSongs } from '../queries/queries';
import { flowRight as compose } from 'lodash';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDelete: null,
      selected: null,
      openConfirm: false,
    };
  }
  deleteSinger = (e) => {
    this.props.DeleteSingerMutation({
      variables: {
        id: this.state.toDelete,
      },
      refetchQueries: [{ query: getSingers }, { query: getSongs }],
    });
    this.setState({
      openConfirm: !this.state.openConfirm,
    });
  };


  displayDetailModal() {
    const { singer } = this.props.data;
    if (singer) {
      return (
        <Modal isOpen={this.props.state.isDetailModalOpen}>
            <ModalHeader toggle={this.props.toggle} >{singer.name}</ModalHeader>
            <ModalBody>
              <div className='singer-details-container'>
                <img src={singer.photo} alt="singer/band" />
                <p>Name: <span>{singer.name}</span></p>
                <p>all {singer.name} songs</p>
          <ul>
            {singer.songs.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
          <button onClick={() => {
            this.setState({openConfirm: true, toDelete: singer.id})
          }}>
            delete
            </button>
           <Modal isOpen={this.state.openConfirm}>
            <ModalHeader>
              <div>Warning</div>
            </ModalHeader>
              <ModalBody>
                <div>
                  
                Deleting a Singer/Band will delete all their songs
                </div>
                <div>
                Are you sure you want to delete <span className='warning'>{singer.name}</span> and all their songs?
                  
                </div>
              </ModalBody>
              <div className='modal-buttons'>
                <button
                  className="Button"
                  onClick={() => this.setState({ openConfirm: false })}
                >
                  cancel
                </button>
                <button
                  className="Button"
                  value={singer.id}
                  onClick={(e) => {
                    this.deleteSinger(e)
                  }}
                >
                  confirm
                </button>
                </div>
            </Modal>
            </div>
            </ModalBody>
        </Modal>
      );
    }
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.props.state.isDetailModalOpen}>
            <ModalHeader toggle={this.props.toggle} ></ModalHeader>
            <ModalBody>
                <div>{this.displayDetailModal()}</div>
            </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default compose(
  graphql(getSinger, {
    options: (props) => {
      return {
        variables: {
          id: props.singerId,
        },
      };
    },
  }),
  graphql(getSingers, { name: 'getSingers' }),
  graphql(DeleteSingerMutation, { name: 'DeleteSingerMutation' })
)(DetailModal);