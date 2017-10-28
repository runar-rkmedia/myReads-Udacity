import * as React from 'react'
import { Link } from 'react-router-dom'
import { BookInterface } from './Book'
import Shelf from './Shelf'

class Search extends React.Component<{
  books: BookInterface[]
  searchingBooks: boolean
  query: string
  lastQuery: string | null
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  onMoveBook: (book: BookInterface, event: React.ChangeEvent<HTMLSelectElement>) => void
}> {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.props.query}
              onChange={this.props.onSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.props.searchingBooks ? (
            <div className="center">
              <div className="loader" />
              Search in progress...
                    </div>
          ) :
            this.props.query &&
              this.props.query === this.props.lastQuery &&
              this.props.books.length === 0 ? (
                <p className="center">No result to show. You might want to search for something else.</p>
              ) : !this.props.query && (
                <p className="center">Write your searchquery above.</p>
              )
          }
          {!this.props.searchingBooks && (
            <ol className="books-grid" >
              <Shelf
                books={this.props.books}
                shelfName={`Search result for '${this.props.lastQuery}' (${this.props.books.length})`}
                onMoveBook={this.props.onMoveBook}
              />
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default Search
