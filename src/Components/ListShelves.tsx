import * as React from 'react'
import Shelf from './Shelf'
import { BookInterface } from './Book'
import * as BooksAPI from '../ext/BooksAPI'

export interface BookShelf {
  shelf: 'none' | 'wantToRead' | 'currentlyReading' | 'read' | undefined
  shelfText: string
}

export var bookShelves: BookShelf[] = [
  {
    shelf: 'none',
    shelfText: 'Not in any list'
  },
  {
    shelf: 'wantToRead',
    shelfText: 'Want to read'
  },
  {
    shelf: 'currentlyReading',
    shelfText: 'Currently Reading'
  },
  {
    shelf: 'read',
    shelfText: 'Previously read'
  }
]
class ListShelves extends React.Component {
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
    )
  }
}
export default ListShelves
