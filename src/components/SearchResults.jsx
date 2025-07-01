import TrackList from "./TrackList";
import styles from "./SearchResults.module.css";

function SearchResults({ searchResults, onAdd }) {
  return (
    <div className={styles.SearchResults}>
      <h1 className={styles.resultsTitle}>Results</h1>
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    </div>
  );
}

export default SearchResults;
