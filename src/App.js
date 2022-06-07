
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client'
import AddBook from './components/AddBook';
import BookList from "./components/BookList";

const client = new ApolloClient({
  uri: `${process.env.PORT}/graphql`,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
