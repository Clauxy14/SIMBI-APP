import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="&nbsp; &nbsp; &nbsp; Search"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="search-bar"
      />
      <FaSearch className="search-icon" onClick={onSearch} role="button" />
    </div>
  );
};

export default SearchBar;
