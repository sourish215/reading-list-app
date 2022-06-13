
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import { Typography } from '@mui/material';
import ReadingList from './components/ReadingList';

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
        <ReadingList />
      </div>
    </ApolloProvider>
  );
}

export default App;
