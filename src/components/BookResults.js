import PropTypes from "prop-types";
import BookView from "./BookView";

const BookResults = ({ books, onReadingChange }) => {
  const bookReadingChange = (b) => {
    onReadingChange(b);
  };

  return (
    <ol className="books-grid">
      {books.length > 0
        ? books.map((book) => (
            <BookView
              key={book.id}
              book={book}
              onReadingChange={(b) => bookReadingChange(b)}
            />
          ))
        : "No Results Found"}
    </ol>
  );
};

BookResults.propTypes = {
  books: PropTypes.array.isRequired,
};

export default BookResults;
