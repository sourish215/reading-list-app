import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AUTHORS, ADD_BOOK, BOOKS } from '../queries/queries';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import SnackbarComponent from './SnackbarComponent';

function AddBook() {
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const { data, loading, error } = useQuery(AUTHORS);
  const books = useQuery(BOOKS);
  
  const [addBook] = useMutation(ADD_BOOK);

  
  if (loading || books.loading) return <div>Loading books...</div>;
  if (error || books.error) return (<pre>{error.message}</pre>);

  // console.log('data', data.authors)
  let booksArr = books.data.books;
  // console.log('books', booksArr)

  const sumbitForm = (e) => {
    // console.log(bookName)
    // console.log(genre)
    // console.log(authorId)
    e.preventDefault();
    let found = booksArr.find( book => book.name === bookName );
    if(!found) {
      addBook({
        variables: {
          name: bookName,
          genre: genre,
          authorid: authorId
        },
        refetchQueries: [{ query: BOOKS }]
      });
      setOpen(true);
      setMessage("Book added to list!");
      setSeverity("success");
    } else {
      setOpen(true);
      setMessage("Book already added!");
      setSeverity("error");
    }
    document.getElementById("add-book").reset();
  }

  return (
    <div>
      <form id='add-book' onSubmit={sumbitForm}>
        <Grid container spacing={2} direction='column'>
          <Grid item xs className='field'>
            <TextField required variant='filled' size='small' label='Book Name' type='text' onChange={e => setBookName(e.target.value)} />
          </Grid>

          <Grid item xs className='field'>
            <TextField required variant='filled' size='small' label='Genre' type='text' onChange={e => setGenre(e.target.value)} />
          </Grid>

          <Grid item xs className='field'>
            <FormControl>
              <InputLabel>Author</InputLabel>
              <Select
                variant='filled'
                size='small'
                sx={{ minWidth: 210 }}
                label='Author'
                onChange={e => setAuthorId(e.target.value)}>
                  {/* <MenuItem sx={{ display: 'none' }} disabled value={0}>
                    Author
                  </MenuItem> */}
                {data.authors.map((author, index) => {
                  return <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
                  })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs>
            <Button type='submit' size='small' variant='text'>Add Book</Button>
          </Grid>
        </Grid>
      </form>
      <SnackbarComponent open={open} setOpen={setOpen} message={message} severity={severity} />
    </div>
  )
}

export default AddBook