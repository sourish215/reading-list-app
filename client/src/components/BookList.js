import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { BOOKS, DELETE_BOOK } from '../queries/queries';
import BookDetails from './BookDetails';
import { Grid, List, ListItem, ListItemIcon, IconButton } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';
import SnackbarComponent from './SnackbarComponent';

export default function BookList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(5);
  const [openDetails, setOpenDetails] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [removed, setRemoved] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { data, loading, error } = useQuery(BOOKS);
  const [removeBook] = useMutation(DELETE_BOOK);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  
  // console.log('data', data?.books)
  if (loading) {
    return <div>Loading books...</div>
  }
  if (error) {
    return <pre>{error.message}</pre>
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.books.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const currentBooks = data.books.slice(indexOfFirstBook, indexOfLastBook);

  // console.log('first', indexOfFirstBook)
  // console.log('last', indexOfLastBook)
  // console.log(currentBooks)

  const renderBooks = currentBooks.map((book, index) => {
    return <div style={{ display: 'flex', flexDirection: 'row' }}>
    <ListItem
      // divider
      key={book.id}
      onClick={() => {
        setSelectedId(book.id);
        setOpenDetails(true);
        setRemoved(false);
        }}>
        <ListItemIcon><ArrowRightIcon /></ListItemIcon>
        {book.name}
      </ListItem>
      <IconButton
        aria-label="delete"
        onClick={() => handleRemove(book.id)}
        style={{ cursor: 'pointer' }}
      >
            <BookmarkRemoveOutlinedIcon fontSize='small' />
        </IconButton>
      </div>
    })

  const handlePageNumber =(event, newValue) => {
    // console.log(newValue)
    // setCurrentPage(newValue);
    setCurrentPage(Number(event.target.id))
  }


  const renderPageNumbers = pageNumbers.map((number,index) => {
    return (
      <ListItem id={number} onClick={handlePageNumber} style={{ cursor: 'pointer', justifyContent: 'center' }}>{number}</ListItem>
      // <ToggleButton value={number}>{number}</ToggleButton>
    )
  })


  const handleRemove = (id) => {
    // console.log('clicked')
    // console.log(id);
    removeBook({
      variables: {
        id: id
      },
      refetchQueries: [{ query: BOOKS }]
    });
    setOpen(true);
    setMessage("Book removed!");
    setSeverity("warning");
    setRemoved(true);
  }

  // data?.books?.map(book => {
  //   console.log('book', book.name)
  // })
  
  return (
    <div>
      <Grid
        container
        spacing={2}
        direction='row'
        // sx={{ alignContent: 'center' }}
      >
        <Grid item xs container direction='column'>
          <Grid item xs 
            sx={{ backgroundColor: '#7ec3b0', borderRadius: '5px' }}
          >
            <List id='book-list' sx={{ width: "80%" }}>
              {renderBooks}
            </List>
          </Grid>
          <Grid item>
            <List style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>{renderPageNumbers}</List>
            {/* <ToggleButtonGroup exclusive value={currentPage} onChange={handlePageNumber}>{renderPageNumbers}</ToggleButtonGroup> */}
          </Grid>
        </Grid>
        <Grid item xs>
          <BookDetails bookId={selectedId} openDetails={openDetails} setOpenDetails={setOpenDetails} removed={removed} />
        </Grid>
      </Grid>
      <SnackbarComponent open={open} setOpen={setOpen} message={message} severity={severity} />
    </div>
  )
}