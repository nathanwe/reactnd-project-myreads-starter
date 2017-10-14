import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookComponent from './BookComponent'
import BookShelf from './BookShelf'
import BookGrid from './BookGrid'

import './App.css'

class BooksApp extends React.Component {
  state = {
    tempBooks: [],
    shelfBooks: [],
    searchBooks: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  getSearchResults = (query) => {
    BooksAPI.search(query,20).then((results) => {
      this.fixSearchResults(results);
      this.setState({searchBooks: results});
    })
  }

  fixSearchResults = (bookList) => {
    bookList.forEach((newBook) => {
      newBook.shelf = "none";
      this.state.shelfBooks.forEach((oldBook) => {
        if (newBook.id === oldBook.id){
          newBook.shelf = oldBook.shelf;
        }
      })
    })
  }

  getShelfBooks(){
    return(this.state.shelfBooks)
  }

  moveOrAddToShelf = (bookToMoveOrAdd, shelfToMoveTo) => {
    let exists=false;
    let newShelf = this.getShelfBooks();
    newShelf.forEach(function(book) {
      if (bookToMoveOrAdd.id === book.id){
        exists = true;
        book.shelf=shelfToMoveTo;
      }
    });
    if(!exists){
      bookToMoveOrAdd.shelf = shelfToMoveTo;
      newShelf = newShelf.concat(bookToMoveOrAdd);
    }
    this.setState({shelfBooks: newShelf});
  }

  componentDidMount() {
    BooksAPI.getAll().then((tempBooks) => {
      this.setState({ tempBooks })
      this.moveOrAddToShelf(this.state.tempBooks[0],"currentlyReading")
      this.moveOrAddToShelf(this.state.tempBooks[1],"currentlyReading")
      this.moveOrAddToShelf(this.state.tempBooks[2],"wantToRead")
      this.moveOrAddToShelf(this.state.tempBooks[3],"wantToRead")
      this.moveOrAddToShelf(this.state.tempBooks[4],"read")
      this.moveOrAddToShelf(this.state.tempBooks[5],"read")
    })

  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text" placeholder="Search by title or author"
                  onChange={(event) => {
                    this.getSearchResults(event.target.value);
                  }}
                />

              </div>
            </div>
            <div className="search-books-results">
              <BookGrid
                bookList={this.state.searchBooks}
                moveOrAddToShelf={this.moveOrAddToShelf}/>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  bookList={this.state.shelfBooks.filter((book) => book.shelf === "currentlyReading")}
                  moveOrAddToShelf={this.moveOrAddToShelf}
                  shelfName="Currently Reading"/>
                <BookShelf
                  bookList={this.state.shelfBooks.filter((book) => book.shelf === "wantToRead")}
                  moveOrAddToShelf={this.moveOrAddToShelf}
                  shelfName="Want To Read"/>
                <BookShelf
                  bookList={this.state.shelfBooks.filter((book) => book.shelf === "read")}
                  moveOrAddToShelf={this.moveOrAddToShelf}
                  shelfName="Read"/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
