import React, { Component } from 'react';
import BookGrid from './BookGrid'

class BookShelf extends Component {

  render() {
    let bookList = this.props.bookList || []
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <BookGrid
            bookList={bookList}
            moveOrAddToShelf={this.props.moveOrAddToShelf}
          />
        </div>
      </div>
      )
  }
}

export default BookShelf
