import React, { Component } from 'react';

class BookComponent extends Component {

  render() {
    let book = this.props.book || {title: "this book hasn't loaded", authors: ["I. P. Freely"], shelf: "wantToRead",
      imageLinks: {thumbnail: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"}}
    console.log(book);
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option onClick={() => this.props.moveOrAddToShelf(book,"currentlyReading")} selected={book.shelf === "currentlyReading"} value="currentlyReading">Currently Reading</option>
              <option onClick={() => this.props.moveOrAddToShelf(book,"wantToRead")} selected={book.shelf === "wantToRead"} value="wantToRead">Want to Read</option>
              <option onClick={() => this.props.moveOrAddToShelf(book,"read")} selected={book.shelf === "read"} value="read">Read</option>
              <option onClick={() => this.props.moveOrAddToShelf(book,"none")} selected={book.shelf === "none"} value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title"> {book.title}</div>
        <div className="book-authors">{book.authors[0] + (book.authors.length>1 ? " et. al." : "")}</div>
      </div>

    )
  }
}

export default BookComponent
