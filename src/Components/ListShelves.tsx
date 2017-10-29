import * as React from 'react'
import Shelf from './Shelf'
import { BookInterface } from './Book'

export interface BookShelf {
  shelf: 'none' | 'wantToRead' | 'currentlyReading' | 'read' | undefined
  shelfText: string
  showAsShelf: boolean
}

export var bookShelves: BookShelf[] = [
  {
    shelf: 'none',
    shelfText: 'Not in any list (Remove)',
    showAsShelf: false
  },
  {
    shelf: 'wantToRead',
    shelfText: 'Want to read',
    showAsShelf: true
  },
  {
    shelf: 'currentlyReading',
    shelfText: 'Currently Reading',
    showAsShelf: true
  },
  {
    shelf: 'read',
    shelfText: 'Previously read',
    showAsShelf: true
  }
]
let ListShelves = (props: {
  books: BookInterface[]
  loadingBooks: boolean
  onMoveBook: (book: BookInterface, event: React.ChangeEvent<HTMLSelectElement>) => void
}) => (
    <div className="list-books-content">
      <ShelvesStatusText
        numberOfResults={props.books.length}
        loadingBooks={props.loadingBooks}
      />
      {bookShelves.filter(shelf => shelf.showAsShelf).map(shelf => (
        <Shelf
          key={shelf.shelf}
          books={props.books.filter(
            book => book.shelf === shelf.shelf)}
          shelfName={shelf.shelfText}
          onMoveBook={props.onMoveBook}
        />
      ))}
    </div>
  )

let ShelvesStatusText = (props: {
  numberOfResults: number
  loadingBooks: boolean
}) => {
  let { numberOfResults, loadingBooks } = props
  let text
  if (loadingBooks) {
    text = 'Gathering your books'
  } else if (numberOfResults === 0) {
    text = `No books to see here.
            Maybe you should add a few.
            I promise, it won't actually hurt your brain.`
  }
  return (
    <div className="center">
      {loadingBooks && (
        <div className="loader" />
      )}
      {text}
    </div>
  )
}

export default ListShelves
