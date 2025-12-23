import styles from "./Track.module.css";

function Track({
  track,
  onAdd,
  onRemove,
  isRemoval,
  onPreview,
  currentPreview,
  isPlaying,
}) {
  const isCurrentlyPlaying = currentPreview === track.id && isPlaying;

  function handleRemove() {
    onRemove(track);
  }

  function handleAdd() {
    onAdd(track);
  }

  function handlePreview(e) {
    e.stopPropagation();
    onPreview?.(track);
  }

  return (
    <div className={styles.Track}>
      <div className={styles.albumArt}>
        <img
          className={styles.albumImage}
          src={track.albumCover || "/placeholder-album.png"}
          alt={track.album}
        />
        <button
          className={`${styles.previewButton} ${
            isCurrentlyPlaying ? styles.playing : ""
          }`}
          onClick={handlePreview}
          disabled={!track.previewUrl}
          aria-label={isCurrentlyPlaying ? "Pause preview" : "Play preview"}
        >
          {isCurrentlyPlaying ? "❚❚" : "▶"}
        </button>
      </div>

      <div className={styles.trackInfo}>
        <h3 className={styles.trackName}>{track.name}</h3>
        <p className={styles.trackMeta}>
          {track.artist} • {track.album}
        </p>
      </div>

      <button
        className={`${styles.actionButton} ${isRemoval ? styles.remove : ""}`}
        onClick={isRemoval ? handleRemove : handleAdd}
        aria-label={isRemoval ? "Remove from playlist" : "Add to playlist"}
      >
        {isRemoval ? "−" : "+"}
      </button>
    </div>
  );
}

export default Track;
