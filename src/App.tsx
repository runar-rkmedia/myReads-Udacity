import * as React from 'react'
import { Route, Link } from 'react-router-dom'
import { debounce } from 'lodash'
import Search from './Components/Search'
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
            <Search
              books={this.state.bookSearchResult}
              searchingBooks={this.state.searchingBooks}
              query={this.state.query}
              lastQuery={this.state.lastQuery}
              onSearch={this.searchBooks}
              onMoveBook={this.moveBook}
            />
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
