import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filtersSlice";
import { searchContact } from "../../redux/contactsOps";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);
  const [searchTerm, setSearchTerm] = useState(nameFilter);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch(searchContact(value));
  };

  return (
    <div className={css.searchContainer}>
      <label htmlFor="search">Find contacts by name:</label>
      <input
        className={css.searchInput}
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};
export default SearchBox;
