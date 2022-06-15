import React from 'react';
import { Grid } from '@mui/material';
import AddAuthor from './AddAuthor';
import AddBook from './AddBook';
import BookList from "./BookList";

function ReadingList() {

  // React.useEffect(() => {
  //   fetch('https://api.quotable.io/quotes')
  //     .then(results => results.json())
  //     .then(data => console.log(data))
  //     }, []);

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