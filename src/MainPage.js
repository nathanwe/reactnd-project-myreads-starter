import React, { Component } from 'react';
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'



class MainPage extends Component {
  render() {
    return (
      <div className="list-books">
      {console.log("there books")}
      {console.log(this.props.shelfBooks)}
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              bookList={this.props.shelfBooks.filter((book) => book.shelf === "currentlyReading")}
              moveOrAddToShelf={this.props.moveOrAddToShelf}
              shelfName="Currently Reading"/>
            <BookShelf
              bookList={this.props.shelfBooks.filter((book) => book.shelf === "wantToRead")}
              moveOrAddToShelf={this.props.moveOrAddToShelf}
              shelfName="Want To Read"/>
            <BookShelf
              bookList={this.props.shelfBooks.filter((book) => book.shelf === "read")}
              moveOrAddToShelf={this.props.moveOrAddToShelf}
              shelfName="Read"/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )}
}

export default MainPage
