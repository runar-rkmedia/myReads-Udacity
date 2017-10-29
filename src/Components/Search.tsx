import * as React from 'react'
import { Link } from 'react-router-dom'
import { BookInterface } from './Book'
import Shelf from './Shelf'

let Search = (props: {
  books: BookInterface[]
  searchingBooks: boolean
  query: string
  lastQuery: string | null
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  onMoveBook: (book: BookInterface, event: React.ChangeEvent<HTMLSelectElement>) => void
}) => (
    <div className="search-books">
      <SearchBooksBar
        query={props.query}
        onSearch={props.onSearch}
      />
      <div className="search-books-results">
        <SearchStatusText
          numberOfResults={props.books.length}
          searchInProgress={props.searchingBooks}
          query={props.query}
          lastQuery={props.lastQuery}
        />
        {!props.searchingBooks && (
          <ol className="books-grid" >
            <Shelf
              books={props.books}
              shelfName={`Search result for '${props.lastQuery}' (${props.books.length})`}
              onMoveBook={props.onMoveBook}
            />
          </ol>
        )}
      </div>
    </div>
  )

let SearchBooksBar = (props: {
  query: string
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => (
    <div className="search-books-bar">
      <Link to="/" className="close-search">Close</Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={props.query}
          onChange={props.onSearch}
        />
      </div>
    </div>
  )

let SearchStatusText = (props: {
  numberOfResults: number
  query: string
  lastQuery: string|null
  searchInProgress: boolean
}) => {
  let {query, lastQuery, numberOfResults, searchInProgress} = props
  let text
  if (searchInProgress) {
    text = 'Search In progress'
  } else if (query === lastQuery && numberOfResults === 0) {
    text = 'No result to show. You might want to search for something else.'
  } else if (!query) {
    text = 'Write your searchquery above.'
  }
  return (
    <div className="center">
      {searchInProgress && (
        <div className="loader"/>
      )}
      {text}
    </div>
  )
}

export default Search
