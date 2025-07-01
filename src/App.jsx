import { useState } from "react";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import mockTracks from "./utilis/mock-data";
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  const [searchResults, setSearchResults] = useState(mockTracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [searchTerm, setsearchTerm] = useState("");

  // Function to add a track to the playlist
  const addTrack = (track) => {
    setPlaylistTracks((tracks) => {
      if (tracks.find((t) => t.id === track.id)) {
        return tracks;
      }

      return [track, ...tracks];
    });
  };

  // Handle Search
  const handleSearch = (term) => {
    console.log("Searching for:", term);

    if (!term.trim()) {
      setSearchResults(mockTracks);
      return;
    }

    const filtered = mockTracks.filter(
      (track) =>
        track.name.toLowerCase().includes(term.toLowerCase()) ||
        track.artist.toLowerCase().includes(term.toLowerCase()) ||
        track.album.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filtered);
  };

  // Function to remove a track from the playlist
  const removeTrack = (track) => {
    setPlaylistTracks((tracks) => tracks.filter((t) => t.id !== track.id));
  };

  // Function to update playlist name
  const updatePlaylistName = ({ target }) => {
    setPlaylistName(target.value);
  };

  // Function to save playlist to Spotify
  const savePlaylist = () => {
    console.log("Playlist Name:", playlistName);
    console.log("Playlist Tracks:", playlistTracks);
  };

  return (
    <div className="App">
      <h1 className="appTitle">
        <span className="titleText">Jammming</span>
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="appContent">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistTracks={playlistTracks}
          playlistName={playlistName}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
