import * as React from 'react'
import { BookInterface } from './Components/Book'
import Shelf, { bookShelves } from './Components/Shelf'
import * as BooksAPI from './ext/BooksAPI'
import { Route, Link } from 'react-router-dom'
import './style/App.css'

class BooksApp extends React.Component {
  state: {
    loadingBooks: boolean
    books: BookInterface[]
  } = {
    loadingBooks: false,
    books: [],
  }
  componentDidMount() {
    this.setState({ loadingBooks: true })
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
      this.setState({ loadingBooks: false })
    })
  }
  moveBook = (book: BookInterface, event: React.ChangeEvent<HTMLSelectElement>) => {
    let books = this.state.books.slice()
    let thisBook = books.find(b => b.id === book.id)
    if (!thisBook) {
      return
    }
    thisBook.shelf = event.target.value
    this.setState({ books: books })
    BooksAPI.update(thisBook, event.target.value)
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
            */}
                  <input type="text" placeholder="Search by title or author" />

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid" />
              </div>
            </div>
          )}
        />
        <Route
          exact={true}
          path="/"
          render={() => (
            <div className="list-books">

              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.state.loadingBooks ? (
                  <div className="center">
                    <div className="loader" />
                    Gathering your books...
                              </div>
                ) : this.state.books.length === 0 && (
                  <p className="center">
                    No books to see here.
                              Maybe you should add a few.
                              I promise, it won't actually hurt your brain.</p>
                )}
                {bookShelves.map(shelf => (
                  <Shelf
                    key={shelf.shelf}
                    books={this.state.books.filter(
                      book => book.shelf === shelf.shelf)}
                    shelfName={shelf.shelfText}
                    onMoveBook={this.moveBook}
                  />
                ))}
              </div>
              <div className="open-search">
                <Link to="search">Add book</Link>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
