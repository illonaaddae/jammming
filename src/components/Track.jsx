import styles from "./Track.module.css";

function Track({ track, onAdd, onRemove, isRemoval }) {
  function handleRemove() {
    onRemove(track);
  }

  function handleAdd() {
    onAdd(track);
  }

  return (
    <>
      <div className={styles.track}>
        <div className={styles.albumCover}></div>

        <div className={styles.trackInfo}>
          <h2 className={styles.trackName}>{track.name}</h2>
          <p className={styles.trackDetails}>
            {track.artist} | {track.album}
          </p>
        </div>

        <button
          className={styles.trackButton}
          onClick={isRemoval ? handleRemove : handleAdd}
        >
          {" "}
          {isRemoval ? "-" : "+"}
        </button>
      </div>
    </>
  );
}

export default Track;
