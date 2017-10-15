import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import { Route, BrowserRouter } from 'react-router-dom'
import MainPage from './MainPage'

import './App.css'

class BooksApp extends React.Component {
  state = {
    shelfBooks: []
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
    BooksAPI.update(bookToMoveOrAdd, shelfToMoveTo);
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({shelfBooks: allBooks})
    })

  }
  render() {
    return (
      <BrowserRouter>
        <div className="app">
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
