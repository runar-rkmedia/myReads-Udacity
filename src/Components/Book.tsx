import * as React from 'react'
import { bookShelves } from './ListShelves'

// Caution: Some of these fields may not exist for every book.
export interface BookInterface {
  shelf: string
  title: string
  authors?: string[]
  averageRating: number
  description: string
  imageLinks?: {
    smallThumbnail: string
    thumbnail: string
  }
  industryIdentifiers: {
    type: string
    identifier: string
  }[]
  infoLink: string
  language: string
  maturityRatting: string
  pageCount: number
  panelizationSummary: {
    containsEpubBubbles: boolean
    containsImageBubbles: boolean
  }
  previewLink: string
  printType: string
  publishedDate: number
  ratingsCount: number
  subtitle: string
  id: string
}

interface BookClassInterface {
  book: BookInterface
  onMoveBook: (book: BookInterface, event: React.ChangeEvent<HTMLSelectElement>) => void
}

let Book = (props: BookClassInterface) => {
  let imageURL = props.book.imageLinks ? props.book.imageLinks.thumbnail : ''
  return (
    <div className="book">
      <div className="book-top">
        <BookCover thumbnail={imageURL} />
        <BookShelveChanger book={props.book} onMoveBook={props.onMoveBook} />
      </div>
      <BookTitle title={props.book.title} url={props.book.previewLink} />
      <BookAuthors authors={props.book.authors || []} />
    </div>
  )
}

let BookTitle = (props: {
  title: string
  url?: string
}) => (
    props.url ? (
      <div
        onClick={() => { window.open(props.url) }}
        className="book-title fake-link"
      >{props.title}
      </div>
    ) : (
        <div className="book-title" >{props.title}</div>
      )

  )

let BookAuthors = (props: { authors: string[] }) => (
  <div className="book-authors">
    {props.authors.map(author => (
      <div
        key={author}
      >{author}
      </div>
    )
    )}
  </div>
)
let BookCover = (props: {
  thumbnail: string
}) => (
    <div
      className="book-cover"
      style={{
        backgroundImage: `url("${props.thumbnail}")`
      }}
    >
      {!props.thumbnail && (
        <span className="no-image" />
      )}
    </div>
  )

let BookShelveChanger = (props: BookClassInterface) => (
  <div className="book-shelf-changer">
    <select
      value={props.book.shelf}
      onChange={(e) => props.onMoveBook(props.book, e)}
    ><option
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
)
export default Book
