
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client'
import AddAuthor from './components/AddAuthor';
import AddBook from './components/AddBook';
import BookList from "./components/BookList";
import { Grid, Typography } from '@mui/material';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <Typography variant='h4' align='center'>Reading List</Typography>
        <br />
        <Grid container direction='row' spacing={2}>
          <Grid item container direction='column' spacing={4} xs>
            <Grid item><AddBook /></Grid>
            <Grid item><AddAuthor /></Grid>
          </Grid>
          <Grid item xs>
            <BookList />
          </Grid>
        </Grid>
      </div>
    </ApolloProvider>
  );
}

export default App;
