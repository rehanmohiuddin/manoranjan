import React, { useState } from "react";
import "./index.scss";
import { VideoPayload } from "../../types/videos";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddToPlaylistIcon from "../../assets/playlist.svg";
import Modal from "../Modal";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { playlistState } from "../../types/playlist";
import { BUTTON, FROM } from "../../util/constants";
import {
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../../actions/playlist";

function Index({
  title,
  items,
  from = FROM.HOME,
  callBackData = () => {},
}: {
  title: string;
  items: Array<VideoPayload>;
  from?: string;
  callBackData?: Function;
}) {
  const [playlistAction, setPlaylistAction] = useState<{
    _id: string;
    video: any;
    open: boolean;
  }>({ _id: "", video: {}, open: false });

  const { playlists = [], allPlaylists } = useSelector(
    (state: { playlist: playlistState }) => state.playlist
  );

  const dispatch = useDispatch();

  const renderVideoActions = {
    [FROM.HOME]: (video: VideoPayload) => (
      <div>
        <div
          onClick={() =>
            setPlaylistAction({
              ...playlistAction,
              open: true,
              video: video,
            })
          }
        >
          <AddToPlaylistIcon />
        </div>
        <FontAwesomeIcon icon={faClock} />
      </div>
    ),
    [FROM.HISTORY]: () => (
      <div>
        <FontAwesomeIcon icon={faClock} />
      </div>
    ),
    [FROM.PLAYLIST]: (video: VideoPayload) => (
      <div>
        <div onClick={() => callBackData({ video: video })}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    ),
  };

  const isEmpty = items.length === 0 ?? true;

  return (
    <div className="video-list-container">
      <div className="video-list-title">{title}</div>
      <div className="video-list">
        {isEmpty ? (
          <div className="empty-message">
            <div>No Videos</div>
            <Link to={"/"}>Add Here</Link>
          </div>
        ) : (
          items.map((video) => (
            <>
              {video.snippet && (
                <>
                  <div className="video">
                    <Link to={`/watch?v=${video.id}`}>
                      <img
                        src={video.snippet.thumbnails.high.url}
                        className="video-thumbnail"
                      />
                      <div className="video-title">{video.snippet.title}</div>
                    </Link>
                    <div className="video-bottom">
                      <div className="video-channel">
                        {video.snippet.channelTitle}
                      </div>
                      {renderVideoActions[from](video)}
                    </div>
                  </div>
                </>
              )}
            </>
          ))
        )}
      </div>
      {playlistAction.open && (
        <Modal
          header="Add Video To Playlist"
          Open={true}
          close={() => setPlaylistAction({ ...playlistAction, open: false })}
        >
          <>
            <select
              onChange={(e) =>
                setPlaylistAction({
                  ...playlistAction,
                  _id: e.target.value,
                })
              }
              className="select-playlists"
            >
              <option>Select</option>
              {playlists.map((_id) => (
                <option value={_id}>{allPlaylists[_id].name}</option>
              ))}
            </select>
            <Button
              callBack={() => {
                dispatch(
                  addVideoToPlaylist({
                    _id: playlistAction._id,
                    video: playlistAction.video,
                  })
                );
                setPlaylistAction({ ...playlistAction, open: false });
              }}
              type={BUTTON.BUTTON}
              style={BUTTON.PRIMARY}
            >
              <div>
                <FontAwesomeIcon icon={faPlus} />
                Add
              </div>
            </Button>
          </>
        </Modal>
      )}
    </div>
  );
}

export default Index;
