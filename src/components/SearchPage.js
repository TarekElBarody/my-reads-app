import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookResults from "./BookResults";
import { search } from "../BooksAPI";

const SearchPage = ({ mainBooks, onReadingChange, title }) => {
  const [query, setQuery] = useState("");
  const [books, setbooks] = useState([]);

  const bookSearch = (v) => setQuery(v);
  
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    let controller = new AbortController();
    const getBooksRes = async () => {
      try {
        if (query.trim() !== "") {
          const b = await search(controller.signal, query.trim());
          if (b) {
            if (!b.error) {
              setbooks(b);
            } else {
              setbooks([]);
            }
          } else {
            setbooks([]);
          }
        } else {
          setbooks([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBooksRes();
    return () => controller.abort();
  }, [query]);

  const bookReadingChange = (b) => {
    const u = [];
    const returnBooks = [...mainBooks].map((book) => {
      u.push(b.id === book.id ? true : false);
      book.shelf = b.id === book.id ? b.shelf : book.shelf;
      return book;
    });
    if (u.includes(true) === false) returnBooks.push(b);
    onReadingChange(returnBooks.filter((book) => book.shelf !== "none"));
  };

  const readingBooks = [...books].map((book) => {
    const y = mainBooks.find(({ id }) => id === book.id) || {
      id: book.id,
      shelf: "none",
    };
    book["shelf"] = y.shelf;
    return book;
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => bookSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {query !== "" ? (
          <BookResults
            books={readingBooks}
            onReadingChange={(b) => bookReadingChange(b)}
          />
        ) : (
          "Start Searching by typing the name of books title or the name of the authers or ISBN"
        )}
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  mainBooks: PropTypes.array.isRequired,
  onReadingChange: PropTypes.func.isRequired,
};

export default SearchPage;
