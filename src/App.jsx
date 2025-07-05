import { useState, useEffect } from "react";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import mockTracks from "./utilis/mock-data";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { middleWare } from "./utilis/Spotify";
import { authorizeAndAuthenticateUser } from "./utilis/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");

  useEffect(() => {
    authorizeAndAuthenticateUser();
  }, []);

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
  const handleSearch = async (term) => {
    const searchTerm = term.trim();
    if (searchTerm.length < 2) return;

    const searchValue = searchTerm.replace(" ", "%20");

    const { errorMsg, result } = await middleWare(
      `search?q=${searchValue}&type=track&limit=50`
    );
    console.log(errorMsg);
    if (errorMsg || result.error) {
      alert(errorMsg ?? result.error.message);
      return;
    }

    // console.log(result);
    const tracks = result.tracks.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        albumCover: item.album.images[0].url,
      };
    });
    setSearchResults(tracks);
    console.log(tracks);

    // if (!term.trim()) {
    //   setSearchResults(mockTracks);
    //   return;
    // }

    // const filtered = mockTracks.filter(
    //   (track) =>
    //     track.name.toLowerCase().includes(term.toLowerCase()) ||
    //     track.artist.toLowerCase().includes(term.toLowerCase()) ||
    //     track.album.toLowerCase().includes(term.toLowerCase())
    // );

    // setSearchResults(filtered);
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
