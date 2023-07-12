import "./style.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function SearchBar() {
  return (
    <div className="search-bar">
      <ReactSearchAutocomplete />
    </div>
  );
}

export default SearchBar;
