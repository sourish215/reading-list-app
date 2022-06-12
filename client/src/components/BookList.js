import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';
import { Grid, List, ListItem, Divider } from '@mui/material';

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
      <Grid container spacing={2} direction='column'>
        <Grid item xs>
          <List id='book-list' sx={{ width: "80%" }}>
            {data.books.map((book, index) => {
              return <ListItem divider key={book.id} onClick={e => setSelectedId(book.id)}>{book.name}</ListItem>
              })}
          </List>
        </Grid>
        <Grid item xs>
          <BookDetails bookId={selectedId} />
        </Grid>
      </Grid>
    </div>
  )
}