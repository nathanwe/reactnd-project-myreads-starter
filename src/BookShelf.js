import React, { Component } from 'react';
import BookGrid from './BookGrid'

const BookShelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelfName}</h2>
    <div className="bookshelf-books">
      <BookGrid
        bookList={props.bookList || []}
        moveOrAddToShelf={props.moveOrAddToShelf}
      />
    </div>
  </div>
)

export default BookShelf
