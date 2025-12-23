<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<h1 align="center">🎵 Jammming</h1>

<p align="center">
  <strong>Create and save custom Spotify playlists with a beautiful, modern interface</strong>
</p>

<p align="center">
  <a href="https://jammming-six-kappa.vercel.app/">View Demo</a>
  ·
  <a href="https://github.com/illonaaddae/jammming/issues">Report Bug</a>
  ·
  <a href="https://github.com/illonaaddae/jammming/issues">Request Feature</a>
</p>

---

## ✨ Overview

Jammming is a React web application that connects to the Spotify API, allowing users to search for songs, create custom playlists, and save them directly to their Spotify account. Built with a sleek, Spotify-inspired dark theme and glassmorphism design.

## 🚀 Features

- **🔍 Search Spotify's Library** - Search millions of tracks by song title, artist, or album
- **🎧 Track Preview** - Listen to 30-second previews before adding to your playlist
- **📝 Custom Playlists** - Create and name your own playlists
- **➕ Easy Track Management** - Add or remove tracks with a single click
- **💾 Save to Spotify** - Export playlists directly to your Spotify account
- **🔔 Toast Notifications** - Real-time feedback for all actions
- **💿 Local Storage** - Your playlist persists even if you close the browser
- **📱 Responsive Design** - Works beautifully on desktop and mobile devices
- **🎨 Modern UI** - Glassmorphism design with smooth animations

## 🛠️ Built With

| Technology                                                              | Purpose                     |
| ----------------------------------------------------------------------- | --------------------------- |
| [React](https://reactjs.org/)                                           | Frontend UI framework       |
| [Vite](https://vitejs.dev/)                                             | Build tool & dev server     |
| [Spotify Web API](https://developer.spotify.com/documentation/web-api/) | Music data & authentication |
| [CSS Modules](https://github.com/css-modules/css-modules)               | Scoped component styling    |
| [Vercel](https://vercel.com/)                                           | Deployment & hosting        |

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Spotify Developer Account ([Create one here](https://developer.spotify.com/dashboard))

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/illonaaddae/jammming.git
   cd jammming
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_REDIRECT_URL=http://localhost:3000/
   VITE_SPOTIFY_BASE_URL=https://api.spotify.com/v1
   ```

4. **Configure Spotify Dashboard**

   In your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard):

   - Create a new app
   - Add `http://localhost:3000/` to Redirect URIs
   - Copy your Client ID to the `.env` file

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:3000`

## 🌐 Deployment

This app is deployed on Vercel. To deploy your own:

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard:
   - `VITE_SPOTIFY_CLIENT_ID`
   - `VITE_REDIRECT_URL` (your Vercel URL)
   - `VITE_SPOTIFY_BASE_URL`
4. Update Spotify Dashboard with your Vercel URL as a Redirect URI

## 📁 Project Structure

```
jammming/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Playlist.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SearchResults.jsx
│   │   ├── Toast.jsx
│   │   ├── Track.jsx
│   │   └── TrackList.jsx
│   ├── utilis/
│   │   ├── helpers.js
│   │   └── Spotify.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── vite.config.js
```

## 🔐 Authentication

Jammming uses Spotify's **Authorization Code with PKCE** flow for secure authentication:

1. User clicks to authorize
2. Redirected to Spotify login
3. Authorization code returned
4. Code exchanged for access token
5. Token used for API requests
6. Automatic token refresh when expired

## 🎯 Usage

1. **Login** - Authenticate with your Spotify account
2. **Search** - Enter a song, artist, or album name
3. **Preview** - Click the play button on any track to hear a preview
4. **Add Tracks** - Click the `+` button to add tracks to your playlist
5. **Name Playlist** - Enter a custom name for your playlist
6. **Save** - Click "Save to Spotify" to export your playlist

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Codecademy](https://www.codecademy.com/) - Project inspiration and curriculum
- [Spotify](https://www.spotify.com/) - API and music data
- [Vercel](https://vercel.com/) - Hosting platform

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/illonaaddae">Illona Addae</a>
</p>
