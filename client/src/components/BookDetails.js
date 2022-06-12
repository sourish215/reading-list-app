import React from 'react';
import { useQuery } from '@apollo/client';
import { BOOK } from '../queries/queries';

function BookDetails(props) {
  //console.log('id',props.bookId)
  const { data, loading, error } = useQuery(BOOK, {
        variables: {
          id: props.bookId
        }
      });

  if (loading) return <div>Loading details...</div>;
  if (error) return <pre>{error.message}</pre>

  //console.log('data', data.book)

  

  function getBookDetails() {
    const { book } = data;
    // console.log('data in details', data)
    // console.log('book', book)
    if(book) {
      return(
        <>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className='other-books'>
            {book.author.books.map(book => {
              return <li key={book.id}>{book.name}</li>
            })}
          </ul>
        </>)
    } else {
      return <div>No book selected...</div>
    }
  }

  return (
    <div>
      <span>Book details: {getBookDetails()}</span>
    </div>
  )
}

export default BookDetails