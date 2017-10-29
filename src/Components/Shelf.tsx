import * as React from 'react'
import Book, { BookInterface } from './Book'

export interface BookShelf {
  shelf: 'none' | 'wantToRead' | 'currentlyReading' | 'read' | undefined
  shelfText: string
}

let Shelf = (props: {
  books: BookInterface[]
  shelfName: string
  onMoveBook: (book: BookInterface, event: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
  if (props.books.length === 0) {
    return null
  }
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(
            (book: BookInterface) => (
              <li key={book.id}>
                <Book book={book} onMoveBook={props.onMoveBook}/>
              </li>
            ))}
        </ol>
      </div>
    </div>)
}

export default Shelf
