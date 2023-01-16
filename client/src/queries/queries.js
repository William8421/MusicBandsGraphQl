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
    $singerId: ID!
  ) {
    addSong(
      name: $name
      minutes: $minutes
      seconds: $seconds
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

const getSong = gql`
  query ($id: ID) {
    song(id: $id) {
      id
      name
      minutes
      seconds
      singer {
        id
        name
        nationality
        photo
        songs {
          name
          minutes
          seconds
          id
        }
      }
    }
  }
`;

export { getSongs, getSingers, AddSongMutation, getSong, AddSingerMutation };
