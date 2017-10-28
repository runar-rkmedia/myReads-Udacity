import * as React from 'react'
import { bookShelves } from './Shelf'

export interface BookInterface {
  shelf: string
  title: string
  authors: string[]
  averageRating?: number
  description?: string
  imageLinks: {
    smallThumbnail: string
    thumbnail: string
  }
  industryIdentifiers?: {
    type: string
    identifier: string
  }[]
  infoLink?: string
  language?: string
  maturityRatting?: string
  pageCount?: number
  panelizationSummary?: {
    containsEpubBubbles: boolean
    containsImageBubbles: boolean
  }
  previewLink?: string
  printType?: string
  publishedDate?: number
  ratingsCount?: number
  subtitle?: string
}

class Book extends React.Component<{
  book: BookInterface
  onMoveBook: (book: BookInterface, event: React.ChangeEvent<HTMLSelectElement>) => void
}> {
  render() {
    let book = this.props.book
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: `url("${book.imageLinks.thumbnail}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={(e) => this.props.onMoveBook(book, e)}
            >
              <option
                disabled={true}
              >Move to...
              </option>
              {bookShelves.map(thisBookState => (
                <option
                  key={thisBookState.shelf}
                  value={thisBookState.shelf}
                >{thisBookState.shelfText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>

    )
  }
}
export default Book
