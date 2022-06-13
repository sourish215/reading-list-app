import React from 'react';
import { Grid } from '@mui/material';
import AddAuthor from './AddAuthor';
import AddBook from './AddBook';
import BookList from "./BookList";

function ReadingList() {
  return (
    <div>
      <Grid container direction='row' spacing={2}>
          <Grid item container direction='column' spacing={4} xs={4} sx={{ alignContent: 'center' }}>
            <Grid item><AddBook /></Grid>
            <Grid item><AddAuthor /></Grid>
          </Grid>
          <Grid item xs>
            <BookList />
          </Grid>
        </Grid>
    </div>
  )
}

export default ReadingList