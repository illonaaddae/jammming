import { useState, useEffect } from "react";
import TrackList from "./TrackList";
import styles from "./SearchResults.module.css";

const INITIAL_DISPLAY_COUNT = 5;
const LOAD_MORE_COUNT = 5;

function SearchResults({
  searchResults,
  onAdd,
  onPreview,
  currentPreview,
  isPlaying,
  isSearching,
  onClear,
}) {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

  // Reset display count when search results change
  useEffect(() => {
    setDisplayCount(INITIAL_DISPLAY_COUNT);
  }, [searchResults]);

  const displayedTracks = searchResults.slice(0, displayCount);
  const hasMore = searchResults.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + LOAD_MORE_COUNT);
  };

  return (
    <div className={styles.SearchResults}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 16l4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Results
        </h2>
        <div className={styles.headerActions}>
          {searchResults.length > 0 && (
            <>
              <span className={styles.count}>
                {displayCount >= searchResults.length
                  ? searchResults.length
                  : displayCount}{" "}
                of {searchResults.length}
              </span>
              <button
                className={styles.clearButton}
                onClick={onClear}
                title="Clear results"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.trackListContainer}>
        {isSearching ? (
          <div className={styles.placeholder}>
            <div className={styles.spinner}></div>
            <p>Searching...</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className={styles.placeholder}>
            <p>Search for songs to add to your playlist</p>
          </div>
        ) : (
          <>
            <TrackList
              tracks={displayedTracks}
              onAdd={onAdd}
              isRemoval={false}
              onPreview={onPreview}
              currentPreview={currentPreview}
              isPlaying={isPlaying}
            />
            {hasMore && (
              <button
                className={styles.loadMoreButton}
                onClick={handleLoadMore}
              >
                Load More ({searchResults.length - displayCount} remaining)
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
