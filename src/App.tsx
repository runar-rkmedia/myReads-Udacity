import * as React from 'react'
import ListShelves from './Components/ListShelves'
import { Route, Link } from 'react-router-dom'
import './style/App.css'

class BooksApp extends React.Component {

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
              <ListShelves/>
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
