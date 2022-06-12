import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AUTHORS, ADD_BOOK, BOOKS, ADD_AUTHOR } from '../queries/queries';
import { TextField, Grid, FormControl, Button, Typography } from '@mui/material';

function AddAuthor() {
  const [authorName, setAuthorName] = useState("");

  //const { data, loading, error } = useQuery(AUTHORS);

  const [addAuthor] = useMutation(ADD_AUTHOR);

  
  // if (loading) return <div>Loading books...</div>;
  // if (error) return (<pre>{error.message}</pre>);

  // console.log('data', data.authors)

  const sumbitForm = (e) => {
    // console.log(bookName)
    // console.log(genre)
    // console.log(authorId)
    e.preventDefault();
    addAuthor({
      variables: {
        name: authorName,
      },
      refetchQueries: [{ query: AUTHORS }]
    });
    document.getElementById("add-author").reset();
  }

  
  
  return (
    <div>
      <Typography variant='h6'>Add your favourite author</Typography><br />
      <form id='add-author' onSubmit={sumbitForm}>
        <Grid container spacing={2} direction='column'>
          <Grid item xs className='field'>
            <TextField size='small' label='Author Name' type='text' onChange={e => setAuthorName(e.target.value)} />
          </Grid>
          <Grid item xs>
            <Button type='submit' size='small' variant='contained'>Add author</Button>
          </Grid>
        </Grid>

      </form>
    </div>
  )
}

export default AddAuthor