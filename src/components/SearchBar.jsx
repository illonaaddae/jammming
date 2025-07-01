import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className={styles.SearchBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Enter a song, album, or artist"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(searchTerm);
            }
          }}
        />
        <button
          className={styles.SearchButton}
          onClick={() => onSearch(searchTerm)}
        >
          Search
        </button>
      </div>
    </>
  );
}

export default SearchBar;
