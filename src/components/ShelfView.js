import PropTypes from "prop-types";
import BookView from "./BookView";

const ShelfView = ({ books, shelf, shelfName, onReadingChange }) => {
  const booksList = books.filter((book) => book.shelf === shelf);
  const bookReadingChange = (b) => {
    const returnBooks = books
      .map((book) => {
        book.shelf = b.id === book.id ? b.shelf : book.shelf;
        return book;
      })
      .filter((b) => b.shelf !== "none");
    onReadingChange(returnBooks);
  };
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksList.length > 0
            ? booksList.map((book) => (
                <BookView
                  key={book.id}
                  book={book}
                  shelf={shelf}
                  onReadingChange={(b) => bookReadingChange(b)}
                />
              ))
            : `Thier is no books in ${shelfName} Shelf ! ..`}
        </ol>
      </div>
    </div>
  );
};

ShelfView.propTypes = {
  books: PropTypes.array.isRequired,
  onReadingChange: PropTypes.func.isRequired,
  shelf: PropTypes.string.isRequired,
};

export default ShelfView;
