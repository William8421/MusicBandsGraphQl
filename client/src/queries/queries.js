import { gql } from '@apollo/client';

const getSongs = gql`
  {
    songs {
      name
      id
    }
  }
`;
const getSingers = gql`
  {
    singers {
      name
      photo
      id
    }
  }
`;

const AddSongMutation = gql`
  mutation AddSong(
    $name: String!
    $minutes: String!
    $seconds: String!
    $releaseDate: String!
    $singerId: ID!
  ) {
    addSong(
      name: $name
      minutes: $minutes
      seconds: $seconds
      releaseDate: $releaseDate
      singerId: $singerId
    ) {
      name
      id
    }
  }
`;

const AddSingerMutation = gql`
  mutation AddSinger($name: String!, $nationality: String!, $photo: String!) {
    addSinger(name: $name, nationality: $nationality, photo: $photo) {
      name
      photo
      id
    }
  }
`;
const DeleteSingerMutation = gql`
  mutation DeleteSinger($id: ID!) {
    deleteSinger(id: $id) {
      id
    }
  }
`;
const DeleteSongMutation = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const getSong = gql`
  query ($id: ID) {
    song(id: $id) {
      id
      name
      minutes
      seconds
      releaseDate
      singer {
        id
        name
        nationality
        photo
        songs {
          name
          minutes
          seconds
          releaseDate
          id
        }
      }
    }
  }
`;
const getSinger = gql`
  query ($id: ID) {
    singer(id: $id) {
      id
      name
      nationality
      photo
      songs {
        name
        minutes
        seconds
        releaseDate
        id
      }
    }
  }
`;

export {
  getSongs,
  getSingers,
  AddSongMutation,
  getSong,
  getSinger,
  AddSingerMutation,
  DeleteSingerMutation,
  DeleteSongMutation,
};
