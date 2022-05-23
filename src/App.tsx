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
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const routes: Array<{
    path: string;
    Component: React.FC;
    isProtected?: boolean;
  }> = [
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/register",
      Component: Register,
    },
    {
      path: "/watch",
      Component: Watch,
      isProtected: true,
    },
    {
      path: "/playlist",
      Component: Playlist,
      isProtected: true,
    },
    {
      path: "/playlist/videos",
      Component: PlayListVideos,
      isProtected: true,
    },
    {
      path: "/videos",
      Component: Videos,
      isProtected: true,
    },
    {
      path: "/like/videos",
      Component: LikedVideos,
      isProtected: true,
    },
    {
      path: "/watchlater",
      Component: WatchLater,
      isProtected: true,
    },
    {
      path: "/history",
      Component: History,
      isProtected: true,
    },
  ];
  return (
    <div className="App">
      <Routes>
        {routes.map(({ path, Component, isProtected }) => (
          <Route
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute component={Component} />
              ) : (
                <Component />
              )
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
