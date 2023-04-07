import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getSong, DeleteSongMutation, getSongs } from '../queries/queries';
import { flowRight as compose } from 'lodash';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      toDelete: null,
      openConfirm: false
    };
  }
  deleteSong = (e) => {
    this.props.DeleteSongMutation({
      variables: {
        id: this.state.toDelete,
      },
      refetchQueries: [{ query: getSongs }],
    });
    this.setState({
      openConfirm: !this.state.openConfirm,
    });
  };
  displaySongDetails() {
    const { song } = this.props.data;
    if (song) {
      return (
          <Modal isOpen={this.props.state.isDetailModalOpen}>
            <ModalHeader toggle={this.props.toggle}>{song.name}</ModalHeader>
            <ModalBody>
              <div className='song-details-container'>
                <img src={song.singer.photo} alt="song"/>
                <p>
            Song Name: <span>{song.name}</span>
          </p>
          <p>
            Duration: <span>{song.minutes} minutes</span>:
            <span>{song.seconds} seconds</span>
          </p>
          <p>
            Released Date: <span>{song.releaseDate}</span>{' '}
          </p>
          <p>
            By: <span>{song.singer.name}</span>
          </p>
          <p>All {song.singer.name} songs:</p>
          <ul className="detailsUl">
            {song.singer.songs.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
          <button
              title="delete song"
              className=""
              value={song.id}
              onClick={() => {
                this.setState({openConfirm: true, toDelete: song.id})
              }}
            >
              delete
            </button>
            <Modal isOpen={this.state.openConfirm}>
              <ModalHeader>
              <div>Warning</div>
              </ModalHeader>
              <ModalBody>
                  <div>
                  Are you sure you want to delete <span className='warning'>{song.name}</span>?
                    
                  </div>
                  <div className='modal-buttons'>
                <button
                  className="Button"
                  onClick={() => this.setState({ openConfirm: false })}
                >
                  cancel
                </button>
                <button
                  className="Button"
                  value={song.id}
                  onClick={(e) => {
                    this.deleteSong(e)
                  }}
                >
                  confirm
                </button>
                </div>
              </ModalBody>
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
        <div>{this.displaySongDetails()}</div>
      </div>
    );
  }
}

export default compose(
  graphql(getSong, {
    options: (props) => {
      return {
        variables: {
          id: props.songId,
        },
      };
    },
  }),
  graphql(DeleteSongMutation, { name: 'DeleteSongMutation' })
)(SongDetails);
