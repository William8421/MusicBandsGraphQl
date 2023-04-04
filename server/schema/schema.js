const graphql = require('graphql');
const Song = require('../models/songs.js');
const Singer = require('../models/singers.js');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError,
} = graphql;

const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    minutes: { type: GraphQLString },
    seconds: { type: GraphQLString },
    releaseDate: { type: GraphQLString },
    singer: {
      type: SingerType,
      resolve: (parent, args) => {
        return Singer.findById(parent.singerId);
      },
    },
  }),
});
const SingerType = new GraphQLObjectType({
  name: 'Singer',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nationality: { type: GraphQLString },
    photo: { type: GraphQLString },
    songs: {
      type: new GraphQLList(SongType),
      resolve: (parent, args) => {
        return Song.find({ singerId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    song: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      singerId: { type: GraphQLID },
      resolve(parent, args) {
        return Song.findById(args.id);
      },
    },
    singer: {
      type: SingerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Singer.findById(args.id);
      },
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve: () => {
        return Song.find({});
      },
    },
    singers: {
      type: new GraphQLList(SingerType),
      resolve: () => {
        return Singer.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        minutes: { type: GraphQLString },
        seconds: { type: GraphQLString },
        releaseDate: { type: GraphQLString },
        singerId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        let song = new Song({
          name: args.name,
          genre: args.genre,
          minutes: args.minutes,
          seconds: args.seconds,
          releaseDate: args.releaseDate,
          singerId: args.singerId,
        });
        return song.save();
      },
    },
    addSinger: {
      type: SingerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        nationality: { type: GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        let allSingers = await Singer.find({});
        let singersNames = allSingers.map((item) => item.name);
        let singer = new Singer({
          name: args.name,
          nationality: args.nationality,
          photo: args.photo,
        });
        if (singersNames.includes(args.name)) {
          throw Error('Singer already exists');
        } else {
          return singer.save();
        }
      },
    },
    deleteSinger: {
      type: SingerType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        let deletedSinger = await Singer.findByIdAndDelete(args.id);
        let songs = await Song.find({});
        let singerSongs = songs.filter((item) => item.singerId === args.id);
        let matchedIDS = singerSongs.map((item) => item.id);
        let deletedSongs = await Song.deleteMany({ _id: matchedIDS });

        return {
          deletedSinger,
          deletedSongs,
        };
      },
    },
    deleteSong: {
      type: SongType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        let deletedSong = await Song.findByIdAndDelete(args.id);
        return deletedSong;
      },
    },
    updateSinger: {
      type: SingerType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        nationality: { type: GraphQLString },
        photo: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let updateSinger = await Singer.findByIdAndUpdate(args.id, {
          name: args.name,
          nationality: args.nationality,
          photo: args.photo,
        });
        return updateSinger;
      },
    },
    updateSong: {
      type: SongType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        minutes: { type: GraphQLString },
        seconds: { type: GraphQLString },
        releaseDate: { type: GraphQLString },
        singerId: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let updateSong = await Singer.findByIdAndUpdate(args.id, {
          name: args.name,
          minutes: args.minutes,
          seconds: args.seconds,
          releaseDate: args.releaseDate,
          singerId: args.singerId,
        });
        return updateSong;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
