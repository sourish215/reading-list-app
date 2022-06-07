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

const BOOK = gql`
  query getBookDetail($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

export { BOOKS, AUTHORS, ADD_BOOK, BOOK };