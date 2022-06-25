import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BookShelfChangerOptions from "./BookShelfChangerOptions";

const BookShelfChanger = ({ id, shelf, onReadingChange }) => {
  const [open, setOpen] = useState(false);
  const div = useRef(null);
  const options = [
    {
      id: "currentlyReading",
      name: "Currently Reading",
      active: shelf === "currentlyReading" ? true : false,
    },
    {
      id: "wantToRead",
      name: "Want to Read",
      active: shelf === "wantToRead" ? true : false,
    },
    {
      id: "read",
      name: "Read",
      active: shelf === "read" ? true : false,
    },
    {
      id: "none",
      name: "None",
      active: shelf === "none" ? true : false,
    },
  ];

  const handleClickOutside = (event) => {
    if (div.current && !div.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const changeShelf = (r) => {
    onReadingChange(r);
  };

  return (
    <div className="book-shelf-changer" onClick={() => setOpen(!open)}>
      {open && (
        <div className="dropdown-wrapper">
          <ul className="dropdown-menu" ref={div}>
            {options.map((op) => (
              <BookShelfChangerOptions
                key={op.id}
                op={op}
                onChangeShelf={changeShelf}
                className="dropdown-menu-item"
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

BookShelfChanger.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BookShelfChanger;
