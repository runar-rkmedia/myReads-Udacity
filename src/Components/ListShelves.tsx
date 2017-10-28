import * as React from 'react'
import Shelf from './Shelf'
import { BookInterface } from './Book'

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
class ListShelves extends React.Component<{
  books: BookInterface[]
  loadingBooks: boolean
  onMoveBook: (book: BookInterface, event: React.ChangeEvent<HTMLSelectElement>) => void
}> {
  render() {
    return (
      <div className="list-books-content">
        {this.props.loadingBooks ? (
          <div className="center">
            <div className="loader" />
            Gathering your books...
                      </div>
        ) : this.props.books.length === 0 && (
          <p className="center">
            No books to see here.
            Maybe you should add a few.
            I promise, it won't actually hurt your brain.</p>
        )}
        {bookShelves.map(shelf => (
          <Shelf
            key={shelf.shelf}
            books={this.props.books.filter(
              book => book.shelf === shelf.shelf)}
            shelfName={shelf.shelfText}
            onMoveBook={this.props.onMoveBook}
          />
        ))}
      </div>
    )
  }
}
export default ListShelves
