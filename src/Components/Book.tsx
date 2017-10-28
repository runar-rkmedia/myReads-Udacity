import * as React from 'react'

interface BookStatus {
  status: 'none'|'wantToRead'|'currentlyReading'|'read'
  text?: string
}

interface BookInterface extends BookStatus {
  backgroundImage?: string
  bookTitle?: string
  bookAuthors?: string
}

class Book extends React.Component<BookInterface> {
  bookStatuses: BookStatus[] = [
    {
      status: 'none',
      text: 'None'
    },
    {
      status: 'wantToRead',
      text: 'Want to read'
    },
    {
      status: 'currentlyReading',
      text: 'Currently Reading'
    },
    {
      status: 'read',
      text: 'Already read it'
    },
  ]
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: this.props.backgroundImage
            }}
          />
          <div className="book-shelf-changer">
            <select>
              <option value={this.props.status} disabled={true}>Move to...</option>
              {this.bookStatuses.map(thisBookState => (
                <option
                  key={thisBookState.status}
                  value={thisBookState.status}
                >{thisBookState.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.bookTitle}</div>
        <div className="book-authors">{this.props.bookAuthors}</div>
      </div>

    )
  }
}
export default Book
