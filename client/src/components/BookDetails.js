import React from 'react';
import { useQuery } from '@apollo/client';
import { BOOK } from '../queries/queries';
import { Button, Typography } from '@mui/material';

function BookDetails({ bookId, openDetails, setOpenDetails }) {
  //console.log('id',props.bookId)
  const { data, loading, error } = useQuery(BOOK, {
        variables: {
          id: bookId
        }
      });

  if (loading) return <div>Loading details...</div>;
  if (error) return <pre>{error.message}</pre>

  //console.log('data', data.book)

  

  function getBookDetails() {
    const { book } = data;
    // console.log('data in details', data)
    // console.log('book', book)
    if(book && openDetails) {
      return(
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by {book.author.name}:</p>
          <ul className='other-books'>
            {book.author.books.map(book => {
              return <li key={book.id}>{book.name}</li>
            })}
          </ul>
          <Button size='small' onClick={() => setOpenDetails(false)}>Close</Button>
        </div>)
    } else {
      return <Typography>Click on a book to see the details.</Typography>
    }
  }

  return (
    <div>
      <span>{getBookDetails()}</span>
    </div>
  )
}

export default BookDetails