import "../css/App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAll } from "../BooksAPI";
import SearchPage from "./SearchPage";
import BookShelf from "./BookShelf";
import BookDetails from "./BookDetails";

function App() {
  const [books, setbooks] = useState([]);

  useEffect(() => {
    const getBooksRes = async () => {
      const b = await getAll();
      if (b) {
        if (!b.error) {
          setbooks(b);
        } else {
          setbooks([]);
        }
      } else {
        setbooks([]);
      }
    };
    getBooksRes();
  }, []);

  const bookReadingChange = (bs) => {
    setbooks(bs);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <BookShelf
              title="Book Shelf"
              books={books}
              onReadingChange={(bs) => bookReadingChange(bs)}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage
              title="Search a Book"
              mainBooks={books}
              onReadingChange={(bs) => bookReadingChange(bs)}
            />
          }
        />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
