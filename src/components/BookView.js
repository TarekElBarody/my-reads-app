import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";
import { update } from "../BooksAPI";
import { Link } from "react-router-dom";

const BookView = ({ book, onReadingChange }) => {
  const id = book.id;
  const thumbnail = book.imageLinks
    ? book.imageLinks.thumbnail
    : `data:image/jpeg;base64,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`;
  const title = book.title;
  const authors = book.authors
    ? book.authors.length > 1
      ? book.authors.join(", ")
      : book.authors[0]
    : "";
  const shelf = book.shelf;

  const bookReadingChange = (v) => {
    const b = { ...book };
    b.shelf = v;
    onReadingChange(b);
    const UpdateServerShelf = async (c) => await update({ id: id }, c);
    UpdateServerShelf(v);
  };

  return (
    <li key={id}>
      <div className="book">
        <div className="book-top">
          <Link to={`/book/${id}`}>
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${thumbnail}")`,
              }}
            ></div>
          </Link>
          <BookShelfChanger
            id={id}
            shelf={shelf}
            onReadingChange={(v) => bookReadingChange(v)}
          />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  );
};

BookView.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookView;
