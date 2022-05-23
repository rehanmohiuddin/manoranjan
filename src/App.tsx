import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Watch from "./Pages/Video";
import Playlist from "./Pages/Playlist";
import PlayListVideos from "./Pages/Playlist/PlayListVideos";
import Videos from "./Pages/Videos";
import LikedVideos from "./Pages/LikedVideos";
import WatchLater from "./Pages/WatchLater";
import History from "./Pages/History";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist/videos" element={<PlayListVideos />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/like/videos" element={<LikedVideos />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
