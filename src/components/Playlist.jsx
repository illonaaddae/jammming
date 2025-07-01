import TrackList from "./TrackList";
import styles from "./Playlist.module.css";

function Playlist({
  playlistTracks,
  playlistName,
  onRemove,
  onNameChange,
  onSave,
}) {
  return (
    <div className={styles.Playlist}>
      <input
        type="text"
        value={playlistName}
        onChange={onNameChange}
        className={styles.playlistNameInput}
        placeholder="Enter playlist name"
      />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button onClick={onSave} className={styles.saveButton}>
        Save to Spotify
      </button>
    </div>
  );
}

export default Playlist;
