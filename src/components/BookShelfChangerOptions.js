import PropTypes from "prop-types";

const BookShelfChangerOptions = ({ op, onChangeShelf }) => {
  const className =
    op.active === true ? "dropdown-menu-item active" : "dropdown-menu-item";
  const handelChangeShelf = (n) => (!op.active ? onChangeShelf(n) : null);

  return (
    <li className={className} onClick={() => handelChangeShelf(op.id)}>
      {op.name}
    </li>
  );
};

BookShelfChangerOptions.propTypes = {
  op: PropTypes.object.isRequired,
};

export default BookShelfChangerOptions;
