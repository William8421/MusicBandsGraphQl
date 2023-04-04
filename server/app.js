const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const app = express();
const PORT = process.env.PORT || 8002;

app.use(cors());

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
