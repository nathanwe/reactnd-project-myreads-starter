import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookComponent from './BookComponent'
import BookShelf from './BookShelf'
import BookGrid from './BookGrid'
import SearchPage from './SearchPage'
import { Route, BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import MainPage from './MainPage'

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


  moveOrAddToShelf = (bookToMoveOrAdd, shelfToMoveTo) => {
    let exists=false;
    let newShelf = this.state.shelfBooks;
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
            <SearchPage
              moveOrAddToShelf={this.moveOrAddToShelf}
              searchBooks={this.state.searchBooks}
              shelfBooks={this.state.shelfBooks}/>
              )}/>
          <Route exact path='/' render={() => (
            <MainPage
              moveOrAddToShelf={this.moveOrAddToShelf}
              shelfBooks={this.state.shelfBooks}/>
              )}/>
        </div>
      </BrowserRouter>
    )}


}

export default BooksApp
