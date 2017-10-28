import * as React from 'react'
import { Route, Link } from 'react-router-dom'
import { debounce } from 'lodash'
import Shelf from './Components/Shelf'
import ListShelves from './Components/ListShelves'
import * as BooksAPI from './ext/BooksAPI'
import { BookInterface } from './Components/Book'
import './style/App.css'

class BooksApp extends React.Component {
  state: {
    loadingBooks: boolean
    searchingBooks: boolean
    books: BookInterface[]
    bookSearchResult: BookInterface[]
    query: string
    lastQuery: string | null
  } = {
    loadingBooks: false,
    searchingBooks: false,
    books: [],
    bookSearchResult: [],
    query: '',
    lastQuery: null
  }
  constructor() {
    super()
    this.retrieveBookSearchResults = debounce(this.retrieveBookSearchResults, 500)
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
    book.shelf = event.target.value
    let thisBook = books.find(b => b.id === book.id)
    if (!thisBook) {
      books.push(book)
    }
    this.setState({ books: books })
    BooksAPI.update(book, event.target.value)
  }

  searchBooks = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value })
    // Note: this is debounced, see constructor
    this.retrieveBookSearchResults(event.target.value)
  }

  retrieveBookSearchResults(query: string) {
    if ( !query || query === this.state.lastQuery) {
      return
    }
    this.setState({ searchingBooks: true })
    BooksAPI.search(query).then((result: BookInterface[] & { error?: string }) => {
      this.setState({
        bookSearchResult: result && !result.error ? result : [],
        searchingBooks: false,
        lastQuery: query
      })
    })
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
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={this.searchBooks}
                  />
                </div>
              </div>
              <div className="search-books-results">
                {this.state.searchingBooks ? (
                  <div className="center">
                    <div className="loader" />
                    Search in progress...
                    </div>
                ) :
                  this.state.query &&
                  this.state.query === this.state.lastQuery &&
                  this.state.bookSearchResult.length === 0 ? (
                    <p className="center">No result to show. You might want to search for something else.</p>
                  ) : !this.state.query && (
                    <p className="center">Write your searchquery above.</p>
                  )
                }
                {!this.state.searchingBooks && (
                  <ol className="books-grid" >
                    <Shelf
                      books={this.state.bookSearchResult}
                      shelfName={`Search result for '${this.state.lastQuery}' (${this.state.bookSearchResult.length})`}
                      onMoveBook={this.moveBook}
                    />
                  </ol>
                )}
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
              <ListShelves
                books={this.state.books}
                loadingBooks={this.state.loadingBooks}
                onMoveBook={this.moveBook}
              />
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
