import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookComponent from './BookComponent'
import BookShelf from './BookShelf'
import BookGrid from './BookGrid'
import SearchPage from './SearchPage'
import { Route, BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
      <BrowserRouter>
        <div className="app">
          {console.log("in app")}

          <Route path='/search' render={() => (
            <div>
              <SearchPage
                moveOrAddToShelf={this.moveOrAddToShelf}
                searchBooks={this.state.searchBooks}
                shelfBooks={this.state.shelfBooks}/>
            </div>
            )}/>
           <Route exact path='/' render={() => (
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
                  <Link to='/search'>Add a book</Link>
                </div>
              </div>
              )}/>

        </div>
      </BrowserRouter>
    )}


}

export default BooksApp
