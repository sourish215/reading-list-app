import { gql } from '@apollo/client'

const BOOKS = gql`
  {
    books{
      name
      id
    }
  }
`

const AUTHORS = gql`
  {
    authors{
      name
      id
    }
  }
`

const ADD_BOOK = gql`
  mutation addBookMutation($name: String!, $genre: String!, $authorid: ID!){
    addBook(name: $name, genre: $genre, authorid: $authorid){
      name
      id
    }
  }
`
const ADD_AUTHOR =  gql`
  mutation addAuthorMutation($name: String!){
    addAuthor(name: $name){
      name
    }
  }
`


const BOOK = gql`
  query getBookDetail($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        books{
          name
          id
        }
      }
    }
  }
`

export { BOOKS, AUTHORS, ADD_BOOK, ADD_AUTHOR, BOOK };