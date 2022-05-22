import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { playlistState } from "../../types/playlist";
import "./index.scss";
import HomeContainer from "../../components/HomeContainer";
import VideoList from "../../components/VideoList";
import { BUTTON, FROM } from "../../util/constants";
import { VideoPayload } from "../../types/videos";
import {
  deletePlaylist,
  getAllPlaylists,
  removeVideoFromPlaylist,
} from "../../actions/playlist";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PlayListVideos() {
  const { playlists, allPlaylists = {} } = useSelector(
    (state: { playlist: playlistState }) => state.playlist
  );
  const [params] = useSearchParams();
  const playList_id = params.get("playlist") ?? "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPlaylists());
  }, []);

  const removePlaylistVideoHandler = ({ video }: { video: VideoPayload }) => {
    dispatch(
      removeVideoFromPlaylist({
        _id: playList_id,
        video_id: video.id,
      })
    );
  };

  const deletePlaylistHandler = () => {
    dispatch(
      deletePlaylist({
        _id: playList_id,
      })
    );
    navigate("/playlist");
  };

  return (
    <HomeContainer>
      <div className="playlist-container">
        <div className="delete-container">
          <Button
            callBack={deletePlaylistHandler}
            type={BUTTON.BUTTON}
            style={BUTTON.OUTLINE}
          >
            <div className="delete-btn">
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </div>
          </Button>
        </div>
        {allPlaylists[playList_id] && (
          <VideoList
            from={FROM.PLAYLIST}
            callBackData={removePlaylistVideoHandler}
            title={`Videos of Playlist ${allPlaylists[playList_id].name}`}
            items={allPlaylists[playList_id].videos}
          />
        )}
      </div>
    </HomeContainer>
  );
}

export default PlayListVideos;
