const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000

console.log(PORT)

mongoose.connect('mongodb+srv://sourishb:%40sgqlB97%21@cluster0.2p6dqsc.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

if(process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log('listening on port 4000');
})