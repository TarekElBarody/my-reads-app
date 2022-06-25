import {  useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ShelfView from "./ShelfView";

const BookShelf = ({ books, onReadingChange, title }) => {
  const bookReadingChange = (bs) => {
    onReadingChange(bs);
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <ShelfView
            books={books}
            shelf="currentlyReading"
            shelfName="Currently Reading"
            onReadingChange={(bs) => bookReadingChange(bs)}
          />
          <ShelfView
            books={books}
            shelf="wantToRead"
            shelfName="Want to Read"
            onReadingChange={(bs) => bookReadingChange(bs)}
          />
          <ShelfView
            books={books}
            shelf="read"
            shelfName="Read"
            onReadingChange={(bs) => bookReadingChange(bs)}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  onReadingChange: PropTypes.func.isRequired,
};

export default BookShelf;
