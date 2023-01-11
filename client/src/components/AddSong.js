import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
import { AddSongMutation, getSingers, getSongs } from '../queries/queries';

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      // duration: '',
      minutes: '',
      seconds: '',
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
        // duration: this.state.duration,
        singerId: this.state.singerId,
      },
      refetchQueries: [{ query: getSongs }],
    });
    e.target.reset();
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <div>
          <label>Song Name</label>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div>
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
            step={5}
            onChange={(e) => this.setState({ seconds: e.target.value })}
          />
        </div>
        <div>
          <label>Singer</label>
          <select onChange={(e) => this.setState({ singerId: e.target.value })}>
            <option> Select Singer</option>
            {this.displaySinger()}
          </select>
        </div>
        <button>Add Song</button>
      </form>
    );
  }
}

export default compose(
  graphql(getSingers, { name: 'getSingers' }),
  graphql(AddSongMutation, { name: 'AddSongMutation' })
)(AddSong);
