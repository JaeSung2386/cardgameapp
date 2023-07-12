import "./style.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { gameList } from "../../common/data";

function SearchBar() {
  const handleOnSelect = (item) => {
    console.log(item);
  };

  return (
    <div className="search-bar">
      <ReactSearchAutocomplete items={gameList} onSelect={handleOnSelect} />
    </div>
  );
}

export default SearchBar;
