import React, { Component } from 'react';
import BookComponent from './BookComponent'

class BookGrid extends Component {

  render() {
    let bookList = this.props.bookList || []
    return(

      <ol className="books-grid">
        {bookList.map((book) => (
          <li key={book.id}>
          <BookComponent moveOrAddToShelf={this.props.moveOrAddToShelf} book={book}/>
          </li>
        ))}
      </ol>

  )
  }
}

export default BookGrid
