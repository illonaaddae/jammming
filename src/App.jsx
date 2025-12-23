import { useState, useEffect, useRef } from "react";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { ToastContainer, useToast } from "./components/Toast";
import {
  initializeSpotify,
  searchTracks,
  createPlaylist,
  addTracksToPlaylist,
} from "./utilis/Spotify";

// Local storage keys
const STORAGE_KEYS = {
  PLAYLIST_TRACKS: "jammming_playlist_tracks",
  PLAYLIST_NAME: "jammming_playlist_name",
};

// Load from local storage
const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PLAYLIST_TRACKS, [])
  );
  const [playlistName, setPlaylistName] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PLAYLIST_NAME, "My Playlist")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPreview, setCurrentPreview] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    const init = async () => {
      await initializeSpotify();
      setIsLoading(false);
    };
    init();
  }, []);

  // Save playlist tracks to local storage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.PLAYLIST_TRACKS,
      JSON.stringify(playlistTracks)
    );
  }, [playlistTracks]);

  // Save playlist name to local storage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.PLAYLIST_NAME,
      JSON.stringify(playlistName)
    );
  }, [playlistName]);

  // Handle audio preview
  const handlePreview = (track) => {
    if (!track.previewUrl) {
      toast.info("No preview available for this track");
      return;
    }

    if (currentPreview === track.id && isPlaying) {
      // Pause current track
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      // Play new track
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl;
        audioRef.current.play();
        setCurrentPreview(track.id);
        setIsPlaying(true);
      }
    }
  };

  // Handle audio end
  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentPreview(null);
  };

  // Function to add a track to the playlist
  const addTrack = (track) => {
    // Check for duplicates
    if (playlistTracks.find((t) => t.id === track.id)) {
      toast.warning(`"${track.name}" is already in your playlist`);
      return;
    }

    setPlaylistTracks((tracks) => [track, ...tracks]);
    toast.success(`Added "${track.name}" to playlist`);
  };

  // Handle Search
  const handleSearch = async (term) => {
    const searchTerm = term.trim();
    if (searchTerm.length < 2) {
      toast.warning("Please enter at least 2 characters");
      return;
    }

    setIsSearching(true);
    const response = await searchTracks(searchTerm);
    setIsSearching(false);

    if (response?.errorMsg || response?.result?.error) {
      toast.error(response?.errorMsg ?? response?.result?.error?.message);
      return;
    }

    if (!response?.result?.tracks?.items) {
      setSearchResults([]);
      toast.info("No tracks found");
      return;
    }

    const tracks = response.result.tracks.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        artist: item.artists[0]?.name || "Unknown Artist",
        album: item.album?.name || "Unknown Album",
        albumCover: item.album?.images?.[0]?.url || "",
        uri: item.uri,
        previewUrl: item.preview_url,
        duration: item.duration_ms,
      };
    });
    setSearchResults(tracks);

    if (tracks.length === 0) {
      toast.info("No tracks found for your search");
    }
  };

  // Clear search results
  const clearSearchResults = () => {
    setSearchResults([]);
  };

  // Clear playlist
  const clearPlaylist = () => {
    if (playlistTracks.length === 0) return;
    setPlaylistTracks([]);
    toast.info("Playlist cleared");
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
  const savePlaylist = async () => {
    if (!playlistName.trim()) {
      toast.warning("Please enter a playlist name");
      return;
    }

    if (playlistTracks.length === 0) {
      toast.warning("Please add tracks to your playlist");
      return;
    }

    try {
      // Create the playlist
      const playlistResponse = await createPlaylist(
        playlistName,
        `${playlistName} - Created with Jammming`
      );

      if (playlistResponse.errorMsg || !playlistResponse.result?.id) {
        toast.error(playlistResponse.errorMsg || "Failed to create playlist");
        return;
      }

      const playlistId = playlistResponse.result.id;

      // Add tracks to the playlist
      const trackUris = playlistTracks.map((track) => track.uri);
      const addTracksResponse = await addTracksToPlaylist(
        playlistId,
        trackUris
      );

      if (addTracksResponse.errorMsg) {
        toast.error(addTracksResponse.errorMsg);
        return;
      }

      // Success! Reset the playlist
      toast.success(`Playlist "${playlistName}" saved to Spotify!`, 4000);
      setPlaylistName("My Playlist");
      setPlaylistTracks([]);
    } catch (error) {
      console.error("Error saving playlist:", error);
      toast.error("An error occurred while saving the playlist");
    }
  };

  if (isLoading) {
    return (
      <div className="App">
        <h1 className="appTitle">
          <span className="titleText">Jammming</span>
        </h1>
        <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      <audio ref={audioRef} onEnded={handleAudioEnd} />

      <h1 className="appTitle">
        <svg
          className="titleIcon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18V5l12-2v13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
          <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="titleText">Jammming</span>
      </h1>

      <SearchBar onSearch={handleSearch} isSearching={isSearching} />

      <div className="appContent">
        <SearchResults
          searchResults={searchResults}
          onAdd={addTrack}
          onPreview={handlePreview}
          currentPreview={currentPreview}
          isPlaying={isPlaying}
          isSearching={isSearching}
          onClear={clearSearchResults}
        />
        <Playlist
          playlistTracks={playlistTracks}
          playlistName={playlistName}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          onPreview={handlePreview}
          currentPreview={currentPreview}
          isPlaying={isPlaying}
          onClear={clearPlaylist}
        />
      </div>
    </div>
  );
}

export default App;
