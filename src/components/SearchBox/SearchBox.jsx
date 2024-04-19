import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  // selectNameFilter,
  changeFilter,
  // selectNumberFilter,
} from "../../redux/filters/slice";
import { searchContact } from "../../redux/contacts/operations";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  // const nameFilter = useSelector(selectNameFilter);
  // const numberFilter = useSelector(selectNumberFilter);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch(searchContact(value));
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={css.searchContainer}>
      <label htmlFor="search">Find contacts:</label>
      <input
        className={css.searchInput}
        // type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};
export default SearchBox;
