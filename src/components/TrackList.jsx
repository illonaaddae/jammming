import Track from "./Track";
import styles from "./TrackList.module.css";

function TrackList({
  tracks,
  onAdd,
  onRemove,
  isRemoval,
  onPreview,
  currentPreview,
  isPlaying,
}) {
  return (
    <div className={styles.TrackList}>
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
          onPreview={onPreview}
          currentPreview={currentPreview}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  );
}

export default TrackList;
