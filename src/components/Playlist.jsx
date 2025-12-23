import TrackList from "./TrackList";
import styles from "./Playlist.module.css";

function Playlist({
  playlistTracks,
  playlistName,
  onRemove,
  onNameChange,
  onSave,
  onPreview,
  currentPreview,
  isPlaying,
  onClear,
}) {
  // Calculate total duration
  const totalDuration = playlistTracks.reduce(
    (acc, track) => acc + (track.duration || 0),
    0
  );

  const formatTotalDuration = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  return (
    <div className={styles.Playlist}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 9V6H8v14a3 3 0 1 1-3-3h3V6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="8"
              y1="6"
              x2="8"
              y2="17"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="5"
              cy="17"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 9h7M12 13h7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            value={playlistName}
            onChange={onNameChange}
            className={styles.playlistName}
            placeholder="Enter playlist name"
          />
          {playlistTracks.length > 0 && (
            <button
              className={styles.clearButton}
              onClick={onClear}
              title="Clear playlist"
            >
              ✕
            </button>
          )}
        </div>
        {playlistTracks.length > 0 && (
          <div className={styles.stats}>
            <span>
              {playlistTracks.length}{" "}
              {playlistTracks.length === 1 ? "track" : "tracks"}
            </span>
            <span>{formatTotalDuration(totalDuration)}</span>
          </div>
        )}
      </div>

      <div className={styles.trackListContainer}>
        {playlistTracks.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Add tracks to get started</p>
          </div>
        ) : (
          <TrackList
            tracks={playlistTracks}
            onRemove={onRemove}
            isRemoval={true}
            onPreview={onPreview}
            currentPreview={currentPreview}
            isPlaying={isPlaying}
          />
        )}
      </div>

      <button
        onClick={onSave}
        className={styles.saveButton}
        disabled={playlistTracks.length === 0}
      >
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;
