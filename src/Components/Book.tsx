import * as React from 'react'

interface BookStatus {
  shelf: 'none'|'wantToRead'|'currentlyReading'|'read'
  text?: string
}

export interface BookInterface extends BookStatus {
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
}> {
  bookStatuses: BookStatus[] = [
    {
      shelf: 'none',
      text: 'None'
    },
    {
      shelf: 'wantToRead',
      text: 'Want to read'
    },
    {
      shelf: 'currentlyReading',
      text: 'Currently Reading'
    },
    {
      shelf: 'read',
      text: 'Already read it'
    },
  ]
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
            <select>
              <option value={book.shelf} disabled={true}>Move to...</option>
              {this.bookStatuses.map(thisBookState => (
                <option
                  key={thisBookState.shelf}
                  value={thisBookState.shelf}
                >{thisBookState.text}
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
