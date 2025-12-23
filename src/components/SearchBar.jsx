import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch, isSearching }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleSearch = () => {
    if (!isSearching) {
      onSearch(searchTerm);
    }
  };

  return (
    <>
      <div className={styles.SearchBar}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Enter a song, album, or artist"
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            disabled={isSearching}
          />
          {searchTerm && !isSearching && (
            <button
              className={styles.clearInput}
              onClick={handleClear}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button
          className={styles.SearchButton}
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <span className={styles.buttonContent}>
              <span className={styles.miniSpinner}></span>
              Searching...
            </span>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </>
  );
}

export default SearchBar;
