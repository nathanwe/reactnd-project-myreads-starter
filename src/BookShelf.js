import React, { Component } from 'react';
import BookComponent from './BookComponent'

class BookShelf extends Component {

  render() {
    let bookList = this.props.bookList || []
    return(
    <div className="bookshelf-books">
      <ol className="books-grid">
        {bookList.map((book) => (
          <li key={book.id}>
          <BookComponent book={book}/>
          </li>
        ))}
      </ol>
    </div>
  )
  }
}

export default BookShelf
