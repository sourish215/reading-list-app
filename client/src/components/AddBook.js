import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AUTHORS, ADD_BOOK, BOOKS } from '../queries/queries';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'

function AddBook() {
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { data, loading, error } = useQuery(AUTHORS);

  const [addBook] = useMutation(ADD_BOOK);

  
  if (loading) return <div>Loading books...</div>;
  if (error) return (<pre>{error.message}</pre>);

  // console.log('data', data.authors)

  const sumbitForm = (e) => {
    // console.log(bookName)
    // console.log(genre)
    // console.log(authorId)
    e.preventDefault();
    addBook({
      variables: {
        name: bookName,
        genre: genre,
        authorid: authorId
      },
      refetchQueries: [{ query: BOOKS }]
    });
    document.getElementById("add-book").reset();
  }

  
  
  return (
    <div>
      <form id='add-book' onSubmit={sumbitForm}>
        <Grid container spacing={2} direction='column'>
          <Grid item xs className='field'>
            <TextField size='small' label='Book Name' type='text' onChange={e => setBookName(e.target.value)} />
          </Grid>

          <Grid item xs className='field'>
            <TextField size='small' label='Genre' type='text' onChange={e => setGenre(e.target.value)} />
          </Grid>

          <Grid item xs className='field'>
            <Select
              defaultValue={0}
              size='small'
              displayEmpty
              sx={{ minWidth: 210 }}
              // renderValue={(selected) => {
              //   if (selected.length === 0) {
              //     return <em>Placeholder</em>;
              //   }
    
              //   return selected.join(', ');
              // }}
              onChange={e => setAuthorId(e.target.value)}>
                <MenuItem sx={{ display: 'none' }} disabled value={0}>
                  Author
                </MenuItem>
              {data.authors.map((author, index) => {
                return <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
                })}
            </Select>
          </Grid>

          <Grid item xs>
            <Button type='submit' size='small' variant='contained'>Add Book</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddBook