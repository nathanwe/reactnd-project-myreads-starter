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
    /*
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
    */
    ///*
    BooksAPI.update(bookToMoveOrAdd, shelfToMoveTo).then(() => {
      bookToMoveOrAdd.shelf = shelfToMoveTo;
      this.setState(prevState => ({
        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        shelfBooks: prevState.shelfBooks.filter(book => book.id !== bookToMoveOrAdd.id).concat(bookToMoveOrAdd)
      }))
  });
  //*/
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
