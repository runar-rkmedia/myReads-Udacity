import * as React from 'react'
import Book, { BookInterface } from './Book'

export interface BookShelf {
  shelf: 'none'|'wantToRead'|'currentlyReading'|'read'|undefined
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

class Shelf extends React.Component<{
  books: BookInterface[]
  shelfName: string
  onMoveBook: (book: BookInterface, event: React.ChangeEvent<HTMLSelectElement>) => void
}> {
  render() {
    if (this.props.books.length === 0) {
      return null
    }
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(
              (book: BookInterface) => {
                return (<li key={book.id}>
                  <Book
                    book={book}
                    onMoveBook={this.props.onMoveBook}
                  />
                </li>)
              })}
          </ol>
        </div>
      </div>)
  }
}

export default Shelf
