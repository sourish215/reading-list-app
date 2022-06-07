import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

export default function BookList() {
  const [selectedId, setSelectedId] = useState(null);
  const { data, loading, error } = useQuery(BOOKS);
  // console.log('data', data?.books)
  if (loading) return <div>Loading books...</div>;
  if (error) return <pre>{error.message}</pre>

  // data?.books?.map(book => {
  //   console.log('book', book.name)
  // })
  
  return (
    <div>
      <ul id='book-list'>
        {data.books.map((book, index) => {
          return <li key={book.id} onClick={e => setSelectedId(book.id)}>{book.name}</li>
          })}
      </ul>
      <BookDetails bookId={selectedId} />
    </div>
  )
}