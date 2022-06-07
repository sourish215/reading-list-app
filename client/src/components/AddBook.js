import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AUTHORS, ADD_BOOK, BOOKS } from '../queries/queries';

function AddBook() {
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { data, loading, error } = useQuery(AUTHORS);

  const [add] = useMutation(ADD_BOOK);

  
  if (loading) return <div>Loading books...</div>;
  if (error) return (<pre>{error.message}</pre>);

  // console.log('data', data.authors)

  const sumbitForm = (e) => {
    // console.log(bookName)
    // console.log(genre)
    // console.log(authorId)
    e.preventDefault();
    add({
      variables: {
        name: bookName,
        genre: genre,
        authorid: authorId
      },
      refetchQueries: [{ query: BOOKS }]
    });
  }

  
  
  return (
    <form id='add-book' onSubmit={sumbitForm}>
      <div className='field'>
        <label>Book Name:</label>
        <input type='text' onChange={e => setBookName(e.target.value)} />
      </div>

      <div className='field'>
        <label>Genre:</label>
        <input type='text' onChange={e => setGenre(e.target.value)} />
      </div>

      <div className='field'>
        <label>Author:</label>
        <select onChange={e => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {data.authors.map((author, index) => {
            return <option key={author.id} value={author.id}>{author.name}</option>
            })}
        </select>
      </div>

      <button>+</button>

    </form>
  )
}

export default AddBook