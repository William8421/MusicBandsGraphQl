const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const app = express();

app.use(cors());

mongoose.connect(
  'mongodb+srv://william:myPlayList@cluster0.d6vksrd.mongodb.net/my-play-list'
);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.listen(8000, () => {
  console.log('server is listening to port 8000');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
